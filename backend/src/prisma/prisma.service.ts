// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { prismaLogger } from 'src/logger/winston-logger.service';

interface PrismaServiceWithLogging extends PrismaClient {
  $on(event: 'query', callback: (e: Prisma.QueryEvent) => void): void;
  $on(
    event: 'info' | 'warn' | 'error',
    callback: (e: Prisma.LogEvent) => void,
  ): this;
}

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: [
        { level: 'query', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'warn', emit: 'event' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    (this as PrismaServiceWithLogging).$on('query', (e: Prisma.QueryEvent) => {
      prismaLogger.debug(`Query: ${e.query} Params: ${e.params}`);
    });

    (this as PrismaServiceWithLogging).$on('info', (e: Prisma.LogEvent) => {
      prismaLogger.info(e.message);
    });

    (this as PrismaServiceWithLogging).$on('warn', (e: Prisma.LogEvent) => {
      prismaLogger.warn(e.message);
    });

    (this as PrismaServiceWithLogging).$on('error', (e: Prisma.LogEvent) => {
      prismaLogger.error(`Message: ${e.message} Target: ${e.target}`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
