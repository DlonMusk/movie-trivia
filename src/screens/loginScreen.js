import React, { useRef } from 'react'
import FightingPopcorn from '../assets/FightingPopcorn.png'
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

function LoginScreen() {

  const emailRef = useRef(null)
  const passwordRef = useRef(null)


  const register = (e) => {
    e.preventDefault()
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then(authUser => {
        console.log(authUser)
        // create user collection with users by id, set all highscores to 0
        setDoc(doc(db, 'users', authUser.user.uid), {
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
    <div className='h-screen flex justify-center items-center bg-[#c2ecf3]'>

      <div className='absolute top-0 flex items-center justify-center'>

        <img src={FightingPopcorn} className=" object-cover object-top sm:h-[300px] w-screen" />
        <h1 className="absolute bottom-5 font-mono text-xl">MOVIE VS TRIVIA</h1>

      </div>

      <div className='mt-40 p-5 sm:p-8 rounded-xl bg-[#51bcffc5] shadow-xl border border-[#7d7d7d] h-[20rem] w-[16rem] sm:h-[22rem] sm:w-[20rem]'>

        <form className=' h-max flex flex-col justify-between space-y-10'>

          <div className='space-y-3 flex flex-col'>

            <input ref={emailRef} placeholder="Email" className='bg-[#d2e8ea] p-3 rounded-md' type='email'/>
            <input ref={passwordRef} placeholder="Password" className='bg-[#d2e8ea] p-3 rounded-md' type='password'/>
            <button className='bg-[#d2e8ea] p-3 rounded-md focus:bg-[#79ff74]' onClick={signIn}>Sign In</button>

          </div>

          <button className='bg-[#d2e8ea] p-3 rounded-md focus:bg-[#79ff74]' onClick={register}>Click Here To Register</button>

        </form>

      </div>

    </div>
  )
}

export default LoginScreen