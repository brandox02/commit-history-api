import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProfileDto } from './dto/update-profile.dto';
import { paginateDto } from 'src/common/paginate.dto';


@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {

    const { password, passwordConfirmation, email } = createUserDto;

    if (await this.usersService.findOneByEmail(email)) {
      throw new HttpException('correo ya se encuentra en uso', HttpStatus.CONFLICT);
    }

    if (password !== passwordConfirmation) {
      throw new HttpException(
        'Las contraseñas no coninciden',
        HttpStatus.CONFLICT,
      );
    }

    const validatorToken = this.usersService.generateCode();
    // test2
    const newuser = {
      ...createUserDto,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      validatorToken: String(validatorToken),
    };

    return this.usersService.create(newuser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("/profile")
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findprofile(@Request() req: any) {
    return this.findOne(req.user.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: paginateDto) {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
    const response = await this.usersService.findOne(id);
    let { attemps, img, phone, password, ...rest } = response;

    return rest
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  updateProfile(@Param('id') id: string, @Body() createProfileDto: CreateProfileDto) {
    return this.usersService.updateProfile(id, createProfileDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

}
