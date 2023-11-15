import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

    async addClassroom(adminID: string, dto: any) {
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

    async removeClassroom(adminID: string, dto: any) {
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
            // TODO: add exam result
        } catch (error) {
            throw error;
        }
    }

    async addStudent(adminID: string, dto: any) {
        try {
            // TODO: add student
        } catch (error) {
            throw error;
        }
    }

    async removeStudent(adminID: string, dto: any) {
        try {
            //
        } catch (error) {
            throw error;
        }
    }




}


