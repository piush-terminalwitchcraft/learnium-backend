import { IsArray, IsNotEmpty, IsString } from "class-validator"

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

  @IsString()
  createdBy: string;

  @IsArray()
  documents: string[];

}

export class UpdateArticleDto {
  
  @IsString()
  @IsNotEmpty()
  articleID: string;

  title: string;

  content: string;

  @IsArray()
  category: string[]; 

  @IsArray()
  metatags: string[]; 

  @IsString()
  createdBy: string;

  @IsArray()
  documents: string[];

}

export class DeleteArticleDto {
  @IsNotEmpty()
  @IsString()
  articleID: string;
}

export class SearchArticleDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}

