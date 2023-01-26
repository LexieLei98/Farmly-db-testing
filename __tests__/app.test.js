const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const Farm = require("../models/farm.model")
const Produce = require('../models/produce.model')
const User = require('../models/user.model')
require("dotenv").config();

const seedFarms = [
    {
        "name": "Chyreen Fruit Farm",
        "address": {
            "street":"Quenchwell Rd",
            "town": "Carnon Downs",
            "county" :"Truro",
            "postcode": "TR3 6LN",
            "country": "United Kingdom"
        },
        "description": "We are a small farm specialising in fresh, quality produce for our customers. We mainly grow outdoor fruit. The majority of our produce is sold ready picked, direct to the public from our shop along with a selection of locally grown fresh vegetables.",
        "profile_pic": "http://www.chyreenfruitfarm.co.uk/web_logo.gif",
        "rating": [],
        "farm_id":1,
        "distance_from_location": 0
    },
    {
        "name": "Hewitts Farm",
        "address": {
            "street":"Court Road",
            "town": "Bromley, Chelsfield",
            "county" :"Orpington, London",
            "postcode": "BR6 7QL",
            "country": "United Kingdom"
        },
        "description": "Hewitts Farm is a family run business set in 78 acres, just outside of Orpington, Kent. We grow a wide variety of fruits and vegetables for 'Pick your own' and also have a large selection for sale throughout the year in our farm shop.",
        "profile_pic": "https://lirp.cdn-website.com/3f2c01d3/dms3rep/multi/opt/image0-410w.jpeg",
        "rating": [],
        "farm_id":2,
        "distance_from_location": 0
    },
    {
        "name": "Stanhill Farm",
        "address":{
            "street":"Birchwood Road",
            "town": "Wilmington",
            "county" :"Dartford Kent",
            "postcode": "DA2 7HD",
            "country": "United Kingdom"
        },
        "description": "The Farm harvests wheat and a number of different fruit and vegetables; around 20-30 varieties each year. ",
        "profile_pic": "https://www.stanhillfarm.co.uk/sites/all/themes/stanhill/logo.png?bnew",
        "rating": [],
        "farm_id":3,
        "distance_from_location": 0
    }
]

const seedProduce = [{
    "name":"Pink Lady Apples",
    "category": "fruits",
    "stock": 10,
    "price": 5,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 1,
    "produce_id": 1,
},
{
    "name":"Granny Smith Apples",
    "category": "fruits",
    "stock": 10,
    "price": 7,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 1,
    "produce_id": 2,
},
{
    "name":"Bananas",
    "category": "fruits",
    "stock": 10,
    "price": 5,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 2,
    "produce_id": 3,
},
{
    "name":"Raspberries",
    "category": "fruits",
    "stock": 10,
    "price": 4,
    "unit":"box",
    "description": "nice juicy dont miss out",
    "farm_id": 2,
    "produce_id": 4,
},
{
    "name":"Rhubarb",
    "category": "vegetables",
    "stock": 10,
    "price": 1.5,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 3,
    "produce_id": 5,
},
{
    "name":"Plums",
    "category": "fruits",
    "stock": 9,
    "price": 1.5,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 3,
    "produce_id": 6,
},
{
    "name":"Cherries",
    "category": "fruits",
    "stock": 14,
    "price": 3.5,
    "unit":"300g",
    "description": "nice juicy dont miss out",
    "farm_id": 3,
    "produce_id": 7,
}]

const seedUsers = [{
      "username": 'farmlee@gmail.com',
      "postcode":"E14 5GL",
      "type": "Farmer",
      "profile_pic":"https://static.vecteezy.com/system/resources/previews/011/030/440/original/carrot-cartoon-character-png.png",
      "password": "farm123",
      "user_id": 1
    },
    {
        "username": 'userlee@gmail.com',
        "postcode":"SW8 2JU",
        "type": "User",
        "profile_pic":"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "password": "user123",
        "user_id": 2
      }
]

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/test');
    await Farm.deleteMany({});
    await Produce.deleteMany({});
    await User.deleteMany({});
    await Farm.insertMany(seedFarms);
    await Produce.insertMany(seedProduce);
    await User.insertMany(seedUsers);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api for all non-existent routes in app', () => {
    test('404: non existent path', () => {
        return request(app)
        .get('/not-a-route')
        .expect(404)
        .then((body) => {
            console.log(body)
        })
    })
});

  describe('POST /api/farms', () => {
    test('status:201 returns posted farm', () => {
        const newFarm = {
            "name": "Andreas Veggie Farm",
            "address": {
                "street":"Quenchwell Rd",
                "town": "Carnon Downs",
                "county" :"Truro",
                "postcode": "TR3 6LN",
                "country": "United Kingdom"
            },
            "description": "We are a small farm specialising in fresh, quality produce for our customers. We mainly grow outdoor fruit. The majority of our produce is sold ready picked, direct to the public from our shop along with a selection of locally grown fresh vegetables.",
            "profile_pic": "http://www.chyreenfruitfarm.co.uk/web_logo.gif",
            "rating": [],
            "farm_id": 10,
            "distance_from_location": 0
        }
        return request(app)
        .post('/api/farms')
        .send(newFarm)
        .expect(201)
        .then(({body}) => {
            expect(body).toMatchObject({
                "name": "Andreas Veggie Farm",
                "address": {
                    "street":"Quenchwell Rd",
                    "town": "Carnon Downs",
                    "county" :"Truro",
                    "postcode": "TR3 6LN",
                    "country": "United Kingdom"
                },
                "description": "We are a small farm specialising in fresh, quality produce for our customers. We mainly grow outdoor fruit. The majority of our produce is sold ready picked, direct to the public from our shop along with a selection of locally grown fresh vegetables.",
                "profile_pic": "http://www.chyreenfruitfarm.co.uk/web_logo.gif",
                "rating": [],
                "farm_id": 10,
                "distance_from_location": 0
            })
        })
    })

    test('status:400 returns Bad Request when missing keys in the body', () => {
        const newFarm = {};
        return request(app)
        .post('/api/farms')
        .send(newFarm)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Bad Request!')
        })
    })
})
  
  describe('GET /api/farms', () => {
    test('status:200, returns the array of farms objects', () => {
        return request(app)
        .get('/api/farms')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeInstanceOf(Array)
            expect(body).toHaveLength(3);
            body.forEach((farm) => {
                expect.objectContaining({
                    name: expect.any(String),
                    address: expect.any(Object),
                    description: expect.any(String),
                    profile_pic: expect.any(String),
                    rating: expect.any(Array),
                    produce: expect.any(Array),
                })
            })
        })
    })
})

  describe('GET /api/farms/:farm_id', () => {
    test('status:200, returns the object of a specific farm', () => {
        const ID = 1;
        return request(app)
        .get(`/api/farms/${ID}`)
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(
                expect.objectContaining({
                    "name": "Chyreen Fruit Farm",
                    "address": {
                        "street":"Quenchwell Rd",
                        "town": "Carnon Downs",
                        "county" :"Truro",
                        "postcode": "TR3 6LN",
                        "country": "United Kingdom"
                    },
                    "description": "We are a small farm specialising in fresh, quality produce for our customers. We mainly grow outdoor fruit. The majority of our produce is sold ready picked, direct to the public from our shop along with a selection of locally grown fresh vegetables.",
                    "profile_pic": "http://www.chyreenfruitfarm.co.uk/web_logo.gif",
                    "rating": [],
                    "farm_id": 1
                })
            )
            })
    })

    test('status:200, returns the object of a specific farm', () => {
        const ID = 2;
        return request(app)
        .get(`/api/farms/${ID}`)
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(
                expect.objectContaining({
                    "name": "Hewitts Farm",
                    "address": {
                        "street":"Court Road",
                        "town": "Bromley, Chelsfield",
                        "county" :"Orpington, London",
                        "postcode": "BR6 7QL",
                        "country": "United Kingdom"
                    },
                    "description": "Hewitts Farm is a family run business set in 78 acres, just outside of Orpington, Kent. We grow a wide variety of fruits and vegetables for 'Pick your own' and also have a large selection for sale throughout the year in our farm shop.",
                    "profile_pic": "https://lirp.cdn-website.com/3f2c01d3/dms3rep/multi/opt/image0-410w.jpeg",
                    "rating": [],
                    "farm_id":2
                })
            )
            })
    })

    test('status:400, returns the bad request message when farm id is not vaild', () => {
        return request(app)
        .get('/api/farms/snow')
        .expect(400)
        .then((res) => {
            expect(res.body.msg).toBe('Bad Request!')
        })
    })

    test('status:404, returns the bad request message when farm id is vaild but no data for this farm', () => {
        return request(app)
        .get('/api/farms/999')
        .expect(404)
        .then((res) => {
            expect(res.body.msg).toBe('Not Found!')
        })
    })
})

describe('PATCH /api/produce/:id', () => {
    test('200: responds with newly updated produce', () => {
        const ID = 1;
        return request(app)
        .patch(`/api/produce/${ID}`)
        .send({"price": 6})
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(
                expect.objectContaining({
                    "name": expect.any(String),
                    "category": expect.any(String),
                    "stock": expect.any(Number),
                    "price": 6,
                    "unit":expect.any(String),
                    "description": expect.any(String),
                    "farm_id": expect.any(Number),
                    "produce_id": 1,
                })
            )
            })
    });
    test('200: responds with newly updated produce, ignoring extra properties', () => {
        const ID = 1;
        return request(app)
        .patch(`/api/produce/${ID}`)
        .send({
            "price": 3,
            "hello": 50
            })
        .expect(200)
        .then(({body}) => {
            expect(body).toEqual(
                expect.objectContaining({
                    "name": expect.any(String),
                    "category": expect.any(String),
                    "stock": expect.any(Number),
                    "price": 3,
                    "unit":expect.any(String),
                    "description": expect.any(String),
                    "farm_id": expect.any(Number),
                    "produce_id": 1,
                })
            )
        })
    });
    test('404: valid id but does not exist, respond appropriately', () => {
        return request(app)
        .patch('/api/produce/77')
        .send({price: 1})
        .expect(404)
        .then(( {body} ) => {
            expect(body.msg).toBe("Not Found!")
        })
    });
    test('400: invalid id, respond appropriately', () => {
        return request(app)
        .patch('/api/produce/apples')
        .send({price: 50})
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe("Bad Request!")
        })
    });
    test('400: missing keys', () => {
        return request(app)
        .patch('/api/produce/1')
        .send({})
        .expect(400)
        .send(({body}) => {
            expect(body.msg).toBe("Bad Request!")
        })
    });
    test('400: invalid key', () => {
        return request(app)
        .patch('/api/produce/1')
        .send({"price": "three pounds"})
        .expect(400)
        .send(( {body} ) => {
            expect(body.msg).toBe("Bad Request!")
        })
    });
    
})

describe('DELETE /api/produce/:id', () => {
    test('204: responds with no content', () => {
        const ID = 1;
        return request(app)
        .delete(`/api/produce/${ID}`)
        .expect(204)
    });
    test('status:400, returns bad request when id is not valid', () => {
        return request(app)
        .delete('/api/produce/example')
        .expect(400)
        .then((res) => {
            expect(res.body.msg).toBe('Bad Request!')
        })
    });
    test("status:404, returns not found when produce id is valid but doesn't exist", () => {
        return request(app)
        .delete('/api/produce/999')
        .expect(404)
        .then((res) => {
            expect(res.body.msg).toBe('Not Found!')
        })
    });
})

  describe("PATCH /api/farms/:farm_id", () => {
    test("200: returns updated farm object, with nested object", () => {
        const ID = 1
        const updateBody = { 
            address: {
                street: "Test Road",
                town: "Test Town",
                county: "Testland",
                postcode: "SW8 2JU",
                country: "Vietnam"
            }
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(200)
        .then(( {body } ) => {
            expect(body).toEqual(expect.objectContaining({
                address: {
                    street: "Test Road",
                    town: "Test Town",
                    county: "Testland",
                    postcode: "SW8 2JU",
                    country: "Vietnam"
                }
            }))
        })
    })
    test("200: returns updated farm object, patched with 1 nested key value pair", () => {
        const ID = 1
        const updateBody = { 
            address: {
                street: "Test Road",
            }
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(200)
        .then(( {body } ) => {
            expect(body).toEqual(expect.objectContaining({
                address: {
                    street: "Test Road",
                }
            }))
        })
    })
    test("200: returns updated farm object", () => {
        const ID = 1
        const updateBody = { 
            name: "Josh new farm",
            address: {
                street: "Test Road",
                town: "Test Town",
                county: "Testland",
                postcode: "SW8 2JU",
                country: "Vietnam"
            }
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(200)
        .then(( {body } ) => {
            expect(body).toEqual(expect.objectContaining({
                name: "Josh new farm",
                address: {
                    street: "Test Road",
                    town: "Test Town",
                    county: "Testland",
                    postcode: "SW8 2JU",
                    country: "Vietnam"
                }
            }))
        })
    })
    test("200: returns updated farm object, with 2 key value pairs", () => {
        const ID = 1
        const updateBody = { 
            name: "Josh new farm" 
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(200)
        .then(( {body } ) => {
            expect(body).toEqual(expect.objectContaining({
                name: "Josh new farm"
            }))
        })
    })
    test("404: id not found",() => {
        const ID = 99999
        const updateBody = { 
            name: "Josh new farm" 
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(404)
        .then(( {body } ) => {
            expect(body.msg).toBe("Not Found!")
        })
    })
    test("400: non valid idea not found",() => {
        const ID = test
        const updateBody = { 
            name: "Josh new farm" 
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(400)
        .then(( {body } ) => {
            expect(body.msg).toBe("Bad Request!")
        })
    })
    test("400: invalid key", () => {
        const ID = 1
        const updateBody = { 
            HEHEHEHE: "Josh new farm" 
        }
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(400)
        .then(( {body } ) => {
            expect(body.msg).toBe("Bad Request!")
        })
    })
    test("400: empty body", () => {
        const ID = 1
        const updateBody = {}
        return request(app)
        .patch(`/api/farms/${ID}`)
        .send(updateBody)
        .expect(400)
        .then(( {body } ) => {
            expect(body.msg).toBe("Bad Request!")
        })
    })
})


describe('DELETE /api/farms/:farm_id', () => {
    test('status:204 responds with an empty response body', () => {
        return request(app)
        .delete('/api/farms/1')
        .expect(204)
    })

    test('status:404 returns Bad Request when the farm id is vaild but no data to this farm', () => {
        return request(app)
        .delete('/api/farms/999')
        .expect(404)
        .then((res) => {
            expect(res.body.msg).toBe('Not Found!')
        })
    })

    test('status:400 returns Bad Request when the farm id is invaild', () => {
        return request(app)
        .delete('/api/farms/snow')
        .expect(400)
        .then((res) => {
            expect(res.body.msg).toBe('Bad Request!')
        })
    })
})

describe('GET /api/produce', () => {
    test('status:200, returns the array of farms objects', () => {
        return request(app)
        .get('/api/produce')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeInstanceOf(Array)
            expect(body).toHaveLength(7);
            body.forEach((produce) => {
                expect.objectContaining({
                    name: expect.any(String),
                    address: expect.any(Object),
                    description: expect.any(String),
                    profile_pic: expect.any(String),
                    rating: expect.any(Array),
                    produce: expect.any(Array),
                    produce_id: expect.any(Number),
                    farm_id: expect.any(Number),
                })
            })
        })
})
})

describe('GET /api/produce/:produce_id', () => {
    test('status:200, returns the object of a specific farm', () => {
        const PRODUCE_ID = 1;
        return request(app)
        .get(`/api/produce/${PRODUCE_ID}`)
        .expect(200)
        .then(({body}) => {
            expect(body[0]).toEqual(
                expect.objectContaining({
                    "name":"Pink Lady Apples",
                    "category": "fruits",
                    "stock": 10,
                    "price": 5,
                    "unit":"300g",
                    "description": "nice juicy dont miss out",
                    "farm_id": 1,
                    "produce_id": 1,
                })
     
        )
    })
})
test('status:400, returns the bad request message when farm id is not vaild', () => {
    return request(app)
    .get('/api/produce/snow')
    .expect(400)
    .then((res) => {
        expect(res.body.msg).toBe('Bad Request!')
    })
})

test('status:404, returns the bad request message when farm id is vaild but no data for this farm', () => {
    return request(app)
    .get('/api/produce/999')
    .expect(404)
    .then((res) => {
        expect(res.body.msg).toBe('Not Found!')
    })
})
}
)
describe('POST /api/produce', () => {
    test('status:201 returns posted produce', () => {
        const newProduce = {
            "name":"broccoli",
            "category": "vegetables",
            "stock": 12,
            "price": 1.2,
            "unit":"300g",
            "description": "nice veg dont miss out",
            "farm_id": 2,
            "produce_id": 8,
        }
        return request(app)
        .post('/api/produce')
        .send(newProduce)
        .expect(201)
        .then(({body}) => {
            expect(body).toMatchObject({
                "name":"broccoli",
                "category": "vegetables",
                "stock": 12,
                "price": 1.2,
                "unit":"300g",
                "description": "nice veg dont miss out",
                "farm_id": 2,
                "produce_id": 8,
            })
        })
    })

    test('status:400 returns Bad Request when missing keys in the body', () => {
        const newProduce = {};
        return request(app)
        .post('/api/produce')
        .send(newProduce)
        .expect(400)
        .then(({body}) => {
            expect(body.msg).toBe('Bad Request!')
        })
    })
})

describe('POST /api/users', () => {
    test('status 201 returns posted user', () => {
        const newUser = {
            "username": 'farmlee@gmail.com',
            "postcode":"E14 5GL",
            "type": "Farmer",
            "profile_pic":"https://static.vecteezy.com/system/resources/previews/011/030/440/original/carrot-cartoon-character-png.png",
            "password": "farm123",
            "user_id": 4
          }
        return request(app)
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .then(({body}) => {
            expect(body).toMatchObject({
                "username": 'farmlee@gmail.com',
                "postcode":"E14 5GL",
                "type": "Farmer",
                "profile_pic":"https://static.vecteezy.com/system/resources/previews/011/030/440/original/carrot-cartoon-character-png.png",
                "password": "farm123",
                "user_id": 4
              })
        })
    })
})

describe('GET /api/users', () => {
    test('status:200, returns the array of users', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then(({body}) => {
            expect(body).toBeInstanceOf(Array)
            expect(body).toHaveLength(2);
            body.forEach((user) => {
                expect.objectContaining({
                    username: expect.any(String),
                    postcode: expect.any(String),
                    type: expect.any(String),
                    profile_pic: expect.any(String),
                    password: expect.any(String),
                    user_id: expect.any(Number),
                })
            })
        })
    })
})