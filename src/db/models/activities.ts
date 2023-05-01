import { DataTypes, Optional, Model } from "sequelize";
import connection from "../../config/dbConnect";

interface ActivitiesAttribute {
  activity_id?: number;
  title?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ActivitiesInput
  extends Optional<ActivitiesAttribute, "activity_id"> {}

export interface ActivitiesOutput extends Required<ActivitiesAttribute> {}

class Activities
  extends Model<ActivitiesAttribute, ActivitiesInput>
  implements ActivitiesAttribute
{
  public activity_id!: number;
  public title!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Activities.init(
  {
    activity_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    title: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connection,
    underscored: false,
    timestamps: true,
  }
);

export default Activities;
