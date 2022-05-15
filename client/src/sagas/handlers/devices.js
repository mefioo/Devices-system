import { call, put } from 'redux-saga/effects';
import {
	addNewDevice,
	getAllDevices,
	deleteDeviceById,
	modifyDeviceById,
} from '../../services';
import { devicesActions } from '../../slices/devicesSlice';
import { errorActions } from '../../slices/errorSlice';
import { loadingActions } from '../../slices/loadingSlice';

export function* handleGetDevices() {
	try {
		yield put(loadingActions.setLoading());
		const response = yield call(getAllDevices);
		const { data } = response;
		yield put(devicesActions.setDevices({ items: data.Devices }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		yield put(
			errorActions.setError({
				errorData: 'Error while getting data. Could not fullfill the request.',
			})
		);
		yield put(loadingActions.setNotLoading());
	}
}

export function* handleAddDevices(dataToAdd) {
	try {
		yield put(loadingActions.setLoading());
		yield call(addNewDevice, dataToAdd.payload);
		yield put(devicesActions.addDevice({ item: dataToAdd.payload }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		yield put(
			errorActions.setError({
				errorData: 'Error while adding data. Could not fullfill the request.',
			})
		);
		yield put(loadingActions.setNotLoading());
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
		yield put(
			errorActions.setError({
				errorData: 'Error while removing data. Could not fullfill the request.',
			})
		);
		yield put(loadingActions.setNotLoading());
	}
}

export function* handleModifyData(data) {
	try {
		yield put(loadingActions.setLoading());
		yield call(modifyDeviceById, data.payload);
		yield put(devicesActions.updateDevice({ device: data.payload }));
		yield put(loadingActions.setNotLoading());
	} catch (error) {
		yield put(
			errorActions.setError({
				errorData: 'Error while modifing data. Could not fullfill the request.',
			})
		);
		yield put(loadingActions.setNotLoading());
	}
}
