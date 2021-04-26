require('dotenv').config('.env')
const express = require('express');
const cors = require('cors');
const Note = require('./models/note')
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

const generateId = ()=>{
 Note.find({}).then(
  result=> {
      return result.lenth+1;
  })
}


app.get('/',(req,res)=>{
  res.send('<h1>hello world</h1>');
})

app.get('/api/notes',(req,res)=>{
  Note.find({}).then(result => {
    return res.json(result)
  })
  
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  // const note = notes.find(note => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
   const body = request.body;
   console.log(body);
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const note =new Note({
    content: request.body.content,
    important: request.body.important || false,
    date: new Date(),
    // id: generateId(),
  })
  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.listen(PORT);
console.log(`server runner on port ${PORT}`);
