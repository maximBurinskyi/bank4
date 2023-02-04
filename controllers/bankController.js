const express = require('express');
const {deposit, createNewAccount, withdraw, balance, transfer, createNewBank} = require('../db')



exports.createBank = (req, res) => {
    createNewBank(req.body, (msg) => {
        res.json({'sts': 'success', msg})
    })
}