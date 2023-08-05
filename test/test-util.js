import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "user@gmail.com"
    }
  })
}

export const createTestUser = async () => {
  const id_user = uuid().toString()
  await prismaClient.user.create({
    data: {
      id_user: id_user,
      nama: "test",
      no_telepon: "12345678910",
      email: "user@gmail.com",
      password: await bcrypt.hash("12345678", 10),
      alamat: "solo"
    }
  })
}

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      email: "user@gmail.com"
    }
  });
}