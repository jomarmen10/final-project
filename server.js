const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');


require('./db/db')
const Comment = require('./models/Comment')

const app = express()

const corsOptions = {
  origin: 'http://localhost:3000', // when you deploy your react app, this is where you put the address,
  credentials: true, // allowing cookies to be sent with requests from the client (session cookie),
  optionsSuccessStatus: 200 // some legacy browsers IE11 choke on a 204, and options requests
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));


const server = http.Server(app);

server.listen(3001, () => {
  console.log('listening to port:', 3001)
})

const io = socketIO(server);

io.on('connection', (socket) => {
  // console.log(socket.id, 'new user connected')

  socket.on("new-comment", data=>{
    io.emit('comment', data)
  })

  socket.on('addCode', data=>{
    io.emit('resCode', data)
  })

})


app.get('/', async(req, res) =>{
  try {
    allcomment = await Comment.find({})
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
    comment = await Comment.create(req.body)
    res.json({
      success:true,
      comment
    })
  }catch(err){
    return err
  }
})
