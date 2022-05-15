import { takeEvery } from 'redux-saga/effects';
import {
	CLEAR_ERROR,
	GET_DEVICES,
	GET_DIVERSIFIED_DEVICES,
	GET_REDUCED_DEVICES,
	GET_UPDATED_DEVICES,
} from '../constants';
import {
	handleGetDevices,
	handleAddDevices,
	handleRemoveDevice,
	handleModifyData,
} from './handlers/devices';
import { handleClearError } from './handlers/error';

export function* watcherSaga() {
	yield takeEvery(GET_DEVICES, handleGetDevices);
	yield takeEvery(GET_DIVERSIFIED_DEVICES, handleAddDevices);
	yield takeEvery(GET_REDUCED_DEVICES, handleRemoveDevice);
	yield takeEvery(GET_UPDATED_DEVICES, handleModifyData);
	yield takeEvery(CLEAR_ERROR, handleClearError);
}
