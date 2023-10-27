import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./modules/users/users.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { EmailModule } from "./modules/email/email.module";
import { SavefilesModule } from "./modules/savefiles/savefiles.module";
import { configs } from "./common/app.config";
import { join } from "path";
import { CommitHistoryModule } from './modules/commit-history/commit-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get("dataSourceConfig"),
        entities: [
          join(
            __dirname,
            "..",
            "..",
            "src",
            "modules",
            "**",
            "entities",
            "*.entity.ts"
          ),
        ],
      }),
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    SavefilesModule,
    CommitHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
