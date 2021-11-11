import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductsEntity extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  product_id !: number;

  @Column({
    nullable: true,
    unique: false,
  })
  product_name !: string;

  @Column({
    nullable: true,
    unique: false,
  })
  product_description !: string;

  @Column({ type: "bigint", nullable: false })
  product_price!: bigint;


  @Column({
    nullable: true,
    unique: false,
  })
  product_category !: string;

  @Column({
    nullable: true,
    unique: false,
  })
  product_image !: string;

}

