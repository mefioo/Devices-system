import React, { useState } from 'react';
import ModalOverlay from './UI/ModalOverlay';
import { Button, Form } from 'react-bootstrap';
import ModalOverlayTitle from './UI/ModalOverlayTitle';
import ModalOverlayBody from './UI/ModalOverlayBody';
import FormGroupInput from './UI/FormGroupInput';
import FormGroupCheckbox from './UI/FormGroupCheckbox';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { addDevice } from '../slices/devicesSlice';

const AddDevice = (props) => {
	const [deviceName, setDeviceName] = useState('');
	const [deviceDescription, setDeviceDescription] = useState('');
	const [deviceDisbled, setDeviceDisabled] = useState(false);

	const dispatch = useDispatch();

	const changeNameHandler = (value) => {
		setDeviceName(value);
	};

	const changeDecriptionHandler = (value) => {
		setDeviceDescription(value);
	};

	const changeDisabledHandler = (value) => {
		setDeviceDisabled(value);
	};

	const onFormSubmition = (event) => {
		event.preventDefault();
		if (deviceName === '') {
			return;
		}

		dispatch(
			addDevice({
				Id: uuidv4(),
				Name: deviceName,
				Description: deviceDescription,
				Disabled: deviceDisbled,
			})
		);
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
					/>
					<FormGroupInput
						onChange={changeDecriptionHandler}
						label={'Description'}
						type={'text'}
						required={false}
					/>
					<FormGroupCheckbox onChange={changeDisabledHandler} />
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

export default AddDevice;
