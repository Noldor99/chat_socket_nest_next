import { ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { AddRoleDto } from './dtos/add-role.dto';
import { RolesService } from 'src/roles/roles.service';
import { EditUserDto } from './dtos/edit-user.dto';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { QueryUserParamsDto } from './dtos/query-user-params.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private rolesService: RolesService,
  ) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    const role = await this.rolesService.getByValue('USER');
    user.roles = [role];
    return this.userRepository.save(user);
  }

  async getAll(dto: QueryUserParamsDto) {
    const { page = 1, limit = 4, search } = dto;

    try {
      const queryBuilder = this.userRepository.createQueryBuilder('user');

      if (search) {
        queryBuilder
          .where('user.username ILIKE :search', { search: `%${search}%` })
          .orWhere('user.email ILIKE :search', { search: `%${search}%` });
      }

      const [users, totalCount] = await queryBuilder
        .orderBy({
          'user.createdAt': 'DESC',
        })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return { totalCount, users };
    } catch (error) {
      return { totalCount: 0, users: [] };
    }
  }

  async getUserByUsername(username: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: { roles: true },
      where: {
        username
      }
    });

    return user ? { ...user } : null
  }

  async delete(adminId: string, id: string): Promise<User | null> {
    if (adminId === id) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    const userToDelete = await this.userRepository.findOne({
      where: { id }
    });


    if (userToDelete) {

      return this.userRepository.remove(userToDelete);
    } else {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async addRole(dto: AddRoleDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: dto.userId }
    });
    const role = await this.rolesService.getByValue(dto.value);

    if (user.roles.includes(role))
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);

    if (role && user) {
      user.roles.push(role);
      return this.userRepository.save(user);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async getUserById(id): Promise<User | null> {
    const user = await this.userRepository.findOne({
      relations: { roles: true },
      where: { id }
    });

    return user ? { ...user } : null
  }

  async addAdmin(id: string): Promise<User | null> {

    const user = await this.getUserById(id);
    const role = await this.rolesService.getByValue('ADMIN');

    if (user.roles.includes(role))
      throw new HttpException('Role already exists', HttpStatus.BAD_REQUEST);

    if (role && user) {
      user.roles.push(role);
      return this.userRepository.save(user);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async updateUser(editUserDto: EditUserDto): Promise<User | null> {
    const { password, userId } = editUserDto;
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    return this.userRepository.save(user);
  }
}
