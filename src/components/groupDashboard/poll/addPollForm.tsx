import { MouseEventHandler, useEffect, useState } from 'react';
import AddPollInput from './addPollInput';

const MAX_INPUT_SIZE = 6;

function AddPollForm(props: { onClose: MouseEventHandler<HTMLElement> }) {
    const [question, setQuestion] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [option5, setOption5] = useState('');
    const [option6, setOption6] = useState('');

    const questionInputField = <AddPollInput label={'Question'} onChange={setQuestion} value={question} required={true}></AddPollInput>;
    const option1InputFiled = <AddPollInput label={'Option1'} onChange={setOption1} value={option1} required={true}></AddPollInput>;
    const option2InputFiled = <AddPollInput label={'Option2'} onChange={setOption2} value={option2} required={true}></AddPollInput>;
    const option3InputFiled = <AddPollInput label={'Option3'} onChange={setOption3} value={option3} required={false}></AddPollInput>;
    const option4InputFiled = <AddPollInput label={'Option4'} onChange={setOption4} value={option4} required={false}></AddPollInput>;
    const option5InputFiled = <AddPollInput label={'Option5'} onChange={setOption5} value={option5} required={false}></AddPollInput>;
    const option6InputFiled = <AddPollInput label={'Option6'} onChange={setOption6} value={option6} required={false}></AddPollInput>;

    const [visibleOptionFields, setVisibleOptionFields] = useState(2);
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        const isRequirementFulfilled = question !== '' && option1 !== '' && option2 !== '';
        setCanSubmit(isRequirementFulfilled);
    });
    function addOptionField() {
        setVisibleOptionFields((prev) => {
            if (prev === MAX_INPUT_SIZE) {
                return prev;
            }
            return prev + 1;
        });
    }

    return (
        <div onClick={props.onClose} className='flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full'>
                    {questionInputField}
                    <div className='grid gap-10 w-full'>
                        {visibleOptionFields >= 1 && option1InputFiled}
                        {visibleOptionFields >= 2 && option2InputFiled}
                        {visibleOptionFields >= 3 && option3InputFiled}
                        {visibleOptionFields >= 4 && option4InputFiled}
                        {visibleOptionFields >= 5 && option5InputFiled}
                        {visibleOptionFields >= 6 && option6InputFiled}
                    </div>
                    <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 mt-32' disabled={!canSubmit}>
                        Save
                    </button>
                </form>

                <button
                    className='text-blue-950 bg-indigo-200 absolute rounded-lg  py-2 px-3 shadow-sm text-xl bottom-32 sm:bottom-44 right-6 disabled:bg-neutral-200 disabled:text-neutral-500'
                    onClick={addOptionField}
                    disabled={visibleOptionFields === MAX_INPUT_SIZE}
                >
                    Add option
                </button>
            </div>
        </div>
    );
}

export default AddPollForm;
