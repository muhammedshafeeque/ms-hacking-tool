import express from "express";
import cors from "cors";
import { connectDb } from "./Config/db.js";
import router from "./Routes/index.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDb();
app.use("/api/", router);
app.use((err, req, res, next) => {
  console.log(err)
  if (err.name === "UnauthorizedError") {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
  const errStatus = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
  });
});
app.listen(5000, () => {
  console.log("Server running on PORT: 5000");
});
