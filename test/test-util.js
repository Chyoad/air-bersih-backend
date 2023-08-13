import { prismaClient } from "../src/app/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { web } from "../src/app/web.js";
import supertest from "supertest";


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

let token;
export const loginTestUser = async () => {
  const result = await supertest(web)
    .post('/api/users/login')
    .send({
      email: "user@gmail.com",
      password: "12345678"
    })

  return token = result.body.data.token
}

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      email: "user@gmail.com"
    }
  });
}