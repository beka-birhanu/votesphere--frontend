import { MouseEventHandler, useState } from 'react';
import useInput from '../../../hooks/use-input';
import Input from '../../auth/authInput';
import { validateUsername } from '../../auth/validators';

function submit(username: string, setIsLoading: CallableFunction, setSubmitError: CallableFunction) {
    setIsLoading(true);

    fetch('http://localhost:9000/groups/830af378-238c-40da-9d4a-8793772f512e/members', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE2MTkyODc2LCJleHAiOjE3MTYxOTY0NzZ9.poz5WxasEQO_WqguaLODxa35-XsiPYamWPKxb-q0IIw',
        },
        body: JSON.stringify({ username }),
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 409) {
                    setSubmitError('User belongs to other group');
                } else if (response.status == 404) {
                    setSubmitError('Invalid Username');
                }
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    setIsLoading(false);
}

function AddMemberForm(props: { onClose: MouseEventHandler<HTMLElement> }) {
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
    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (usernameInputError || isLoading) {
            return null;
        }

        submit(username, setIsLoading, setSubmitError);
    }

    return (
        <div onClick={props.onClose} className='flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                    {usernameInputField}
                    <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 flex justify-center gap-2 items-center'>
                        {isLoading && (
                            <svg
                                fill='#ffffff'
                                version='1.1'
                                id='Capa_1'
                                xmlns='http://www.w3.org/2000/svg'
                                width='16px'
                                height='16px'
                                viewBox='0 0 26.349 26.35'
                                stroke='#ffffff'
                                className='animate-spin'
                            >
                                <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                                <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <circle cx='13.792' cy='3.082' r='3.082'></circle> <circle cx='13.792' cy='24.501' r='1.849'></circle>{' '}
                                            <circle cx='6.219' cy='6.218' r='2.774'></circle> <circle cx='21.365' cy='21.363' r='1.541'></circle>{' '}
                                            <circle cx='3.082' cy='13.792' r='2.465'></circle> <circle cx='24.501' cy='13.791' r='1.232'></circle>{' '}
                                            <path d='M4.694,19.84c-0.843,0.843-0.843,2.207,0,3.05c0.842,0.843,2.208,0.843,3.05,0c0.843-0.843,0.843-2.207,0-3.05 C6.902,18.996,5.537,18.988,4.694,19.84z'></path>{' '}
                                            <circle cx='21.364' cy='6.218' r='0.924'></circle>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        )}
                        {isLoading ? 'Adding' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberForm;
