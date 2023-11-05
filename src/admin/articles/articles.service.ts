import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteArticleDto, NewArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  // find category if doesnt exist create one and return  
  async findOrCreateCategory(category: string) {
    try {
      const res = await this.prisma.category.upsert({
        where: {
          categoryName: category
        },
        update: {},
        create: {
          categoryName: category,

        }
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  // find metatag if doesnt exist create one and return
  async findOrCreateMetatags(metatag: string) {
    try {
      const res = await this.prisma.metatag.upsert({
        where: {
          metatagName: metatag
        },
        update: {},
        create: {
          metatagName: metatag
        }
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  // find documents if doesnt exist create one and return
  async findOrCreateDocuments(document: string) {
    try {
      const res = await this.prisma.document.upsert({
        where: {
          documentPath: document
        },
        update: {},
        create:{
          documentPath: document,
        }
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  async addArticles(adminEmail: string, dto: NewArticleDto) {
    const { title, content, category, metatags, createdBy, documents } = dto;

  }

  updateArticles(adminEmail: string, dto: UpdateArticleDto) { }

  deleteArticles(adminEmail: string, dto: DeleteArticleDto) { }

  async searchArticles(dto: SearchArticleDto) {
    const { query } = dto;

    try {
      const res = await this.prisma.article.findMany({
        where: {
          content: {
            search: query,
          }
        }
      });

      return res;
    } catch (error) {
      throw error;
    }

  }
}
