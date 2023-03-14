export enum AuthErrorKeys {
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  EMAIL_EXISTS = 'EMAIL_EXISTS',
  TOO_MANY_ATTEMPTS_TRY_LATER = 'TOO_MANY_ATTEMPTS_TRY_LATER',
  PASSWORDS_DO_NOT_MATCH = 'PASSWORDS_DO_NOT_MATCH',
}

export const AuthErrorMapper: { [key in AuthErrorKeys]: string } = {
  INVALID_PASSWORD: 'Sorry, the password is invalid, please try again.',
  EMAIL_NOT_FOUND: 'There is no user record corresponding to this email. Or your account may have been deleted.',
  EMAIL_EXISTS: 'The email address is already in use by another account.',
  TOO_MANY_ATTEMPTS_TRY_LATER:
    'We have blocked all requests from this device due to unusual activity. Try again later.',
  PASSWORDS_DO_NOT_MATCH: 'Password and confirm password do not match.',
};
