import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "user@gmail.com"
    }
  })
}

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      "nama": "test",
      "no_telepon": "12345678910",
      "email": "user@gmail.com",
      "password": "12345678",
      "alamat": "solo"
    }
  })
}

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test"
    }
  });
}