import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(firstname: string, lastname: string, email: string, validatorToken: string) {
    try {

      await this.mailerService.sendMail({
        to: email,
        subject: 'Bienvenido a Reuniones App!',
        template: './confirmation',
        context: {
          name: `${firstname} ${lastname}`,
          code: validatorToken,
        },
      });
      return true
    } catch (error) {
      console.log(error, "este error");
      return error;
    }
  }

}
