function findWithRegexes(regexes = [], contentBlock, callback) {
  const text = contentBlock.getText()
  let matchArr, start
  regexes.forEach(regex => {
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index
      callback(start, start + matchArr[0].length)
    }
  })
}

export default findWithRegexes
