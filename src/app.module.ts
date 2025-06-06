import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' }), ServicesModule],
})
export class AppModule {}
