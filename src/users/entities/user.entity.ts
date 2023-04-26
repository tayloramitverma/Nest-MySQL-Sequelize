import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Post } from './post.entity';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @HasMany(() => Post)
  posts: Post[];
}
