import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ImageModule, ConfigModule.forRoot()],
})
export class AppModule {}
