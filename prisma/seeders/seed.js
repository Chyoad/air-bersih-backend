import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

const main = async () => {
  const super_admin = await prisma.user.upsert({
    where: { email: 'super_admin@gmail.com' },
    update: {},
    create: {
      nama: 'super_admin',
      no_telepon: '12345678910',
      email: 'super_admin@gmail.com',
      password: await bcrypt.hash("12345678", 10),
      level: 1,
      alamat: 'solo',
    },
  })

  const admin = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      nama: 'admin',
      no_telepon: '12345678910',
      email: 'admin@gmail.com',
      password: await bcrypt.hash("12345678", 10),
      level: 2,
      alamat: 'solo',
    },
  })
  console.log({ super_admin, admin })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })