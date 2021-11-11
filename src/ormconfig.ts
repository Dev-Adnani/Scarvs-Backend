import { join } from "path";
import { ConnectionOptions } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "./database/user/entity/user.entity";
import { UserInfoEntity } from "./database/userinfo/entity/userinfo.entity";
import { CartEntity } from "./database/cart/entity/cart.entity";
import { ProductsEntity } from "./database/products/entity/products.entity";

dotenv.config();
const connectionOptions: ConnectionOptions = {
  url : process.env.DATABASE_URL,
  ssl : {rejectUnauthorized:false},
  type: "postgres",
  host: process.env.host || "localhost",
  port: 5432,
  username: process.env.User || "postgres",
  password: process.env.Password || "123456",
  database: process.env.Database || "scarvs",
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  entities: [UserEntity,UserInfoEntity,CartEntity,ProductsEntity],
  dropSchema: false,
  migrationsRun: true,
  logger: "debug",
  migrations: [join(__dirname, "src/migrations/**/*.ts")],
};

export = connectionOptions;
