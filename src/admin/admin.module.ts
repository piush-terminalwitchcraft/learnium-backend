import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { ProfileModule } from './profile/profile.module';
import { ClassroomModule } from './classroom/classroom.module';

@Module({
  imports: [AuthModule, ArticlesModule, ProfileModule, ClassroomModule]
})
export class AdminModule {}
