import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { oakCors } from "https://deno.land/x/cors@v1.2.1/mod.ts";
import { MongoClient } from 'https://deno.land/x/mongo@v0.22.0/mod.ts';

const port = 8000;
const app = new Application();
// Enable CORS for All Routes
app.use(oakCors());
  
const router = new Router();

interface US_States {
  _id: string;
  pop: number;
  date: string;
  loc_max_x: number;
  loc_min_x: number;
  loc_max_y: number;
  loc_min_y: number;
  confirmed: number;
  deaths: number;
}

// Mongo connect
const client = new MongoClient();
var collection: any;
        
// await client.connect("mongodb://127.0.0.1:27017");
// await client.connect("mongodb+srv://readonly:readonly@covid-19.hip2i.mongodb.net/covid19");
// await client.connectWithUri("mongodb+srv://adminvier:5XZEf0wlY7Iiisjt@cluster0.kuly3.mongodb.net/appag_db?retryWrites=true&w=majority");

await client.connect({
    db: "covid19",
    tls: true,
    servers: [
      { 
        host: "cluster0-shard-00-01.kuly3.mongodb.net", 
        port: 27017 
      }
    ],
    credential: {
      username: "adminvier",
      password: "5XZEf0wlY7Iiisjt",
      db: "covid19",
      mechanism: "SCRAM-SHA-1"
    }
  });

const db = client.database("covid19");
collection = db.collection<US_States>('us_only');

var a:any = [];

// Mongo Aggregat-Funktion
const aggregate = [
// einen Tag herausfiltern
  { $match: { date: { $gte: new Date('2021-03-07'), $lt: new Date('2021-03-08') } } },
// Gruppiere neu: id: US-Staat, Population/US-Staat, date, min/max Geo, confirmed/US-Staat, deaths/US-Staat
  { $group: { _id: "$state", "pop":{$sum: "$population"}, "date": {$max: "$date" },
      "loc_max_x": { $max: { $arrayElemAt: [ "$loc.coordinates", 0 ] } },
      "loc_min_x": { $min: { $arrayElemAt: [ "$loc.coordinates", 0 ] } },
      "loc_max_y": { $max: { $arrayElemAt: [ "$loc.coordinates", 1 ] } },
      "loc_min_y": { $min: { $arrayElemAt: [ "$loc.coordinates", 1 ] } },
      "confirmed": { $sum: "$confirmed" }, "deaths": {$sum: "$deaths" }}},
// Sortiere nach Staaten
  { $sort: { _id: 1 } }
  ];

// Gebe HTTP Funktion aus (GET, POST, UPDATE, DELETE ...)
app.use(async (ctx, next) => {
    console.log(`HTTP ${ctx.request.method} on ${ctx.request.url}`);
    await next();
});

// GET /covid  Mongo Abfrage
router.get('/covid', async (ctx) => {
  var a:any = [];
  await collection.aggregate(aggregate).forEach((x:any) => {a.push(x)});
// Vorsicht Access-Control-Allow-Origin = "*" nur für Testzwecke
// ctx.response.headers.set("Access-Control-Allow-Origin","*");
  ctx.response.headers.set("Server","deno oak");
  ctx.response.status = 200;
  ctx.response.body = {
          success: true,
          data: a
      }
});
// GET /usa  GEO-Daten für Staatsgrenzen
router.get('/usa', async (ctx) => {
  const _file = await Deno.readTextFile('./USA_states_geo.json');
// Vorsicht Access-Control-Allow-Origin = "*" nur für Testzwecke
//  ctx.response.headers.set("Access-Control-Allow-Origin","*");
  ctx.response.headers.set("Server","deno oak");
  ctx.response.status = 200;
  ctx.response.body = {
          success: true,
          data: JSON.parse(_file)
      }
});

app.addEventListener('listen', (s) => {
  console.log(`Listening on localhost:${port}`);
  console.log(s.type);
  console.log(Date());
});

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({ port });
