const db = require('../db');
const deposit = require('../db2');
const withdraw = require('../db3');


exports.getTransactions =  async (req, res) => {
    const transactions = await db.query(`SELECT * FROM transactions`)
    res.json(transactions.rows);
}

exports.getOneTransaction = async (req, res) => {
    const id = req.params.id;
    //const id = req.params.id;
    const account_id = id;
    console.log(id);

    const transaction = await db.query(`SELECT * FROM transactions where account_id = $1`, [account_id])
    res.json(transaction.rows);
}

exports.addTransaction = async (req, res) => {
    const {amount, account_id, type, category_id} = req.body;
    const id = account_id;
    if (type === 'profitable') {
        deposit({id, amount, type, category_id}, (msg) => {
            res.json({'sts' : 'success', msg});
        })
    } else {
        withdraw({id, amount, type, category_id}, (msg) => {
            res.json({'sts' : 'success', msg});
        })
    }
    // const newTransaction = await db.query(`INSERT INTO transactions3(amount, account_id, type, category_id) values ($1, $2, $3, $4) RETURNING *`, [amount, id, type, category_id])
    // res.json(newTransaction.rows[0]);
}

// exports.addTransaction = async (req, res) => {
//     const {amount, account_id, type, category_id} = req.body;
//     const id = account_id;
//     const newTransaction = await db.query(`INSERT INTO transactions3(amount, account_id, type, category_id) values ($1, $2, $3, $4)`, [amount, id, type, category_id], (err, res) => {
//         await db.query()
//     })
//     res.json(newTransaction.rows[0]);
// }


exports.deleteTransaction = async (req, res) => {
    const id = req.params.id;
    await db.query('DELETE FROM transactions where account_id =$1', [id])
    res.json({msg: "Transaction deleted successfully"})
    //res.send('delete transaction');
}

exports.getTransactionStats = async (req, res) => {
    id = req.params.id;
    const {fromPeriod, toPeriod} = req.body;
    const stats = await db.query(`SELECT category.id, category.name, transactions3.amount, transactions3.date FROM category  JOIN transactions3
     ON category.id = transactions3.category_id WHERE transactions3.category_id = $1 AND transactions3.date BETWEEN $2 AND $3`, [id, fromPeriod, toPeriod])
    res.json(stats.rows);
}

// exports.getTransactionStats2 = async (req, res) => {
//     id = req.params.id;
//     const {fromPeriod, toPeriod} = req.body;
//     const stats = await db.query(`SELECT c.name, s.sum_transactions
//     FROM category AS c
//     JOIN (SELECT SUM(amount) AS sum_transactions, category_id FROM transactions3 GROUP BY category_id) AS s
//     ON c.id = s.category_id        WHERE s.category_id = $1
    
    
//     `, [id])
//     res.json(stats.rows);
// }






// exports.getTransactionStats = async (req, res) => {
//     id = req.params.id;
//     const {fromPeriod, toPeriod} = req.body;
//     const stats = await db.query(`SELECT c.name, s.sum_transactions
//     FROM category AS c
//     JOIN (SELECT SUM(amount) AS sum_transactions, category_id FROM transactions3 GROUP BY category_id) AS s
//     ON c.id = s.category_id
//     JOIN transactions3 AS t
//     ON t.category_id = c.id     WHERE s.category_id = $1 AND t.date BETWEEN $2 AND $3 `, [id, fromPeriod, toPeriod])
//     res.json(stats.rows);
// }


