const express = require('express');
const { createNewAccount, balance, transfer} = require('./db');
const accountRouter = require('./routes/accountRoutes');
const transactionRouter = require('./routes/transactionsRoutes');
const bankRouter = require('./routes/bankRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const deposit = require('./db2');
const withdraw = require('./db3');
const swaggerUI = require('swagger-ui-express');
const swaggerJson = require('./swagger.json');


const PORT = +process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/api/account', accountRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/bank', bankRouter);
app.use('/api/category', categoryRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson))

app.post('/create', (req, res) => {
    createNewAccount(req.body, (msg) => {
        res.json({'sts': 'success', msg})
    })
})

app.post('/deposit', (req, res) => {
    deposit(req.body, (msg) => {
        res.json({'sts': 'success', msg})
    })
})

app.post('/withdraw', (req, res) => {
    withdraw(req.body, (msg) => {
        res.json({'sts' : 'success', msg})
    })
})


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
