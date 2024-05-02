const millisecondsInASecond = 1000
const millisecondsInADay = 24 * 60 * 60 * 1000
const millisecondsInAMinute = 60 * 1000
const millisecondsInAYear = 365.25 * 24 * 60 * 60 * 1000

const convertToMiliseconds = (duration) => {
  if (typeof duration !== 'string' || duration.trim() === '') {
    throw new Error('Invalid input: duration must be a non-empty string')
  }

  const result = separateNumberText(duration)
  if (result && result.length === 2) {
    const [numPart, textPart] = result
    switch (textPart) {
      // s meaning second
      case 's':
        return numPart * millisecondsInASecond
        // d meaning day
      case 'd':
        return numPart * millisecondsInADay
        // m meaning minute
      case 'm':
        return numPart * millisecondsInAMinute
      case 'y':
        return numPart * millisecondsInAYear
      default:
        throw new Error('Wrong format: unrecognized duration unit')
    }
  } else {
    throw new Error('Wrong format: duration must be in the format "number_unit"')
  }
}

function separateNumberText (string) {
  const pattern = /(\d+)([a-zA-Z]+)/
  const match = string.match(pattern)

  if (match) {
    const number = match[1]
    const text = match[2]
    return [number, text]
  } else {
    return null
  }
}

module.exports = {
  convertToMiliseconds
}
