import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChangePassCodeDto } from './dto/change-pass-code-dto';
import { ChangePassDto } from './dto/change-pass-dto';
import { LoginDto } from './dto/login-dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResetPassDto } from './dto/reset-pass-dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ValidateUserDTO } from './dto/validate-user-dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  create(
    @Body() logindto: LoginDto,
  ) {
    return this.authService.login(logindto);
  }

  @Post('logout')
  @ApiBearerAuth()
  logout() {
    return this.authService.logout();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/update-password')
  updatepass(@Body() changePassDto: ChangePassDto, @Request() req: any) {
    return this.authService.changePassword({
      ...changePassDto,
      email: req.user.email,
    });
  }

  @Post('/update-pass-code')
  updatepasscode(@Body() changePasscodeDto: ChangePassCodeDto) {
    return this.authService.changePasswordCode(changePasscodeDto);
  }

  @Get('/validate-user')
  validateuser(@Query() validateUserDTO: ValidateUserDTO) {
    return this.authService.validateUser(validateUserDTO);
  }
}
