const express=require("express");
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const abi=require("./abi.json")
const userRoutes=require('./Routes/user')
const app=express();
 const ethers = require('ethers');
 const PORT=8080;

//  const tokenContractAddress = '0xdDB76ae585Fe95a023ad1c5dC3192654D882b7D7';
//  const tokenContractAddress = '0xdDB76ae585Fe95a023ad1c5dC3192654D882b7D7';


 const tokenABI =abi
 app.use('/user', userRoutes);
 app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
 })