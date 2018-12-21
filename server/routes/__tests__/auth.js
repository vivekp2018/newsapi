import axios from "axios";
import faker from "faker";
import { getUserToken, encryptPassword } from "../../utils/auth";

import startServer from "../../start";
import User from "../../models/user";

describe("authentication : ", () => {
  let server, baseURL, api;
  beforeAll(async () => {
    server = await startServer({ port: 8778 });
    baseURL = `http://localhost:${server.address().port}/api`;
    api = axios.create({ baseURL });
    await User.remove();
  });

  afterAll(async () => await server.close());

  describe("Login", () => {
    test("should require  username to login", async () => {
      const error = await api
        .post("/auth/login", {
          password: faker.internet.password()
        })
        .catch(err => err.response);
      expect(error).toMatchObject({
        status: 422,
        data: { errors: { username: expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();
    });

    test("should require password to login", async () => {
      const error = await api
        .post("auth/login", { username: faker.internet.userName() })
        .catch(err => err.response);
      expect(error).toMatchObject({
        status: 422,
        data: { errors: { password: expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();
    });
    test("should not login with a non user", async () => {
      const error = await api
        .post("auth/login", {
          username: faker.internet.userName(),
          password: faker.internet.password()
        })
        .catch(err => err.response);
      expect(error).toMatchObject({
        status: 422,
        data: { errors: { "username or password": expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();
    });
    test("should login with valid user", async () => {
      const password = faker.internet.password();
      const encPassword = await encryptPassword(password);
      const userObj = {
        username: faker.internet.userName(),
        password: encPassword
      };
      const newUser = await User.create(userObj);

      const user = await api
        .post("auth/login", {
          username: newUser.username,
          password: password
        })
        .then(res => {
          return res.data.user;
        })
        .catch(err => console.log(err.response));

      expect(user).toEqual({
        token: expect.any(String),
        _id: newUser.id,
        username: newUser.username
      });
      await User.deleteOne({ _id: newUser.id });
    });
  });
  describe("register", () => {
    test("should require username to register", async () => {
      const error = await api
        .post("/auth/register", {
          password: faker.internet.password()
        })
        .catch(err => err.response);
      expect(error).toMatchObject({
        status: 422,
        data: { errors: { username: expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();
    });
    test("should require password to register", async () => {
      const error = await api
        .post("auth/register", { username: faker.internet.userName() })
        .catch(err => err.response);
      expect(error).toMatchObject({
        status: 422,
        data: { errors: { password: expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();
    });
    test("should require unique username", async () => {
      const password = faker.internet.password();

      const userObj = {
        username: faker.internet.userName(),
        password
      };
      const newUser = await User.create(userObj);
      const error = await api
        .post("/auth/register", userObj)
        .catch(err => err.response);

      expect(error).toMatchObject({
        status: 422,
        data: { errors: { username: expect.any(String) } }
      });
      expect(error.data.errors).toMatchSnapshot();

      await User.deleteOne({ _id: newUser.id });
    });
    test("should allow register with correct username password", async () => {
      const userObj = {
        username: faker.internet.userName(),
        password: faker.internet.password()
      };

      const user = await api
        .post("/auth/register", userObj)
        .then(res => res.data.user);

      expect(user).toMatchObject({
        username: userObj.username,
        password: expect.any(String)
      });

      await User.deleteOne({ _id: user._id });
    });
  });
});
