import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  async findPostsWithUser(userId: number): Promise<Post[]> {
    const posts = await this.postModel.findAll({
      where: { user_id: userId },
    });
    return posts;
  }

  async findUserWithPosts(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id },
      include: [{ model: Post, as: 'posts' }],
    });
    return user;
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
    });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
