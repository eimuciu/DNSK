const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

// route imports
const { plateRoutes } = require('./routes/plateRoutes');

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/plates', plateRoutes);

app.get('*', function (req, res) {
  res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
  console.log('Server is running on PORT', PORT);
});
