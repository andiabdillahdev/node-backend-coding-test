import validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import helper from "../../helpers/helper";

const validation = (req: Request, res: Response, next: NextFunction) => {
  //   const data = {
  //     title,
  //     activity_group_id,
  //     is_active,
  //   };

  //   let rules: validator.Rules = {
  //     title: "required",
  //     activity_group_id: "required|numeric",
  //     is_active: "required|boolean",
  //   };
  const { title, activity_group_id, is_active, priority } = req.body;

  let data: any = {};
  let rules: validator.Rules = {};

  if (req.method == "POST") {
    data = {
      title,
      activity_group_id,
      is_active,
    };

    rules = {
      title: "required",
      activity_group_id: "required|numeric",
      is_active: "required|boolean",
    };
  } else {
    data = {
      title,
      priority,
      is_active,
    };

    rules = {
      title: "required",
      priority: "required",
      is_active: "required|boolean",
    };
  }

  const validate = new validator(data, rules);

  if (validate.fails()) {
    let errors: string = "";
    Object.keys(data).forEach((key, index) => {
      validate.setAttributeNames({ [key]: key });
      if (validate.errors.get(key).length > 0) {
        errors = validate.errors.get(key)[0];
      }
    });

    return res
      .status(400)
      .send(helper.ResponseData(400, "Bad Request", null, errors, null));
  }

  next();
};

export default { validation };
