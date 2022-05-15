import React, { useState } from 'react';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import AddDevice from './AddDevice';
import { GET_DEVICES } from '../constants';

const Header = () => {
	const [isAdding, setIsAdding] = useState(false);
	const dispatch = useDispatch();

	const showAddDeviceHandler = () => {
		setIsAdding(true);
	};

	const hideAddDeviceHandler = () => {
		setIsAdding(false);
	};

	const refreshDevicesHandler = () => {
		dispatch({ type: GET_DEVICES });
	};

	return (
		<Card.Header>
			<div className='flex-row'>
				<h3>Device list</h3>
				<ButtonGroup>
					<Button variant='outline-dark' onClick={refreshDevicesHandler}>
						refresh list
					</Button>
					<Button variant='outline-dark' onClick={showAddDeviceHandler}>
						add device
					</Button>
				</ButtonGroup>
			</div>
			{isAdding && <AddDevice onHide={hideAddDeviceHandler} />}
		</Card.Header>
	);
};

export default Header;
