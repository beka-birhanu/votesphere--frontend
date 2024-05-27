import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import CreateGroupInput from './createGroupInput';
import LoadingSVG from './icons/loadingSVG';

async function submit(groupName: string, groupMotto: string, setIsLoading: CallableFunction) {
    setIsLoading(true);

    try {
        // const response = await addPoll(adminUsername, groupID, poll);

        console.log('Poll created successfully:' /*response.data*/);
    } catch (error) {
        console.error('Error creating poll:', error);
    } finally {
        setIsLoading(false);
    }
}

function CreateGroupForm() {
    const [isLoading, setIsLoading] = useState(false);

    const [groupName, setGroupName] = useState('');
    const [groupMotto, setGroupMotto] = useState('');
    const [canSubmit, setCanSubmit] = useState(false);

    const groupNameInputField = <CreateGroupInput value={groupName} onChange={setGroupName} label='group name'></CreateGroupInput>;
    const groupMottoInputField = <CreateGroupInput value={groupMotto} onChange={setGroupMotto} label='group motto'></CreateGroupInput>;

    useEffect(() => {
        const isRequirementFulfilled = groupName !== '' && groupMotto !== '';
        setCanSubmit(isRequirementFulfilled);
    }, [groupName, groupMotto]);

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (!canSubmit) {
            return null;
        }

        submit(groupName, groupMotto, setIsLoading);
    }

    return (
        <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
            <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                {groupNameInputField}
                {groupMottoInputField}
                <button
                    className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 mt-32 flex justify-center gap-2 items-center'
                    disabled={!canSubmit}
                >
                    {isLoading && <LoadingSVG></LoadingSVG>}
                    {isLoading ? 'Creating' : 'Create'}
                </button>
            </form>
        </div>
    );
}

export default CreateGroupForm;
