import {  getManager } from "typeorm";
import { Request, Response } from "express";
import { CartRepository } from "../../database/cart/repository/cart.repository";

export class CartController {
  static async addToCart(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(CartRepository);
    await connectionManager.addToCart(req, res);
  }

  static async getCartItems(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(CartRepository);
    await connectionManager.getCartProducts(req, res);
  }

  static async deleteCartData(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(CartRepository);
    await connectionManager.deleteCartData(req, res);
  }
}
