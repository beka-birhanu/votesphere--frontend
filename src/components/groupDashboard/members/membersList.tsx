import MembersListItem, { memberData } from './membersListItem';

function putAdminFirst(members: memberData[]): void {
    const n = members.length;
    for (let i = 0; i < n; i++) {
        const member = members[i];

        if (member.isAdmin) {
            const [admin] = members.splice(i, 1);
            members.unshift(admin);
            break;
        }
    }
}

const addMemberButton = <button className='bg-blue-700 p-1 text-blue-50 font-medium w-full rounded-xl text-lg'>Add Member</button>;
function MembersList(props: { members: memberData[] }) {
    props.members.sort((a, b) => (a.username < b.username ? -1 : 1));
    putAdminFirst(props.members);

    return (
        <div className='shadow-lg rounded-xl px-12 py-6 mt-6 max-h-[100vh] overflow-y-scroll'>
            <ul className='flex flex-col gap-4 mb-8 '>
                {props.members.map((member) => (
                    <MembersListItem username={member.username} email={member.email} isAdmin={member.isAdmin}></MembersListItem>
                ))}
            </ul>
            {addMemberButton}
        </div>
    );
}

export default MembersList;
