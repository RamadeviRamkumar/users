var router = require("express").Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("Rama");
const bcryptjs = require("bcryptjs");

const jwt = require('jsonwebtoken');

const jwtSecretKey = 'your-secret-key';
const expiresIn = '1d'; 

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      Code: 'ER-06',
      message: 'Missing token',
    });
  }
jwt.verify(token, jwtSecretKey, (err, user) => {
    if (err) {
      return res.status(401).json({
        Code: 'ER-06',
        message: 'Invalid token',
      });
    }
    req.user = user;
    next();
  });
};

router.post('/login', async (req, res) => {
  try {
    const { UserName, OrgName, Password } = req.body;
    const org = await Organization.findOne({ OrgName });
      if (!org) {
      return res.status(404).json({
        Code: 'ER-01',
        message: 'Organization not found. Staff sign-in denied.',
      });
    }
  const user = await Signup.findOne({ UserName });
  if (!user) {
      return res.status(404).json({
        Code: 'ER-02',
        message: 'User not found',
      });
    }
    const decryptedPassword = cryptr.decrypt(user.Password);

    if (decryptedPassword === Password) {
      const token = jwt.sign(
        { userId: user._id, UserName: user.UserName },
        jwtSecretKey,
        { expiresIn: '1d' }
      );

      return res.json({
        message: 'Sign-in successful',
        data: user,
        token,
      });
    } else {
      return res.status(401).json({
        Code: 'ER-03',
        message: 'Incorrect password',
      });
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return res.status(500).json({
      Code: 'ER-04',
      message: 'An error occurred',
      error: error.message,
    });
  }
});
router.post('/logout', authenticateToken, (req, res) => {
  const { token } = req.body;
return res.json({
    Code: 'SU-03',
    message: 'Logout successful',
  });
});

router.get('/protected', authenticateToken, (req, res) => {
  return res.json({
    Code: 'SU-04',
    message: 'Protected route accessed',
  });
});

const Signup = require("../model/user.js");
const Organization = require("../model/orgmodel.js");

router.post("/Signup", async (req, res) => {
var cryptr = new Cryptr("Rama");
var enc = cryptr.encrypt(req.body.Password);
var dec    = cryptr.decrypt(enc);
var user   = new Signup();
user.FirstName = req.body.FirstName;
user.LastName  = req.body.LastName;
user.UserName  = req.body.UserName;
user.Email     = req.body.Email;
user.Mobile    = req.body.Mobile;
user.OrgName   = req.body.OrgName;
user.Password  = enc;
try {
  await user.save();
  res.status(200).json({
      Code : "SU-01",
Message : "Signup Successfully",
data : {
  FirstName : req.body.FirstName,
  LastName  : req.body.LastName,
  UserName  : req.body.UserName,
  Email     : req.body.Email,
  Mobile    : req.body.Mobile,
  OrgName   : req.body.OrgName,
  Password  : enc,
},
});
} catch (error) {
  console.log(error)
  return res.status(200).json({
      Code : "ER-07",
    message: "An error occurred",
    error: error.message,
  });
}
}); 

module.exports = router;