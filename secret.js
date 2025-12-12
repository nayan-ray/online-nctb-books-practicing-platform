import 'dotenv/config'


 const Mongo_connect_url = process.env.ATLAS_URL;
 
 console.log(Mongo_connect_url);

export { Mongo_connect_url };


