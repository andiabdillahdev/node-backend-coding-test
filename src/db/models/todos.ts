import { DataTypes, Optional, Model } from "sequelize";
import connection from "../../config/dbConnect";

interface TodostAttribute {
  todo_id?: number;
  activity_group_id?: number;
  title?: string;
  priority?: string;
  is_active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodostInput extends Optional<TodostAttribute, "todo_id"> {}

export interface TodostOutput extends Required<TodostAttribute> {}

class Todos
  extends Model<TodostAttribute, TodostInput>
  implements TodostAttribute
{
  public todo_id!: number;
  public activity_group_id?: number;
  public title!: string;
  public priority!: string;
  public is_active?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Todos.init(
  {
    todo_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    activity_group_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    priority: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    is_active: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connection,
    underscored: false,
    timestamps: true,
  }
);

export default Todos;
