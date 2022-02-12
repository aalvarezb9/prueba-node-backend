
const express = require('express');
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
    console.log(request.method)
    console.log(request.path)
    console.log(request.body)
    console.log('--------')
    next()
})

let notes = [
    {
        "id": 1,
        "nota": "aldknsadl asldjaslksdj aslkd",
        "important": true,
        "date": new Date().toISOString()
    },
    {
        "id": 2,
        "nota": "aldknsadl asldjaslksdj aslkd",
        "important": true,
        "date": new Date().toISOString()
    },
    {
        "id": 3,
        "nota": "aldknsadl asldjaslksdj aslkd",
        "important": false,
        "date": new Date().toISOString()
    }
]

app.get('/', (request, response) => {
    response.send('<button>Hello world</button>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
    // response.send(id)
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const note = request.body

    if (!note || !note.nota) {
        return response.status(400).json({
            error: 'Le falta el contenido'
        })
    }

    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        nota: note.nota,
        important: typeof note.important !== 'undefined' ? note.important : false,
        date: new Date().toISOString()
    }

    notes = [...notes, newNote]
    response.status(201).json(newNote)
})

app.use((req, res) => {
    res.status(404).json({
        'error': 'Not found'
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}...`);
});