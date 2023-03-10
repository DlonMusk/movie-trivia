import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { auth, db } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import { login, logout, selectHighScoreRevenue, selectUser, setHighScores } from './dataLayer/slices/userSlice'
import { useEffect } from "react";
import GameScreen from "./screens/GameScreen";
import { collection, doc, getDoc, query, where } from "firebase/firestore";


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
            const scores = doc.data()
            dispatch(setHighScores({
              highScoreRevenue: scores.highScoreRevenue,
              highScoreRating: scores.highScoreRating,
              highScoreRunTime: scores.highScoreRunTime
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


  const highScoreRevenue = useSelector(selectHighScoreRevenue)
  console.log("HIGHSCORE REVENUE: ", highScoreRevenue)
  console.log("user", user)

  return (
    <div className=" bg-[#d2e8ea]">
      <Router>
        {!user ? (
          <LoginScreen />
        ) :
          <Routes>
            {/* add paths for each game with approriate props to the gameScreen component */}
            <Route path='/Rating' element={<GameScreen props={'rating'}/>} />
            <Route path='/RunTime' element={<GameScreen props={'runtime'}/>} />
            <Route path='/Revenue' element={<GameScreen props={'revenue'}/>} />
            <Route path='/' element={<HomeScreen />} />
          </Routes>
        }
      </Router>
    </div>
  );
}

export default App;
