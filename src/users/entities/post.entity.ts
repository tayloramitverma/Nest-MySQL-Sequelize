import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'posts', timestamps: false })
export class Post extends Model {
  @Column
  title: string;

  @Column
  content: string;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: User;
}
