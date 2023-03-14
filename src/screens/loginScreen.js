import React, { useRef, useState } from 'react'
import FightingPopcorn from '../assets/FightingPopcorn.png'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

function LoginScreen() {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const usernameRef = useRef(null)

  const [signUp, setSignUp] = useState(false)

  const handleRegisterScreen = (e) => {
    e.preventDefault()

    setSignUp(true)
  }


  const register = (e) => {
    e.preventDefault()
    const username = usernameRef.current.value
    if(username === ''){
      alert('You must pick a username')
      return
    }
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        // create user collection with users by id, set all highscores to 0
        setDoc(doc(db, 'users', authUser.user.uid), {
          username: username,
          highScoreRevenue: 0,
          highScoreRating: 0,
          highScoreRunTime: 0
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        console.log(authUser)
      })
      .catch(err => {
        console.error(err)
      })
  }



  return (
    <div className='h-screen flex flex-col justify-center items-center bg-[#202124]'>

      <h1 className='text-[30px] lg:text-[50px] lg:text-gray-500 mb-5 text-shadow-lg'>MOVIE <span className='text-[40px] text-green lg:text-[70px]'>VS</span> TRIVA</h1>

      <div className='p-5 sm:p-8 rounded-xl bg-black border-2 border-[#7d7d7d] text-gray-500 h-[25rem] w-[18rem] sm:h-[26rem] sm:w-[20rem] shadow-xl shadow-green'>

        <form className=' h-max flex flex-col justify-between space-y-5'>

          <div className='space-y-3 flex flex-col'>
            {signUp && <input ref={usernameRef} placeholder="Username" className='bg-black p-3 caret-gray-400 focus:outline-none' type='text'/>}
            <input ref={emailRef} placeholder="Email" className='bg-black p-3 caret-green focus:outline-none autofill:bg-black' type='email'/>
            <input ref={passwordRef} placeholder="Password" className='bg-black p-3 caret-gray-400 focus:outline-none' type='password'/>
            <button className='bg-[#202124] p-3 rounded-md hover:text-green hover:shadow-md hover:shadow-green' onClick={signIn}>Sign In</button>
          </div>

          {signUp ? <button className='bg-[#202124] p-3 rounded-md hover:text-green hover:shadow-md hover:shadow-green' onClick={register}>Register</button>
                  : <button className='bg-[#202124] p-3 rounded-md hover:text-green hover:shadow-md hover:shadow-green' onClick={handleRegisterScreen}>Click Here To Register</button>
          }

        </form>
        <p className='text-sm text-center mt-2'>only input username if you are signing up</p>
      </div>

    </div>
  )
}

export default LoginScreen