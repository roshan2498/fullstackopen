const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2019-05-30T17:30:31.098Z",
        important: true,
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2019-05-30T18:39:34.091Z",
        important: false,
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2019-05-30T19:20:14.298Z",
        important: true,
    },
];
// req => contains all of the information of the HTTP request
// res => used to define how the request is responded to

// Since the parameter is a string, express automatically sets the value of the Content-Type header to be text / html . The status code of the response defaults to 200.
app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (req, res) => {
    res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    const note = notes.find((note) => note.id === id);
    if (note) {
        res.json(note);
    } else {
        res.status(404).end();
    }
});

app.delete("/api/notes/:id", (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter((note) => note.id != id);
    res.status(204).end();
});

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
    return maxId + 1;
};

app.post("/api/notes", (req, res) => {
    const body = req.body;
    if (!body.content) {
        return res.status(400).json({
            error: "content missing",
        });
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId(),
    };

    notes = notes.concat(note);
    console.log(note);
    res.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
