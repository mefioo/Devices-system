import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalOverlay = (props) => {
	return (
		<Modal show={true} onHide={() => props.onHide()}>
			{props.children}
		</Modal>
	);
};

export default ModalOverlay;
