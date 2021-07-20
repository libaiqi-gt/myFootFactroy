import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, OneToMany } from 'typeorm';
import { materialEntity } from './material.entity'
import { makeStepEntity } from './makeStep.entity';

@Entity('cookbook')
export class cookbookEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type:'varchar',comment:'作者',nullable: true,})
  author: string;

  @Column({type:'varchar',comment:'作者id',nullable: true,})
  authorId: string;

  @Column({type:'varchar',comment:'菜谱标题'})
  title: string;

  @Column({type:'varchar',comment:'菜谱概述'})
  summary: string;

  @Column({type:'varchar',comment:'菜谱封面'})
  coverUrl: string;

  @Column({type:'varchar',comment:'菜谱视频',nullable: true,})
  videoUrl: string;

  @OneToMany(() => materialEntity, material => material.cookbook)
  material: materialEntity[];

  @OneToMany(() => makeStepEntity, makeStep => makeStep.cookbook)
  makeStep: makeStepEntity[];

  @Column({type:'int',comment:'点赞量',default:0})
  likeNum: number;

  @Column({type:'int',comment:'被收藏量',default:0})
  collectNum: number;

  @Column({type:'int',comment:'是否流行，0为不流行，1为流行',default:0})
  isPopular: number;

  @Column({type:'int',comment:'是否推荐，0为不推荐，1为推荐',default:1})
  isRecommend: number;

  @Column({type:'int',comment:'菜谱大类'})
  largeClass: number;

  @Column({type:'varchar',comment:'菜谱小类'})
  smallClass: string;

  @CreateDateColumn({comment:'创建日期'})
  createDate: string
}
