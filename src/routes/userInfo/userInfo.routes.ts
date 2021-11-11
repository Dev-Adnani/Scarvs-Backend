import { Router } from "express";
import { UserInfoController } from "../../controller/userinfo/userinfo.controller";

const userInfoRouter = Router();

//? @Post
userInfoRouter.post("/add-user-info", UserInfoController.addUserInfo);

//? @Get
userInfoRouter.get("/:useremail", UserInfoController.showUserInfo);

//? @Update
userInfoRouter.put("/update/:infoId", UserInfoController.updateUserInfo);



export { userInfoRouter };
