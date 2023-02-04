const db = require('../db');


exports.getTransactions =  async (req, res) => {
    const transactions = await db.query(`SELECT * FROM transactions2`)
    res.json(transactions.rows);
}

exports.getOneTransaction = async (req, res) => {
    const account_id = req.params.account_id;
    
    const transaction = await db.query(`SELECT * FROM transactions2 where account_id = $1`, [account_id])
    res.json(transaction.rows[0]);
}

exports.addTransaction = async (req, res) => {
    const {amount, account_id} = req.body;
    const id = account_id;
    const newTransaction = await db.query(`INSERT INTO transactions2(amount, account_id) values ($1, $2) RETURNING *`, [amount, id])
    res.json(newTransaction.rows[0]);
}

exports.deleteTransaction = (req, res) => {
    res.send('delete transaction');
}