const User = require('../models/user')

module.exports = (app)=>{

    //GET Users
    app.get('/users', (req,res)=>{
        //res.json([])
        User.getUsers((err, data)=>{
            res.status(200).json(data)
        })
    })

    app.get('/users/:UserId', (req,res)=>{
        User.getUserById(req.params.UserId, (err, data)=>{
            res.status(200).json(data)
        })
    })

    //Created Users
    app.post('/users', (req,res)=>{
        //console.log(req.body)
        const userData = ({
            id: null,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: null,
            update_at: null
        })
        User.insertUser(userData, (err, data)=>{
            if(data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'User saved successfully!',
                    data: data
                })
            }else {
                res.status(500).json({
                    success: flase,
                    msg: 'ERROR'
                })
            }
        })
    })

    //Update Users
    app.put('/users/:UserId', (req,res)=>{
        const userData = ({
            id: req.params.UserId,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created_at: null,
            update_at: null
        })
        User.updateUser(userData, (err, data)=>{
            if(data && data.msg) {
                res.status(200).json(data)
            }else {
                res.status(500).json({
                    msg: 'ERROR'
                })
            }
        })
    })

    //Delete Users
    app.delete('/users/:UserId', (req,res)=>{
        User.deleteUser(req.params.UserId, (err, data)=>{
            if(data && data.msg === 'deleted' || data.msg === 'not exists') {
                res.json({
                    success: true,
                    data: data
                })
            }else {
                res.status(500).json({
                    success: false,
                    msg: 'ERROR'
                })
            }
        })
    })
}