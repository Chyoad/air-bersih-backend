import { validate } from "../validation/validation.js";
import {
  registerUserValidation,
  loginUserValidation,
  getUserValidation
} from "../validation/user-validation.js";
import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email
    }
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id_user: true,
      nama: true,
      no_telepon: true,
      email: true,
      alamat: true
    }
  });
}

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email
    },
    select: {
      email: true,
      password: true
    }
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = uuid().toString()
  return prismaClient.user.update({
    data: {
      token: token
    },
    where: {
      email: user.email
    },
    select: {
      id_user: true,
      token: true
    }
  });
}

const get = async (email) => {
  email = validate(getUserValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email
    },
    select: {
      id_user: true,
      nama: true,
      no_telepon: true,
      email: true,
      level: true,
      alamat: true
    }
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
}

export default {
  register,
  login,
  get
}