import { Router } from "express";

import { CreateOrderController, getOrdersAndOneOrder } from "../controllers/order";

const BookingRouter = Router()

BookingRouter
    .post("/order", CreateOrderController)
    .get("/order/company/:id", getOrdersAndOneOrder)
    .get("/order/user/:id", getOrdersAndOneOrder)
    .get("/order/employee/:id", getOrdersAndOneOrder)
    .get("/order/:id", getOrdersAndOneOrder)
    .put("/order/:id",)
    .delete("/order/:id",)

export default BookingRouter