import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { ArticlesService } from './articles.service';
import { DeleteArticleDto, NewArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('admin/articles')
export class ArticlesController {

  constructor(private articleService: ArticlesService){}
  @Post('add')
  addArticles( @GetUser('adminEmail') adminEmail: string, @Body() dto: NewArticleDto){
    return this.articleService.addArticles(adminEmail,dto);
  }

  @Patch('update')
  updateArticles(@GetUser('adminEmail') adminEmail: string,  @Body() dto: UpdateArticleDto){
    return this.articleService.updateArticles(adminEmail,dto); 
  }

  @Get('search')
  searchArticles(@Body() dto: SearchArticleDto){
    return this.articleService.searchArticles(dto);
  }

  @Delete('delete')
  deleteArticles(@GetUser() user: any, @Body() dto: DeleteArticleDto){
    const { adminEmail, rootUser } = user; 
    return this.articleService.deleteArticles(adminEmail,dto);
  }

}
