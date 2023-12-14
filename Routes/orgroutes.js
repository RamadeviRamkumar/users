var router = require("express").Router();

const Organization = require("../model/orgmodel.js");

  router.post("/register", async (req, res) => {
    var user = new Organization();
    user.OrgName = req.body.OrgName;
    user.Email = req.body.Email;
    user.ContactNo = req.body.ContactNo;
    user.Address = req.body.Address;
  try {
      await user.save();
      res.status(200).json({
        Code : "SU-09",
        message: "New Company Added",
        data: {
          OrgName: req.body.OrgName,
          ContactNo: req.body.ContactNo,
          Email: req.body.Email,
          Address: req.body.Address,
        },
      });
    } catch (err) {
      res.status(400).json({
        Code : "ER-08",
        message: "In this company already Signup with this page",
        error: err.message,
      });
    }
  });

module.exports = router;