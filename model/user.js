var mongoose = require ("mongoose");

var Schema = mongoose.Schema({
  FirstName: {
    required: true,
    type: String,
  },
  LastName: {
    required: true,
    type: String,
  },
  UserName: {
    required: false,
    type: String,
  },
  Email: {
    type: String,
    required: true,
   
  },
  Mobile: {
    required: true,
    type: Number,
    length: 10,
  },
  Password: {
    required: true,
    type: String,
  },
  OrgName : {
    required : true,
    type : String
},
  created_at: {
    type: Date,
    default: Date.now,
  },
});

Schema.path("Email").validate(async (Email) => {
  const emailCount = await mongoose.models.Signup.countDocuments({ Email });
  return !emailCount;
}, "Email already exists");

var Signup = (module.exports = mongoose.model("Signup", Schema));
module.exports.get = function (callback, limit) {
  Signup.find(callback).limit(limit);
};