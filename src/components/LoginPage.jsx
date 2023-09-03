import {auth, provider} from '../firebaseconfig.js'
import {signInWithPopup} from 'firebase/auth'
import './LoginPage.css'
import Cookies from 'universal-cookie'

const cookie = new Cookies()


function LoginPage(props) {
    const {setIsAuth} = props
    const signInWithGoogle = async () => {
       try {
           const result = await signInWithPopup(auth, provider)
           cookie.set('auth-token' , result.user.refreshToken)
           setIsAuth(true)
       } catch (error) {
            console.log(error);
       }
    }


  return (
    <div className="login h-screen w-screen grid place-content-center login-gif">
      <h1 className='rubik mb-[-20px] mt-[-20px] font-bold absolute top-10 w-screen text-center text-5xl'>LOFI CODE NEST</h1>
          <div className="btn-gif rubik grid place-content-center w-[230px] h-[64px] bg-black text-white rounded-full hover:text-2xl hover:w-[280px] hover:h-[78px] hover:cursor-pointer transition-all duration-300 drop-shadow-md" onClick={signInWithGoogle}>
            Login With Google
        </div>
    </div>
  )
}
export default LoginPage