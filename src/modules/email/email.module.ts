import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Module } from "@nestjs/common";
import { join } from "path";
import { ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return ({
          transport: {
            host: config.get("MAIL_HOST"),
            secure: config.get("MAIL_PORT"),
            auth: {
              user: config.get("MAIL_USERNAME"),
              pass: config.get("MAIL_PASSWORD"),
            },
          },
          defaults: {
            from: `"No Reply" <${config.get("MAIL_FROM_ADDRESS")}>`,
          },
          template: {
            dir: join(__dirname, "templates"),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        })
      },
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule { }
