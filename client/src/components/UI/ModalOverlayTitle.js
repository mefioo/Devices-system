import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalOverlayTitle = (props) => {
	return (
		<Modal.Header closeButton>
			<Modal.Title>{props.title}</Modal.Title>
		</Modal.Header>
	);
};

ModalOverlayTitle.defaultProps = {
	title: '',
};

export default ModalOverlayTitle;
