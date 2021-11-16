import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { CartEntity } from "../entity/cart.entity";
import { UserRepository } from "../../user/repository/user.repository";

dotenv.config();
@EntityRepository(CartEntity)
export class CartRepository extends Repository<CartEntity> {
  //? Add To Cart :)
  async addToCart(req: Request, res: Response) {
    let { useremail, product_price, product_name, product_category } = req.body;

    try {
      let userRepo = getCustomRepository(UserRepository);
      let user = await userRepo.findOne({ useremail: useremail });

      if (user) {
        let cartItem = new CartEntity();
        cartItem.user = user;
        cartItem.product_name = product_name;
        cartItem.product_category = product_category;
        cartItem.product_price = product_price;

        await cartItem.save();

        return res.send({
          added: true,
          data: "Added To Cart",
        });
      } else {
        return res.send({
          added: false,
          data: "There Is No User Corresponding To This Email",
        });
      }
    } catch (error) {
      return res.send({
        added: false,
        data: "Something Went Wrong",
      });
    }
  }

  async getCartProducts(req: Request, res: Response) {
    let { useremail } = req.params;

    try {
      let userRepo = getCustomRepository(UserRepository);
      let user = await userRepo.findOne({ useremail: useremail });

      if (user) {
        let cartData = await this.createQueryBuilder("cart")
          .select()
          .leftJoin("cart.user", "user")
          .where("user.id = :id", { id: user?.id })
          .getMany();

        if (cartData !== undefined) {
          if (cartData.length === 0) {
            return res.send({
              filled: false,
              received: true,
              data: null,
            });
          } else {
            return res.send({
              filled: true,
              received: true,
              data: cartData,
            });
          }
        } else {
          return res.send({
            filled: false,
            received: false,
            data: null,
          });
        }
      } else {
        return res.send({
          added: false,
          data: "There Is No User Corresponding To This Email",
        });
      }
    } catch (error) {
      return res.send({
        filled: false,
        received: false,
        data: error,
      });
    }
  }

  async deleteCartData(req: Request, res: Response) {
    let { productId } = req.params;

    await this.createQueryBuilder("cart")
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
  }
}
