import axios from 'axios';

export const getAllDevices = () => {
	return axios.get('/api');
};

export const addNewDevice = (newDevice) => {
	return axios.post('/api', newDevice);
};

export const modifyDeviceById = async (device) => {
	const response = await axios.put(`/api/${device.Id}`, device);
	return response;
};

export const deleteDeviceById = async (id) => {
	const response = await axios.delete(`/api/${id}`);
	return response;
};
