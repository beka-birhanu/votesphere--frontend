import Input from './authInput';

function AuthForm(props: { type: 'login' | 'sign up' }) {
  return (
    <form className='flex flex-col justify-stretch gap-16'>
      <div className='flex flex-col justify-stretch sm:p-12 p-2'>
        {props.type === 'sign up' && <Input type='email'></Input>}
        <Input type='username'></Input>
        <Input type='password'></Input>
      </div>
      <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl'>Login</button>
    </form>
  );
}

export default AuthForm;
