import { useRef, useState } from "react";
import ChatBox from "./ChatBox";
import "./ChatRoom.css";

import { audioStation } from "../../public/audioStations";
import { gifs } from "../../public/gifs";
import {signOut} from 'firebase/auth'
import {auth} from '../firebaseconfig'
import Cookies from "universal-cookie";

const cookies = new Cookies();

function ChatRoom({ room , setRoom , setIsAuth}) {
  const [play, setPlay] = useState(true);
  const musicRef = useRef(null);

  const [stationIndex, setStationIndex] = useState(0);
  const [randomGif, setRandomGif] = useState(Math.floor(Math.random() * (gifs.length - 1)));

  const stopGif = "https://media.giphy.com/media/c2CDTcHLscXaU5s1vK/giphy.gif"

  const handlePause = () => {
    if(play){
      setRandomGif(gifs.length - 1)
    } else{
      setRandomGif(Math.floor(Math.random() * (gifs.length - 1)))
    }
    setPlay(!play);
    
  };

  const handlePrev = () => {
    if(stationIndex === 0){
      setStationIndex(audioStation.length-1)
      setRandomGif(Math.floor(Math.random()*(gifs.length-1)))
    } else{
      setStationIndex(prev => prev-1)
      setRandomGif(Math.floor(Math.random() * (gifs.length - 1)))
    }
  }

  const handleNext = () => {
    if(stationIndex === audioStation.length-1){
      setStationIndex(0)
      setRandomGif(Math.floor(Math.random() * (gifs.length - 1)))
    } else{
      setStationIndex(prev => prev+1)
      setRandomGif(Math.floor(Math.random() * (gifs.length - 1)))
    }
  }


  const signOutHandler = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setRoom(null)
    setIsAuth(false)
  }

  const exitRoomHandler = () => {
    setRoom(null)
  }


  return (
    <div className=" h-screen w-screen flex flex-col justify-center items-center gap-10 bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${gifs[randomGif]})`}}>
      <iframe
        width="0"
        height="0"
        src={`https://www.youtube.com/embed/${audioStation[stationIndex]}?autoplay=${
          play ? "1" : "0"
        }`}
        ref={musicRef}
      ></iframe>
      <h1 className='rubik text-4xl mb-[-20px] mt-[-20px] font-bold'>LOFI CODE NEST</h1>
      <ChatBox room={room} />
      
      <div className="flex m-[-30px] gap-4">
        <div onClick={signOutHandler} className="roboto  bg-black text-white py-1 px-4 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-red-500">Sign out</div>
        <div onClick={exitRoomHandler} className="roboto bg-black text-white py-1 px-4 rounded-full hover:cursor-pointer hover:scale-110 transition-all duration-300 hover:bg-red-500">Exit Room</div>
        </div>


      <div className="w-[400px] h-[70px] flex justify-between">
        <div className="w-[20%] grid place-content-center text-4xl bg-[#b5b5f2ad]  rounded-xl hover:cursor-pointer hover:text-5xl transition-all duration-300 backdrop-blur-md" onClick={handlePrev}>
          <i className="fa-solid fa-chevron-left"></i>
        </div>

        <div className="w-[20%] grid place-content-center text-4xl bg-[#b5b5f2ad] rounded-xl bg-opacity-50 hover:cursor-pointer hover:text-5xl transition-all duration-500 backdrop-blur-md">
          <i className="fa-solid fa-stop " onClick={handlePause}></i>
        </div>

        <div className="w-[20%] grid place-content-center text-4xl bg-[#b5b5f2ad]  rounded-xl bg-opacity-50 hover:cursor-pointer hover:text-5xl transition-all duration-300 backdrop-blur-md" onClick={handleNext}>
          <i className="fa-solid fa-chevron-right"></i>
        </div>

      </div>
    </div>
  );
}
export default ChatRoom;
