import { createSlice } from '@reduxjs/toolkit';
import {
	createSelector,
	createSelectorCreator,
	defaultMemoize,
} from 'reselect';
import { isEqual } from 'lodash';

const initialState = { items: [] };

const devicesSlice = createSlice({
	name: 'devices',
	initialState: initialState,
	reducers: {
		addDevice: (state, action) => {
			state.items.push(action.payload.item);
		},
		setDevices: (state, action) => {
			state.items = action.payload.items;
		},
		removeDevice: (state, action) => {
			state.items = state.items.filter((item) => item.Id !== action.payload.id);
		},
		updateDevice: (state, action) => {
			state.items = state.items.map((item) =>
				item.Id === action.payload.device.Id ? action.payload.device : item
			);
		},
	},
});

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
