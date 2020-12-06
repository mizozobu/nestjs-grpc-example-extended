import { Module } from '@nestjs/common';
import { HeroModule } from './hero/hero.module';
import { VillanModule } from './villan/villan.module';

@Module({
  imports: [HeroModule, VillanModule],
})
export class AppModule {}
