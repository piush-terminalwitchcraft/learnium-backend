import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteArticleDto, Document, NewArticleDto, SearchArticleDto, UpdateArticleDto } from './dto';

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
  async findOrCreateDocuments(document: Document) {
    try {
      // find if document exists 
      const res = await this.prisma.document.findMany({
        where: {
          documentPath: document.documentPath,
          documentName: document.documentName
        }
      });

      // if document doesnt exist create one and return
      if (res.length === 0) {
        const res = await this.prisma.document.create({
          data: {
            documentPath: document.documentPath,
            documentName: document.documentName
          }
        });

        return res;
      } else {
        return res[0];
      } 

    } catch (error) {
      throw error;
    }
  }

  async addArticles(adminID: string, dto: NewArticleDto) {
    const { title, content, category, metatags, documents } = dto;

    // get tuple of each category
    const categoryTuple = await Promise.all(category.map(async (category) => {
      return await this.findOrCreateCategory(category);
    }));

    // get tuple of each metatag
    const metatagTuple = await Promise.all(metatags.map(async (metatag) => {
      return await this.findOrCreateMetatags(metatag);
    }));

    // get tuple of each document
    const documentTuple = await Promise.all(documents.map(async (document) => {
      return await this.findOrCreateDocuments(document);
    }));

    // create article
    try {
      const res = await this.prisma.article.create({
        data: {
          title,
          content,
          admin: {
            connect: {
              adminID: adminID,
            }
          },
          category: {
            connect: categoryTuple
          },
          metatags: {
            connect: metatagTuple
          },
          documents: {
            connect: documentTuple
          }
        }
      });

      return res;
    } catch (error) {
      throw error;
    }

  }

  async updateArticles(adminID: string, dto: UpdateArticleDto) {

    const { articleID, content, category, metatags, documents } = dto;
    console.log(dto);
     // get tuple of each category
     const categoryTuple = await Promise.all(category.map(async (category) => {
      return await this.findOrCreateCategory(category);
    }));

    // get tuple of each metatag
    const metatagTuple = await Promise.all(metatags.map(async (metatag) => {
      return await this.findOrCreateMetatags(metatag);
    }));

    // get tuple of each document
    const documentTuple = await Promise.all(documents.map(async (document) => {
      return await this.findOrCreateDocuments(document);
    }));

    try {
      const res = this.prisma.article.update({
        where: {
          articleID
        },
        data: {
          content,
          category: {
            set: categoryTuple
          },
          metatags: {
            set: metatagTuple
          },
          documents: {
            set: documentTuple
          }
        }
      });

      return res;
    } catch (error) {
      throw error;
    }

  }

  deleteArticles(adminEmail: string, dto: DeleteArticleDto) { 
    const { articleID } = dto;

    try {
      const res = this.prisma.article.delete({
        where: {
          articleID
        }
      });

      return res;
    } catch (error) {
      throw error;
    }
  }

  // get article detail 
  async getArticle(email: string, dto: DeleteArticleDto) {
    const {articleID} = dto; 
    try {
      const res = await this.prisma.article.findUnique({
        where: {
          articleID: articleID,
        },
        include: {
          category: true,
          metatags: true,
          documents: true
        }
      })

      return res; 
    } catch (error) {
      throw error; 
    }
  }

  // TODO: implement search  
  async searchArticles(dto: SearchArticleDto) {
    const { query } = dto;

    console.log(query, " query");
    try {
      var res; 
      if(query.length !== 0){
        res = await this.prisma.article.findMany({
          where: {
            content: {
              search: query,
            }, 
          },
          include: {
            category: true,
          }
        });
      } else {
        res = await this.prisma.article.findMany({
          include:{
            category: true,
          }
        });
      }

      return res;
    } catch (error) {
      throw error;
    }

  }
}
