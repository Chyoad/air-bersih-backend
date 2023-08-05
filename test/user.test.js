import supertest from "supertest";
import { web } from "../src/app/web.js";
import { logger } from "../src/app/logging.js";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

describe('POST /api/users/register', function () {

  afterEach(async () => {
    await removeTestUser();
  })

  it('should can register new user', async () => {
    const result = await supertest(web)
      .post('/api/users/register')
      .send({
        nama: 'test',
        no_telepon: '12345678910',
        email: 'user@gmail.com',
        password: '12345678',
        alamat: 'solo'
      });

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("user@gmail.com");
    expect(result.body.data.nama).toBe("test");
    expect(result.body.data.password).toBeUndefined();
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/users/register')
      .send({
        nama: ' ',
        no_telepon: ' ',
        email: ' ',
        password: ' ',
        alamat: ' '
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if username already registered', async () => {
    let result = await supertest(web)
      .post('/api/users/register')
      .send({
        nama: 'test',
        no_telepon: '12345678910',
        email: 'user@gmail.com',
        password: '12345678',
        alamat: 'solo'
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe("user@gmail.com");
    expect(result.body.data.nama).toBe("test");
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web)
      .post('/api/users/register')
      .send({
        nama: 'test',
        no_telepon: '12345678910',
        email: 'user@gmail.com',
        password: '12345678',
        alamat: 'solo'
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('POST /api/users/login', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: "user@gmail.com",
        password: "12345678"
      });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("123456789");
  });

  it('should reject login if request is invalid', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: "",
        password: ""
      });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if password is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: "user@gmail.com",
        password: "salah"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject login if email is wrong', async () => {
    const result = await supertest(web)
      .post('/api/users/login')
      .send({
        email: "salah",
        password: "12345678"
      });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/users/current', function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'test');

    expect(result.status).toBe(200);
    expect(result.body.data.email).toBe('user@gmail.com');
    expect(result.body.data.nama).toBe('test');
  });

  it('should reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/api/users/current')
      .set('Authorization', 'salah');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
