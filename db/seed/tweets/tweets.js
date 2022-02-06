//sites collection
module.exports = [
  {
    id: 1,
    authorId: '61ff81d20f7133dc693200e4',
    author: 'AJ',
    body: "hello world",
    timestamp: new Date(Date.now() - (3600 * 24 * 2 * 1000)),
    archive: false,
  },
  {
    id: 2,
    authorId: '61ff81d20f7133dc693200e4',
    author: 'AJ',
    body: "Speer Technology backend challenge, pretty cool!",
    timestamp: new Date(Date.now() - ~~(3600 * 24 * 1.5 * 1000)),
    archive: false,
  },
  {
    id: 3,
    author: 'AJ',
    authorId: '61ff81d20f7133dc693200e4',
    body: "the challenge was fun, pretty straight forward interm of what to do - bugs along the way1",
    timestamp: new Date(Date.now() + ~~(Math.random() * 3600 * 24 * 2 * 1000)),
    archive: false,
  },

  {
    id: 4,
    author: 'Bot',
    body: "hello world - ",
    authorId: '61ff982feda21347c358beef',
    timestamp: "2022-02-06T09:56:58.976Z",
    archive: false,
  },
  {
    id: 5,
    author: 'Poet',
    body: "lorem ipsum blue moon",
    authorId: '61ff982feda21347c358a550',
    timestamp: "2022-02-06T09:57:00.470Z",
    archive: false,
  },
  {
    id: 6,
    author: 'The Eagles',
    body: "up ahead in the distance, i saw a shimmering light... you can check anytime you want... but you can never leaaaaaave",
    authorId: '61ff982feda21347c3589db9',
    timestamp: "2022-02-06T09:57:02.428Z",
    archive: false,
  },


];
