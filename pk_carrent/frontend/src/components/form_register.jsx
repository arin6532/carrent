const register_form = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Create a New Account
                </h2>
                <form className="space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-neutral-600 text-white py-2 rounded-md hover:bg-neutral-700 transition-colors"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default register_form;