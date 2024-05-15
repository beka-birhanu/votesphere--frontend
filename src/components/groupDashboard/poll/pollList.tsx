import Poll, { pollData } from './poll';

function PollList(props: { pollsData: pollData[] }) {
    return <section className='flex flex-col items-center justify-center gap-5 w-full '>{props.pollsData.map((pollData) => Poll(pollData))}</section>;
}

export default PollList;
