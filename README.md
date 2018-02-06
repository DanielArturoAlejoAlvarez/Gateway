# Gateway
## Description

This repository serves as a API REST of development in JavaScript, created with Nodejs, Express, MySQL.

## Installation

Install packages:
```html
$ npm install
```

## Usage
```html
$ git clone https://github.com/DanielArturoAlejoAlvarez/Gateway.git [NAME APP]
```
Follow the following steps and you're good to go! Important:


Start server to our API (includes auto refreshing):

```html
$ cd [NAME APP]
$ npm start
```


![alt text](https://media.giphy.com/media/NEFzcD7B7ge9a/giphy.gif)

## Coding

### Model

```javascript
...
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

...
```

### Routing
```javascript
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

```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/Gateway. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

