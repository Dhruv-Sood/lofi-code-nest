import { addDoc , collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth,db } from '../firebaseconfig';
function ChatBox({room}) {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState([])
    const messageRef = collection(db, 'messages')

    useEffect(()=>{
        const queryMessage = query(messageRef, where('room','==',room) , orderBy('createdAt'))
        const unsubscribe = onSnapshot(queryMessage, (snapshot)=>{
            let messages = []
            console.log("NEW MESSAGE")
            snapshot.forEach((doc)=>{
                messages.push({...doc.data() , id: doc.id})
            })
            setMessages(messages)
        })

        return ()=>unsubscribe()
    },[])

    const handleSubmit = async ()=>{
        if(newMessage === '') return
        await addDoc(messageRef,{
            text: newMessage,
            createdAt: serverTimestamp(),
            displayName: auth.currentUser.displayName,
            room
        })
        setNewMessage('')
    }

    return (
        <div className="flex flex-col justify-between items-center">
            <h1 className='rubik text-4xl mt-[-22px] mb-[22px] font-bold'>LOFI CODE NEST</h1>
            <div className="flex flex-col h-[600px] w-[400px] bg-blue-200 bg-opacity-30 rounded-lg relative">
                <div className='absolute right-2 top top-1 bg-blue-200 bg-opacity-0  rounded-lg hover:scale-110 hover:cursor-pointer transition-all duration-300'>
                    <a href="https://webwhiteboard.com" target='_blank'><i class="fa-solid fa-chalkboard text-3xl"></i></a>
                </div>
                <div className="h-[92%] overflow-scroll p-4">
                    {messages.map((message)=>{
                        return <div key={message.id} className='flex text-lg gap-[4px]'>
                            <p className=' font-bold text-[#9f9]'>{message.displayName}:</p>
                            <p>{message.text}</p>
                        </div>
                    })}
                </div>
                <div className="h-[8%] flex relative">
                    <input type="text" className="w-full h-full px-2 bg-lime-50 rounded-xl z-0 focus:outline-none pr-[47px]" placeholder="Enter you message...." onChange={(e)=>{
                        setNewMessage(e.target.value)
                    }} value={newMessage}/>
                    <button className='p-2 grid place-content-center rounded-lg z-10 absolute right-[2px]' onClick={()=>handleSubmit()}>
                        <i className="fa-regular fa-paper-plane text-3xl text-blue-400"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ChatBox