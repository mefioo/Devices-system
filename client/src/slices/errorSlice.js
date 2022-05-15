import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const noErrorState = {
	isError: false,
	errorData: '',
};

const errorSlice = createSlice({
	name: 'error',
	initialState: noErrorState,
	reducers: {
		clearError: (state) => {
			state.isError = false;
			state.errorData = '';
		},
		setError: (state, action) => {
			state.isError = true;
			state.errorData = action.payload.errorData;
		},
	},
});

export const selectErrorState = createSelector(
	[(state) => state.error],
	(error) => error
);

export default errorSlice;
export const errorActions = errorSlice.actions;
