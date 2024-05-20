import { Fragment } from 'react/jsx-runtime';
import { pollData } from './poll/pollListItem';
import { memberData } from './members/membersListItem';
import MembersList from './members/membersList';
import Header from '../header/header';
import PollList from './poll/pollList';
import { useEffect, useState } from 'react';
import DoubleArrowIcon from './icons/doubleArrowSVG';

function DashBoard() {
    const groupName = 'A2SV-G54';
    const motto = 'Vote for what matters to you';

    const [pollsData, setPollsData] = useState<pollData[] | null>(null);
    const [members, setMembers] = useState<memberData[] | null>(null);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await fetch(
                    'http://localhost:9000/polls?' + new URLSearchParams({ groupId: '830af378-238c-40da-9d4a-8793772f512e' }),
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE1OTQ0NTI5LCJleHAiOjE3MTU5NDgxMjl9.L9iGvWS2KNRnYqy7muWMw5tXpkjqWXBd49GggLKTFn4',
                        },
                    },
                );
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setPollsData(data);
            } catch (error) {
                console.error('Error fetching polls:', error);
                // redirect to sign in or handle the error appropriately
            }
        };

        fetchPolls();
    }, []);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:9000/groups/830af378-238c-40da-9d4a-8793772f512e/members', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization:
                            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE1OTQ0NTI5LCJleHAiOjE3MTU5NDgxMjl9.L9iGvWS2KNRnYqy7muWMw5tXpkjqWXBd49GggLKTFn4',
                    },
                });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                console.log(data);
                setMembers(data);
            } catch (error) {
                console.error('Error fetching members:', error);
                // redirect to sign in or handle the error appropriately
            }
        };

        fetchMembers();
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
                            <button className='flex gap-0'>{<DoubleArrowIcon></DoubleArrowIcon>}</button>
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
