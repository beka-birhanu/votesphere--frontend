import { useReducer } from 'react';

const initialInputState = { value: '', isTouched: false };
interface InputState {
  value: string;
  isTouched: boolean;
}
type Action = { type: 'INPUT' | 'BLUR' | 'RESET'; value: string };

function inputStateReducer(state: InputState, action: Action): InputState {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  throw new Error('Unhandled action type');
}

function useInput(valueValidator: CallableFunction) {
  function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'INPUT', value: event.target.value });
  }

  function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'BLUR', value: event.target.value });
  }

  function resetHandler() {
    dispatch({ type: 'RESET', value: 's' });
  }

  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
  const inputError = inputState.isTouched ? valueValidator(inputState.value) : '';

  return [inputState.value, handleValueChange, handleBlur, resetHandler, inputError];
}

export default useInput;