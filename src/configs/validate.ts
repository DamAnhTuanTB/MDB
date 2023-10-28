export const validates = {
  email: {
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    message: 'Invalid email address!'
  },
  confirmPassword: {
    message: 'Confirm password does not match.'
  }
}
