const express = require('express')
const path = require('path')
const app = express()
const $ = require('jquery')
var bodyParser = require('body-parser')
const obj = require('./public/scripts/process.js')
const { wordsToNumbers } = require('words-to-numbers')

app.set('views', path.join(__dirname, 'public') + '/views')
app.set('view engine', 'pug')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('index')
})

app.post('/api/answer1', function (req, res) {
  let answer = obj.solverMain(req.body.problem)
  res.render('index', { answer1: answer })
})

app.post('/api/answer2', function (req, res) {
  let problem = []
  problem.push(wordsToNumbers(req.body.problem1))
  problem.push(req.body.operator)
  problem.push(wordsToNumbers(req.body.problem2))

  let newProblem = problem.join(' ')
  let answer = obj.solverMain(newProblem)
  res.render('index', { answer2: answer })
})

app.listen(5000)
