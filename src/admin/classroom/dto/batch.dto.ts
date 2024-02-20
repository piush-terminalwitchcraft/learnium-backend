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

export class subjectScore {
  subjectName: string;
  subjectScore: number ;
  totalScore: number;
}

export class addExamResultDto{
  examName: string;
  batchID: string;
  studentEmailID: string;
  subjectScores: subjectScore[];
}

export class delExamResultDto {
  
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
