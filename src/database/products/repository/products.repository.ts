import { EntityRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductsEntity } from "../entity/products.entity";

dotenv.config();
@EntityRepository(ProductsEntity)
export class ProductsRepository extends Repository<ProductsEntity> {
  // ? Add Products
  async addProducts(req: Request, res: Response) {
    let {
      product_name,
      product_description,
      product_price,
      product_category,
      product_image,
    } = req.body;

    await this.createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values({
        product_name: product_name,
        product_description: product_description,
        product_price: product_price,
        product_category: product_category,
        product_image: product_image,
      })
      .execute()
      .catch((error: any) => {
        if (error) {
          return res.send({
            added: false,
            data: error,
          });
        }
      })
      .then((product_data: any) => {
        return res.send({
          added: true,
          data: product_data,
        });
      });
  }

  //? Get All Products
  async showProducts(req: Request, res: Response) {
    let products = await this.createQueryBuilder().select().getMany();

    if (products != null) {
      if (products.length === 0) {
        return res.send({
          filled: false,
          received: true,
          data: null,
        });
      } else {
        return res.send({
          filled: true,
          received: true,
          data: products,
        });
      }
    } else {
      return res.send({
        filled: false,
        received: false,
        data: null,
      });
    }
  }

  //? Loading Products Detail
  async loadProductDetails(req: Request, res: Response) {
    let { productId } = req.params;

    try {
      let productDetail = await this.createQueryBuilder()
        .select()
        .where("product_id = :productId", { productId: productId })
        .getOne();

      if (productDetail !== undefined) {
        return res.send({
          available: true,
          received: true,
          data: productDetail,
        });
      } else {
        return res.send({
          received: true,
          available: false,
          data: null,
        });
      }
    } catch (error) {
      return res.send({
        received: false,
        data: error,
      });
    }
  }

  //? Delete Product
  async deleteProduct(req: Request, res: Response) {
    let { productId } = req.params;
    let adminSecret = req.headers.authorization as string;

    if (adminSecret === "ScarvsAdminObv") {
      await this.createQueryBuilder()
        .delete()
        .where("product_id = :productId", { productId: productId })
        .execute()
        .then((data: any) => {
          return res.send({
            deleted: true,
            data: data,
          });
        })
        .catch((error: any) => {
          return res.send({
            deleted: false,
            data: error,
          });
        });
    } else {
      return res.send({
        deleted: false,
        data: "Wrong Auth Token",
      });
    }
  }

  async searchProduct(req: Request, res: Response) {
    let { productName } = req.params;
    try {
      let productDetail = await this.createQueryBuilder()
        .select()
        .where("product_name like :productName", { productName:`%${productName}%` })
        .getMany();

      console.log(productDetail);
      

      if (productDetail !== undefined) {
        return res.send({
          available: true,
          received: true,
          data: productDetail,
        });
      } else {
        return res.send({
          received: true,
          available: false,
          data: null,
        });
      }
    } catch (error) {
      return res.send({
        received: false,
        data: error,
      });
    }
  }
}
