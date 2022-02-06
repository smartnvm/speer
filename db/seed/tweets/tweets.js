//sites collection
module.exports = [
  {
   id:1,
    authorId: '61ff81d20f7133dc693200e4',
    author:'AJ',
    body: "hello world",
    timestamp: new Date(Date.now() - (3600*24*2*1000)),
  },
  {
    id:2,
    authorId: '61ff81d20f7133dc693200e4',
    author:'AJ',
    body: "Speer Technology backend challenge, pretty cool!",
    timestamp: new Date(Date.now() - ~~(3600*24*1.5*1000)),
  },
  {
    id:3,
    author:'AJ',
    authorId: '61ff81d20f7133dc693200e4',
    body: "the challenge was fun, pretty straight forward interm of what to do - bugs along the way1",
    timestamp: new Date(Date.now() + ~~(Math.random()*3600*24*2*1000)),
  },


];
