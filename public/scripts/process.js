const obj = {}

obj.solverMain = function (problems) {
  let problem = problems.split(' ')
  let value1, op, value2

  if (problem[0] === 'What') {
    value1 = Number(problem[2])
    op = problem[3]
    value2 = Number(problem[4])
  } else {
    value1 = Number(problem[0])
    op = problem[1]
    value2 = Number(problem[2])
  }

  let ans = solve(value1, op, value2)

  return ans
}

function solve(num1, op, num2) {
  if (op === 'add' || op === '➕' || op === 'plus') {
    return num1 + num2
  } else if (
    op === 'sub' ||
    op === '-' ||
    op === 'minus' ||
    op === 'subtract'
  ) {
    return num1 - num2
  } else if (op === 'mul' || op === '✖️' || op === 'times') {
    return num1 * num2
  } else if (op === 'div') {
  }
}

module.exports = obj
