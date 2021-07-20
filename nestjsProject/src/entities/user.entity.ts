import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  // 创建自动生成的列 @PrimaryGeneratedColumn
  @PrimaryGeneratedColumn({ comment:'主键id' })
  id: number;

  @Column({type:'varchar',comment:'昵称',nullable: true,})
  name: string;

  @Column({type:'varchar',comment:'账号'})
  account: string;

  @Column({type:'varchar',comment:'密码'})
  password: string;

  @Column({type:'varchar',comment:'头像',nullable: true,})
  avatar: string;

  @Column({type:'varchar',comment:'邮箱',nullable: true,})
  email: string;

  @Column({type:'varchar',comment:'点赞的作品',nullable: true,})
  likeCookbooks: string;

  @Column({type:'timestamp',default: () => 'current_timestamp',comment:'创建时间'})
  createDate: string

  @Column({type:'timestamp',onUpdate: 'current_timestamp',default: () => 'current_timestamp',comment:'更新时间'})
  updateDate: string
}
