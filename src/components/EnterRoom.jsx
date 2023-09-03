function EnterRoom({ roomRef, setRoom }) {
    return (
        <div className='h-screen w-screen grid place-content-center bg-no-repeat bg-cover' style={{ backgroundImage: `url(https://media.giphy.com/media/w2MPFkd1Re79K9zmaU/giphy.gif)` }}>
            <div className='flex flex-col items-center h-[700px] w-[500px] bg-blue-200 bg-opacity-40 p-10 rounded-xl shadow-2xl justify-between'>
                <h1 className='text-[50px] rubik'><u>Enter the room:</u></h1>
                <div className="flex flex-col items-center h-[500px] pt-10 justify-around">
                    <input type="text" ref={roomRef} className='border rounded-xl h-[62px] w-[306px] text-[30px] p-4 haloweenfont focus:outline-none' />
                    <button className="w-[200px] h-[60px] bg-black text-white transition-all rounded-2xl hover:opacity-80 hover:scale-105" onClick={() => setRoom(roomRef.current.value)}>Submit</button>
                </div>

            </div>
        </div>
    )
}
export default EnterRoom