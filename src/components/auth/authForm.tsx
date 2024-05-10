import Input from './authInput';
import useInput from '../../hooks/use-input';
import { validateEmail, validatePassword, validateUsername } from './validators';
import { useEffect, useState } from 'react';
import DropDown from './authDropDown';
import { handleSignUpSubmit } from './authFormSubmitHandlers';

function AuthForm(props: { type: 'login' | 'sign up' }) {
    const [email, isEmailInputTouched, emailInputError, setEmail, emailInputBlurHandler, emailInputResetHandler] = useInput(validateEmail);
    const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
        useInput(validateUsername);
    const [password, isPasswordInputTouched, passwordInputError, setPassword, passwordInputBlurHandler, passwordInputResetHandler] =
        useInput(validatePassword);
    const [role, setRole] = useState(null);

    const [formHasError, setFromHasError] = useState(true);
    const [submitError, setSubmitError] = useState({ emailError: null, usernameError: null, serverError: null });

    useEffect(() => {
        const atLeastOneError = emailInputError !== null || usernameInputError !== null || passwordInputError !== null;
        const atLeastOneEmpty = email === null || username === null || password === null || role === null;
        setFromHasError(atLeastOneEmpty || atLeastOneError);
        setSubmitError({ emailError: null, usernameError: null, serverError: null });
    }, [emailInputError, usernameInputError, passwordInputError, email, username, password, role]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = { email: email, username: username, password: password, role: role };
        handleSignUpSubmit(formData, setSubmitError);
    }

    const emailInputField = (
        <Input
            type='email'
            changeHandler={setEmail}
            blurHandler={emailInputBlurHandler}
            value={email}
            error={emailInputError ? emailInputError : submitError.emailError}
            isTouched={isEmailInputTouched}
        ></Input>
    );

    const usernameInputField = (
        <Input
            type='username'
            changeHandler={setUsername}
            blurHandler={usernameInputBlurHandler}
            value={username}
            error={usernameInputError ? usernameInputError : submitError.usernameError}
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
