import React, { useState } from 'react';
import ModalOverlay from './UI/ModalOverlay';
import { Button, Form } from 'react-bootstrap';
import ModalOverlayTitle from './UI/ModalOverlayTitle';
import ModalOverlayBody from './UI/ModalOverlayBody';
import FormGroupInput from './UI/FormGroupInput';
import FormGroupCheckbox from './UI/FormGroupCheckbox';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { GET_DIVERSIFIED_DEVICES } from '../constants';

const AddDevice = (props) => {
	const [emptySubmit, setEmptySubmit] = useState(false);

	const {
		value: deviceName,
		nameChange: changeNameHandler,
		hasError: nameError,
	} = useInput('', (val) => val.trim().length !== 0);

	const {
		value: deviceDescription,
		nameChange: changeDecriptionHandler,
		hasError: descriptionError,
	} = useInput('', () => {
		return true;
	});

	const {
		value: deviceDisbled,
		nameChange: changeDisabledHandler,
		hasError: disabledError,
	} = useInput(false, () => {
		return true;
	});

	const dispatch = useDispatch();

	const onFormSubmition = (event) => {
		event.preventDefault();

		const areInputsProper = !nameError && !descriptionError && !disabledError;

		if (areInputsProper) {
			dispatch({
				type: GET_DIVERSIFIED_DEVICES,
				payload: {
					Id: uuidv4(),
					Name: deviceName,
					Description: deviceDescription,
					Disabled: deviceDisbled,
				},
			});
			props.onHide();
		} else {
			if (nameError) {
				setEmptySubmit(true);
			}
		}
	};

	return (
		<ModalOverlay onHide={props.onHide}>
			<ModalOverlayTitle title={'Add new device'} />
			<ModalOverlayBody>
				<Form noValidate onSubmit={onFormSubmition}>
					<FormGroupInput
						onChange={changeNameHandler}
						label={'Device name'}
						type={'text'}
						required={true}
						value={deviceName}
						className={emptySubmit ? 'is-invalid' : ''}
					/>
					<FormGroupInput
						onChange={changeDecriptionHandler}
						label={'Description'}
						type={'text'}
						required={false}
						value={deviceDescription}
					/>
					<FormGroupCheckbox
						checked={deviceDisbled}
						onChange={changeDisabledHandler}
					/>
					<div className='flex-row-end'>
						<Button variant='outline-dark' type='submit'>
							create
						</Button>
						<Button variant='outline-dark' type='button' onClick={props.onHide}>
							cancel
						</Button>
					</div>
				</Form>
			</ModalOverlayBody>
		</ModalOverlay>
	);
};

AddDevice.defaultProps = {
	onHide: () => {},
};

export default AddDevice;
