import { ChatBubbleBottomCenterIcon, PhoneArrowDownLeftIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { DefaultEventsMap } from '@socket.io/component-emitter';
import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;
//<{isOpen:boolean,}>
type ChatMessage = {
  id: number;
  message: string;
  isSender: boolean;
  //uid: number;
  //roomid: number;
}
const ChatWindow:React.FC=()=> {
  const [chatmsgs, setChatmsgs] = useState<ChatMessage[]>([]);
  const { data: session } = useSession();


  useEffect(() => {
    if(session){
      socketInitializer()
      console.log(session)
      console.log("init xxxx")
    }
  }, [session?.user?.id])

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io()

    socket.on('connect', () => {
      socket.emit('join-room',session?.user?.id)
      console.log('connected')
    })
    socket.on('receive-msg', msg => {

      console.log("receive-msg",msg)
      console.log("chatmsgs",chatmsgs)
      setChatmsgs(chatmsgs =>chatmsgs.concat([msg]))
      console.log("chatmsgs2",chatmsgs)
    })
    socket.on('disconnect', () => {
      console.log('disconnected')
    })
  }

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={"fixed z-30"}>
      <div className={"fixed z-20 right-5 bottom-5  bg-blue-500  rounded-full h-16 w-16 hover:bg-blue-600 "+(isOpen?"hidden":"")} onClick={
      ()=>{setIsOpen(true)}
    }>
        <ChatBubbleBottomCenterIcon className="h-8 w-8 text-white m-4" />
    </div>
    <div className={" "+(isOpen?"":"hidden")}>
      {/*{/*<!-- fixed at bottom -->*/}

      <div className="fixed bottom-0 right-0">
        <div className="flex space-x-4">
          {/*{!--chat box --}*/}

          <div className="w-80 h-96 flex flex-col border shadow-md bg-white">
            <div className="flex items-center justify-between border-b p-2">
              {/*{!--user info --}*/}
              <div className="flex items-center">
                <img className="rounded-full w-10 h-10"
                     src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <div className="pl-2">
                  <div className="font-semibold">
                    <a className="hover:underline" href="#">John Doe</a>
                  </div>
                  <div className="text-xs text-gray-600">Online</div>
                </div>
              </div>
              {/*{/*<!-- end user info -->*/}
                {/*<!-- chat box action -->*/}
              <div>
               {/* <a className="inline-flex hover:bg-indigo-50 rounded-full p-2" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </a>*/}

                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={()=>{setIsOpen(false)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/*{!--end chat box action --}*/}
            </div>

            <div className="flex-1 px-4 py-4 overflow-y-auto">
              {chatmsgs.map(({id,isSender,message},index)=>{
                return (isSender?<SenderMsg msg={message} key={index} />:<ReceiverMsg msg={message} key={index}/>)
              })}

            </div>

            <div className="flex items-center border-t p-2">
              {/*<!-- chat input action -->*/}
              <div>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              {/*<!-- end chat input action -->*/}

              <div className="w-full mx-2">
                <input id={"chat-message"} className="w-full rounded-full border border-gray-200" type="text"  placeholder="Aa" onChange={(e)=>{console.log("")}}
                       autoFocus />
              </div>

              {/*<!-- chat send action -->*/}

              <div>
                <button className="inline-flex hover:bg-indigo-50 rounded-full p-2" type="button" onClick={()=>{console.log("dddd");socket.emit('send-message',{id:2,isSender:false,message:(document.getElementById("chat-message")as HTMLInputElement).value })}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>

              {/*<!-- end chat send action -->*/}
            </div>
          </div>

          {/*<!-- end chat box -->*/}

          {/*<!-- chat box -->*/}


        </div>
      </div>

      {/*<!-- end fixed at bottom -->*/}
    </div>
    </div>
  )
}
export default ChatWindow;
const SenderMsg:React.FC<{msg:string}> = ({msg}) => {
  return(
    <div className="flex items-center mb-4">
      <div className="flex-none flex flex-col items-center space-y-1 mr-4">
        <img className="rounded-full w-10 h-10"
             src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
        <a href="#" className="block text-xs hover:underline">John Doe</a>
      </div>
      <div className="flex-1 bg-indigo-400 text-white p-2 rounded-lg mb-2 relative">
        <div>{msg}</div>

        {/*<!-- arrow -->*/}
        <div
          className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-400"></div>
        {/*<!-- end arrow -->*/}
      </div>
    </div>
  )
}
const ReceiverMsg:React.FC<{msg:string}> = ({msg}) => {
  const{data:userData}=useSession();
  const userImage= userData?.user?.image??"/images/user.png";
  const userName= userData?.user?.name??"user";
  return (
    <div className="flex items-center flex-row-reverse mb-4">
      <div className="flex-none flex flex-col items-center space-y-1 ml-4">
        <img className="rounded-full w-10 h-10"
             src={userImage} />
        <a href="#" className="block text-xs hover:underline">{userName}</a>
      </div>
      <div className="flex-1 bg-indigo-100 text-gray-800 p-2 rounded-lg mb-2 relative">
        <div>
          {msg}
        </div>

        {/*<!-- arrow -->*/}
        <div
          className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-indigo-100"></div>
        {/*<!-- end arrow -->*/}
      </div>
    </div>
  )
}
export {ReceiverMsg,SenderMsg};