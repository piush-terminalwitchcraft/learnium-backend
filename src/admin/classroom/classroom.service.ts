import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addBatchDto, batchStudentDto, removeBatchDto, addExamResultDto, delExamResultDto, getBatchDto } from './dto/batch.dto';
import { SubjectScore } from '@prisma/client';

@Injectable()
export class ClassroomService {

  constructor(private prisma: PrismaService) { }

  async getClassrooms(_: string) {
    try {
      const classrooms = await this.prisma.batch.findMany();
      return classrooms;
    } catch (error) {
      throw error;
    }
  }

  async getClassroomDetails(_: string, dto: getBatchDto) {
    try {
      const batchdetails = await this.prisma.batch.findUnique({
        where: {
          batchID: dto.batchID,
        },
        include: {
          studentsID: {
            select: {
              userID: true,
              userEmail: true,
              userName: true, 
              userProfilePicture: true,
              userPhoneNo: true,
              isStudent: true,
            }
          }
        }
      })

      const exams = await this.prisma.exam.groupBy({
        by:['examName','examDate'],
        where: {
          batchID: dto.batchID,
        },
        _count: true, 
      })
    
      const res = {batchdetails, exams}
      return res;
    } catch (error) {
      throw error;
    }
  }

  async addClassroom(_: string, dto: addBatchDto) {
    try {
      const batch = await this.prisma.batch.create({
        data: {
          academicYear: dto.academicYear,
          course : dto.course,
          batchName: dto.batchName,
        }
      }); 

      return batch;
    } catch (error) {
      throw error;
    }
  }

  async removeClassroom(_: string, dto: removeBatchDto) {
    try {
      const res = await this.prisma.batch.delete({
        where: {
          batchID: dto.batchID
        }
      })

      return res; 
    } catch (error) {
      throw error;
    }
  }

  async addScores(scores: SubjectScore[], examID: string){
    try {
      scores.map(async (score)=>{
        await this.prisma.subjectScore.create({
          data:{
            subjectScore: score.subjectScore,
            subjectName: score.subjectName,
            totalScore: score.totalScore,
            exam: {
              connect: {
                examID: score.examID
              }
            }
          }
        }) 
      })
    } catch (error) {
      
    }
  }

  async addExamResult(_: string , dto: addExamResultDto[]) {
    try {
      dto.map(async (val)=>{
        const res = await this.prisma.exam.create({
          data:{
            examName: val.examName,
            examDate: "2023-12-06T11:29:19.036Z",
            student: {
              connect: {
                userEmail: val.studentEmailID,
              }
            },
            batch: {
              connect:{
                batchID: val.batchID, 
              }
            },
          }
        })
        
        val.subjectScores.map(async (score)=>{
            await this.prisma.subjectScore.create({
              data: {
              subjectName: score.subjectName,
              subjectScore: score.subjectScore,
              totalScore: score.totalScore,
              exam: {
                connect: {
                  examID: res.examID
                }
              } 
            }
          })
        })

      })
      return {msg: "Successfully created"};
    } catch (error) {
      throw error;
    }
  }

  async delExamResult(adminID: string, dto: any){
    try {
        
    } catch (error) {
      
    }
  }

  async addStudent(adminID: string, dto: batchStudentDto) {
    try {
      // find user 
      const user = await this.prisma.user.findUnique({
        where:{
          userEmail: dto.userEmail
        }
      })

      // if user is not a student , then update their student status and connect it to batch
      if(!user.isStudent) {
        await this.prisma.user.update({
          where: {
            userID: user.userID
          },
          data: {
            isStudent: true,
            batchID: {
              connect: {
                batchID: dto.batchID
              }
            }
          }
        })
      }

      // update batch and connect it with user  
      const res = await this.prisma.batch.update({
        where: {
          batchID: dto.batchID,
        },
        data:{
          studentsID:{
            connect: {
              userEmail: dto.userEmail
            }
          }
        }
      })

      return res;

    } catch (error) {
      throw error;
    }
  }

  async removeStudent(adminID: string, dto: batchStudentDto) {
    try {
      // disconnect the user from that batch 
      const res = await this.prisma.batch.update({
        where:{
          batchID: dto.batchID
        },
        data:{
          studentsID:{
            disconnect:{
              userEmail: dto.userEmail
            }
          }
        }
      })

      // find user  
      const user = await this.prisma.user.findUnique({
        where:{
          userEmail: dto.userEmail
        },
        select: {
          batchID: {
            select: {
              batchID: true
            }
          }
        }
      })


      // if the number of batches is zero, then remove student status 
      if(user.batchID.length === 0){
        await this.prisma.user.update({
          where:{
            userEmail: dto.userEmail
          },
          data:{
            isStudent: false
          }
        });
      }

      return res; 
    } catch (error) {
      throw error;
    }
  }

}


