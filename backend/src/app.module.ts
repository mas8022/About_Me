import { Module } from '@nestjs/common';
import { UsersModule } from './modules/http-api/users/users.module';
import { RedisModule } from './modules/services/redis/redis.module';
import { PrismaModule } from './modules/services/prisma/prisma.module';
import { JwtModule } from './modules/services/jwt/jwt.module';
import { AuthModule } from './modules/http-api/auth/auth.module';
import { TasksModule } from './modules/http-api/tasks/tasks.module';
import { ChatModule } from './modules/realtime/chat/chat.module';
import { QuizModule } from './modules/http-api/quiz/quiz.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    RedisModule,
    PrismaModule,
    JwtModule,
    TasksModule,
    ChatModule,
    QuizModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
