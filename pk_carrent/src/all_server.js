import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import loginRouter from "./login_back.js";
import login_home_baceRouter from "./login_home_back.js";
import registerRouter from "./regis_back.js";
import userRouter from "./User_nav_callname.js";
import user_infoRouter from "./profile_back.js";
import bookingCarListRouter from "./booking_carlist.js"; 
import car_detailsRouter from "./rentcar_detail.js";
import user_rent_carsRouter from "./user_rent_cars.js"; 
import history_rentRouter from "./history_rent.js";

const app = express();
const port = 3001;

app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true,
}));

app.use(bodyParser.json());

// ติดตั้ง router ต่าง ๆ
app.use("/login", loginRouter);
app.use("/login_car_list", login_home_baceRouter);
app.use("/register", registerRouter);
app.use("/nav_username", userRouter);
app.use("/user", user_infoRouter);
app.use("/car_list", bookingCarListRouter);
app.use("/car_details", car_detailsRouter);
app.use("/user_rent_cars", user_rent_carsRouter);
app.use("/history_carrent", history_rentRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
