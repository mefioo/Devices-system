import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const FormGroupInput = (props) => {
	const [isTouched, setIsTouched] = useState(false);
	const [value, setValue] = useState(props.value);

	useEffect(() => {
		props.onChange(value);
	}, [value, isTouched, props]);

	const changeValueHandler = (event) => {
		if (!isTouched) {
			setIsTouched(true);
		}
		setValue(event.currentTarget.value);
	};

	return (
		<Form.Group>
			<Form.Label>{props.label}</Form.Label>
			<Form.Control
				disabled={props.disabled}
				onChange={changeValueHandler}
				required={props.required}
				type={props.type}
				isInvalid={props.required && isTouched && value === ''}
				value={props.value ? props.value : ''}
				className={props.className}
			></Form.Control>
			<Form.Control.Feedback type='invalid'>
				* This field is required.
			</Form.Control.Feedback>
		</Form.Group>
	);
};

FormGroupInput.defaultProps = {
	label: '',
	type: 'text',
	disabled: false,
	onChange: () => {},
	value: '',
	required: false,
};

export default FormGroupInput;
