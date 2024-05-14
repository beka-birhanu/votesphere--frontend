import { useState } from 'react';
import PollOption from './option';

export type pollData = {
    id: string;
    chosenOptionId: string | null;
    question: string;
    options: { optionText: string; voteCount: number; id: string }[];
    hasVoted: boolean;
    isClosed: boolean;
};

function Poll(props: pollData) {
    function toggleAccordion() {
        setIsAccordionOpen((isOpen) => !isOpen);
    }

    const [hasVoted, setHasVoted] = useState(props.hasVoted);
    const [isClosed, setIsClosed] = useState(props.isClosed);
    const [optionsData, setOptionsData] = useState(props.options);
    const [chosenOptionId, setChosenOptionId] = useState(props.chosenOptionId);

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const iconColor = hasVoted || isClosed ? 'bg-[#ABACAD]' : 'bg-blue-700';

    const totalVoteCount = props.options.reduce((accumulator, option) => accumulator + option.voteCount, 0);
    const optionsWithPercent = optionsData.map((option) => ({
        id: option.id,
        optionText: option.optionText,
        votePercent: (option.voteCount / totalVoteCount) * 100,
    }));

    const question = <h1 className='font-medium mx-2'>{props.question}</h1>;
    const options = optionsWithPercent.map((optionData) => (
        <PollOption
            data={optionData}
            displayVotePercent={hasVoted || isClosed}
            isChosen={chosenOptionId === optionData.id}
            setHasVoted={setHasVoted}
            setIsClosed={setIsClosed}
            setOptionsData={setOptionsData}
            setChosenOptionId={setChosenOptionId}
        ></PollOption>
    ));

    const iconDirection = isAccordionOpen ? -90 : 90;
    const toggleAccordionIcon = (
        <button>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='#ABACAD'
                style={{ transform: `rotate(${iconDirection}deg)` }}
                className='transition-all ease-in-out'
            >
                <path d='M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z' />
            </svg>
        </button>
    );

    return (
        <section className='max-w-4xl w-full flex flex-col gap-5'>
            <section
                className='flex justify-between items-center p-3 hover:shadow-md border rounded-xl transition-all cursor-pointer'
                onClick={toggleAccordion}
            >
                <div className={`${iconColor} rounded-full p-4 w-8 h-8 flex justify-center items-center`}>
                    <p className='text-blue-50 pt-[1px] font-extrabold text-2xl'>?</p>
                </div>
                {question}
                {toggleAccordionIcon}
            </section>
            {isAccordionOpen && <section className='flex flex-col px-6 py-4 gap-3 w-full'>{options}</section>}
        </section>
    );
}

export default Poll;
