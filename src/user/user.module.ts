import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';
import { ClassroomService } from './classroom/classroom.service';
import { ClassroomModule } from './classroom/classroom.module';
import { ClassroomController } from './classroom/classroom.controller';

@Module({
  imports: [AuthModule, ProfileModule, ClassroomModule],
  providers: [UserService, ClassroomService],
  controllers: [UserController, ProfileController, ClassroomController]
})
export class UserModule {}
