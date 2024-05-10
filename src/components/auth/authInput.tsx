import React, { ChangeEventHandler, FocusEventHandler } from 'react';

const UserIconSVG = React.lazy(() => import('./SVG/userIconSVG'));
const EmailIconSVG = React.lazy(() => import('./SVG/emailIconSVG'));
const PasswordIconSVG = React.lazy(() => import('./SVG/passwordIconSVG'));

const userIconSVG = <UserIconSVG />;
const emailIconSVG = <EmailIconSVG />;
const passwordIconSVG = <PasswordIconSVG />;

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

const nonErrorStyleClassName = 'border-[1px] border-[#CDCDCD] hover:border-gray-400';
const errorStyleClassName = 'border-[1px] border-red-400 hover:border-red-400';

function Input(props: {
    type: 'username' | 'email' | 'password';
    changeHandler: ChangeEventHandler<HTMLInputElement>;
    blurHandler: FocusEventHandler<HTMLInputElement>;
    value: string;
    error: string | null;
    isTouched: boolean;
}) {
    let icon;

    if (props.type == 'username') {
        icon = userIconSVG;
    } else if (props.type === 'email') {
        icon = emailIconSVG;
    } else if (props.type === 'password') {
        icon = passwordIconSVG;
    }

    return (
        <div className='flex flex-col gap-2 mb-6 md:mb-8'>
            <div
                className={`flex items-center text-lg border-solid  rounded-xl shadow-sm ${
                    props.error !== null && props.isTouched ? errorStyleClassName : nonErrorStyleClassName
                }`}
            >
                {icon}

                <input
                    type={props.type === 'username' ? 'text' : props.type}
                    placeholder={'Enter ' + props.type}
                    name={props.type}
                    id={props.type}
                    value={props.value}
                    onChange={props.changeHandler}
                    onBlur={props.blurHandler}
                    className='rounded pl-12 py-2 md:py-4 focus:outline-none w-full ml-5 text-2xl text-gray-700'
                />
            </div>
            {props.error !== null && props.isTouched && (
                <div className='flex gap-1 pl-6'>
                    {errorIcon}
                    <p className='text-sm text-red-500'>{props.error?.toString()}</p>
                </div>
            )}
        </div>
    );
}

export default Input;
