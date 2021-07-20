import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import { detailSortEntity } from "./detailSort.entity";

@Entity('cookbookSort')
export class cookbookSortEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'分类名'})
  name: string;

  @Column({type:'varchar',comment:'分类图标'})
  imgUrl: string;

  @OneToMany(() => detailSortEntity, detailSort => detailSort.cookbookSort)
  detailSort: detailSortEntity[];

  @CreateDateColumn({comment:'创建日期'})
  createDate: string

}

