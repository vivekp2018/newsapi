//ispassword allowed
//usertojson exclude secure properties
import { isPasswordAllowed, userToJSON } from "../auth";
describe("isPassword allowed", () => {
  const allowedPasswords = ["Test123@", "Hai123!"];
  const disallowedPasswords = ["abc", "1234"];

  allowedPasswords.forEach(password => {
    it(`should allow ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true);
    });
  });

  disallowedPasswords.forEach(password => {
    it(`should disallow ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false);
    });
  });
});

describe("userToJson", () => {
  it("should omit secure properties", () => {
    const returnedUser = {
      id: 1212,
      username: "testuser"
    };
    const user = {
      ...returnedUser,
      createdAt: "2018-01-01",
      password: "$$$$$$$"
    };
    const jsonUser = userToJSON(user);
    expect(jsonUser).toEqual(returnedUser);
  });
});
