import React, { useState } from 'react';
import FormGroupInput from './UI/FormGroupInput';
import ModalOverlay from './UI/ModalOverlay';
import ModalOverlayBody from './UI/ModalOverlayBody';
import ModalOverlayTitle from './UI/ModalOverlayTitle';
import FormGroupCheckbox from './UI/FormGroupCheckbox';
import { Form, Button } from 'react-bootstrap';

const ModifyDevice = (props) => {
	const [updatedName, setUpdatedName] = useState(props.device.Name);
	const [updatedDescription, setUpdatedDescription] = useState(
		props.device.Description
	);
	const [updatedDisabled, setUpdatedDisabled] = useState(props.device.Disabled);

	const modifyNameHandler = (value) => {
		setUpdatedName(value);
	};

	const modifyDescriptionHandler = (value) => {
		setUpdatedDescription(value);
	};

	const changeDisabledHandler = (value) => {
		setUpdatedDisabled(value);
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
						onChange={modifyNameHandler}
						value={updatedName}
						required={true}
					/>
					<FormGroupInput
						label={'Description'}
						type={'text'}
						onChange={modifyDescriptionHandler}
						value={updatedDescription}
						required={true}
					/>
					<FormGroupCheckbox
						checked={updatedDisabled}
						onChange={changeDisabledHandler}
					/>
					<div className='flex-row-end'>
						<Button variant='outline-dark' type='submit'>
							modify
						</Button>
						<Button variant='outline-dark' type='button'>
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
