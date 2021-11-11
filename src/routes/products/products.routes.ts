import { Router } from "express";
import { ProductsController } from "../../controller/products/products.controller";

const productRouter = Router();

//? @Post
productRouter.post("/add-products", ProductsController.addProducts);

//? @Delete
productRouter.delete("/delete/:productId", ProductsController.deleteProduct);

//? @Get
productRouter.get("/", ProductsController.showProducts);
productRouter.get("/details/:productId", ProductsController.loadProductDetails);


export { productRouter };
