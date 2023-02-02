const express = require('express');
const {deposit, createNewAccount} = require('.././db')


exports.create = (req, res) => {
    const data = req.body;
    console.log(data);

    createNewAccount(req.body, (msg) => {
        res.json({'sts' : 'success', msg});
    })
}


exports.getBalance = (req, res) => {

}

exports.deposit = (req, res) => {

   deposit()
}

exports.withdraw = (req, res) => {

}

exports.transfer = (req, res) => {

}