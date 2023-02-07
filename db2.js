const client = require('./db');

const deposit = ({id, amount, type, category_id}, onDeposit = undefined) => {
    client.query(`select balance from account where id = $1`, [id] , (err, res) => {
        if (err) {
            console.log(' Problem in Deposit')
        } else {
        const  balance  = parseFloat( res.rows[0].balance )

        const newBalance =  balance + parseFloat(amount)

        client.query(`update account set balance = $1 where id = $2`, [newBalance, id], (err, res) => {
            if (err) console.log('/n Problem in Depositing')
            else {
                console.log(` Amount ${amount} Deposited successfully`)

                if (onDeposit) onDeposit(`Amount ${amount} Deposited successfully`)

            }
             
        })

         client.query(`insert into transactions3 (amount, account_id, type, category_id) values ( $1, $2, $3, $4)`, [amount, id, type, category_id], (err, res) => {
            if (err) console.log(' Problem in transaction')
            else  {
                console.log(` Amount ${amount} transaction inserted successfully`)
                //if (onWithdraw) onWithdraw(`Amount ${amount} of transactions inserted into db successfully`)
            }
        })
    }
    })
}




module.exports =  deposit;
