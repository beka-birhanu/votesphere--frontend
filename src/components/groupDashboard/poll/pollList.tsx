import { startTransition, useState } from 'react';
import PollListItem, { pollData } from './pollListItem';
import { createPortal } from 'react-dom';
import AddPollForm from './addPollForm';

function PollList(props: { pollsData: pollData[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleAddPollForm() {
        startTransition(() =>
            setIsModalOpen((prev) => {
                return !prev;
            }),
        );
    }
    const addPollButton = (
        <button
            onClick={toggleAddPollForm}
            className={`bg-blue-600 rounded-full p-4 w-8 h-8 flex justify-center items-center shadow-2xl shadow-black hover:scale-105`}
        >
            <p className='text-blue-50 pl-[1px] text-5xl'>+</p>
        </button>
    );

    return (
        <section className='flex flex-col items-center justify-center gap-5 w-full '>
            {addPollButton}
            {props.pollsData.map((pollData) => (
                <PollListItem key={pollData.id} pollData={pollData}></PollListItem>
            ))}
            {isModalOpen &&
                createPortal(<AddPollForm onClose={toggleAddPollForm}></AddPollForm>, document.getElementById('modal-root') as HTMLElement)}
        </section>
    );
}

export default PollList;
