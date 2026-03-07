/* eslint-env node */
import express from "express";
import cors from "cors";

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
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

/* routes */
app.use("/login", loginRouter);
app.use("/login_car_list", login_home_baceRouter);
app.use("/register", registerRouter);
app.use("/nav_username", userRouter);
app.use("/user", user_infoRouter);
app.use("/car_list", bookingCarListRouter);
app.use("/car_details", car_detailsRouter);
app.use("/user_rent_cars", user_rent_carsRouter);
app.use("/history_carrent", history_rentRouter);

/* start server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});