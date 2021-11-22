import { EntityRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserEntity } from "../entity/user.entity";

dotenv.config();
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  // ? Fetch All Users
  async getUsers(req: Request, res: Response) {
    let token = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;

    jwt.verify(token, jwt_secret, async (error: any, data: any) => {
      if (error) {
        return res.send({
          received: false,
          data: error,
        });
      } else {
        let data = await this.createQueryBuilder("users").select().getMany();

        if (data.length == 0) {
          return res.send({
            received: false,
            data: "There Are No Users In System",
          });
        } else {
          return res.send({
            received: true,
            data: data,
          });
        }
      }
    });
  }

  //? Login
  async login(req: Request, res: Response) {
    let { useremail, userpassword } = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let jwt_secret = process.env.JWT_SECRET as string;

    if (!isValidated) {
      //? If Email Is Not Valid!
      return res.send({
        authentication: false,
        data: "Email Address Badly Formatted",
      });
    } else {
      let emailExists =
        (await this.createQueryBuilder("users")
          .where("users.useremail = :input", { input: useremail })
          .getCount()) > 0;

      if (!emailExists) {
        return res.send({
          authentication: false,
          data: "There Is No User Corresponding To This Email",
        });
      } else {
        let findUserPasswordFromDB = await this.createQueryBuilder("users")
          .select("users.userpassword")
          .where("users.useremail = :input", { input: useremail })
          .getOne();

        let username = await this.createQueryBuilder("users")
          .select("users.username")
          .where("users.useremail = :input", { input: useremail })
          .getOne()          


        bcrypt.compare(
          userpassword,
          findUserPasswordFromDB?.userpassword as string,
          (error: any, isPasswordMatched: any) => {

            if (error) {
              return res.send({
                authentication: false,
                data: error,
              });
            }
            if (!isPasswordMatched) {
              return res.send({
                authentication: false,
                data: "Incorrect Password",
              });
            }
            if (isPasswordMatched) {
              jwt.sign(
                {
                  email: useremail,
                  username: username?.username,
                },
                jwt_secret,
                {
                  expiresIn: "2h",
                },
                async (error: any, authData: any) => {
                  if (error) {
                    return res.send({
                      authentication: false,
                      data: error,
                    });
                  } else {
                    return res.send({
                      authentication: true,
                      data: authData,
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  }

  // ? Add User
  async signUp(req: Request, res: Response) {
    let { username, useremail, userpassword } = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let jwt_secret = process.env.JWT_SECRET as string;

    if (!isValidated) {
      //? If Email Is Not Valid!
      return res.send({
        authentication: false,
        data: "Email Address Badly Formatted",
      });
    }

    let emailExists =
      (await this.createQueryBuilder("users")
        .where("users.useremail = :input", { input: useremail })
        .getCount()) > 0;

    if (emailExists) {
      return res.send({
        authentication: false,
        data: "Email Address Already Exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      //Uses HMAC For Encryption  #Salt
      await bcrypt.hash(
        userpassword,
        salt,
        async (error: any, hashedPassword: any) => {
          if (error) {
            return res.send({
              authentication: false,
              data: error,
            });
          } else {
            let user = new UserEntity();
            user.username = username;
            user.userpassword = hashedPassword;
            user.useremail = useremail;

            await this.save(user); //? Adding User To DB with Hashed Pass

            jwt.sign(
              {
                email: useremail,
                username : username
              },
              jwt_secret,
              {
                expiresIn: "2h",
              },
              async (error: any, data: any) => {
                if (error) {
                  return res.send({
                    authentication: false,
                    data: error,
                  });
                } else {
                  return res.send({
                    authentication: true,
                    data: data,
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  // ? Decoding JWT 👍
  async  decodeUseData(req:Request,res:Response)
  {
    let tokenData = req.headers.authorization as string;
    let jwt_secret = process.env.JWT_SECRET as string;

    jwt.verify(tokenData,jwt_secret, async (error:any,userData:any) =>
    {
      if (error) {
        return res.send({
          received: false,
          data: error,
        });
      } else {
        return res.send({
          received: true,
          data: userData,
        });
      }
    })

  }
}


//One To One  -> User | UserInfo => address + dob etc
//One To Many -> User | Cart => items({itemname,itmeprice})
//Many To One -> Cart | User => user.id