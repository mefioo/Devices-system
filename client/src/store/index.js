import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from '../slices/devicesSlice';
import loadingSlice from '../slices/loadingSlice';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from '../sagas/rootSaga';
import errorSlice from '../slices/errorSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		devices: devicesSlice.reducer,
		loading: loadingSlice.reducer,
		error: errorSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watcherSaga);

export default store;
