const express = require('express');
const cors = require('cors');
const logger = require('morgan');

let data = [
	{
		Id: 'adb1d546-a8d8-4638-9b14-5b0627a21d42',
		Name: 'Name',
		Description: 'Some device nr 1',
		Disabled: false,
	},
	{
		Id: '4df90b49-9383-4a4b-82b4-fd8dd365d80c',
		Name: 'Name 2',
		Description: 'Some device nr 2',
		Disabled: true,
	},
	{
		Id: 'b89a2b2b-bb1c-4550-8d08-bc94202e6c9c',
		Name: 'Name 3',
		Description: 'Some device nr 3',
		Disabled: false,
	},
	{
		Id: '0f747005-bf32-4589-9c8f-89d1049d83a9',
		Name: 'Name 4',
		Description: 'Some device nr 4',
		Disabled: true,
	},
];

const PORT = process.env.PORT || 3001;

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/api', (req, res) => {
	res.json({ Devices: data });
});

app.post('/api', (req, res) => {
	data.push(req.body);
	res.status(201).json({ status: 'ok' });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
