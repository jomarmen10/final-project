const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');


require('./db/db')
const Comment = require('./models/Comment')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));


const server = http.Server(app);

server.listen(process.env.PORT || 3001, () => {
  console.log('listening to port:', process.env.PORT)
})

const io = socketIO(server);

io.on('connection', (socket) => {

  socket.on("new-comment", data=>{
    io.emit('comment', data)
  })

  socket.on('addCode', data=>{
    io.emit('resCode', data)
  })

  socket.on('codeRes', data => {
    io.emit('finalRes', data)
  })

  socket.on('question', data => {
    io.emit('returnQuestion', data)
  })

  socket.on('del-comment', data => {
    io.emit('new-Delcomment', data)
  })
})


app.get('/', async(req, res) =>{
  try {
    const allcomment = await Comment.find({})
    res.json({
      success: true,
      allcomment
    })
  }catch(err){
    return err
  }
})

app.post('/', async(req,res) => {
  try{
    const comment = await Comment.create(req.body)
    res.json({
      success:true,
      comment
    })
  }catch(err){
    return err
  }
})

app.delete('/', async(req, res) => {
  try {
    const deleteDb = await Comment.remove({})
    res.json({
      deleted:true,
      deleteDb
    })
  }catch(err){
    return err
  }
})
