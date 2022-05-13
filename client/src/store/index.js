import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from '../slices/devicesSlice';
import loadingSlice from '../slices/loadingSlice';

const store = configureStore({
	reducer: {
		devices: devicesSlice.reducer,
		loading: loadingSlice.reducer,
	},
});
export default store;
