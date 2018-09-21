const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(express.static("client/public"));
// Set up promises with mongoose
mongoose.Promise = global.Promise;

//----edit
// Mongo URI
const mongoURI = "mongodb://localhost/EHF";
const conn = mongoose.createConnection(mongoURI);
//----edit end

//---Passport begin


//---Passport end

mongoose.connect( process.env.MONGODB_URI || mongoURI);
mongoose.connection.on('error', ()=>{
  throw new Error(`unable to connect to database: ${mongoUri}` )
})

const routes = require("./controllers/product_controller");
const routeimg = require("./controllers/image_controller");
app.use(routes);
app.use(routeimg);



//------------------------------------------------------------------------------
// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
