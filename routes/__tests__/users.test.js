const request = require("supertest");
const should = require("should");

const testUsers = require("../../db/data/users/users");
const generateApp = require("../../application");


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

  test("GET /api/login", function (done) {
    request(app)
      .get("/api/login")
      .expect(200)
      .end(function (err, res) {
        const { id, name, email, hash } = res.body;
        id.should.equal(testUsers[0].id);
        name.should.equal(testUsers[0].name);
        email.should.equal(testUsers[0].email);
        hash.should.equal(testUsers[0].hash);
        done();
      });
  });
});
