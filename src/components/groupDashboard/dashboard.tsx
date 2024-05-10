import { Fragment } from 'react/jsx-runtime';
import Poll, { pollData } from './poll/poll';
import { memberData } from './members/membersListItem';
import MembersList from './members/membersList';

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
    const gorupName = 'A2SV-G54';
    const motto = 'Vote for what matters to you';
    const pollsData: pollData[] = [
        {
            id: 'lskdl;flas;0',
            chosenOptionId: 'lkksjfd;',
            question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit?',
            options: [
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet', voteCount: 16 },
                { id: 'lkksjfd;', optionText: 'Lorem ipsum dolor sit amet, consecter', voteCount: 15 },
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet, elit', voteCount: 71 },
            ],
            hasVoted: false,
        },

        {
            id: 'lskdl;flas;0',
            chosenOptionId: 'lkksjfd;',
            question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit?',
            options: [
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet', voteCount: 16 },
                { id: 'lkksjfd;', optionText: 'Lorem ipsum dolor sit amet, consecter', voteCount: 15 },
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet, elit', voteCount: 71 },
            ],
            hasVoted: false,
        },

        {
            id: 'lskdl;flas;0',
            chosenOptionId: 'lkksjfd;',
            question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit?',
            options: [
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet', voteCount: 16 },
                { id: 'lkksjfd;', optionText: 'Lorem ipsum dolor sit amet, consecter', voteCount: 15 },
                { id: 'lkksjd;', optionText: 'Lorem ipsum dolor sit amet, elit', voteCount: 71 },
            ],
            hasVoted: true,
        },
    ];
    const members: memberData[] = [
        {
            username: 'beka_user2',
            email: 'beka_user2@gmail.com',
            isAdmin: false,
        },
        {
            username: 'beka_user2',
            email: 'beka_user2@gmail.com',
            isAdmin: false,
        },
        {
            username: 'beka_user2',
            email: 'beka_user2@gmail.com',
            isAdmin: false,
        },
        {
            username: 'beka_birhanu',
            email: 'beka@gmail.com',
            isAdmin: true,
        },
        {
            username: 'beka_user',
            email: 'beka_user@gmail.com',
            isAdmin: false,
        },
        {
            username: 'beka_user',
            email: 'beka_user@gmail.com',
            isAdmin: false,
        },
    ];

    return (
        <Fragment>
            <hgroup className='flex flex-col gap-6 items-center md:mb-16 mb-10'>
                <h1 className='text-blue-700 font-bold text-3xl uppercase'>{gorupName}</h1>
                <p className='uppercase tracking-widest text-sm'>{motto}</p>
            </hgroup>

            <div className='flex items-start min-w-96 w-full relative text-2xl'>
                <div className='flex items-start min-w-96 w-full relative'>
                    <section className='flex flex-col items-center justify-center gap-5 w-full '>
                        {pollsData.map((pollData) => Poll(pollData))}
                    </section>
                </div>
                <aside className='min-w-72 lg:relative lg:z-0 absolute z-50 bg-white right-0 lg:mr-16'>
                    <div className='flex items-center gap-2 ml-3'>
                        <button className='flex gap-0'>{doubleArrowIcon}</button>
                        <h1>Members</h1>
                    </div>
                    {<MembersList members={members}></MembersList>}
                </aside>
            </div>
        </Fragment>
    );
}

export default DashBoard;
