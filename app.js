//console.log(29)
const express = require('express');
const port = 3000;
const { createNewAccount, deposit, withdraw, balance, transfer} = require('./db');
const moneyRouter = require('./routes/moneyRoutes');

const app = express();

app.use(express.json());
app.use('/api/money', moneyRouter);

app.get('/', (req, res) => {
    res.send("Hello, World!");
})

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

app.listen(3000)
