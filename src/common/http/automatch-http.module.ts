import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AutomatchHttpService } from './automatch-http.service';

@Module({
  imports: [HttpModule],
  providers: [AutomatchHttpService],
  exports: [AutomatchHttpService],
})
export class AutomatchHttpModule {}
