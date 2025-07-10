import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvConfigutation } from './config/env.config';
import { AuthModule } from './auth/auth.module';
import { SongsModule } from './songs/songs.module';
import { FeatureFlagModule, FeatureFlagService } from 'feature-flags-npm';
import { ExampleController } from './libreria/libreria.controller';


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

    SongsModule,

    FeatureFlagModule,

  ],
  controllers: [ExampleController],
})
export class AppModule {
  constructor(private readonly featureFlagService: FeatureFlagService) {
    this.featureFlagService.configure({
      environment: process.env.NODE_ENV || 'development',
      features: {
        testFeature: true,
        disabledFeature: false,
      },
    });
    console.log(process.env);
  
  }
}
