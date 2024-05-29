import { createContext, useEffect, useState, Fragment } from 'react';
import { pollData } from './poll/pollListItem';
import { memberData } from './members/membersListItem';
import MembersList from './members/membersList';
import Header from '../header/header';
import PollList from './poll/pollList';
import DoubleArrowIcon from './icons/doubleArrowSVG';
import { fetchPolls } from '../../API/poll';
import { fetchMembers } from '../../API/group';
import { useNavigate } from 'react-router-dom';
import NoGroup from './noGroup';

const UserDataContext = createContext({ groupID: '', username: '' });

function DashBoard() {
    const navigate = useNavigate();
    const groupName = 'A2SV-G54';
    const motto = 'Vote for what matters to you';

    const groupID = localStorage.getItem('groupID');
    const username = localStorage.getItem('username');

    const [pollsData, setPollsData] = useState<pollData[] | null>(null);
    const [members, setMembers] = useState<memberData[] | null>(null);

    useEffect(() => {
        const getPolls = async (groupID: string) => {
            try {
                const data = await fetchPolls(groupID);
                setPollsData(data);
            } catch (error) {
                navigate('/login');
            }
        };

        if (groupID) getPolls(groupID);
    }, []);

    useEffect(() => {
        const getMembers = async (groupID: string) => {
            try {
                const response = await fetchMembers(groupID);
                setMembers(response.data);
            } catch (error) {}
            navigate('/login');
        };

        if (groupID) getMembers(groupID);
    }, []);

    return (
        <Fragment>
            <Header isAuthorized={true} isLoading={false}></Header>
            <main className='mt-32'>
                {username && groupID && (
                    <Fragment>
                        <hgroup className='flex flex-col gap-6 items-center md:mb-16 mb-10'>
                            <h1 className='text-blue-700 font-bold text-3xl uppercase'>{groupName}</h1>
                            <p className='uppercase tracking-widest text-sm'>{motto}</p>
                        </hgroup>

                        <div className='flex items-start min-w-96 w-full relative text-2xl'>
                            <UserDataContext.Provider value={{ groupID, username }}>
                                <div className='flex items-start min-w-96 w-full relative'>
                                    <PollList pollsData={pollsData} />
                                </div>

                                <aside className='min-w-72 absolute z-10 bg-white right-0 lg:mr-16'>
                                    <div className='flex items-center gap-2 ml-3'>
                                        <button className='flex gap-0'>
                                            <DoubleArrowIcon />
                                        </button>
                                        <h1>Members</h1>
                                    </div>
                                    <MembersList members={members} />
                                </aside>
                            </UserDataContext.Provider>
                        </div>
                    </Fragment>
                )}
                {username && !groupID && <NoGroup isAdmin={true} username={username}></NoGroup>}
            </main>
        </Fragment>
    );
}

export default DashBoard;
export { UserDataContext };
