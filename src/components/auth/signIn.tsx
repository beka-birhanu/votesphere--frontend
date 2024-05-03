import AuthForm from './authForm';

function Login() {
  return (
    <div className='flex items-center min-h-[90vh] justify-center text-2xl'>
      <div className='max-w-3xl w-full rounded-xl sm:p-12 p-2 grid gap-16 sm:border-solid sm:border-[1px] sm:border-[#CDCDCD]'>
        <hgroup>
          <h1 className='text-4xl text-blue-800 tracking-wide text-center mb-10 font-bold'>Welcome!</h1>
          <p className='uppercase tracking-widest text-gray-600 font-medium text-lg text-center'>Vote for what matters to you</p>
        </hgroup>

        {<AuthForm type='login'></AuthForm>}
        <p className='text-center '>
          New to Vote Sphere?{' '}
          <a href='#' className='text-blue-600 underline'>
            {' '}
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
