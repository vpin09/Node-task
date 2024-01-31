const path = require('path');
const express = require('express');
const router=express.Router();
const ethers = require('ethers');
const userController=require("../controler/userController")
router.get('/balance/:contractAdd/:address',userController.getBal)
router.get('/getTokens/:address/:chain',userController.getTokens)
module.exports=router;