import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("cart")
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  product_id!: number;

  @Column({
    nullable: true,
    unique: false,
  })
  product_name!: string;

  @Column({ type: "bigint", nullable: false })
  product_price!: bigint;

  @Column({
    nullable: true,
    unique: false,
  })
  product_category!: string;

  @ManyToOne(() => UserEntity, (user) => user.item)
  user!: UserEntity;
}
