import { Router } from "express";

import { CreateOrderController, getOrdersByUCompany, getOrdersByEmployee, getOrdersByUser, } from "../controllers/order";
import { getOrdersAndOrder } from "../controllers/order/getAllOrOneOrder";
import { getUsers } from "../controllers/user/get-users";

const BookingRouter = Router()

BookingRouter
    .post("/order", CreateOrderController)
    .get("/order", getOrdersAndOrder)
    .get("/order/:id", getOrdersAndOrder)
    .get("/order/company/:id", getOrdersByUCompany)
    .get("/order/user/:id", getOrdersByUser)
    .get("/order/employee/:id", getOrdersByEmployee)
    .put("/order/:id",)
    .delete("/order/:id",)

export default BookingRouter