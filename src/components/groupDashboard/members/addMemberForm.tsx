import useInput from '../../../hooks/use-input';
import Input from '../../auth/authInput';
import { validateUsername } from '../../auth/validators';

function AddMemberForm() {
    const [username, isUsernameInputTouched, usernameInputError, setUsername, usernameInputBlurHandler, usernameInputResetHandler] =
        useInput(validateUsername);
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

    return (
        <div className='flex items-center min-h-[100vh] justify-center text-2xl bg-black bg-opacity-10'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative'>
                <form action='' className='grid gap-12 w-full'>
                    {usernameInputField}
                    <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500'>Add</button>
                </form>
            </div>
        </div>
    );
}

export default AddMemberForm;
