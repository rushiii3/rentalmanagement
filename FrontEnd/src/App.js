import './App.css';
import { useSelector } from 'react-redux';
import DarkMode from './Components/DarkMode/Darkmode';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar1 from './Components/Layouts/Headers/Navbar';
import {LandingPage, SignUpPage,PageNotFound, LoginPage, ChatPage, Activation, ForgotPage} from './Routes';
import NavbarShow from "./Components/Layouts/Headers/NavBarShow";
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import {LoadUser} from './Redux/action/user';
import Store from "./Redux/store";
function App() {
  const {mode} = useSelector((state) => state.mode);
  
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    Store.dispatch(LoadUser());
  }, []);

  return (
    <main className={mode}>
    <div className="App">
    <Toaster />
    <BrowserRouter>
    <NavbarShow>
    <Navbar1 />
    </NavbarShow>
  
      <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<PageNotFound />} />
      <Route  path='/register'  element={<SignUpPage />} />
      <Route  path='/login'  element={<LoginPage />} />
      <Route  path='/chat'  element={<ChatPage />} />
      <Route  path='/activate/:activation_token'  element={<Activation />} />
      
      <Route  path='/forgot-password'  element={<ForgotPage />} />
      
      </Routes>
    </BrowserRouter>
      <DarkMode />
     
    </div>
    </main>
  );
}

export default App;
