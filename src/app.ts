import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";
import connectionOptions from "./ormconfig";
import { authRouter } from "./routes/user/auth.routes";
import { productRouter } from "./routes/products/products.routes";
import { cartRouter } from "./routes/cart/cart.routes";
import { userInfoRouter } from "./routes/userInfo/userInfo.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = process.env.PORT || 8080;

createConnection(connectionOptions)
  .then(async (connection) => {
    if (connection.isConnected) {
      console.log(`🐘  Is Connected`);
    }

    app.set("port", port);

    app.get("/", (req, res) => {
      res.send({
        data: "Scarvs API",
        woriking: true,
      });
    });

    //? Auth
    app.use("/auth", authRouter);

    //? Product
    app.use("/product", productRouter);

    //? Cart
    app.use("/cart", cartRouter);

    //? UserInfo
    app.use("/info", userInfoRouter);

    app.listen(app.get("port"), () => {
      console.log(`🖥️  Is Working Fine On Port ${app.get("port")}`);
    });
  })
  .catch((error: any) => {
    console.log(`😖 => ${error} `);
  });
