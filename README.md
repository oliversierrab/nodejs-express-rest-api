# Basic Sample of REST api using expressjs with nodejs
No database, using simple array in memory

## Endpoints
* List all courses : `GET /api/courses/`
* Retrieve course by id : `GET /api/course/:id`
* Add course : `POST /api/courses`
Body:
{
	"name": "New Course"
}

Response:
{
    "id": 5,
    "name": "New Course"
}