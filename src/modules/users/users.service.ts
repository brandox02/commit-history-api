import { forwardRef, HttpException, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailService } from "../email/email.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateProfileDto } from "./dto/update-profile.dto";
import { Profile } from "./entities/profile.entity";
import { User } from "./entities/user.entity";
import { paginate } from "src/common/paginate";
import { paginateDto } from "src/common/paginate.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    private emailService: EmailService,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const found = await this.userRepository.findOne({ where: { email: createUserDto.email } });

    if (found) {
      throw new HttpException('Ya existe un usuario con este correo', 500);
    }
    try {
      const createUser = {
        ...createUserDto,
        profile: {
          firstname: createUserDto.firstname,
          lastname: createUserDto.lastname
        },
      };

      const saved = await this.userRepository.save(
        this.userRepository.create(createUser)
      );



      if (process.env.WAY_USER_VALIDATE === "email") {
        await this.emailService.sendUserConfirmation(
          saved.profile.firstname,
          saved.profile.lastname,
          saved.email,
          saved.validatorToken);
      } else {
        saved.isValidated = true;
        await this.userRepository.save(
          this.userRepository.create(saved)
        );
      }

      return { user: saved };
    } catch (error) {
      return error;
    }
  }


  findAll(query: paginateDto) {
    return paginate({ repository: this.userRepository, query });
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async updateProfile(id: string, updateUserDto: CreateProfileDto) {
    const { ...rest } = updateUserDto;
    const user = await this.findOne(id)
    if (!user) throw new HttpException("Usuario no encontrado", 404)


    return this.profileRepository.update({ id: user.profile.id }, rest);
  }

  privateUserUpdate(user: User) {
    return this.userRepository.update({ id: user.id }, user);
  }

  updateUserImage(UserId: string, UrlImage: string) {
    return this.userRepository.update({ id: UserId }, { img: UrlImage });
  }

  validateUser(user: User) {
    return this.userRepository.update({ id: user.id }, user);
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }

  generateCode = () => {
    return String(Math.floor(Math.random() * 1000000));
  };

  NextTimeTokenGen = () => {
    return new Date(new Date().getTime() + 3600000);
  };
}
