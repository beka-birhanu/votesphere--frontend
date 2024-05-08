import React, { ChangeEventHandler, FocusEventHandler } from 'react';

const UserIconSVG = React.lazy(() => import('./SVG/userIconSVG'));
const EmailIconSVG = React.lazy(() => import('./SVG/emailIconSVG'));
const PasswordIconSVG = React.lazy(() => import('./SVG/passwordIconSVG'));

const userIconSVG = <UserIconSVG />;
const emailIconSVG = <EmailIconSVG />;
const passwordIconSVG = <PasswordIconSVG />;

const nonErrorStyleClassName = 'border-[1px] border-[#CDCDCD] hover:border-gray-400';
const errorStyleClassName = 'border-[1px] border-red-400 hover:border-red-400';

function Input(props: {
  type: 'username' | 'email' | 'password';
  changeHandler: ChangeEventHandler<HTMLInputElement>;
  blurHandler: FocusEventHandler<HTMLInputElement>;
  value: string;
  hasError: boolean;
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
    <div
      className={`flex items-center text-lg border-solid  rounded-xl shadow-sm ${
        props.hasError && props.isTouched ? errorStyleClassName : nonErrorStyleClassName
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
  );
}

export default Input;
