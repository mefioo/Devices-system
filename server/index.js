const express = require('express');

let data = [
	{
		Id: 1,
		Name: 'Name',
		Descirption: 'Some device nr 1',
		Disabled: false,
	},
	{
		Id: 2,
		Name: 'Name 2',
		Descirption: 'Some device nr 2',
		Disabled: true,
	},
	{
		Id: 3,
		Name: 'Name 3',
		Descirption: 'Some device nr 3',
		Disabled: false,
	},
	{
		Id: 4,
		Name: 'Name 4',
		Descirption: 'Some device nr 4',
		Disabled: true,
	},
];

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api', (req, res) => {
	res.json({ Devices: data });
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
