import React, { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDevices } from '../slices/devicesSlice';
import { selectLoadingState } from '../slices/loadingSlice';
import ListItem from './ListItem';
import { GET_DEVICES } from '../constants';

const Body = () => {
	const dispatch = useDispatch();

	const devices = useSelector((state) => selectAllDevices(state));
	const isLoading = useSelector((state) => selectLoadingState(state));

	useEffect(() => {
		dispatch({ type: GET_DEVICES });
	}, [dispatch]);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch({ type: GET_DEVICES });
		}, 30000);
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	const content = isLoading ? (
		<p>Loading...</p>
	) : (
		devices.map((item) => <ListItem key={item.Id} id={item.Id} />)
	);

	return (
		<Card.Body>
			<ListGroup>{content}</ListGroup>
		</Card.Body>
	);
};

export default Body;
