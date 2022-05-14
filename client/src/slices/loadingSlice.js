import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const loadingSlice = createSlice({
	name: 'loading',
	initialState: { isLoading: false },
	reducers: {
		setLoading: (state) => {
			state.isLoading = true;
		},
		setNotLoading: (state) => {
			state.isLoading = false;
		},
	},
});

export const selectLoadingState = createSelector(
	[(state) => state.loading.isLoading],
	(isLoading) => isLoading
);

export default loadingSlice;
export const loadingActions = loadingSlice.actions;
