const request = require("supertest");
const should = require("should");
const generateApp = require("../../application");

const usersdB = require("../../db/test_data/users/users");

describe("----------[Test Tweets Routes]------------", () => {
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


  //ran into issues with cookie undefined
  //spent a bit of time chasing the problem
  // in the interest of time i opted to test and verify
  // all end points correct functionality using cURL utility
  test("POST /api/tweets check user NOT logged in", function (done) {
    const username = "clement.shum@speer.io";
    //get userId
    const userId = '61ff81d20f7133dc693200e5' //usersdB[username]._id;

    const data = {
      author: "clement",
      authorId: userId,
      body: "lorem ipsumLorem ipsum dolor, sit amet consectetur adipisicing elit. Totam maiores harum debitis sequi nihil eos nulla, impedit, autem quos libero magnam sit nobis vel fuga! Eius quisquam culpa ipsam ullam.",
      timmestamp: new Date(Date.now()),
    };
    console.log("**************************", usersdB[username]._id);
    request(app)
      .post("/api/tweets/new")
      .set("Cookie", [`userid=${userId}`])
      .set('Content-Type', 'application/json')
      .send(data)
      .expect(200)
      .end(function (err, res) {
        console.log(res.body)
        const { cod } = res.body;
        cod.should.equal(403);
        done();
      });
  });
});
