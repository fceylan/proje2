const express = require('express');
const universityRoutes = require('./routes/universityRoutes');
const studentRoutes = require('./routes/studentRoutes');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('deneme');
});
app.use('/universities', universityRoutes);
app.use('/students', studentRoutes);

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log('Error migrating database:', error);
  }
});
