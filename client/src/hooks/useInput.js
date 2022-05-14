import { useState } from 'react';

const useInput = (initialValue, validateInput) => {
	const [value, setValue] = useState(initialValue);
	const [isTouched, setIsTouched] = useState(false);

	const nameChange = (value) => {
		setIsTouched(true);
		setValue(value);
	};
	const valueIsValid = validateInput(value);

	const hasError = !valueIsValid && isTouched;

	return {
		value,
		nameChange,
		hasError,
	};
};

export default useInput;
