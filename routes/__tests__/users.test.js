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

  beforeEach(async () => {
    await request(app).get("/api/debug/db_reset");
  });

  test("Server Check: GET /", (done) => {
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

  test("POST /api/login check valid user", function (done) {
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


  test("POST /api/login check invalid user", function (done) {

    const user = {
      username: "clement.shum@speer.com",
      password: "password",
    };

    request(app)
      .post("/api/login")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        const { auth } = res.body;
        auth.should.equal(false);
        done();
      });
  })

  test("POST /api/login check invalid password", function (done) {

    const user = {
      username: "clement.shum@speer.io",
      password: "jfalsjfasjf",
    };

    request(app)
      .post("/api/login")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        const { auth } = res.body;
        auth.should.equal(false);
        done();
      });
  })

  test("POST /api/register check with existing user", function (done) {

    const user = {
      username: "clement.shum@speer.io",
      password: "jfalsjfasjf",
    };

    request(app)
      .post("/api/register")
      .send(user)
      .expect(200)
      .end(function (err, res) {
        const { cod } = res.body;
        cod.should.equal(400);
        done();
      });
  })






});
