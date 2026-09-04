import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import productRoutes from "./src/routes/productRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ohra";

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "OHRA API",
    stores: ["gifts", "wears"]
  });
});

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log(`MongoDB connected: ${mongoose.connection.name} (${mongoose.connection.host})`);
    app.listen(port, () => {
      console.log(`OHRA backend running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
