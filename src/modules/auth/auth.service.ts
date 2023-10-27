import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hashSync } from 'bcrypt';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import { ChangePassCodeDto } from './dto/change-pass-code-dto';
import { ChangePassDto } from './dto/change-pass-dto';
import { LoginDto } from './dto/login-dto';
import { ValidateUserDTO } from './dto/validate-user-dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    @Inject(forwardRef(() => UsersService)) private readonly userService: UsersService,
  ) { }

  async login(logindto: LoginDto) {
    const user = await this.userService.findOneByEmail(logindto.email);
    if (!user) {
      throw new HttpException('Usuario o contraseña incorrecta', 403);
    }

    if (!user.isValidated) {
      throw new HttpException('Debes validar tu usuario!', 505);
    }

    const passwordIsCorrect = await compare(logindto.password, user.password);

    if (!passwordIsCorrect) {
      throw new HttpException('Usuario o contraseña incorrecta', 403);
    }

    const token = this.jwtService.sign({
      firstname: user.profile.firstname,
      lastname: user.profile.lastname,
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    });

    const Refreshtoken = this.jwtService.sign({
      firstname: user.profile.firstname,
      lastname: user.profile.lastname,
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      isActive: user.isActive
    });

    return { user, token, Refreshtoken };
  }

  logout() {
    return `This action logout`;
  }

  async validateUser(validateUserDTO: ValidateUserDTO) {
    const user = await this.userService.findOneByEmail(validateUserDTO.email);
    if (!user) {
      throw new HttpException('No se ha encontrado este usuario', 404);
    }
    if (!user?.validatorToken) {
      throw new HttpException(
        'No se puede proceder ya que este usuario no posee un código de validación previamente generado',
        HttpStatus.FORBIDDEN,
      );
    }

    if (!user || validateUserDTO.code !== user.validatorToken) {
      user.attemps += 1;
      this.userService.validateUser(user);

      // if (user.attemps >= Number(process.env.VALIDATE_ATTEMPS)) {
      //   user.attemps = 0;
      //   user.validatorToken = null; // String(this.userService.generateCode());
      //   user.nextTimeTokenGen = this.userService.NextTimeTokenGen();
      //   this.userService.validateUser(user);
      // }
      throw new HttpException('Token de autorizacion invalido', 403);
    }

    user.isValidated = true;
    this.userService.validateUser(user);

    return { status: 'success' };
  }

  async changePassword(changePassDto: ChangePassDto) {
    const user = await this.userService.findOneByEmail(changePassDto.email);

    if (!user) {
      throw new HttpException('Usuario o contraseña incorrecta', 403);
    }

    const passwordIsCorrect = await compare(
      changePassDto.oldpassword,
      user.password,
    );

    if (!passwordIsCorrect) {
      throw new HttpException('Usuario o contraseña incorrecta', 403);
    }

    user.password = hashSync(changePassDto.password, 10);
    this.userService.privateUserUpdate(user);
    return { status: 'success' };
  }

  async changePasswordCode(changePassDto: ChangePassCodeDto) {
    const user = await this.userService.findOneByEmail(changePassDto.email);

    if (!user.validatorToken) {
      throw new HttpException('Debes generar un codigo de validación', 409);
    }

    if (changePassDto.confirmpassword !== changePassDto.password) {
      throw new HttpException('Contraseñas no coinciden', 409);
    }

    if (!user || changePassDto.code !== user.validatorToken) {
      user.attemps += 1;
      this.userService.validateUser(user);

      if (user.attemps >= Number(process.env.VALIDATE_ATTEMPS)) {
        user.attemps = 0;
        user.validatorToken = null; //String(this.userService.generateCode());
        user.nextTimeTokenGen = this.userService.NextTimeTokenGen();
        this.userService.validateUser(user);
      }
      throw new HttpException('Token de autorizacion invalido', 403);
    }

    user.password = hashSync(changePassDto.password, 10);

    this.userService.privateUserUpdate(user);
    return { status: 'success' };
  }
}