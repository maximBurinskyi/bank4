const express = require('express');
const {deposit, createNewAccount, withdraw, balance, transfer, createNewBank} = require('../db')
const db = require('../db');


exports.getBanks = async (req, res) => {
    const allBanks = await db.query(`SELECT * FROM bank`)
    res.json(allBanks.rows);
}

exports.getOneBank = async (req, res) => {
    const id = req.params.id;
    const oneBank = await db.query(`SELECT * FROM bank WHERE id = $1`, [id])
    res.json(oneBank.rows);
}

exports.createBank = async (req, res) => {
    const {name} = req.body;
    const newBank = await db.query('INSERT INTO bank(name) values ($1) RETURNING *', [name])
    res.json(newBank.rows[0]);
}

exports.updateBank = async (req, res) => {
    const id = req.params.id;
    const {name} = req.body;
    const updatedBank = await db.query(`UPDATE bank SET name = $1 WHERE id = $2 RETURNING *`, [name, id])
    res.json(updatedBank.rows[0]);
}

exports.deleteBank = async (req, res) => {
    const id = req.params.id;
    const deletedBank = await db.query(`DELETE FROM bank WHERE id = $1`, [id])
    res.json('Bank deleted successfully');
}