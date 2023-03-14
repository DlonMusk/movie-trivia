import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth, db } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { login, logout, selectHighScoreRevenue, selectUser, setUserData } from './dataLayer/slices/userSlice'
import { useEffect } from "react";
import GameScreen from "./screens/GameScreen";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import LeaderboardScreen from "./screens/LeaderboardScreen";


function App() {

  const dispatch = useDispatch()

  const user = useSelector(selectUser)


  useEffect( () => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => { // user login state is auto stored in a cookie and can be accessed
      if (userAuth) {
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        }))
        // grab highscores from the user and set them
        getDoc(doc(db, "users", userAuth.uid)).then(doc => {
          if(doc.exists){
            // console.log("doc: ", doc.data().highScoreRating)
            const userData = doc.data()
            dispatch(setUserData({
              username: userData.username,
              highScoreRevenue: userData.highScoreRevenue,
              highScoreRating: userData.highScoreRating,
              highScoreRunTime: userData.highScoreRunTime
            }))
          }
          else {
            console.log("no document")
          }
        })
        
      } else {
        dispatch(logout())
      }
    })
    
    

    return unsubscribe
  }, [dispatch])



  return (
    <div className=" bg-[#202124] font-mono">
      <Router>
        {!user ? (
          <LoginScreen />
        ) :
          <Routes>
            {/* add paths for each game with approriate props to the gameScreen component */}
            <Route path='/rating' element={<GameScreen props={'rating'}/>} />
            <Route path='/runTime' element={<GameScreen props={'runtime'}/>} />
            <Route path='/revenue' element={<GameScreen props={'revenue'}/>} />
            <Route path='/leaderboard' element={<LeaderboardScreen />} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        }
      </Router>
    </div>
  );
}

export default App;











/* 
  TODO:
  Add leaderboard
*/
