require('dotenv').config()
const express = require('express')
const path = require('path')

const userRoutes = require('./routes/user')

const app = express()
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'Online Library')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(userRoutes)

app.get('/ping', (req, res, next)=> {
	res.render('ping', {title:'Pong!'})
})

module.exports = app