const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const courses = [
  { id: 1, name: 'Course one'},
  { id: 2, name: 'Course two'},
  { id: 3, name: 'Course three'},
];

app.get('/', (req, res) => {
  res.send('Hello World API');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given id was not found');
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);

  res.send(course);
});


app.listen(port, ()=> { 
  console.log(`Listening on port ${ port }`);
});