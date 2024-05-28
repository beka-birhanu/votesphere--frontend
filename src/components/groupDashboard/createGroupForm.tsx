import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import LoadingSVG from './icons/loadingSVG';

function CreateGroupInput(props: { label: string; onChange: CallableFunction; value: string }) {
    return (
        <div className=' flex flex-col sm:flex-row justify-items-stretch text-xl '>
            <label htmlFor={props.label} className='w-52 uppercase font-medium tracking-wide'>
                {' '}
                {props.label}:
            </label>
            <input
                id={props.label}
                type='text'
                className='border-b-2 border-gray-400 focus:outline-none flex-grow w-full'
                multiple={true}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                required={true}
            />
        </div>
    );
}

async function submit(groupName: string, setIsLoading: CallableFunction) {
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
    const [canSubmit, setCanSubmit] = useState(false);

    const groupNameInputField = <CreateGroupInput value={groupName} onChange={setGroupName} label='group name'></CreateGroupInput>;

    useEffect(() => {
        const isRequirementFulfilled = groupName !== '';
        setCanSubmit(isRequirementFulfilled);
    }, [groupName]);

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (!canSubmit) {
            return null;
        }

        submit(groupName, setIsLoading);
    }

    return (
        <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
            <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                {groupNameInputField}
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
