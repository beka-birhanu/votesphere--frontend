import { castVote } from '../../../API/poll';
import { pollData } from './pollListItem';

type optionData = { id: string; optionText: string; votePercent: number };

const chosenMark = (
    <div className='rounded-full bg-blue-700 w-4 h-4 p-[1px] flex justify-center items-center'>
        <p className='text-blue-50 pt-[1px] font-extrabold text-sm'>&#x2713;</p>
    </div>
);

function PollOption(props: {
    data: optionData;
    displayVotePercent: boolean;
    isChosen: boolean;
    setHasVoted: CallableFunction;
    setIsClosed: CallableFunction;
    setOptionsData: CallableFunction;
    setChosenOptionId: CallableFunction;
}) {
    const chooseButton = <div className='w-6 h-6 rounded-full border-2' onClick={handleVote}></div>;
    const barWidth = Math.round(props.data.votePercent);
    const votePercentBar = <div style={{ width: `${barWidth}%` }} className='h-[5px] bg-blue-500 rounded-full ml-1`} ' />;

    async function handleVote(event: React.MouseEvent<HTMLElement>) {
        try {
            const updatedPoll: pollData = await castVote(props.data.id, props.data.id);

            props.setOptionsData(updatedPoll.options);
            props.setHasVoted(true);
            props.setIsClosed(false);
            props.setChosenOptionId(props.data.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div id={props.data.id} className={`flex gap-3 ${props.displayVotePercent ? 'items-start' : 'items-center'} w-full`}>
            <div className='flex flex-col gap-0 justify-end items-end w-[4.5rem]'>
                {!props.displayVotePercent && chooseButton}
                {props.displayVotePercent && <p className='text-lg'>{props.data.votePercent.toFixed(2)}%</p>}
                {props.displayVotePercent && props.isChosen && chosenMark}
            </div>

            <div className='flex flex-col gap-1 p-1 w-full'>
                <p>{props.data.optionText}</p>
                {props.displayVotePercent && votePercentBar}
            </div>
        </div>
    );
}

export default PollOption;
