import '../../index.css';
import logo from '../../logo.jpg';

const signOutLink = (
  <a href='#' className='font-medium hover:underline'>
    Sign out
  </a>
);

function UnauthorizedHeader(props: { isAuthorized: boolean }) {
  return (
    <header className='py-10 w-full px-9 flex justify-between items-center md:pr-32 md:mb-32 mb-32 text-2xl'>
      <div className='flex items-end gap-3'>
        <img className='w-9' src={logo} alt='logo' />
        <h1 className='text-2xl uppercase font-bold tracking-wider'>Vote Sphere</h1>
      </div>
      {props.isAuthorized && signOutLink}
    </header>
  );
}

export default UnauthorizedHeader;
