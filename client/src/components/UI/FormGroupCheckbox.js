import React from 'react';
import { Form } from 'react-bootstrap';

const FormGroupCheckbox = (props) => {
	return (
		<Form.Group controlId='formBasicCheckbox'>
			<Form.Check
				onChange={(event) => {
					props.onChange(event.currentTarget.checked);
				}}
				checked={props.checked}
				type='checkbox'
				label='Disabled'
			/>
		</Form.Group>
	);
};

FormGroupCheckbox.defaultProps = {
	checked: false,
	onChange: () => {},
};

export default FormGroupCheckbox;
