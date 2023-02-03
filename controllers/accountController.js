const express = require('express');
const {deposit, createNewAccount, withdraw, balance, transfer} = require('../db')

exports.create = async (req, res) => {
    const data = req.body;
    console.log(data);

    createNewAccount(req.body, (msg) => {
        res.json({'sts' : 'success', msg});
    })
}

exports.getBalance = async (req, res) => {
    const id = req.params.id;
    balance(id, bal => {
        res.json({'sts' : 'success', bal});
    })
}


exports.deposit = async (req, res) => {
   const id = req.params.id;
   console.log(id);
   const {name, amount} = req.body;

   deposit({id, amount}, (msg) => {
    res.json({'sts' : 'success', msg});
   })
}

exports.withdraw = async (req, res) => {
    const id = req.params.id;
    const {name, amount} = req.body;
    withdraw({id, amount}, (msg) => {
        res.json({'sts' : 'success', msg});
    })
}

exports.transfer = async (req, res) => {

    transfer(req.body, (msg) => {
        res.json({'sts': 'success', msg});
    })
}