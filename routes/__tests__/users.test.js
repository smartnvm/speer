const request = require("supertest");
const should = require("should");
const generateApp = require("../../application");

const usersdB = require("../../db/test_data/users/users");

describe("----------[Test Users Routes]------------", () => {
  let app;

  beforeAll(() => {
    app = generateApp();
  });

  afterAll(async () => {
    await app.close();
  });

  test("GET /", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        res.body.msg.should.equal("hello world");
      });
    done();
  });

  test("POST /api/login", function (done) {
    const user = {
      username: "aj@smartnvm.com",
      password: "password",
    };

    request(app)
      .post("/api/login")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        const { auth } = res.body;
        auth.should.equal(true);
        done();
      });
    })

  });
