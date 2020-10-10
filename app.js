const express = require('express')
const path = require('path')

const app = express()
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'Online Library')))
app.get('/ping', (req, res, next)=> {
	res.render('ping', {title:'Pong!'})
})

module.exports = app