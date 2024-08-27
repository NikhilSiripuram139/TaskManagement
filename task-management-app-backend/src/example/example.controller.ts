import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ExampleService } from './example.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('example')
export class ExampleController {
    constructor(private readonly exampleService: ExampleService) {}

  @Post('set')
  async setValue(@Body() data : { key : string, value : string}): Promise<string> {
    try {
      await this.exampleService.setCacheKey(data.key, data.value);
      return 'key cached successfully!';
    } catch (error) {
      return error.message;
    }
  }

  @UseInterceptors(CacheInterceptor)
  @Get('get/:key')
  async getValue(@Param('key') key : string): Promise<any> {
    console.log(key)
    return this.exampleService.getCacheKey(key);
  }
}
