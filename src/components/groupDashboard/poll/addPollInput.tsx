function AddPollInput(props: { label: string; onChange: CallableFunction; value: string; required: boolean }) {
    return (
        <div className='ml-6 flex flex-col sm:flex-row justify-items-stretch text-xl'>
            <label htmlFor='option1' className='mr-6'>
                {' '}
                {props.label}:
            </label>
            <input
                id='option1'
                type='text'
                className='border-b-2 border-gray-400 focus:outline-none flex-grow w-full'
                multiple={true}
                value={props.value}
                onChange={(event) => props.onChange(event.target.value)}
                required={props.required}
            />
        </div>
    );
}
export default AddPollInput;
