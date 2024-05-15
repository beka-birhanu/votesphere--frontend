function AddPollInput(props: { optionNumber: number }) {
    return (
        <div className='ml-6 flex flex-col sm:flex-row justify-items-stretch text-xl'>
            <label htmlFor='option1' className='mr-6'>
                {' '}
                Option {props.optionNumber}:
            </label>
            <input id='option1' type='text' className='border-b-2 border-gray-400 focus:outline-none flex-grow' multiple={true} />
        </div>
    );
}
export default AddPollInput;
