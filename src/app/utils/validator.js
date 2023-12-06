export function validator(data, config) {
  const errors = {}

  function validate(validMethod, data, config) {
    let hasError = false
    switch (validMethod) {
      case 'isRequired':
        hasError = data.trim() === ''
        break
      case 'isEmail': {
        const emailRegex = /^\S+@\S+\.\S+$/g
        hasError = !emailRegex.test(data)
        break
      }
      case 'hasCapitalSymbol': {
        const capitalRegex = /[A-Z]/g
        hasError = !capitalRegex.test(data)
        break
      }
      case 'hasDigit': {
        const digitRegex = /\d/g
        hasError = !digitRegex.test(data)
        break
      }
      case 'min': {
        hasError = data.length < config.value
        break
      }

      default:
        break
    }
    if (hasError) return config.message
  }

  for (const fieldName in data) {
    for (const validMethod in config[fieldName]) {
      const error = validate(
        validMethod,
        data[fieldName],
        config[fieldName][validMethod]
      )
      if (error && !errors[fieldName]) errors[fieldName] = error
    }
  }

  return errors
}
