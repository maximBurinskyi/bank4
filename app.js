const express = require('express');
const { createNewAccount, deposit, withdraw, balance, transfer} = require('./db');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionsRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/account', accountRouter);
app.use('/api/transaction', transactionRouter);

app.post('/create', (req, res) => {
    createNewAccount(req.body, (msg) => {
        res.json({'sts': 'success', msg})
    })
})

app.get('/balance/:id', (req, res) => {
    const acId = req.params.id;
    console.log(acId)
    res.send('ljlsjd')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
