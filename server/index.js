const express = require('express');
const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const mockData = [{ lat: 50.577171, lng: 20.435938 }, { lat: 50.537171, lng: 20.465938 }];

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

app.get('/deals', (req, res) => {
	res.send(mockData);
});
