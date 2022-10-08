import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import './App.css';



import Home from './Components/Home';
import About from './Components/About';
import Main from './Components/Main';
import State from './Context/State';

// import ViewPage from "./Components/ViewPage";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Doctors from "./Components/Doctors";




function App() {
  
  return (
    <>

    <State>
    
 
    <BrowserRouter>
      
      <Routes>
        
          <Route path="/" element={<Main/>}>
            <Route index element={<Home/>}/>
            <Route path="/signup" element ={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>} />
            <Route path="/doctors" element={<Doctors/>} />
          </Route>
        </Routes>
     
    </BrowserRouter>
   
    </State>



    </>
  );
}
/*
 

Route path="/view" element={<ViewPage/>} />   
*/
export default App;
