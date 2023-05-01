import { Request, Response, NextFunction } from "express";
import Todos from "../db/models/todos";
import helper from "../helpers/helper";
import { Op } from "sequelize";

interface TodoWhereOptions {
  activity_group_id?: string;
}

const GetAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    let { activity_group_id } = req.query;
    let data: object[] = [];
    // if (activity_group_id) {
    // data = await Todos.findAll({
    //   where: {
    //     activity_group_id: {
    //       [Op.eq]: req.query.activity_group_id,
    //     },
    //   } as TodoWhereOptions,
    // });
    // const todos = await Todos.findAll({
    //   where: {
    //     activity_group_id: {
    //       [Op.eq]: req.query.activity_group_id,
    //     },
    //   } as TodoWhereOptions,
    // });

    // return res
    //   .status(200)
    //   .send(helper.ResponseData(200, "Success", "Success", null, "tesss"));
    // }

    data = await Todos.findAll();

    return res
      .status(200)
      .send(helper.ResponseData(200, "Success", "Success", null, data));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        helper.ResponseData(500, "Internal server error", null, error, null)
      );
  }
};

const GetOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;

    const data = await Todos.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Todos with ID ${id} Not Found`,
            null,
            null
          )
        );
    }

    return res
      .status(200)
      .send(helper.ResponseData(200, "Success", "Success", null, data));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        helper.ResponseData(500, "Internal server error", null, error, null)
      );
  }
};

const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { title, activity_group_id, is_active } = req.body;
    const data = await Todos.create({
      title: title,
      activity_group_id: activity_group_id,
      is_active: is_active,
    });

    return res
      .status(201)
      .send(helper.ResponseData(201, "Success", "Success", null, data));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        helper.ResponseData(500, "Internal server error", null, error, null)
      );
  }
};

const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { title, is_active, priority } = req.body;

    const data = await Todos.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Todos with ID ${id} Not Found`,
            null,
            null
          )
        );
    }

    data.title = title;
    data.is_active = is_active;
    data.priority = priority;

    data.save();

    return res
      .status(200)
      .send(helper.ResponseData(200, "Success", "Success", null, data));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        helper.ResponseData(500, "Internal server error", null, error, null)
      );
  }
};

const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = await Todos.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Todos with ID ${id} Not Found`,
            null,
            null
          )
        );
    }

    await data.destroy();

    return res
      .status(200)
      .send(helper.ResponseData(200, "Success", "Success", null, {}));
  } catch (error: any) {
    return res
      .status(500)
      .send(
        helper.ResponseData(500, "Internal server error", null, error, null)
      );
  }
};

export default { GetAll, GetOne, Create, Update, Delete };
