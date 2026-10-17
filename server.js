require('dotenv').config();
const { app } = require('./app');

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => console.log('Server started on port 9999'));