import { Fragment } from 'react/jsx-runtime';
import { pollData } from './poll/pollListItem';
import { memberData } from './members/membersListItem';
import MembersList from './members/membersList';
import Header from '../header/header';
import PollList from './poll/pollList';
import { useEffect, useState } from 'react';

const doubleArrowIcon = (
    <svg
        fill='#cdcdcd'
        version='1.1'
        id='Capa_1'
        width='16px'
        height='24px'
        viewBox='0 0 220.682 220.682'
        stroke='#cdcdcd'
        className='-rotate-45 sm:rotate-0'
    >
        <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
        <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
            <g>
                <polygon points='92.695,38.924 164.113,110.341 92.695,181.758 120.979,210.043 220.682,110.341 120.979,10.639 '></polygon>
                <polygon points='28.284,210.043 127.986,110.341 28.284,10.639 0,38.924 71.417,110.341 0,181.758 '></polygon>
            </g>
        </g>
    </svg>
);

function DashBoard() {
    const groupName = 'A2SV-G54';
    const motto = 'Vote for what matters to you';
    const [pollsData, setPollsData] = useState<pollData[] | null>(null);
    const [members, setMembers] = useState<memberData[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:9000/polls?' + new URLSearchParams({ groupId: '830af378-238c-40da-9d4a-8793772f512e' }), {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE1OTQ0NTI5LCJleHAiOjE3MTU5NDgxMjl9.L9iGvWS2KNRnYqy7muWMw5tXpkjqWXBd49GggLKTFn4',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((response) => {
                setPollsData(response);
            })
            .catch((error) => {
                // redirect to sign in
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:9000/groups/830af378-238c-40da-9d4a-8793772f512e/members', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization:
                    'Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE1OTQ0NTI5LCJleHAiOjE3MTU5NDgxMjl9.L9iGvWS2KNRnYqy7muWMw5tXpkjqWXBd49GggLKTFn4',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((response) => {
                console.log(response);
                setMembers(response);
            })
            .catch((error) => {
                // redirect to sign in
            });
    }, []);
    return (
        <Fragment>
            <Header isAuthorized={true} isLoading={false}></Header>
            <main className='mt-32'>
                <hgroup className='flex flex-col gap-6 items-center md:mb-16 mb-10'>
                    <h1 className='text-blue-700 font-bold text-3xl uppercase'>{groupName}</h1>
                    <p className='uppercase tracking-widest text-sm'>{motto}</p>
                </hgroup>

                <div className='flex items-start min-w-96 w-full relative text-2xl'>
                    <div className='flex items-start min-w-96 w-full relative'>{<PollList pollsData={pollsData}></PollList>}</div>
                    <aside className='min-w-72 absolute z-10 bg-white right-0 lg:mr-16'>
                        <div className='flex items-center gap-2 ml-3'>
                            <button className='flex gap-0'>{doubleArrowIcon}</button>
                            <h1>Members</h1>
                        </div>
                        {<MembersList members={members}></MembersList>}
                    </aside>
                </div>
            </main>
        </Fragment>
    );
}

export default DashBoard;
