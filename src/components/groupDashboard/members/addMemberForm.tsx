import { useState } from 'react';
import useInput from '../../../hooks/use-input';
import Input from '../../auth/authInput';
import { validateUsername } from '../../auth/validators';
import LoadingSVG from '../icons/loadingSVG';

async function submit(username: string, setIsLoading: CallableFunction, setSubmitError: CallableFunction, closeModal: CallableFunction) {
    setIsLoading(true);
    try {
        const response = await fetch('http://localhost:9000/groups/830af378-238c-40da-9d4a-8793772f512e/members', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE2MTkyODc2LCJleHAiOjE3MTYxOTY0NzZ9.poz5WxasEQO_WqguaLODxa35-XsiPYamWPKxb-q0IIw',
            },
            body: JSON.stringify({ username }),
        });

        if (!response.ok) {
            if (response.status === 404) {
                setSubmitError('Invalid username');
            } else if (response.status === 409) {
                setSubmitError('User already belongs to another group');
            } else {
                throw new Error(response.statusText);
            }
        } else {
            closeModal();
        }
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
}

function AddMemberForm(props: { onClose: CallableFunction }) {
    const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
        useInput(validateUsername);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const usernameInputField = (
        <Input
            type='username'
            onChange={setUsername}
            onBlur={usernameInputBlurHandler}
            value={username}
            error={submitError ? submitError : usernameInputError}
            isTouched={isUsernameInputTouched}
        ></Input>
    );

    function handleClose(event: React.MouseEvent<HTMLElement>) {
        props.onClose();
    }

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (usernameInputError || isLoading) {
            return null;
        }

        submit(username, setIsLoading, setSubmitError, props.onClose);
    }

    return (
        <div onClick={handleClose} className='flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                    {usernameInputField}
                    <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 flex justify-center gap-2 items-center'>
                        {isLoading && <LoadingSVG></LoadingSVG>}
                        {isLoading ? 'Adding' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberForm;
