import { connect } from "mongoose";

export const connectToDataBase = async () => {
  await connect("end mongoose url aa bichne");
  console.log("Connected mongodb database");
};
