import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AssignmentsModule } from './assignments/assignments.module';
import { ShiftsService } from './shifts/shifts.service';
import { ShiftsController } from './shifts/shifts.controller';
import { ShiftsModule } from './shifts/shifts.module';
import { UsersModule } from './users/users.module';
import { ApiTokenCheck } from './auth/middleware';

@Module({
  imports: [AssignmentsModule, ShiftsModule, UsersModule],
  controllers: [AppController, ShiftsController],
  providers: [AppService, ShiftsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiTokenCheck).forRoutes('users');
  }
}
