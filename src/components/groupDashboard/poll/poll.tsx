import PollOption from './option';

export type pollData = {
  id: string;
  chosenOptionId: string;
  question: string;
  options: { optionText: string; voteCount: number; id: string }[];
  hasVoted: boolean;
};
function Poll(props: pollData) {
  const iconColor = props.hasVoted ? 'bg-[#ABACAD]' : 'bg-blue-700';
  const totalVoteCount = props.options.reduce((accumulator, option) => accumulator + option.voteCount, 0);
  const optionsWithPercent = props.options.map((option) => ({
    id: option.id,
    optionText: option.optionText,
    votePercent: (option.voteCount / totalVoteCount) * 100,
  }));
  const question = <h1 className='font-medium mx-2'>{props.question}</h1>;
  const options = optionsWithPercent.map((optionData) => (
    <PollOption data={optionData} displayVotePercent={props.hasVoted} isChosen={props.chosenOptionId == optionData.id}></PollOption>
  ));

  return (
    <section className='max-w-4xl w-full flex flex-col gap-5'>
      <section className='flex justify-between items-center p-3 hover:shadow-md border rounded-xl transition-all'>
        <div className={`${iconColor} rounded-full p-4 w-8 h-8 flex justify-center items-center`}>
          <p className='text-blue-50 pt-[1px] font-extrabold text-2xl'>?</p>
        </div>
        {question}
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='#ABACAD' className='-rotate-90'>
          <path d='M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z' />
        </svg>
      </section>
      <section className='flex flex-col px-6 py-4 gap-3 w-full'>{options}</section>
    </section>
  );
}

export default Poll;
