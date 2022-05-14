import React, { useEffect } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getDevices, selectAllDevices } from '../slices/devicesSlice';
import { selectLoadingState } from '../slices/loadingSlice';
import ListItem from './ListItem';

const Body = () => {
	const dispatch = useDispatch();

	const devices = useSelector((state) => selectAllDevices(state));
	const isLoading = useSelector((state) => selectLoadingState(state));

	useEffect(() => {
		dispatch(getDevices());
	}, [dispatch]);

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(getDevices());
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
