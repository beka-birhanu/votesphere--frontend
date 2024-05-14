import { useEffect, useState } from 'react';
import '../../index.css';
import logo from '../../logo.jpg';

const signOutLink = (
    <a href='#' className='font-medium hover:underline'>
        Sign out
    </a>
);

function Header(props: { isAuthorized: boolean; isLoading: boolean }) {
    const loadingBar = <div className={`w-[100%] bg-blue-400 h-1  rounded-xl animate-pulse`}></div>;

    return (
        <div className='py-5'>
            <header className='md:pr-32 py-5 w-full px-9 flex justify-between items-center  text-2xl'>
                <div className='flex items-end gap-3'>
                    <img className='w-9' src={logo} alt='logo' />
                    <h1 className='text-2xl uppercase font-bold tracking-wider'>Vote Sphere</h1>
                </div>
                {props.isAuthorized && signOutLink}
            </header>
            {props.isLoading && loadingBar}
        </div>
    );
}

export default Header;
