import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class createPostDto {
  @ApiProperty({ description: '帖子标题',example:'帖子标题1' })
  title: string
  @ApiProperty({ description: '帖子内容',example:'帖子内容' })
  content: string
}


@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  @Get()
  @ApiOperation({summary:'显示博客列表'})
  index(){
    return [
      {id:1}
    ]
  }

  @Post()
  @ApiOperation({summary:'创建帖子'})
  create(@Body() body: createPostDto){
    body
    return {
      success:true
    }
  }

  @Get(':id')
  @ApiOperation({summary:'显示详情'})
  detail(@Param('id') id:string){
    return {
      id:1,
      title:'success'
    }
  }

  @Put(':id')
  @ApiOperation({summary:'编辑帖子'})
  updata(@Param('id') id:string, @Body() Body:createPostDto){
    return {
      success: true
    }
  }

  @Delete(':id')
  @ApiOperation({summary:'删除帖子'})
  remove(@Param('id') id:string){
    return {
      success: true
    }
  }
}
