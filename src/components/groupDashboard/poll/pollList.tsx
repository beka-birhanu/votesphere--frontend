import PollListItem, { pollData } from './pollListItem';

function PollList(props: { pollsData: pollData[] }) {
    return (
        <section className='flex flex-col items-center justify-center gap-5 w-full '>
            {props.pollsData.map((pollData) => (
                <PollListItem key={pollData.id} pollData={pollData}></PollListItem>
            ))}
        </section>
    );
}

export default PollList;
