const express = require('express')
const path = require('path')
const app = express()
const $ = require('jquery')
var bodyParser = require('body-parser')
const obj = require('./public/scripts/process.js')
const { wordsToNumbers } = require('words-to-numbers')
const clipboard = import('clipboardy')

app.set('views', path.join(__dirname, 'public') + '/views')
app.set('view engine', 'pug')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.render('index')
})

app.get('/options', function (req, res) {
  let display = {
    index: 'index',
    numbers: true,
    words: false,
    words2: false,
    display: 'numbers',
  }

  if (req.query.display === 'words') {
    display.index = 'index2'
    display.numbers = false
    display.words = true
    display.words2 = false
    display.display = 'words'
  }

  if (req.query.display === 'words2') {
    display.index = 'index3'
    display.numbers = false
    display.words = false
    display.words2 = true
    display.display = 'words2'
  }

  res.render(display.index, display)
})

app.post('/api/answer1', function (req, res) {
  let answer = obj.solverMain(req.body.problem)
  res.render('index', { answer1: answer, display: 'numbers', numbers: true })
})

app.post('/api/answer2', function (req, res) {
  let word =
    req.body.problem1 + '\r\n' + req.body.operator + '\r\n' + req.body.problem2

  let problem = word
    .trim()
    .split('\r\n')
    .map(function (w) {
      w = w.replace('fourthy', 'forty')
      w = w.replace('fifthy', 'fifty')
      return wordsToNumbers(w)
    })
  let newProblem = problem.join(' ')
  let answer = obj.solverMain(newProblem)
  res.render('index2', { answer2: answer, display: 'words', words: true })
})

app.post('/api/answer3', function (req, res) {
  let newArr = req.body.fulltext
    .trim()
    .split('\r\n')
    .filter((value) => {
      return value !== 'Cashyshop - Buy load on Messenger'
    })
    .map((w) => {
      w = w.replace('fourthy', 'forty')
      w = w.replace('fifthy', 'fifty')
      return wordsToNumbers(w)
    })
  let newProblem = newArr.join(' ')
  let answer = obj.solverMain(newProblem)
  res.render('index3', { answer3: answer, display: 'words2', words2: true })
})

app.listen(process.env.PORT || 5000)
