import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { UserInfoEntity } from "../entity/userinfo.entity";
import { UserRepository } from "../../user/repository/user.repository";

dotenv.config();
@EntityRepository(UserInfoEntity)
export class UserInfoRepository extends Repository<UserInfoEntity> {
  // ? Add User Info
  async addUserInfo(req: Request, res: Response) {
    try {
      let { useremail, user_address, user_phone_no } = req.body;

      let userRepo = getCustomRepository(UserRepository);
      let user = await userRepo.findOne({ useremail: useremail });

      if (user) {
        let userInfo = new UserInfoEntity();
        userInfo.user_address = user_address;
        userInfo.user_phone_no = user_phone_no;
        userInfo.user = user!;

        await userInfo.save();

        return res.send({
          added: true,
          data: "User Info Added",
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
        data: error,
      });
    }
  }

  //? Get User Info
  async showUserInfo(req: Request, res: Response) {
    let { useremail } = req.params;

    let userRepo = getCustomRepository(UserRepository);
    let user = await userRepo.findOne({ useremail: useremail });

    try {
      if (user) {
        let userInfoData = await this.createQueryBuilder("info")
          .leftJoinAndSelect("info.user", "user")
          .where("info.id = :id", { id: user.id })
          .getOne();

        if (userInfoData === null || userInfoData === undefined) {
          return res.send({
            received: true,
            filled: false,
          });
        } else {
          return res.send({
            received: true,
            filled: true,
            data: userInfoData,
          });
        }
      } else {
        return res.send({
          received: false,
          filled: false,
        });
      }
    } catch (error) {
      return res.send({
        received: false,
        filled: false,
        data: error,
      });
    }
  }

  //? Update User Info
  async updateUserInfo(req: Request, res: Response) {
    let { infoId } = req.params;
    let { user_address, user_phone_no } = req.body;

    try {
      await this.createQueryBuilder("userinfo")
        .leftJoinAndSelect("userinfo.user", "user")
        .update(UserInfoEntity)
        .set({
          user_address: user_address,
          user_phone_no: user_phone_no,
        })
        .where("userinfo.id = :infoId", { infoId: infoId })
        .execute()
        .then((updatedData: any) => {
          return res.send({
            updated: true,
            data: updatedData,
          });
        })
        .catch((error: any) => {
          return res.send({
            updated: false,
            data: error,
          });
        });
    } catch (error) {
      return res.send({
        updated: false,
        data: error,
      });
    }
  }
}
