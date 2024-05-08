import Input from './authInput';
import useInput from '../../hooks/use-input';
import { validateEmail, validatePassword, validateUsername } from './validators';

const errorIcon = (
  <svg width='12px' height='12px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
    <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
    <g id='SVGRepo_iconCarrier'>
      {' '}
      <path d='M12 8V12' stroke='#ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>{' '}
      <path d='M12 16.0195V16' stroke='#ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path>{' '}
      <circle cx='12' cy='12' r='10' stroke='#ef4444' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></circle>{' '}
    </g>
  </svg>
);

function AuthForm(props: { type: 'login' | 'sign up' }) {
  const [email, isEmailInputTouched, emailInputError, setEmail, emailInputBlurHandler, emailInputResetHandler] = useInput(validateEmail);
  const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
    useInput(validateUsername);
  const [password, isPasswordInputTouched, passwordInputError, setPassword, passwordInputBlurHandler, passwordInputResetHandler] =
    useInput(validatePassword);

  const emailInputWithError = (
    <div className='flex flex-col gap-2 mb-6 md:mb-8'>
      <Input
        type='email'
        changeHandler={setEmail}
        blurHandler={emailInputBlurHandler}
        value={email}
        hasError={emailInputError !== null}
        isTouched={isEmailInputTouched}
      ></Input>
      {emailInputError !== null && (
        <div className='flex gap-1 pl-6'>
          {errorIcon}
          <p className='text-sm text-red-500'>{emailInputError?.toString()}</p>
        </div>
      )}
    </div>
  );
  const usernameInputWithError = (
    <div className='flex flex-col gap-2 mb-6 md:mb-8'>
      <Input
        type='username'
        changeHandler={setUsername}
        blurHandler={usernameInputBlurHandler}
        value={username}
        hasError={usernameInputError !== null}
        isTouched={isUsernameInputTouched}
      ></Input>

      {usernameInputError !== null && (
        <div className='flex gap-1 pl-6 items-center'>
          {errorIcon}
          <p className='text-sm text-red-500'>{usernameInputError}</p>
        </div>
      )}
    </div>
  );
  const passwordInputWithError = (
    <div className='flex flex-col gap-2 mb-6 md:mb-8'>
      <Input
        type='password'
        changeHandler={setPassword}
        blurHandler={passwordInputBlurHandler}
        value={password}
        hasError={passwordInputError !== null}
        isTouched={isPasswordInputTouched}
      ></Input>

      {passwordInputError !== null && (
        <div className='flex gap-1 pl-6 justify-items-center'>
          {errorIcon}
          <p className='text-sm text-red-500'>{passwordInputError}</p>
        </div>
      )}
    </div>
  );

  return (
    <form className='flex flex-col justify-stretch gap-16'>
      <div className='flex flex-col justify-stretch sm:p-12 p-2'>
        {props.type === 'sign up' && emailInputWithError} {usernameInputWithError} {passwordInputWithError}
      </div>
      <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl'>Login</button>
    </form>
  );
}

export default AuthForm;
