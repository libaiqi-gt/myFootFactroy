import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { cookbookEntity } from "src/entities/cookbook.entity";
import { Repository, EntityManager, Between, Like } from "typeorm";
import { materialEntity } from "src/entities/material.entity";
import { makeStepEntity } from "src/entities/makeStep.entity";
import { cookbookSortEntity } from "src/entities/cookbookSort.entity";
import { UserEntity } from "src/entities/user.entity";
import { detailSortEntity } from "src/entities/detailSort.entity";

@Injectable()
export class CookBookService {
  constructor(
    @InjectRepository(cookbookEntity)
    private readonly cookbookRepository: Repository<cookbookEntity>,

  ) { }

  // 新增菜谱
  async addCookbook(cookbookObj): Promise<Object> {
    let cookbookList = await this.cookbookRepository.save(cookbookObj);
    for(let i = 0; i<cookbookObj.material.length; i++){
      let material = new materialEntity();
      material.materialName = cookbookObj.material[i].materialName;
      material.weight = cookbookObj.material[i].weight;
      material.cookbook = cookbookList.id;
      await materialEntity.save(material);
    };
    for(let i = 0; i<cookbookObj.makeStep.length; i++){
      let makeStep = new makeStepEntity();
      makeStep.stepNum = cookbookObj.makeStep[i].stepNum;
      makeStep.content = cookbookObj.makeStep[i].content;
      makeStep.stepUrl = cookbookObj.makeStep[i].stepUrl;
      makeStep.cookbook = cookbookList.id;
      await makeStepEntity.save(makeStep);
    }
    if (cookbookList) {
      return '新增菜谱成功';
    } else {
      return '新增菜谱失败'
    }
  };

  // 新增菜谱详细分类
  async addSort(sortObj): Promise<Object> {
    console.log(sortObj);
    let sortList = await detailSortEntity.save(sortObj);
    if (sortList) {
      return '新增成功';
    } else {
      return '新增失败'
    }
  }

  // 获取所有菜谱
  async findAll(query): Promise<Object> {
    // return await this.cookbookRepository.query('select * from cookbook');
    let list = await this.cookbookRepository.findAndCount({
      order:{
        createDate: "DESC"
      },
      relations:['material'],
      skip: (query.page - 1) * query.limit,
      take: query.limit
    });
    return {
      cookbookList: list[0],
      totle: list[1]
    };
  };

  // 获取单个菜谱
  async findOne(query): Promise<cookbookEntity> {
    let list = await this.cookbookRepository.findOne({id:query.cookbookId},{relations:['material','makeStep']});
    let user = await UserEntity.findOne({id:Number(list.authorId)});
    if(query.userId){
      let userLike = (await UserEntity.findOne({id:Number(query.userId)})).likeCookbooks;
      let isLike = userLike ? userLike.split(",").indexOf(query.cookbookId) : -1;
      if(isLike === -1){
        list['isLike'] = false;
      }else{
        list['isLike'] = true;
      };
    }
    list['userAvatar'] = user.avatar;
    list.makeStep.sort((a,b) => {
      return a.stepNum - b.stepNum;
    });
    return list;
  };

  // 删除单个菜谱
  async delOne(query): Promise<String> {
    await materialEntity.delete({cookbook:query.cookbookId});
    await makeStepEntity.delete({cookbook:query.cookbookId});
    await this.cookbookRepository.delete({id:query.cookbookId});
    return '删除成功！';
  };

  // 获取食材分类
  async getAllCookbookSort(): Promise<cookbookSortEntity[]> {
    return await cookbookSortEntity.find();
  };

  // 获取所有的食材分类(包含详情)
  async getDetailsSort(): Promise<cookbookSortEntity[]> {
    return await cookbookSortEntity.find({relations:['detailSort']});
  };

  // 删除详细分类
  async delSort(query):Promise<String> {
    let sort = await detailSortEntity.delete({id: query.id});
    if(sort){
      return 'success'
    }
  }

  // 获取所有的食材详细分类(分页)
  async getDetailsSortPage(query): Promise<Object> {
    let sortList = await detailSortEntity.findAndCount({
      relations:['cookbookSort'],
      order:{
        cookbookSort: "ASC",
        createDate: "DESC"
      },
      skip: (query.page - 1) * query.limit,
      take: query.limit
    });
    if(sortList){
      return {
        sortList: sortList[0],
        total: sortList[1]
      }
    }
  };

  // 根据食材大类获取食材小类
  async getSmallSort(query): Promise<Object> {
    return await detailSortEntity.find({
      where:{cookbookSort:query.largeClassId}
    })
  };

  // 获取菜谱(新秀、每日推荐、流行)
  async getCookbook(query): Promise<Object> {
    switch(String(query.cookbookType)){
      case 'new':
        let nowdate = new Date();
        let oneweekdate = new Date(Number(nowdate) - 7*24*3600*1000);
        // 最近一周的为新秀菜谱
        var list =  await this.cookbookRepository.findAndCount({
          where: {
            createDate: Between(oneweekdate,nowdate)
          },
          order:{
            createDate: "DESC"
          },
          relations:['material'],
          skip: (query.page - 1) * query.limit,
          take: query.limit
        });
        return {
          cookbookList: list[0],
          totle: list[1]
        };
      case 'recommend':
        var list =  await this.cookbookRepository.findAndCount({
          where:{isRecommend:1},
          order:{
            createDate: "DESC"
          },
          relations:['material'],
          skip: (query.page - 1) * query.limit,
          take: query.limit
        });
        return {
          cookbookList: list[0],
          totle: list[1]
        };
      case 'popular':
        var list =  await this.cookbookRepository.findAndCount({
          where:{isPopular:1},
          relations:['material'],
          order:{
            createDate: "DESC"
          },
          skip: (query.page - 1) * query.limit,
          take: query.limit
        });
        return {
          cookbookList: list[0],
          totle: list[1]
        };
      default:
        return {};
    }
  };
  async getSortCookbook(query): Promise<Object>{
    if(query.largeClassId){
      let list = await this.cookbookRepository.findAndCount({
        where:{largeClass:query.largeClassId},
        order:{
          createDate: "DESC"
        },
        relations:['material'],
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
      return {
        cookbookList: list[0],
        totle: list[1]
      };
    }else{
      let list = await this.cookbookRepository.findAndCount({
        where:{smallClass: Like(`%${query.smallClassId}%`)},
        order:{
          createDate: "DESC"
        },
        relations:['material'],
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
      return {
        cookbookList: list[0],
        totle: list[1]
      };
    }
  };
  // 搜索菜谱
  async searchCookbook(query): Promise<Object>{
    let list = await this.cookbookRepository.findAndCount({
      where:{title:Like(`%${query.title}%`)},
      order:{
        createDate: "DESC"
      },
      relations:['material'],
      skip: (query.page - 1) * query.limit,
      take: query.limit
    });
    return {
      cookbookList: list[0],
      totle: list[1]
    };
  };
  async getSeasonOrHot(query): Promise<Object>{
    let list;
    if(query.type === 'season'){
      list = await detailSortEntity.findAndCount({
        where:{
          season: 1
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
    } else if(query.type === 'hot'){
      list = await detailSortEntity.findAndCount({
        where:{
          isHot: 1
        },
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
    }
    return {
      foodList: list[0],
      totle: list[1]
    }
  }

  async getUserCookbook(query,params): Promise<Object>{
    let list = await this.cookbookRepository.findAndCount({
      where:{authorId:params.id},
      relations:['material'],
      skip: (query.page - 1) * query.limit,
      take: query.limit
    });
    return {
      cookbookList: list[0],
      totle: list[1]
    };
  }
}
