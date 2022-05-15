import { render, screen } from '@testing-library/react';
import ListItem from './ListItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import devicesSlice from '../slices/devicesSlice';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

const storeData = {
	devices: {
		items: [
			{
				Id: 'adb1d546-a8d8-4638-9b14-5b0627a21d42',
				Name: 'Device name',
				Description: 'Some device nr 1',
				Disabled: false,
			},
			{
				Id: '4df90b49-9383-4a4b-82b4-fd8dd365d80c',
				Name: 'Name 2',
				Description: 'Some device nr 2',
				Disabled: true,
			},
		],
	},
};

let testStore;
describe('ListItem component', () => {
	beforeEach(() => {
		testStore = configureStore({
			reducer: { devices: devicesSlice.reducer },
			preloadedState: storeData,
		});
	});

	it('should render proper content', () => {
		const id = 'adb1d546-a8d8-4638-9b14-5b0627a21d42';
		const name = 'Device name';
		render(
			<Provider store={testStore}>
				<ListItem id={id} />
			</Provider>
		);
		const textId = screen.getByText(`ID: ${id}`);
		expect(textId).toBeInTheDocument();

		const textName = screen.getByText(name);
		expect(textName).toBeInTheDocument();

		const textDisabled = screen.queryByText('DISABLED');
		expect(textDisabled).toBeNull();
	});

	it('should show modal when is clicked', () => {
		const id = 'adb1d546-a8d8-4638-9b14-5b0627a21d42';
		const { container } = render(
			<Provider store={testStore}>
				<ListItem id={id} />
			</Provider>
		);
		const div = container.getElementsByClassName('list-group-item')[0];
		expect(div).toBeInTheDocument();

		userEvent.click(div);

		const modal = screen.getByText('Device details');
		const modifyButton = screen.getByRole('button', { name: 'modify' });
		const deleteButton = screen.getByRole('button', { name: 'delete' });
		const cancelButton = screen.getByRole('button', { name: 'cancel' });

		expect(modal).toBeInTheDocument();
		expect(modifyButton).toBeInTheDocument();
		expect(deleteButton).toBeInTheDocument();
		expect(cancelButton).toBeInTheDocument();
	});
});
