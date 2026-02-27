import React, { useEffect, useState } from "react";
import { UserHome_nav } from "./user_nav.jsx";

export default function History() {
  const userId = localStorage.getItem("userId");
  const [historyData, setHistoryData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 6;
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/history_carrent/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        
        const data = await res.json();
        setHistoryData(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error loading user data:", error);
        alert("Error loading user data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    let out = historyData.filter((b) => {
      const carTxt = `${b.car.brand} ${b.car.model}`.toLowerCase();
      const matchSearch =
        term === "" || carTxt.includes(term) || String(b.booking_id).includes(term);
      const matchStatus = statusFilter === "all" || b.status === statusFilter;
      return matchSearch && matchStatus;
    });
    setFiltered(out);
    setPage(1);
  }, [search, statusFilter, historyData]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  const formatDate = (d) => {
    try {
      const date = new Date(d);
      // แยกส่วนต่าง ๆ ของวันที่และเวลา
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hour}:${minute}`;
    } catch {
      return d;
    }
  }

  function statusColor(status) {
    switch (status) {
      // case "pending":
      //   return "bg-yellow-100 text-yellow-800";
      // case "confirmed":
      //   return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      // case "cancelled":
      //   return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <>
      <UserHome_nav />
      <div className="font-Roboto-Mono max-w-7xl mx-auto p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">Booking History</h1>
          <div className="text-sm text-gray-500">{filtered.length} items</div>
        </div>

        {/* Search + Filter */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-2 col-span-1 sm:col-span-2 lg:col-span-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="w-full sm:flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto mt-2 sm:mt-0 px-7 sm:px-7 py-2 border rounded-md"
            >
              <option value="all">Status: All</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="py-12 text-center text-gray-500">Loading...</div>
        ) : pageItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500">No items found matching the criteria</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((b) => (
              <div key={b.booking_id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="flex items-start gap-4">
                  <img
                    src={b.car.image_url}
                    alt={`${b.car.brand} ${b.car.model}`}
                    className="w-32 h-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h3 className="font-semibold">{b.car.brand} {b.car.model}</h3>
                        <div className="text-sm text-gray-500">
                          #{b.booking_id} • Booked on {formatDate(b.created_at)}
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded ${statusColor(b.status)} text-xs font-medium`}>
                        {b.status}
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">
                      <div>Period: <span className="font-medium">{formatDate(b.start_date)} — {formatDate(b.end_date)}</span></div>
                      <div>Total Price: <span className="font-medium">฿{Number(b.total_price).toFixed(2)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelected(b)}
                      className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
                    >
                      View Details
                    </button>
                    {/* {b.status !== "cancelled" && b.status !== "completed" && (
                      <button
                        onClick={() => handleCancel(b.booking_id, setHistoryData, setFiltered)}
                        className="px-3 py-1.5 bg-red-600 text-white rounded-md text-sm hover:brightness-95"
                      >
                        Cancel Booking
                      </button>
                    )} */}
                  </div>
                  <div className="text-xs text-gray-400">ID: {b.booking_id}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">Page {page} / {totalPages}</div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
            <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 z-10">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold">Booking Details #{selected.booking_id}</h2>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <img src={selected.car.image_url} className="w-full h-40 object-cover rounded" />
                <div className="md:col-span-2">
                  <div className="text-sm text-gray-600">Brand/Model: <span className="font-medium">{selected.car.brand} {selected.car.model}</span></div>
                  <div className="mt-2 text-sm text-gray-600">Period: <span className="font-medium">{formatDate(selected.start_date)} — {formatDate(selected.end_date)}</span></div>
                  <div className="mt-2 text-sm text-gray-600">Total Price: <span className="font-medium">฿{Number(selected.total_price).toFixed(2)}</span></div>
                  <div className="mt-2 text-sm text-gray-600">Status: <span className="font-medium">{selected.status}</span></div>
                  <div className="mt-4 text-sm text-gray-700">Notes: {selected.note || "-"}</div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
