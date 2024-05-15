import { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import AddPollInput from './addPollInput';

const MAX_INPUT_SIZE = 6;

function AddPollForm(props: { onClose: MouseEventHandler<HTMLElement> }) {
    const [optionFields, setOptionFields] = useState<JSX.Element[]>();
    const [maximumReached, setMaximumReached] = useState(false);

    useEffect(() => {
        const size = optionFields?.length;
        if (size === MAX_INPUT_SIZE) {
            setMaximumReached(true);
        }
    }, [optionFields, setOptionFields]);

    useEffect(() => {
        const newOptionFields = [];
        for (let i = 1; i < 3; i++) {
            newOptionFields.push(<AddPollInput optionNumber={i} key={i} />);
        }

        setOptionFields(newOptionFields);
    }, []);

    function addOptionField() {
        setOptionFields((prev) => {
            const n = prev ? prev.length : 0;
            if (n === 6) {
                return prev ? [...prev] : [];
            }
            return prev ? [...prev, <AddPollInput optionNumber={n + 1} key={n + 1} />] : [<AddPollInput optionNumber={0} key={0} />];
        });
    }

    return (
        <div onClick={props.onClose} className='flex items-center min-h-[100vh] w-full justify-center text-2x  absolute z-50 bg-black bg-opacity-30'>
            <div className='max-w-3xl w-full rounded-xl sm:p-12 p-6 grid gap-16 bg-white relative' onClick={(event) => event.stopPropagation()}>
                <form action='' className='grid gap-12 w-full'>
                    <div className='w-full flex flex-col sm:flex-row text-2xl'>
                        <label htmlFor='question' className='mr-6'>
                            Question:
                        </label>
                        <input id='question' type='text' className='border-b-2 border-gray-400 focus:outline-none w-full' />
                    </div>
                    <div className='grid gap-10 w-full'> {optionFields}</div>
                    <button className='rounded-lg bg-blue-700 py-3 text-blue-50 shadow-sm text-2xl disabled:bg-gray-500 mt-32'>Save</button>
                </form>

                <button
                    className='text-blue-950 bg-indigo-200 absolute rounded-lg  py-2 px-3 shadow-sm text-xl bottom-32 sm:bottom-44 right-6 disabled:bg-neutral-200 disabled:text-neutral-500'
                    onClick={addOptionField}
                    disabled={maximumReached}
                >
                    Add option
                </button>
            </div>
        </div>
    );
}

export default AddPollForm;
