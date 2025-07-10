import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigutation } from './config/env.config';
import { AuthModule } from './auth/auth.module';
import { SongsModule } from './songs/songs.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfigutation],
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
    }),

    MongooseModule.forRoot(process.env.MONGODB!),

    AuthModule,

    SongsModule
  ],
})
export class AppModule {
  constructor() {
    console.log(process.env);
  }
}
