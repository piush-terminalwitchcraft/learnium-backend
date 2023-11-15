import { Body, Controller, Get } from '@nestjs/common';
import { ClassroomService } from './classroom.service';
import { GetUser } from '../auth/decorator';

@Controller('user/classroom')
export class ClassroomController {

    constructor(private classroomService: ClassroomService) {}

    @Get ('getbatches')
    getBatches(@GetUser('sub') studentID: string, @Body() dto: any) {
        return this.classroomService.getClassrooms(studentID, dto);
    }

    @Get ('result/batch')
    getExamResults(@GetUser('sub') studentID: string, @Body() dto: any) {
        return this.classroomService.getExamResults(studentID, dto);
    }

    @Get('result/exam')
    getExamResultInDetail(@GetUser('sub') studentID: string, @Body() dto: any) {
        return this.classroomService.getExamResultInDetail(studentID, dto);
    }

}
