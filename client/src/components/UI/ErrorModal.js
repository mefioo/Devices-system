import React from 'react';
import ModalOverlay from './ModalOverlay';
import ModalOverlayBody from './ModalOverlayBody';
import ModalOverlayTitle from './ModalOverlayTitle';

const ErrorModal = (props) => {
	return (
		<ModalOverlay onHide={props.onHide}>
			<ModalOverlayTitle title={'Error'} />
			<ModalOverlayBody>
				<p>{props.errorData}</p>
			</ModalOverlayBody>
		</ModalOverlay>
	);
};

ErrorModal.defaultProps = {
	errorData: '',
	onHide: () => {},
};

export default ErrorModal;
