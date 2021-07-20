import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { cookbookEntity } from "./cookbook.entity";

@Entity('makeStep')
export class makeStepEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'int',comment:'步骤顺序'})
  stepNum: number;

  @Column({type:'varchar',comment:'步骤内容'})
  content: string;

  @Column({type:'varchar',comment:'步骤图片路径'})
  stepUrl: string;

  @ManyToOne(() => cookbookEntity, cookbook => cookbook.makeStep)
  cookbook: cookbookEntity[];
}