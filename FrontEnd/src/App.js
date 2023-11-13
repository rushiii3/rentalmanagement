import './App.css';
import { useSelector } from 'react-redux';
import DarkMode from './Components/DarkMode/Darkmode';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar1 from './Components/Layouts/Headers/Navbar';
import {LandingPage, SignUpPage,PageNotFound, LoginPage} from './Routes';
import NavbarShow from "./Components/Layouts/Headers/NavBarShow";
function App() {
  const {mode} = useSelector((state) => state.mode);
  
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate an API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <main className={mode}>
    <div className="App">
    <BrowserRouter>
    <NavbarShow>
    <Navbar1 />
    </NavbarShow>
  
      <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='*' element={<PageNotFound />} />
      <Route  path='/register'  element={<SignUpPage />} />
      <Route  path='/login'  element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
      <DarkMode />
     
    </div>
    </main>
  );
}

export default App;
