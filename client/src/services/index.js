import axios from 'axios';

export const getAllDevices = async () => {
	return await axios.get('/api');
};

export const addNewDevice = async (newDevice) => {
	return await axios.post('/api', newDevice);
};

export const modifyDeviceById = async (device) => {
	return await axios.put(`/api/${device.Id}`, device);
};

export const deleteDeviceById = async (id) => {
	return await axios.delete(`/api/${id}`);
};
