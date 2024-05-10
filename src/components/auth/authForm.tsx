import Input from './authInput';
import useInput from '../../hooks/use-input';
import { validateEmail, validatePassword, validateUsername } from './validators';
import { useEffect, useState } from 'react';
import DropDown from './authDropDown';

function submit(formData: { email: string; username: string; password: string }): null | string[] {
  // hit API
  const errors = ['ksld'];
  return errors;
}

function AuthForm(props: { type: 'login' | 'sign up' }) {
  const [email, isEmailInputTouched, emailInputError, setEmail, emailInputBlurHandler, emailInputResetHandler] = useInput(validateEmail);
  const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
    useInput(validateUsername);
  const [password, isPasswordInputTouched, passwordInputError, setPassword, passwordInputBlurHandler, passwordInputResetHandler] =
    useInput(validatePassword);
  const [role, setRole] = useState(null);

  const [formHasError, setFromHasError] = useState(true);

  useEffect(() => {
    const atLeastOneError = emailInputError !== null || usernameInputError !== null || passwordInputError !== null;
    const atLeastOneEmpty = email === null || username === null || password === null || role === null;
    setFromHasError(atLeastOneEmpty || atLeastOneError);
  }, [emailInputError, usernameInputError, passwordInputError, email, username, password, role]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): null {
    event.preventDefault();
    if (formHasError) {
      return null;
    }
    const formData = { email: email, username: username, password: password };
    const errors = submit(formData);
    return null;
  }

  const emailInputField = (
    <Input
      type='email'
      changeHandler={setEmail}
      blurHandler={emailInputBlurHandler}
      value={email}
      error={emailInputError}
      isTouched={isEmailInputTouched}
    ></Input>
  );

  const usernameInputField = (
    <Input
      type='username'
      changeHandler={setUsername}
      blurHandler={usernameInputBlurHandler}
      value={username}
      error={usernameInputError}
      isTouched={isUsernameInputTouched}
    ></Input>
  );

  const passwordInputField = (
    <Input
      type='password'
      changeHandler={setPassword}
      blurHandler={passwordInputBlurHandler}
      value={password}
      error={passwordInputError}
      isTouched={isPasswordInputTouched}
    ></Input>
  );

  return (
    <form className='flex flex-col justify-stretch gap-16' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-stretch sm:p-12 p-2'>
        {props.type === 'sign up' && emailInputField} {usernameInputField} {passwordInputField}
        {<DropDown onSelect={setRole} options={['User', 'Admin']}></DropDown>}
      </div>
      <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500' disabled={formHasError}>
        {props.type}
      </button>
    </form>
  );
}

export default AuthForm;
