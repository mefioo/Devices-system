import React from 'react';
import FormGroupInput from './UI/FormGroupInput';
import ModalOverlay from './UI/ModalOverlay';
import ModalOverlayBody from './UI/ModalOverlayBody';
import ModalOverlayTitle from './UI/ModalOverlayTitle';
import FormGroupCheckbox from './UI/FormGroupCheckbox';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import useInput from '../hooks/useInput';
import { devicesActions } from '../slices/devicesSlice';

const ModifyDevice = (props) => {
	const {
		value: deviceName,
		nameChange: changeNameHandler,
		hasError: nameError,
	} = useInput(props.device.Name, (val) => val.trim().length !== 0);

	const {
		value: deviceDescription,
		nameChange: changeDecriptionHandler,
		hasError: descriptionError,
	} = useInput(props.device.Description, () => {
		return true;
	});

	const {
		value: deviceDisbled,
		nameChange: changeDisabledHandler,
		hasError: disabledError,
	} = useInput(props.device.Disabled, () => {
		return true;
	});

	const dispatch = useDispatch();

	const modifyItemHandler = (event) => {
		event.preventDefault();

		const areInputsProper = !nameError && !descriptionError && !disabledError;

		if (areInputsProper) {
			dispatch(
				devicesActions.getUpdatedDevices({
					Id: props.device.Id,
					Name: deviceName,
					Description: deviceDescription,
					Disabled: deviceDisbled,
				})
			);
			props.onHide();
		}
	};

	const deleteItemHandler = () => {
		dispatch(devicesActions.getReducedDevices(props.device.Id));
		props.onHide();
	};

	return (
		<ModalOverlay onHide={props.onHide}>
			<ModalOverlayTitle title={'Device details'} />
			<ModalOverlayBody>
				<Form noValidate>
					<FormGroupInput
						label={'ID'}
						type={'text'}
						disabled
						onChange={() => {}}
						value={props.device.Id}
					/>
					<FormGroupInput
						label={'Device name'}
						type={'text'}
						onChange={changeNameHandler}
						value={deviceName}
						required={true}
					/>
					<FormGroupInput
						label={'Description'}
						type={'text'}
						onChange={changeDecriptionHandler}
						value={deviceDescription}
					/>
					<FormGroupCheckbox
						checked={deviceDisbled}
						onChange={changeDisabledHandler}
					/>
					<div className='flex-row-end'>
						<Button
							variant='outline-dark'
							type='submit'
							onClick={modifyItemHandler}
						>
							modify
						</Button>
						<Button
							variant='outline-dark'
							type='button'
							onClick={deleteItemHandler}
						>
							delete
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

export default ModifyDevice;
