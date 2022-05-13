import { createSlice } from '@reduxjs/toolkit';
import { loadingActions } from './loadingSlice';
import { createSelector } from 'reselect';
import axios from 'axios';

const initialState = { items: [] };

const devicesSlice = createSlice({
	name: 'devices',
	initialState: initialState,
	reducers: {
		addDevice: (state, action) => {
			state.items = [...state.items].push(action.payload.item);
		},
		setDevices: (state, action) => {
			state.items = action.payload.items;
		},
		removeDevice: (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
		},
	},
});

export const getDevices = () => {
	return async (dispatch) => {
		dispatch(loadingActions.setLoading());
		try {
			const data = await fetch('/api');
			const response = await data.json();

			dispatch(devicesActions.setDevices({ items: response.Devices }));
			dispatch(loadingActions.setNotLoading());
		} catch (err) {
			dispatch(loadingActions.setNotLoading());
			console.log(err);
		}
	};
};

export const addDevice = (newDevice) => {
	return async () => {
		try {
			const response = await axios.post('/api', newDevice);
			if (response.data.status !== 'ok') {
				throw new Error('Error while posting data');
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const selectAllDevices = createSelector(
	[(state) => state.devices.items],
	(items) => items.map((item) => item)
);

export const selectDeviceById = createSelector(
	[selectAllDevices, (state, id) => id],
	(items, id) => items.find((item) => item.Id === id)
);

export default devicesSlice;
export const devicesActions = devicesSlice.actions;
