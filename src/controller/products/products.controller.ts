import {  getManager } from "typeorm";
import { Request, Response } from "express";
import { ProductsRepository } from "../../database/products/repository/products.repository";

export class ProductsController {
  static async addProducts(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(ProductsRepository);
    await connectionManager.addProducts(req, res);
  }

  static async showProducts(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(ProductsRepository);
    await connectionManager.showProducts(req, res);
  }

  static async loadProductDetails(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(ProductsRepository);
    await connectionManager.loadProductDetails(req, res);
  }

  static async deleteProduct(req: Request, res: Response) {
    let connectionManager = getManager().getCustomRepository(ProductsRepository);
    await connectionManager.deleteProduct(req, res);
  }
}
