import React, { useState } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectDeviceById } from '../slices/devicesSlice';
import ModifyDevice from './ModifyDevice';

const ListItem = (props) => {
	const [isModifing, setIsModifing] = useState(false);

	const device = useSelector((state) => selectDeviceById(state, props.id));

	console.log('device');

	const showModifyHandler = () => {
		setIsModifing(true);
	};

	const hideModifyHandler = () => {
		setIsModifing(false);
	};

	return (
		<React.Fragment>
			{isModifing && (
				<ModifyDevice device={device} onHide={hideModifyHandler} />
			)}
			<ListGroupItem onClick={showModifyHandler}>
				<div className='flex-row'>
					<div>
						<h5>{device.Name}</h5>
						<p>ID: {props.id}</p>
					</div>
					{device.Disabled && <p>DISABLED</p>}
				</div>
			</ListGroupItem>
		</React.Fragment>
	);
};

export default ListItem;
