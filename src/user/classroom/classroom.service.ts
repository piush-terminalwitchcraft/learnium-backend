import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassroomService {

    constructor(private prisma: PrismaService) { }

    async getClassrooms(studentID : string, dto: any){
        try{
            // get batch id's of student
            const res = await this.prisma.user.findUnique({
                where: {
                    userID: studentID
                },
                include: {
                    batchID: true
                }
                
            })

            if(!res.isStudent) throw new Error("User is not enrolled in course");
            
            return res.batchID; 
        } catch (error) {
            throw error;
        }
    }


    async getExamResults(studentID : string, dto: any){
        try{
            // get exam results of student
            const res = await this.prisma.exam.findMany({
                where: {
                    batchID: dto.batchID,
                    studentID: studentID
                }
            })

            return res;
        } catch (error) {
            throw error;
        }
    }

    async getExamResultInDetail(studentID: string, dto: any){
        try{
            const res = await this.prisma.exam.findUnique({
                where : {
                    examID: dto.examID
                },
                include: {
                    score: true
                }

            })
        } catch (error) {
            throw error;
        }
    }
}
