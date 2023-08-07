const express = require('express');
const universityRoutes = require('./routes/universityRoutes');
const studentRoutes = require('./routes/studentRoutes');
const examRoutes = require('./routes/examRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const placementRoutes = require('./routes/placementRoutes');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('deneme');
});
app.use('/universities', universityRoutes);
app.use('/students', studentRoutes);
app.use('/exams', examRoutes);
app.use('/scores', scoreRoutes);
app.use('/placements', placementRoutes);

app.listen(PORT, async () => {
  try {
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.log('Error migrating database:', error);
  }
});
