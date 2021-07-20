import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import e from 'express';
import { commentEntity } from 'src/entities/comment.entity';
import { async } from 'rxjs';
import { feedbackEntity } from 'src/entities/feedback.entity';
import { cookbookEntity } from 'src/entities/cookbook.entity';

@Injectable()
export class UserService {
  // 使用InjectRepository装饰器并引入Repository这样就可以使用typeorm的操作了
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }
  // 获取所有用户数据列表(userRepository.query()方法属于typeoram)
  async findAll(query): Promise<Object> {
    let userList = await this.userRepository.findAndCount({
      skip: (query.page - 1) * query.limit,
      take: query.limit
    });
    return {
      userList: userList[0],
      total: userList[1]
    }
  }

  // 插入一条数据
  async addUser(obj): Promise<String> {
    let isRegister = await this.userRepository.findOne({ account: obj.account});
    if (isRegister) {
      return '用户已存在';
    } else {
      let list = await this.userRepository.insert(obj);
      if (list) {
        return '注册成功!';
      } else {
        return '注册失败！';
      }
    }
  }
  // 登录
  async login(obj): Promise<Object> {
    let userData = await this.userRepository.findOne({ account: obj.account });
    if (userData) {
      if (userData.password === obj.password) {
        return {
          message: '登录成功',
          user: userData
        };
      } else {
        return '密码错误';
      }
    } else {
      return '用户不存在';
    }
  }

  async findOneByName(account) {
    return await this.userRepository.createQueryBuilder('u')
        .leftJoinAndSelect('u.roles', 'r')
        .where('u.account = :account', {account})
        .getOne();
  }

  async findOneByToken(token){
    // 假定token为geekjc
    // if (token === 'geekjc')
    //   return this.findAll();
    // else
    //   return null;
  }

  // 上传头像
  async upload(file,params){
    let user = await this.userRepository.findOne({id: params.id});
    user.avatar = `/static/userAvatar/${file.filename}`;
    let newUser = await this.userRepository.update(params.id, user);
    if(newUser){
      return {
        message: 'success',
        userInfo: user,
        file
      }
    } else {
      return {
        message: 'err'
      }
    }
  }

  async setName(userInfo){
    let user = await this.userRepository.findOne({id: userInfo.userId});
    let isOne = await this.userRepository.findOne({name: userInfo.userName});
    if(isOne) return '昵称已存在';
    user.name = userInfo.userName;
    let newUser = await this.userRepository.update(userInfo.userId, user);
    if(newUser){
      return {
        message: 'success',
        userInfo: user
      }
    }else{
      return {
        message: 'err'
      }
    }
  }

  async setEmail(userInfo){
    let user = await this.userRepository.findOne({id: userInfo.userId});
    let isOne = await this.userRepository.findOne({email: userInfo.email});
    if(isOne) return '该邮箱已被绑定！';
    user.email = userInfo.email;
    let newUser = await this.userRepository.update(userInfo.userId, user);
    if(newUser){
      return {
        message: 'success',
        userInfo: user
      }
    }else{
      return {
        message: 'err'
      }
    }
  }

  async setPassword(userInfo){
    let user = await this.userRepository.findOne({id: userInfo.userId});
    if(userInfo.password !== user.password) return '原密码错误！';
    user.password = userInfo.newPassword;
    let newUser = await this.userRepository.update(userInfo.userId, user);
    if(newUser){
      return {
        message: 'success'
      }
    }else{
      return {
        message: 'err'
      }
    }
  }

  // 验证用户邮箱
  async getEmail(query){
    let user = await this.userRepository.findOne({account:query.user});
    if(user){
      if(user.email === query.email){
        return {
          message: 'success'
        };
      }else{
        return {message: 'error',tip: '邮箱错误'};
      }
    }else{
      return {
        message: 'error',
        tip: '用户不存在'
      };
    }
  }

  // 设置新密码
  async setNewPassword(userInfo){
    let user = await this.userRepository.findOne({account:userInfo.user});
    user.password = userInfo.password;
    let newUser = await this.userRepository.update(user.id, user);
    if(newUser){
      return {
        message: 'success'
      }
    }else{
      return {
        message: 'err'
      }
    }
  }

  // 用户评论
  async comment(commentObj){
    let addComment = await commentEntity.save(commentObj);
    if(addComment){
      return {message: '评论成功！'};
    }else{
      return {message: '评论失败！'};
    }
  }

  // 删除评论
  async delComment(query): Promise<String> {
    let feedback = await commentEntity.delete({id: query.id});
    if(feedback){
      return 'success';
    };
  };

  // 获取用户评论
  async getComment(query){
    let commentList = await commentEntity.findAndCount({
      where: {cookbookId: query.cookbookId},
      order:{
        createDate: "DESC"
      }
    });
    let list = commentList[0];
    if(list){
      for(let i = 0;i<list.length;i++){
        let user = await this.userRepository.findOne({id: Number(list[i].userId)});
        list[i]['userAvatar'] = user.avatar || '';
        list[i]['userName'] = user.name || user.account;
      }
    };
    return {
      commentList: list,
      totle: commentList[1]
    };
  }

  // 新增用户反馈
  async addFeedback(feedbackObj){
    let addFeedback = await feedbackEntity.save(feedbackObj);
    if(addFeedback){
      return {message: 'success'};
    }else{
      return {message: 'error'};
    }
  }

  // 获取用户反馈
  async getFeedback(query){
    if(query.userId === '1'){
      var feedbackList = await feedbackEntity.findAndCount({
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
    }else{
      var feedbackList = await feedbackEntity.findAndCount({
        where:{userId: query.userId},
        skip: (query.page - 1) * query.limit,
        take: query.limit
      });
    }
    for(let i = 0;i<feedbackList[0].length;i++){
      let user = await this.userRepository.findOne({id: Number(feedbackList[0][i].userId)});
      feedbackList[0][i]['userName'] = user.name || user.account;
    }
    return {
      feedbackList: feedbackList[0],
      total: feedbackList[1]
    }
  }

  // 删除单个用户反馈
  async delFeedback(query): Promise<String> {
    let feedback = await feedbackEntity.delete({id: query.id});
    if(feedback){
      return 'success';
    };
  };

  // 删除用户
  async delUser(query):Promise<String> {
    let user = await this.userRepository.delete({id: query.id});
    if(user){
      return 'success';
    };
  }

  // 回答反馈信息
  async updateFeedback(info): Promise<Object> {
    let feedback = await feedbackEntity.findOne({id:info.id});
    feedback.state = '1';
    feedback.answer = info.answer;
    let newFeedback = await feedbackEntity.update(info.id,feedback);
    if(newFeedback){
      return {message: 'success'};
    }else{
      return {message: 'error'};
    }
  }

  // 点赞作品(点赞或取消)
  async setLike(query): Promise<String>{
    let user = await this.userRepository.findOne({id:query.userId});
    let cookbook = await cookbookEntity.findOne({id:query.cookbookId});
    let newUser;
    // 设置点赞作品
    if(query.state === '1'){
      if(user.likeCookbooks){
        let likeList = user.likeCookbooks.split(",");
        likeList.push(query.cookbookId);
        user.likeCookbooks = likeList.join();
      }else{
        user.likeCookbooks = query.cookbookId;
      };
      newUser =  await this.userRepository.update(query.userId,user);
      await cookbookEntity.update(query.cookbookId,{likeNum:cookbook.likeNum+1 });
    } else { // 取消点赞
      let likeList = user.likeCookbooks.split(',');
      likeList.splice(likeList.indexOf(String(query.cookbookId)),1);
      user.likeCookbooks = likeList.length === 0 ? '' : likeList.join();
      newUser =  await this.userRepository.update(query.userId,user);
      await cookbookEntity.update(query.cookbookId,{likeNum:cookbook.likeNum-1 });
    };
    if(newUser){
      return 'success';
    }else{
      return 'error'
    };
  }
}
