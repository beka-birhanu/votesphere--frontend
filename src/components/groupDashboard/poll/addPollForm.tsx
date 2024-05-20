import { MouseEventHandler, useEffect, useState } from 'react';
import AddPollInput from './addPollInput';
import LoadingSVG from '../loadingSVG';

const MAX_INPUT_SIZE = 6;

async function submit(question: string, options: string[], setIsLoading: CallableFunction) {
    setIsLoading(true);

    try {
        const response = await fetch('http://localhost:9000/polls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJla2FfYWRtaW5AZ21haWwuY29tIiwidXNlcm5hbWUiOiJiZWthX2FkbWluIiwiaWF0IjoxNzE2MTQ2MTEzLCJleHAiOjE3MTYxNDk3MTN9.5iUTLqeYbHpqNVCKZk5fgnuZHCrBt6fEmiGm8oUHqvg',
            },
            body: JSON.stringify({
                adminUsername: 'beka_admin',
                groupID: '830af378-238c-40da-9d4a-8793772f512e',
                poll: {
                    question,
                    options,
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Poll created successfully:', data);
    } catch (error) {
        console.error('Error creating poll:', error);
    } finally {
        setIsLoading(false);
    }
}

function AddPollForm(props: { onClose: MouseEventHandler<HTMLElement> }) {
    const [isLoading, setIsLoading] = useState(false);

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
    }, [option1, option2, question]);

    function addOptionField() {
        setVisibleOptionFields((prev) => {
            if (prev === MAX_INPUT_SIZE) {
                return prev;
            }
            return prev + 1;
        });
    }

    function handleSubmit(event: React.FormEvent<HTMLElement>) {
        event.preventDefault();
        if (!canSubmit) {
            return null;
        }

        let optionInputsData: string[] = [];
        optionInputsData.push(option1);
        optionInputsData.push(option2);

        if (option3 !== '') {
            optionInputsData.push(option3);
        }
        if (option4 !== '') {
            optionInputsData.push(option4);
        }
        if (option5 !== '') {
            optionInputsData.push(option5);
        }
        if (option6 !== '') {
            optionInputsData.push(option6);
        }

        submit(question, optionInputsData, setIsLoading);
    }

    return (
        <div
            onClick={props.onClose}
            className={`flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30`}
        >
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full' onSubmit={handleSubmit}>
                    {questionInputField}
                    <div className='grid gap-10 w-full'>
                        {visibleOptionFields >= 1 && option1InputFiled}
                        {visibleOptionFields >= 2 && option2InputFiled}
                        {visibleOptionFields >= 3 && option3InputFiled}
                        {visibleOptionFields >= 4 && option4InputFiled}
                        {visibleOptionFields >= 5 && option5InputFiled}
                        {visibleOptionFields >= 6 && option6InputFiled}
                    </div>
                    <button
                        className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 mt-32 flex justify-center gap-2 items-center'
                        disabled={!canSubmit}
                    >
                        {isLoading && <LoadingSVG></LoadingSVG>}
                        {isLoading ? 'Saving' : 'Save'}
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
