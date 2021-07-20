import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('feedback')
export class feedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'用户id'})
  userId: string;

  @Column({type:'int',comment:'问题类型'})
  type: number;

  @Column({type:'varchar',comment:'问题详情'})
  content: number;

  @Column({type:'varchar',comment:'问题处理状态',default: '0'})
  state: string;

  @Column({type:'varchar',comment:'处理结果',nullable: true})
  answer: string;

  @Column({type:'varchar',comment:'问题出现位置',nullable: true})
  imgUrl: string;

  @CreateDateColumn({comment:'创建日期'})
  createDate: string

}
