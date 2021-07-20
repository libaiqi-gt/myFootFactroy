import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('comment')
export class commentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'菜谱id'})
  cookbookId: string;

  @Column({type:'varchar',comment:'用户id'})
  userId: string;

  @Column({type:'varchar',comment:'评论内容'})
  content: boolean;

  @Column({type:'int',comment:'点赞量',default:0})
  likeNum: number;

  @CreateDateColumn({comment:'创建日期'})
  createDate: string

}