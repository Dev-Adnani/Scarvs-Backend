import { Router } from "express";
import { CartController } from "../../controller/cart/cart.controller";
import { ProductsController } from "../../controller/products/products.controller";

const cartRouter = Router();

//? @Post
cartRouter.post("/add-to-cart", CartController.addToCart);

//? @Delete
cartRouter.delete("/delete/:productId", CartController.deleteCartData);

//? @Get
cartRouter.get("/:useremail", CartController.getCartItems);


export { cartRouter };
