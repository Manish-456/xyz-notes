const allowedOrigins = require('./allowedOrigin');

const corsOptions = {
  origin : (origin, callback) => {
    if(allowedOrigins.indexOf(origin) !== -1 || !origin){
        callback(null, true);
    }else{
        callback(new Error("Blocked by the CORS origin policy"))
    }
  },
  credentials : true,
  optionSuccessStatus : 200
}

module.exports = corsOptions;