import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("userinfo")
export class UserInfoEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({
    nullable: true,
    unique: false,
  })
  user_address!: string;

  @Column({
    nullable: true,
    unique: false,
  })
  user_phone_no!: string;

  @OneToOne(() => UserEntity , (user) => user.info , {
    cascade:["update"],
    createForeignKeyConstraints : false
  })
  @JoinColumn()
  user! : UserEntity

}

