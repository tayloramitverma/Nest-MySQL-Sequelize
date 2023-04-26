import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id/posts')
  async getPostsWithUser(@Param('id') id: number) {
    const userWithPosts = await this.usersService.findPostsWithUser(id);
    return userWithPosts;
  }

  @Get(':id/user-posts')
  async getUserWithPosts(@Param('id') id: number) {
    const userWithPosts = await this.usersService.findUserWithPosts(id);
    return userWithPosts;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
