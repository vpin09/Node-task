const path = require('path');
const express = require('express');
const Moralis = require('moralis').default;
const ethers = require('ethers');
const abi=require("../abi.json")
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const config=require("../config.json");
async()=>{
    await Moralis.start({
        apiKey: "YdKag5YqBwBn7gdKDEAsvakqxscaaTG66OYisLgsDaLFJ9wwtOdlWN1zbjZqTRxl",
      });
}
const provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/IwTSe9ZwSvUuauG_K9vjRBmrqxntMNyM');

exports.getBal=(async (req, res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("api called");
    const  address  = req.params.address;
    const tokenContractAddress =req.params.contractAdd;
    console.log('address: ', address);
    try {
      const tokenContract = new ethers.Contract(tokenContractAddress, abi, provider);
      const balance = await tokenContract.balanceOf(address);
      const decimals=await tokenContract.decimals()
      const bal=ethers.utils.formatUnits(balance,decimals);

      res.json({  balance: bal.toString() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  exports.getTokens=(async (req, res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    console.log("api called");
    const  address  = req.params.address;
    let chainid=req.params.chain
    // console.log('chainid: ', chainid);
    let chain=EvmChain.MUMBAI;
    // console.log('cofigChain: ', cofigChain);

    try {
        await Moralis.start({
            apiKey: "YdKag5YqBwBn7gdKDEAsvakqxscaaTG66OYisLgsDaLFJ9wwtOdlWN1zbjZqTRxl"
          });
        
          const response = await Moralis.EvmApi.token.getWalletTokenBalances({
            "chain": chain,
            "address": address
          });

         const newres=response.raw.map(token=>({
            token_address: token.token_address,
            symbol: token.symbol,
            balance: token.balance,
            decimals:token.decimals

         }))
          res.json(newres);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });