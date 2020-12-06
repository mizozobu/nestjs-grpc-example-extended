import { Module } from '@nestjs/common';
import { VillanController } from './villan.controller';

@Module({
  controllers: [VillanController],
})
export class VillanModule {}
