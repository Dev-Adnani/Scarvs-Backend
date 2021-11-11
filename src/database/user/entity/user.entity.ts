import { BaseEntity, Column, Entity, JoinColumn, PrimaryGeneratedColumn , OneToMany, OneToOne } from "typeorm";
import { CartEntity } from "../../cart/entity/cart.entity";
import { UserInfoEntity } from "../../userinfo/entity/userinfo.entity";

@Entity("users")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({
    nullable: true,
    unique: false,
  })
  username!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  useremail!: string;

  @Column({
    nullable: true,
    unique: false,
  })
  userpassword!: string;

  @OneToMany(() => CartEntity,(cart) => cart.user)
  @JoinColumn()
  item! : CartEntity[];

  @OneToOne(() => UserInfoEntity,(info) => info.user)
  info! : UserInfoEntity

}

