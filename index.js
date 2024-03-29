const express = require('express');

const app = express();
const { PORT } = require('./config/config');
const expressConfig = require('./config/express');
const mondooseConfig = require('./config/mongoose');

expressConfig(app);
mondooseConfig();

app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}...`));