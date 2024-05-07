import Input from './authInput';
import useInput from '../../hooks/use-input';
import zxcvbn from 'zxcvbn';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const usernameRegex = /^[a-zA-Z0-9_.]+$/g;
const errorIcon = (
  <svg width='24px' height='24px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
    <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path d='M12 8V12' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>{' '}
      <path d='M12 16.0195V16' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>{' '}
      <circle cx='12' cy='12' r='10' stroke='#dc2626' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></circle>{' '}
    </g>
  </svg>
);

function validateEmail(email: string): string | null {
  const hasError = emailRegex.test(email);

  return hasError ? 'Invalid email format' : null;
}

function validateUsername(username: string): string | null {
  if (username.length < 3 || username.length > 20) {
    return 'Username must be between 3 and 20 characters';
  }

  const invalidCharsMatch = username.match(usernameRegex);
  if (invalidCharsMatch) {
    const invalidChars = invalidCharsMatch.join(', ');
    return `Username contains invalid characters: ${invalidChars}`;
  }

  return null;
}

function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }

  const passwordStrength = zxcvbn(password).score;
  if (passwordStrength < 3) {
    return 'Weak password. please mix numbers, and special characters.';
  }

  return null;
}

function AuthForm(props: { type: 'login' | 'sign up' }) {
  const [email, isEmailInputTouched, emailInputError, setEmail, emailInputBlurHandler, emailInputResetHandler] = useInput(validateEmail);
  const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
    useInput(validateUsername);
  const [password, isPasswordInputTouched, passwordInputError, setPassword, passwordInputBlurHandler, passwordInputResetHandler] =
    useInput(validatePassword);

  return (
    <form className='flex flex-col justify-stretch gap-16'>
      <div className='flex flex-col justify-stretch sm:p-12 p-2'>
        {props.type === 'sign up' && (
          <Input
            type='email'
            changeHandler={setEmail}
            blurHandler={emailInputBlurHandler}
            value={email}
            hasError={emailInputError != ''}
            isTouched={isEmailInputTouched}
          ></Input>
        )}
        <Input
          type='username'
          changeHandler={setUsername}
          blurHandler={usernameInputBlurHandler}
          value={username}
          hasError={usernameInputError != ''}
          isTouched={isUsernameInputTouched}
        ></Input>
        <Input
          type='password'
          changeHandler={setPassword}
          blurHandler={passwordInputBlurHandler}
          value={password}
          hasError={passwordInputError != ''}
          isTouched={isPasswordInputTouched}
        ></Input>
      </div>
      <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl'>Login</button>
    </form>
  );
}

export default AuthForm;
