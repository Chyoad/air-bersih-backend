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
import jwt from 'jsonwebtoken';

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

  const id_user = uuid().toString();

  return prismaClient.user.create({
    data: {
      id_user: id_user,
      nama: user.nama,
      no_telepon: user.no_telepon,
      email: user.email,
      password: user.password,
      alamat: user.alamat
    },
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
      id_user: true,
      email: true,
      password: true
    }
  });

  if (!user) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const token = jwt.sign({ id_user: user.id_user }, process.env.TOKEN_SECRET_KEY, { expiresIn: 86400 });

  console.log(token);

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

const get = async (id_user) => {
  id_user = validate(getUserValidation, id_user);

  const user = await prismaClient.user.findUnique({
    where: {
      id_user: id_user
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