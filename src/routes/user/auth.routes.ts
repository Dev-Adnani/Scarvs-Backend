import { Router } from "express";
import { AuthenticationController } from "../../controller/user/authentication.controller";

const authRouter = Router();

//? @Post
authRouter.post("/signup", AuthenticationController.signUp);
authRouter.post("/login", AuthenticationController.login);
authRouter.post("/change-password", AuthenticationController.changePassword);


//? @Get
authRouter.get("/getUsers", AuthenticationController.getUsers);
authRouter.get("/verify", AuthenticationController.decodeUseData);


export { authRouter };
