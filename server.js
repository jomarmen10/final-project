const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 3001;

require('./db/db')
const Comment = require('./models/Comment')

const app = express()

const corsOptions = {
  origin: 'https://code-bud.herokuapp.com',
  // origin: 3000,
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.static(`${__dirname}/build`))

const server = http.Server(app);



server.listen(process.env.PORT || PORT, () => {
  console.log('listening to port:', PORT)
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


// if(process.env.NODE_ENV === 'production'){
//   app.get('/*', (req, res) =>{
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
//   })
// }

app.get('/*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
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
