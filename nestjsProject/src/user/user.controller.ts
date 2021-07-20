import { Body, Controller, Get, Post, UseGuards, UseInterceptors, UploadedFile, Put, Param, Query, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');

class addUserDto {
  @ApiProperty({ description: '账号',example:'用户账号' })
  account: string
  @ApiProperty({ description: '密码',example:'用户密码' })
  password: string
}
// UserGuards()传入@nest/passport下的AuthGuard
// @UseGuards(AuthGuard())
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) { }
  // @UseGuards(AuthGuard())
  @Get('list')
  @ApiOperation({summary:'获取所有用户'})
  findAll(@Query() query): Promise<Object> {
    return this.userService.findAll(query);
  }

  @Delete('delUser')
  @ApiOperation({summary:'删除用户'})
  delUser(@Query() query):Promise<String> {
    return this.userService.delUser(query);
  }

  @Post('add')
  @ApiOperation({summary:'用户注册'})
  addUser(@Body() userObj: addUserDto): Promise<String> {
    return this.userService.addUser(userObj);
  }

  @Post('login')
  @ApiOperation({summary:'用户登录'})
  login(@Body() userObj: addUserDto): Promise<Object> {
    return this.userService.login(userObj);
  }

  @Post('upload/:id')
  @ApiOperation({summary:'上传头像'})
  @UseInterceptors(FileInterceptor('file',{
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, '../static/userAvatar');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async upload(@UploadedFile() file,@Param() params): Promise<Object> {
    return this.userService.upload(file,params);
  }

  @Put('setName')
  @ApiOperation({summary:'修改用户名称'})
  setName(@Body() userInfo): Promise<Object> {
    return this.userService.setName(userInfo);
  }

  @Put('setEmail')
  @ApiOperation({summary:'修改用户邮箱'})
  setEmail(@Body() userInfo): Promise<Object> {
    return this.userService.setEmail(userInfo);
  }

  @Put('setPassword')
  @ApiOperation({summary:'修改用户密码'})
  setPassword(@Body() userInfo): Promise<Object> {
    return this.userService.setPassword(userInfo);
  }

  @Get('getEmail')
  @ApiOperation({summary:'验证用户邮箱'})
  getEmail(@Query() query): Promise<Object> {
    return this.userService.getEmail(query);
  }

  @Put('setNewPassword')
  @ApiOperation({summary:'设置新用户密码'})
  setNewPassword(@Body() userInfo): Promise<Object> {
    return this.userService.setNewPassword(userInfo);
  }

  @Post('comment')
  @ApiOperation({summary:'用户评论'})
  comment(@Body() commentObj): Promise<Object> {
    return this.userService.comment(commentObj);
  }

  @Get('getComment')
  @ApiOperation({summary:'获取用户评论'})
  getComment(@Query() query): Promise<Object> {
    return this.userService.getComment(query);
  }

  @Delete('delComment')
  @ApiOperation({summary:'删除评论'})
  delComment(@Query() query):Promise<String> {
    return this.userService.delComment(query);
  }

  @Post('addFeedback')
  @ApiOperation({summary:'新增用户反馈'})
  addFeedback(@Body() feedbackObj): Promise<Object> {
    return this.userService.addFeedback(feedbackObj);
  }

  @Get('getFeedback')
  @ApiOperation({summary:'获取用户反馈'})
  getFeedback(@Query() query): Promise<Object> {
    return this.userService.getFeedback(query);
  }

  @Delete('delFeedback')
  @ApiOperation({summary:'删除问题反馈'})
  delOne(@Query() query):Promise<String> {
    return this.userService.delFeedback(query);
  }

  @Put('updateFeedback')
  @ApiOperation({summary:'问题反馈回复'})
  updateFeedback(@Body() info): Promise<Object> {
    return this.userService.updateFeedback(info);
  }

  @Put('setLike')
  @ApiOperation({summary:'点赞作品'})
  setLike(@Query() query): Promise<String> {
    return this.userService.setLike(query);
  }
}
