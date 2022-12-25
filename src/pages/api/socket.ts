import { Server } from 'socket.io'
//<{id:number;isSender:boolean;message:string}[]>

const UserList=<{ id: string; room: string;}[]>[]
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connect', (socket, )=> {
      console.log('Socket connected')
      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })
      socket.on('join-room', (room) => {
        if(UserList.find((user)=>user.id===socket.id)){

        }else {
          UserList.push({ id: socket.id, room: room })
          socket.join(room)
          console.log('join-room', room)
          io.to(room).emit('receive-msg', {
            id: 1,
            isSender: true,
            message: "Hello",
          })
        }
      })
      //socket.join(socket.id)
      //socket.broadcast.emit('update-input', 'hello')
      socket.on('send-message', (data) => {
        console.log(data)
        console.log(socket.id)
        console.log(UserList)
        UserList.forEach((user) => {
          if (user.id === socket.id) {
            //io.to(user.room).emit('test', data)
            io.to(user.room).emit('receive-msg', data)
          }
          //console.log(user.id)
        })
        //socket.to().emit("test", "eeeeee")
        //socket.broadcast.emit("test","ssss")
      })
    })
  }
  res.end()
}

export default SocketHandler

