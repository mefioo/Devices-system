import axios from 'axios';

export const getAllDevices = async () => {
	const data = await fetch('/api');
	const response = await data.json();
	return response;
};

export const addNewDevice = async (newDevice) => {
	const response = await axios.post('/api', newDevice);
	return response;
};

export const modifyDeviceById = async (device) => {
	const response = await axios.put(`/api/${device.Id}`, device);
	return response;
};

export const deleteDeviceById = async (id) => {
	const response = await axios.delete(`/api/${id}`);
	return response;
};
