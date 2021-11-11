import {  getManager } from "typeorm";
import { Request, Response } from "express";
import { UserInfoRepository } from "../../database/userinfo/repository/userinfo.repository";

export class UserInfoController {
  static async addUserInfo(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserInfoRepository);
    await connectionManager.addUserInfo(req, res);
  }

  static async showUserInfo(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserInfoRepository);
    await connectionManager.showUserInfo(req, res);
  }

  static async updateUserInfo(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserInfoRepository);
    await connectionManager.updateUserInfo(req, res);
  }
 
}
