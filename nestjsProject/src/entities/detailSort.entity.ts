import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { cookbookSortEntity } from "./cookbookSort.entity";

@Entity('detailSort')
export class detailSortEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'详细分类名'})
  name: string;

  @Column({type:'varchar',comment:'',nullable: true})
  imgUrl: string;

  @Column({type:'boolean',comment:'是否为时令食材',default:false})
  season: boolean;

  @Column({type:'boolean',comment:'是否为热门食材',default:false})
  isHot: boolean;

  @ManyToOne(() => cookbookSortEntity, cookbookSort => cookbookSort.detailSort)
  cookbookSort: cookbookSortEntity[];

  @CreateDateColumn({comment:'创建日期'})
  createDate: string
}