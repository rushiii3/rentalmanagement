import './App.css';
import LandingPage from './Pages/LandingPage';
import Loader from './Components/Loader/loader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function App() {
  const {mode} = useSelector((state) => state.mode);
  console.log(mode);
  const loaderScaleOutVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
      opacity: 1,
      scale: 1.5,
      transition: { duration: 0.3 },
    },
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <main className={mode}>
    <div className="App">
      {isLoading ? (

          <Loader />

      ) : (

 <LandingPage />

         

      )}
    </div>
    </main>
  );
}

export default App;
