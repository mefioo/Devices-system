import { runSaga } from 'redux-saga';
import {
	handleGetDevices,
	handleAddDevices,
	handleRemoveDevice,
	handleModifyData,
} from './devices';

const axios = require('axios');
jest.mock('axios');

describe('handleGetDevices', () => {
	it('returns devices', async () => {
		axios.get.mockResolvedValue({ data: { Devices: [{}, {}, {}] } });

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleGetDevices
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].payload.items.length).toEqual(3);
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});

	it('returns an error', async () => {
		axios.get.mockRejectedValue(new Error());

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleGetDevices
		).toPromise();
		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].payload.errorData).toEqual(
			'Error while getting data. Could not fullfill the request.'
		);
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});
});

describe('handleAddDevices', () => {
	it('add device', async () => {
		const data = {
			Id: 'some-id',
			Name: 'deviceName',
			Description: 'deviceDescription',
			Disabled: 'deviceDisbled',
		};
		axios.get.mockResolvedValue({ data: data });

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleAddDevices,
			data
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].type).toEqual('devices/addDevice');
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});

	it('returns an error', async () => {
		axios.post.mockRejectedValue();

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleAddDevices
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].payload.errorData).toEqual(
			'Error while adding data. Could not fullfill the request.'
		);
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});
});

describe('handleRemoveDevice', () => {
	it('removes devices', async () => {
		const data = { id: 'some-id' };
		axios.delete.mockResolvedValue({ data: data });

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleRemoveDevice,
			data
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].type).toEqual('devices/removeDevice');
		expect(dispatched[1].payload.id).toEqual('some-id');
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});

	it('returns an error', async () => {
		axios.post.mockRejectedValue();

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleRemoveDevice
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].payload.errorData).toEqual(
			'Error while removing data. Could not fullfill the request.'
		);
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});
});

describe('handleModifyData', () => {
	it('modifies devices', async () => {
		axios.put.mockResolvedValue({});

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleModifyData,
			{ payload: {} }
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].type).toEqual('devices/updateDevice');
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});

	it('returns an error', async () => {
		axios.put.mockRejectedValue();

		const dispatched = [];
		const result = await runSaga(
			{
				dispatch: (action) => dispatched.push(action),
			},
			handleModifyData
		).toPromise();

		expect(dispatched[0].type).toEqual('loading/setLoading');
		expect(dispatched[1].payload.errorData).toEqual(
			'Error while modifing data. Could not fullfill the request.'
		);
		expect(dispatched[2].type).toEqual('loading/setNotLoading');
	});
});
