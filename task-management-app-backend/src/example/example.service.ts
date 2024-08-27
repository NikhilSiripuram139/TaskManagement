import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class ExampleService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager : Cache ) {}

  async setCacheKey(key: string, value: string): Promise<void> {
    if (value === undefined) {
      throw new Error('Cannot cache an undefined value');
    }
    await this.cacheManager.set(key,value);
  }

  async getCacheKey(key: string): Promise<any> {
    const data = await this.cacheManager.get(key);
    console.log(data);
    return data;
  }
}
