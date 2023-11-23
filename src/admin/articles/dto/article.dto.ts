import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class Document {
  documentPath: string;
  documentName: string;
}

export class NewArticleDto {
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  category: string[]; 

  @IsArray()
  metatags: string[];

  @IsArray()
  documents: Document[];

}

export class UpdateArticleDto {
  
  @IsString()
  @IsNotEmpty()
  articleID: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  category: string[]; 

  @IsArray()
  metatags: string[]; 

  @IsArray()
  documents: Document[];

}

export class DeleteArticleDto {
  @IsNotEmpty()
  @IsString()
  articleID: string;
}

export class SearchArticleDto {
  @IsString()
  query: string;
}

