import {  getManager } from "typeorm";
import { Request, Response } from "express";
import { UserRepository } from "../../database/user/repository/user.repository";

export class AuthenticationController {
  static async signUp(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserRepository);
    await connectionManager.signUp(req, res);
  }

  static async getUsers(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserRepository);
    await connectionManager.getUsers(req, res);
  }

  static async login(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserRepository);
    await connectionManager.login(req, res);
  }

  static async decodeUseData(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserRepository);
    await connectionManager.decodeUseData(req, res);
  }

  static async changePassword(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(UserRepository);
    await connectionManager.changePassword(req, res);
  }
}
