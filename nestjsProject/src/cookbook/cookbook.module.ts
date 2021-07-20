import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { cookbookEntity } from "src/entities/cookbook.entity";
import { CookBookController } from "./cookbook.controller";
import { CookBookService } from "./cookbook.service";

@Module({
  imports:[
    TypeOrmModule.forFeature([cookbookEntity]),
  ],
  controllers: [CookBookController],
  providers: [CookBookService],
  exports: [CookBookService]
})

export class CookBookModule {}