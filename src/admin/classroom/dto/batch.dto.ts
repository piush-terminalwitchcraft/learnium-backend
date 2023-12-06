import { IsEmail, IsString, IsNotEmpty} from "class-validator";

export class addBatchDto{
  
  @IsNotEmpty()
  @IsString()
  academicYear: string;

  @IsNotEmpty()
  @IsString()
  course: string;

  @IsString()
  @IsNotEmpty()
  batchName: string;

}  
export class removeBatchDto{

  @IsNotEmpty()
  @IsString()
  batchID: string;
}

export class getBatchDto{

  @IsNotEmpty()
  @IsString()
  batchID: string;
}

export class batchStudentDto{
  @IsNotEmpty()
  @IsString()
  batchID: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  userEmail: string;
}
