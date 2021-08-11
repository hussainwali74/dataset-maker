import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Test } from './tests/entities/test.entity';
import { TestsModule } from './tests/tests.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { WordModule } from './word/word.module';
import { SentenceModule } from './sentence/sentence.module';
import { LanguageModule } from './language/language.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'ds_maker',
      password: 'ds_maker',
      database: 'ds_maker',
      autoLoadEntities: true,
      // synchronize: true,
      // logging: true,
    }),
    TestsModule,
    AuthModule,
    UsersModule,
    SharedModule,
    LanguageModule,
    WordModule,
    SentenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
