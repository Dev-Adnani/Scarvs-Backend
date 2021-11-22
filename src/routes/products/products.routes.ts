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
productRouter.get("/search/:productName", ProductsController.searchProduct);
productRouter.get("/category/:productCategory", ProductsController.getProductByCategory);



export { productRouter };
