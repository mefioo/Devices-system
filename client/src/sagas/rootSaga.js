import { takeEvery } from 'redux-saga/effects';
import {
	handleGetDevices,
	handleAddDevices,
	handleRemoveDevice,
	handleModifyData,
} from './handlers/devices';

export function* watcherSaga() {
	yield takeEvery('devices/getDevices', handleGetDevices);
	yield takeEvery('devices/getDiversifiedDevices', handleAddDevices);
	yield takeEvery('devices/getReducedDevices', handleRemoveDevice);
	yield takeEvery('devices/getUpdatedDevices', handleModifyData);
}
