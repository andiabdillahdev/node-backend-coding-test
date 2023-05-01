import { Request, Response, NextFunction } from "express";
import Activities from "../db/models/activities";
import helper from "../helpers/helper";

const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const data = await Activities.findAll();
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

const getOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const data = await Activities.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Activity with ID ${id} Not Found`,
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
    const { title, email } = req.body;
    const data = await Activities.create({
      title: title,
      email: email,
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

const Update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { title, email } = req.body;

    const data = await Activities.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Activity with ID ${id} Not Found`,
            null,
            null
          )
        );
    }

    data.title = title;
    data.email = email;

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
    const data = await Activities.findByPk(id);

    if (!data) {
      return res
        .status(404)
        .send(
          helper.ResponseData(
            404,
            "Not Found",
            `Activity with ID ${id} Not Found`,
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

export default { getAll, getOne, Create, Update, Delete };
