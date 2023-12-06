import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addBatchDto, batchStudentDto, removeBatchDto } from './dto/batch.dto';

@Injectable()
export class ClassroomService {

  constructor(private prisma: PrismaService) { }

  async getClassrooms(adminID: string) {
    try {
      const classrooms = await this.prisma.batch.findMany();
      return classrooms;
    } catch (error) {
      throw error;
    }
  }

  async addClassroom(adminID: string, dto: addBatchDto) {
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

  async removeClassroom(adminID: string, dto: removeBatchDto) {
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

  async addExamResult(adminID: string, dto: any) {
    try {

    } catch (error) {
      throw error;
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


