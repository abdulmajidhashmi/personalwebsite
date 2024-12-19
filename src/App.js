import HomePage from "./Components/HomePage";
import "./App.css";
import DataCards from "./Components/DataCards";
import Video from "./Components/Video";
import Depression from "./Components/Depression";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BiploarDisorder from "./Components/BipolarDisorder";
import Adhd from "./Components/Adhd";
import Asd from "./Components/Asd";
import Phobias from "./Components/Phobias";
import Psd from "./Components/Psd";
import Sad from "./Components/Sad";
import Ocd from "./Components/Ocd";
import Ld from "./Components/Ld";
import Gad from "./Components/Gad";
import Pd from "./Components/Psd";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Test from "./Components/Test";
import Chat from "./Components/Chat";
import SingleUser from "./Components/SingleUser";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HomePage />
                <Chat/>
                <DataCards />
                {/* <Video/> */}
              </>
            }
          />
          <Route
            path="/depression"
            element={
              <>
                <Depression />
              </>
            }
          />
           <Route path="/Adhd" element={<> <Adhd /> </>   }/>
           <Route path="/Asd" element={<> <Asd /> </>   }/>
           <Route path="/Gad" element={<> <Gad /> </>   }/>
           <Route path="/Ld" element={<> <Ld /> </>   }/>
           <Route path="/Ocd" element={<> <Ocd /> </>   }/>
           <Route path="/Phobias" element={<> <Phobias /> </>   }/>
           <Route path="/Pd" element={<> <Pd /> </>   }/>
           <Route path="/Sad" element={<> <Sad /> </>   }/> 
            <Route path='/login' element={<><Login/></>}/>
           <Route path="/BipolarDisorder" element={<> <BiploarDisorder /> </>   }/> 
           <Route path='/signup' element={<><Signup/></>}/>
            <Route path="/chat" element={<><Test/></>}/>
            <Route path='/test/:id' element={<><SingleUser/></>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
