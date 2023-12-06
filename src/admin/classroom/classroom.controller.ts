import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { addBatchDto, removeBatchDto } from './dto/batch.dto';

@UseGuards(JwtGuard)
@Controller('admin/classroom')
export class ClassroomController {

    constructor(private classroomService: ClassroomService) {}

    @Post ('addbatch')
    addBatch(@GetUser('sub') adminID: string  ,@Body() dto: addBatchDto) {
        return this.classroomService.addClassroom(adminID,dto);
    }

    @Delete ('removebatch')
    removeBatch(@GetUser('sub') adminID: string  ,@Body() dto: removeBatchDto) {
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

    @Delete ('removestudent')
    removeStudent(@GetUser('sub') adminID: string  ,@Body() dto: any) {
        return this.classroomService.removeStudent(adminID,dto);
    }

}
