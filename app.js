const express = require('express');
const { createNewAccount, deposit, withdraw, balance, transfer} = require('./db');
const moneyRouter = require('./routes/moneyRoutes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/api/money', moneyRouter);

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
