import validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import helper from "../../helpers/helper";

const validation = (req: Request, res: Response, next: NextFunction) => {
  const { title, email } = req.body;

  let data: any = {};
  let rules: validator.Rules = {};
  if (req.method == " POST") {
    data = {
      title,
      email,
    };

    rules = {
      title: "required",
      email: "required|email",
    };
  } else {
    data = {
      title,
    };

    rules = {
      title: "required",
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
      //   if (key.length > 0) {
      //   errors[key] = validate.errors.get(key);
      // errors[key] = index;
      //   }
    });
    // error.forEach(function (element, index) {
    //   console.log(index + ": " + element);
    // });

    return res
      .status(400)
      .send(helper.ResponseData(400, "Bad Request", null, errors, null));
  }

  next();
};

export default { validation };
