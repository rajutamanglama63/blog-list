const bcrypt = require("bcrypt");
const supertest = require("supertest");

const app = require("../app");
const User = require("../models/userSchema");
const list_helper = require("../utils/list_helper");

const api = supertest(app);

describe("creating environment to test", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);

    const user = new User({
      username: "root",
      name: "John Doe",
      password: passwordHash,
    });

    await user.save();
  }, 10000);

  test.only("check for invalid user", async () => {
    const newUser = {
      name: "so",
      username: "@e",
      password: "000",
    };

    const res = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    //   expect(res.body.name).toBeDefined();

    // expect(res.body.error).toContain("username must be unique");
  });
});
