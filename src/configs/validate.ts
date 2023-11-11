export const validates = {
  phoneNumber: {
    pattern: /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    message: 'Invalid phone number.'
  },
  email: {
    pattern: /\S+@\S+\.\S+/,
    message: 'Invalid email.'
  },
  password: {
    pattern: /^(?=.{8,})/,
    message: 'Password must be at least 8 characters long.'
  },
  zipCode: {
    pattern: /^[0-9]{5}(?:-[0-9]{4})?$/,
    message: 'Invalid zip code.'
  },
  date: {
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    message: 'Invalid date.'
  },
  confirmPassword: {
    message: 'Confirm password does not match.'
  },
  commission: {
    pattern: /^0*(?:[1-9][0-9]?|100)$/,
    message: 'Commission must be between 1 and 100.'
  },
  number: {
    pattern: /^[0-9]*$/,
    message: 'Invalid number.'
  },
  spf: {
    pattern: /(^[0-9]+(\+?)+$)/,
    message: 'Invalid SPF.'
  },
  url: {
    pattern: /^(ftp|http|https):\/\/[^ "]+$/,
    message: 'Invalid URL.'
  },
  price: {
    pattern: /^\d*\.?\d*$/,
    message: 'Invalid number.'
  },

  decimalNumber: {
    pattern: /^\d*\.?\d*$/,
    message: 'Invalid number.'
  }
}
