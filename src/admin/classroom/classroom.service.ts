import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClassroomService {

    constructor(private prisma: PrismaService) { }

    async addClassroom(adminID: string, dto: any) {
        try {
           // TODO: add classroom
        } catch (error) {
            throw error;
        }
    }
}
