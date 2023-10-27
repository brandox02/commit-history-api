import { Exclude } from 'class-transformer';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

enum STATUS {
  DISABLE = 'DESACTIVADO',
  PENDING = 'PENDIENTE',
  ENABLE = 'HABILITADO',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  img: string;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isValidated: boolean;

  @Column({ default: STATUS.DISABLE })
  status: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Exclude()
  validatorToken: string;

  @Column({ nullable: true })
  nextTimeTokenGen: Date;

  @Column({ default: 0 })
  attemps: number;

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  profile: Profile;


  @Column({ default: false })
  isAdmin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  delete_at: Date;
}
