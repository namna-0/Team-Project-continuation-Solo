import { Router } from "express";

import {
  CreateOrderController,
  getOrdersByUCompany,
  getOrdersByEmployee,
  getOrdersByUser,
  deleteOrderController,
} from "../controllers/order";
import { getOrdersAndOrder } from "../controllers/order/getAllOrOneOrder";
import { CreateOrderByCompany } from "../controllers/order/create-order-by-company";

const BookingRouter = Router();

BookingRouter.post("/order", CreateOrderController)
  .get("/order", getOrdersAndOrder)
  .get("/order/:id", getOrdersAndOrder)
  .get("/order/company/:id", getOrdersByUCompany)
  .get("/order/user/:id", getOrdersByUser)
  .get("/order/employee/:id", getOrdersByEmployee)
  .put("/order/:id")
  .delete("/order/:id", deleteOrderController)
  .post("/order/company", CreateOrderByCompany);

export default BookingRouter;
