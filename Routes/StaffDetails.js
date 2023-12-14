var router = require("express").Router();
const Cryptr = require("cryptr");
const cryptr = new Cryptr("Employee");
const bcryptjs = require("bcryptjs");

const AddStaff       = require("../model/staffmodel.js");
router.post("/Add-Staff", async (req, res) => {
var cryptr = new Cryptr("Employee");
var enc    = cryptr.encrypt(req.body.Password);
var dec    = cryptr.decrypt(enc);
var user   = new AddStaff();
      user.Name          = req.body.Name;
      user.UserName      =req.body.UserName;
      user.Empid         = req.body.Empid;
      user.Gender        = req.body.Gender;
      user.DateOfBirth   = req.body.Dateofbirth;
      user.DateOfJoining = req.body.DateofJoining;
      user.ContactNo     = req.body.ContactNo;
      user.Email         = req.body.Email;
      user.Address       = req.body.Address;
      user.Designation   = req.body.Designation;
      user.OrgName       = req.body.OrgName;
      user.BankName      =req.body.BankName;
      user.Branch        = req.body.Branch;
      user.Ifsc          = req.body.Ifsc;
      user.AccountNo     = req.body.AccountNo;
      user.Salary        = req.body.Salary;
      user.MaritalStatus = req.body.MaritalStatus;
      user.Status        = req.body.Status;
      user.Password      = enc;
      user.City          = req.body.City;
      user.State         = req.body.State;
      user.Pincode       = req.body.Pincode;
      user.BloodGroup    = req.body.BloodGroup;
      user.Usertype      = req.body.Usertype;
try {
        await user.save();
        res.status(200).json({
            Code : "SU-01",
      Message : "Registration Successful",
      data : {
      UserName      : req.body.UserName,
      Name          : req.body.Name,
      Empid         : req.body.Empid,
      Gender        : req.body.Gender,
      DateOfBirth   : req.body.DateOfBirth,
      MaritalStatus : req.body.MaritalStatus,
      DateOfJoining : req.body.DateOfJoining,
      ContactNo     : req.body.ContactNo,
      Email         : req.body.Email,
      Designation   : req.body.Designation,
      Address       : req.body.Address,
      City          : req.body.City,
      State         : req.body.State,
      Pincode       : req.body.Pincode,
      BloodGroup    : req.body.BloodGroup,
      OrgName       : req.body.OrgName,
      BankName      : req.body.BankName,
      Branch        : req.body.Branch,
      Ifsc          : req.body.Ifsc,
      AccountNo     : req.body.AccountNo,
      Salary        : req.body.Salary,
      Usertype      : req.body.Usertype,
      Password: enc,
        },
    });
} catch (error) {
    console.log(error)
    return res.status(500).json({
        Code : "ER-08",
      message: "An error occurred",
      error: error.message,
    });
  }
});  
module.exports = router;