const express = require('express');
const Joi = require('joi');
const app = express();

const port = process.env.PORT || 3000;

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()  
  };

  return Joi.validate(course, schema);
}

app.use(express.json());

const courses = [
  { id: 1, name: 'Course one'},
  { id: 2, name: 'Course two'},
  { id: 3, name: 'Course three'},
];

app.get('/', (req, res) => {
  res.send('Hello World API');
});


// Retrieve all curses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// Retrieve course by id
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send('The course with the given id was not found');

  res.send(course);
});

// Add a course
app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);

  res.send(course);
});

// Update course by id
app.put('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  const { error } = validateCourse(req.body);

  if (!course) return res.status(404).send('The course with the given id was not found');

  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send('The course with the given id was not found');

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});


app.listen(port, ()=> { 
  console.log(`Listening on port ${ port }`);
});