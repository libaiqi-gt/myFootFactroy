import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { cookbookEntity } from "./cookbook.entity";

@Entity('material')
export class materialEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'用料名'})
  materialName: string;

  @Column({type:'varchar',comment:'用料重量'})
  weight: string;

  @ManyToOne(() => cookbookEntity, cookbook => cookbook.material)
  cookbook: cookbookEntity[];
}