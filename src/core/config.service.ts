import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { BaseConfig } from './base-config.service';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModuleOptions } from '@nestjs/cache-manager';

class Config extends BaseConfig {
  getHostAndPort(): { host: string; port?: string } {
    try {
      return {
        host: this.getValue('HOST'),
        port: this.getValue('PORT'),
      };
    } catch (e) {
      return {
        host: '0.0.0.0',
      };
    }
  }

  public getExtraModels(): SwaggerDocumentOptions {
    return {
      extraModels: [],
    };
  }

  public getIsStaging(): boolean {
    try {
      return this.getValue('NODE_ENV', true).toLowerCase() == 'staging';
    } catch (e) {
      return false;
    }
  }

  public getIsProduction(): boolean {
    try {
      return this.getValue('NODE_ENV', true).toLowerCase() == 'production';
    } catch (e) {
      return false;
    }
  }

  public getJwtSecret(): string {
    return this.getValue('JWT_SECRET');
  }

  public getAppBaseUrl(): string {
    return this.getValue('FRONT_URL');
  }

  public getRedisConfig(): CacheModuleOptions {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      store: redisStore as any,
      host: this.getValue('REDIS_HOST'),
      port: 6379,
      ttl: this.getRedisTtl(),
      isGlobal: true,
    };
  }

  public getRedisTtl(): number {
    return this.getIsStaging() ? 300 : 3600;
  }

  public getAdminUrl(): string {
    return this.getValue('ADMIN_URL');
  }
}

const configService = new Config(process.env);

type ConfigService = typeof configService;

export { configService, ConfigService };
