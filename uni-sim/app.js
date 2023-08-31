const express = require('express');
const universityRoutes = require('./routes/universityRoutes');
const studentRoutes = require('./routes/studentRoutes');
const examRoutes = require('./routes/examRoutes');
const { initStudents } = require('./controllers/studentController');
const { initUniversities } = require('./controllers/universityController');

const PORT = 3000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('deneme');
});
app.use('/universities', universityRoutes);
app.use('/students', studentRoutes);
app.use('/exams', examRoutes);

ge;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    await initStudents();
    await initUniversities();
  } catch (error) {
    console.error('Failed to initialize data:', error);
  }
});
