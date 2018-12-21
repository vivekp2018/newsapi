import faker from "faker";
import passport from "passport";
import User from "../../models/user";
import * as authController from "../auth";
import user from "../../models/user";
import { getUserToken } from "../../utils/auth";
function setup() {
  const req = {
    body: {}
  };
  const res = {
    status: jest.fn(function status() {
      return this;
    }),
    json: jest.fn(function json() {
      return this;
    }),
    send: jest.fn(function send() {
      return this;
    })
  };

  const next = jest.fn();
  return { req, res, next };
}

describe("Register", () => {
  var userObj = {
    _id: faker.random.uuid(),
    username: faker.internet.userName()
  };
  it("should require username", async () => {
    const { req, res, next } = setup();
    req.body.password = faker.internet.password();
    const result = await authController.register(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { username: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });

  it("should require password", async () => {
    const { req, res, next } = setup();
    req.body = { username: faker.internet.userName() };
    await authController.register(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { password: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });
  it("should require password with specific length", async () => {
    const { req, res, next } = setup();
    req.body = { username: faker.internet.userName(), password: "123" };
    await authController.register(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { password: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });
  it("should register and return user", async () => {
    const { req, res, next } = setup();
    req.body = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    jest.spyOn(User, "findOne");
    jest.spyOn(User, "create");
    User.findOne.mockImplementationOnce(() => {
      return Promise.resolve(0);
    });
    User.create.mockImplementationOnce(() => {
      const response = {
        ...userObj,
        password: faker.internet.password(),
        isActive: true,
        createdAt: "2018-11-28 22:10:54.737",
        __v: 0
      };
      return Promise.resolve(response);
    });
    const result = await authController.register(req, res, next);
    expect(res.json).toHaveBeenCalledTimes(1);
    const expObject = {
      ...userObj,
      token: expect.any(String)
    };

    expect(result.json.mock.calls[0][0].user).toMatchObject(expObject);

    User.findOne.mockRestore();
    User.create.mockRestore();
  });

  it("should require unique username", async () => {
    const { req, res, next } = setup();
    req.body = {
      username: userObj.username,
      password: faker.internet.password()
    };
    jest.spyOn(User, "findOne");
    User.findOne.mockImplementationOnce(() => {
      return Promise.resolve(userObj);
    });
    await authController.register(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { username: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
    User.findOne.mockRestore();
  });
});

describe("login", () => {
  it("should require username to login", async () => {
    const { req, res, next } = setup();
    req.body = { password: faker.internet.password() };
    await authController.login(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { username: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });
  it("should require password to login", async () => {
    const { req, res, next } = setup();
    req.body = { username: faker.internet.userName() };
    await authController.login(req, res, next);
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      errors: { password: expect.any(String) }
    });
    expect(res.json.mock.calls[0][0]).toMatchSnapshot();
  });
  it("should throw passport authenticate error", async () => {
    jest.spyOn(passport, "authenticate");
    const fakeError = new Error("fake error");
    passport.authenticate.mockImplementationOnce((type, options, cb) => {
      cb(fakeError);
    });
    const { req, res, next } = setup();
    req.body = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    const error = await authController.login(req, res, next).catch(e => e);
    expect(error).toBe(fakeError);
    passport.authenticate.mockRestore();
  });

  it("should login and register with valid credentials", async () => {
    jest.spyOn(passport, "authenticate");

    const loginData = {
      username: faker.internet.userName(),
      password: faker.internet.password()
    };
    const fakeUser = {
      _id: faker.random.uuid(),
      ...loginData
    };

    const fakeToken = getUserToken(fakeUser);

    passport.authenticate.mockImplementationOnce((type, options, cb) => {
      cb(null, fakeUser);
    });
    const { req, res, next } = setup();
    req.body = loginData;
    await authController.login(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({
      user: { _id: fakeUser._id, token: fakeToken, username: fakeUser.username }
    });
    passport.authenticate.mockRestore();
  });
});
