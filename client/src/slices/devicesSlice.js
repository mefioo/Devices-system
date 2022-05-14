import { createSlice } from '@reduxjs/toolkit';
import { loadingActions } from './loadingSlice';
import {
	createSelector,
	createSelectorCreator,
	defaultMemoize,
} from 'reselect';
import {
	addNewDevice,
	deleteDeviceById,
	getAllDevices,
	modifyDeviceById,
} from '../components/services';
import { isEqual } from 'lodash';

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
			const response = await getAllDevices();

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
			const response = await addNewDevice(newDevice);
			if (response.data.status !== 'ok') {
				throw new Error('Error while posting data');
			}
		} catch (err) {
			console.log(err);
		}
	};
};

export const modifyDevice = (device) => {
	return async () => {
		try {
			const response = await modifyDeviceById(device);
			console.log(response.status);
		} catch (err) {
			console.log(err);
		}
	};
};

export const deleteDevice = (id) => {
	return async () => {
		try {
			const response = await deleteDeviceById(id);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	};
};

const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectAllDevices = createDeepEqualSelector(
	[(state) => state.devices.items],
	(items) => items.map((item) => item)
);

export const selectDeviceById = createSelector(
	[selectAllDevices, (state, id) => id],
	(items, id) => items.find((item) => item.Id === id)
);

export default devicesSlice;
export const devicesActions = devicesSlice.actions;
