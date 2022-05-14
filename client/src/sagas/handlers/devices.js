import { call, put } from 'redux-saga/effects';
import {
	addNewDevice,
	getAllDevices,
	deleteDeviceById,
	modifyDeviceById,
} from '../../services';
import { devicesActions } from '../../slices/devicesSlice';
import { loadingActions } from '../../slices/loadingSlice';

export function* handleGetDevices() {
	try {
		yield put(loadingActions.setLoading());
		const response = yield call(getAllDevices);
		const { data } = response;
		yield put(devicesActions.setDevices({ items: data.Devices }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		console.log(error);
	}
}

export function* handleAddDevices(data) {
	try {
		yield put(loadingActions.setLoading());
		const response = yield call(addNewDevice, data.payload);
		const newDevice = response.data;
		yield put(devicesActions.addDevice({ item: newDevice }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		console.log(error);
	}
}

export function* handleRemoveDevice(data) {
	try {
		yield put(loadingActions.setLoading());
		const response = yield call(deleteDeviceById, data.payload);
		const id = response.data.id;
		yield put(devicesActions.removeDevice({ id }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		console.log(error);
	}
}

export function* handleModifyData(data) {
	try {
		yield put(loadingActions.setLoading());
		yield call(modifyDeviceById, data.payload);
		yield put(devicesActions.updateDevice({ device: data.payload }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		console.log(error);
	}
}
