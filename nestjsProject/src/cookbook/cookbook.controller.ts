import { Controller, Post, Body, Get, Query, Delete, UseInterceptors, UploadedFile, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { CookBookService } from "./cookbook.service";
import { cookbookEntity } from "src/entities/cookbook.entity";
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionManager, EntityManager } from "typeorm";
import { query } from "express";
import multer = require('multer');
import { cookbookSortEntity } from "src/entities/cookbookSort.entity";

@Controller('cookbook')
@ApiTags('菜谱')
export class CookBookController {
  constructor(private readonly cookbookService: CookBookService) { }

  @Post('add')
  @ApiOperation({summary:'新增菜谱'})
  addCookbook(@Body() cookbookObj): Promise<Object> {
    return this.cookbookService.addCookbook(cookbookObj);
  }

  @Get('getAllCookbook')
  @ApiOperation({summary:'获取所有菜单'})
  findAll(@Query() query): Promise<Object> {
    return this.cookbookService.findAll(query);
  }

  @Get('getOneCookbook')
  @ApiOperation({summary:'获取单个菜单'})
  findOne(@Query() query): Promise<cookbookEntity> {
    return this.cookbookService.findOne(query);
  }

  @Delete('delCookbook')
  @ApiOperation({summary:'删除菜单'})
  delOne(@Query() query):Promise<Object> {
    return this.cookbookService.delOne(query);
  }

  @Post('upload')
  @ApiOperation({summary:'上传文件'})
  @UseInterceptors(FileInterceptor('file',{
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, '../static');
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
    }),
  }))
  async upload(@UploadedFile() file) {
    return file;
  }

  @Get('getcookbookSort')
  @ApiOperation({summary:'获取菜谱分类'})
  getAllCookbookSort(): Promise<cookbookSortEntity[]> {
    return this.cookbookService.getAllCookbookSort();
  }

  @Get('getDetailsSort')
  @ApiOperation({summary:'获取所有详情菜谱分类'})
  getDetailsSort(): Promise<cookbookSortEntity[]> {
    return this.cookbookService.getDetailsSort();
  }

  @Get('getDetailsSortPage')
  @ApiOperation({summary:'获取所有详情菜谱分类(分页)'})
  getDetailsSortPage(@Query() query): Promise<Object> {
    return this.cookbookService.getDetailsSortPage(query);
  }

  @Get('getSmallSort')
  @ApiOperation({summary:'根据食材大类获取食材小类'})
  getSmallSort(@Query() query): Promise<Object> {
    return this.cookbookService.getSmallSort(query);
  }

  @Get('getCookbook')
  @ApiOperation({summary:'获取菜谱(新秀、推荐、流行)'})
  getCookbook(@Query() query): Promise<Object> {
    return this.cookbookService.getCookbook(query);
  }

  @Post('addSort')
  @ApiOperation({summary:'新增菜谱详细分类'})
  addSort(@Body() sortObj): Promise<Object> {
    return this.cookbookService.addSort(sortObj);
  }

  @Delete('delSort')
  @ApiOperation({summary:'删除详细分类'})
  delSort(@Query() query):Promise<String> {
    return this.cookbookService.delSort(query);
  }

  @Get('getSortCookbook')
  @ApiOperation({summary:'根据大类小类获取菜谱'})
  getSortCookbook(@Query() query): Promise<Object> {
    return this.cookbookService.getSortCookbook(query);
  }

  @Get('searchCookbook')
  @ApiOperation({summary:'根据菜谱名模糊查询'})
  searchCookbook(@Query() query): Promise<Object> {
    return this.cookbookService.searchCookbook(query);
  }

  @Get('getSeasonOrHot')
  @ApiOperation({summary:'获取时令食材或热门食材'})
  getSeasonOrHot(@Query() query): Promise<Object> {
    return this.cookbookService.getSeasonOrHot(query);
  }

  @Get('getUserCookbook/:id')
  @ApiOperation({summary:'根据用户id获取用户发布的菜谱'})
  getUserCookbook(@Query() query,@Param() params): Promise<Object> {
    return this.cookbookService.getUserCookbook(query,params);
  }
}
