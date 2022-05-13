import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalOverlayBody = (props) => {
	return <Modal.Body>{props.children}</Modal.Body>;
};

export default ModalOverlayBody;
