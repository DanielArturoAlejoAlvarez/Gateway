const mysql = require('mysql')
const db = require('../config/database')
const con = mysql.createConnection(db)

let userModel = {}

userModel.getUsers = (callback)=>{
    if(con) {
        con.query(
            'SELECT * FROM users ORDER BY id', (err, rows)=>{
                if(err) throw err

                callback(null, rows)
            }
        )
    }
}

userModel.getUserById = (id,callback)=>{
    if(con) {
        
        let sql = `SELECT * FROM users WHERE id = ${con.escape(id)}`
        con.query(sql, (err, row)=>{
            if(err) throw err

            callback(null, row)
        })
       
    }
}

userModel.insertUser = (userData, callback)=>{
    if(con) {
        con.query(
            'INSERT INTO users SET ?', userData, (err, result)=>{
                if(err) throw err

                callback(null, {
                    'insertId': result.insertId
                })
            }
        )
    }
}

userModel.updateUser = (userData, callback)=>{
    if(con) {
        const sql = `
            UPDATE users SET
            username = ${con.escape(userData.username)},            
            email = ${con.escape(userData.email)},
            password = ${con.escape(userData.password)}
            WHERE id = ${con.escape(userData.id)}
        `

        con.query(sql, (err, result)=>{
            if(err) {
                throw err
            }else {
                callback(null, {
                    msg: 'SUCCESS'
                })
            }
        })
    }
}

userModel.deleteUser = (id, callback)=>{
    if(con) {
        let sql = `
            SELECT * FROM users WHERE id = ${con.escape(id)}
        `

        con.query(sql, (err, row)=>{
           if(row) {
                let sql2 = `
                    DELETE FROM users WHERE id = ${con.escape(id)}
                `

                con.query(sql2, (err, result)=>{
                    if(err) {
                        throw err
                    } else {
                        callback(null, {
                            msg: 'deleted'
                        })
                    }                
                })
            }else {
                callback(null, {
                    msg: 'not exists'
                })
            }
        })
    }
}


module.exports = userModel