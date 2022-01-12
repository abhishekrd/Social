import React, {useEffect,createContext,useReducer,useContext} from 'react'
import NavBar from './Components/Navbar';
import "./App.css"
import { BrowserRouter,Route,Routes,Link,useNavigate } from 'react-router-dom'
import Home from './Components/screens/Home';
import Login from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import Profile from './Components/screens/Profile';
import CreatePost from './Components/screens/CreatePost';
import { reducer,initialState } from './reducers/userReducer';
import UserProfile from './Components/screens/UserProfile';
import Footer from './Components/Footer';

export const UserContext = createContext()

const Routing = () => {

   const navigate = useNavigate()
   const {state,dispatch} = useContext(UserContext)
   useEffect(() => {
     const user = JSON.parse(localStorage.getItem("user"));
     if(user){
       dispatch({type:"USER",payload:user})
       //navigate("/")
     }
     else{
       navigate("/login")
     }
   },[])

  return(
<Routes>
   <Route path="/" element={<Home/>}>
   </Route>

   <Route path="/login" element={<Login/>}>
   </Route>

<Route path="/signup" element={<Signup/>}>
</Route>

<Route path="/profile" element={<Profile/>}>
</Route>

<Route path="/create" element={<CreatePost/>}>
</Route>

<Route path="/profile/:userid" element={<UserProfile/>}>
</Route>
</Routes>
  )
}
function App() {

  const [state,dispatch] = useReducer(reducer,initialState)

  return (
<>
<UserContext.Provider value={{state,dispatch}}>
 <BrowserRouter>
 <NavBar />
 <Routing />
 <Footer />
   </BrowserRouter>
   </UserContext.Provider>
   </>  );
  
}
  

export default App;
