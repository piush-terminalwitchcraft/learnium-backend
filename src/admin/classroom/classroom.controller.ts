import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('admin/classroom')
export class ClassroomController {

    constructor(private classroomService: ClassroomService) {}

    @Post ('addbatch')
    addBatch(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.addClassroom(adminID,dto);
    }

    @Post ('removebatch')
    removeBatch(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.removeClassroom(adminID,dto);
    }

    @Get ('getbatches')
    getBatches(@GetUser('sub') adminID: string) {
        return this.classroomService.getClassrooms(adminID);
    }

    @Post ('addexamresult')
    addExamResult(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.addExamResult(adminID,dto);
    }

    @Post ('addstudent')
    addStudent(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.addStudent(adminID,dto);
    }

    @Post ('removestudent')
    removeStudent(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.removeStudent(adminID,dto);
    }


}
