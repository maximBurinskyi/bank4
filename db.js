const Pool = require('pg').Pool
const {Client} = require('pg');

const client = new Pool({
    host: 'localhost',
    user: 'proooo',
    password: '1234',
    database: 'bank4',
    port: 5433
})

// client.connect( err => {
//     if (err) {
//         console.log('Error In Connectivity')
//         return
//     }
//     console.log('\n Connected Successfully')
// })

const createNewBank = ({id, name}) => {
    client.query(`insert into bank values ( $1, $2)`, [id, name], (err, res) => {
        if (err) console.log('Problem in creating a bank')
        else {
            console.log(`New Bank Created Successfully`)
        }
    })
}

const createNewAccount = ({ id, name, balance }, onCreate = undefined) => {
    client.query(`insert into account values ( $1, $2, $3 )`, [id, name, balance] , (err, res) => {
        if (err) console.log(' Problem in creating a customer')
        else {
            console.log(' New Customer Created Successfully')
            if (onCreate) onCreate(`New Customer Created Successfully`)
            
        } 
    })
}


const withdraw = ({id, amount}, onWithdraw = undefined) => {
    client.query(`select balance from account where id = $1`, [id] , (err, res) => {
        if (err) {
            if (err) console.log('Problem in withdrawing')
        } else {
        const  balance  = parseFloat( res.rows[0].balance )

        const newBalance =  balance - parseFloat( amount)

        client.query(`update account set balance = $1 where id = $2`, [newBalance, id], (err, res) => {
            if (err) console.log(' Problem in withdrawing')
            else  {
                console.log(` Amount ${amount} withdrawn successfully`)
                if (onWithdraw) onWithdraw(`Amount ${amount} withdrawn successfully`)
            }
        })

        client.query(`insert into transactions2 (amount, account_id) values ( $1, $2)`, [amount, id], (err, res) => {
            if (err) console.log(' Problem in transaction')
            else  {
                console.log(` Amount ${amount} transaction inserted successfully`)
                //if (onWithdraw) onWithdraw(`Amount ${amount} of transactions inserted into db successfully`)
            }
        })
    }
    })
}

const deposit2 = ({id, amount}, onDeposit = undefined) => {
    
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
    }
    })
}

const deposit = ({id, amount}, onDeposit = undefined) => {
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
    }
    })
}

const transfer = ({srcId, destId, amount}, onTransfer = undefined) => {
            withdraw({ id : srcId, amount}, msgWd => {
                deposit({ id : destId, amount }, msgDp =>  {
                    if(onTransfer) onTransfer(`Amount ${amount} Transfered successfully `)
                     
                })

            })          
              
}

const balance = (id, onBalance = undefined) => {
    client.query(`select balance from account where id = $1`, [id] , (err, res) => {
        if (err) {
            if (err) console.log(' Problem in fetching balance')
        } else {
        const  balance  = parseFloat( res.rows[0].balance )
        console.log(` Your account balance is : ${balance}`)
        if (balance) onBalance(balance)
        
    }
    })
}


//createNewAccount({acId: 1,acNm: 'abc',balance: 0})

//transfer({ srcId: 2, destId: 1,  amount: 1})

//deposit({acId: 2, amount: 1})


module.exports = 
//{
    client
//     createNewAccount,
//     withdraw,
//     deposit,
//     transfer,
//     balance
// }