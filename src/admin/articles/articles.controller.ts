import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ArticlesService } from './articles.service';
import { DeleteArticleDto, NewArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('admin/articles')
export class ArticlesController {

  constructor(private articleService: ArticlesService){}
  @Post('add')
  addArticles( @GetUser('sub') adminID: string, @Body() dto: NewArticleDto){
    return this.articleService.addArticles(adminID,dto);
  }

  @Patch('update')
  updateArticles(@GetUser('sub') adminID: string,  @Body() dto: UpdateArticleDto){
    return this.articleService.updateArticles(adminID,dto); 
  }

  @Get('search')
  searchArticles(@Query('query') query: string){
    console.log("Query => ", query)
    return this.articleService.searchArticles({query});
  }

  @Delete('delete')
  deleteArticles(@GetUser() user: any, @Body() dto: DeleteArticleDto){
    const { adminEmail, rootUser } = user; 
    return this.articleService.deleteArticles(adminEmail,dto);
  }

  @Get('detail')
  getArticles(@GetUser() user: any, @Query('articleID') articleID: string){
    const {adminEmail} = user; 
    return this.articleService.getArticle(adminEmail,{articleID}); 
  }
}
