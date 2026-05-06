import React, { useEffect } from "react"; // Thêm useEffect vào đây
import HomePage from "./pages/HomePage/HomePage";
import AOS from 'aos';
import 'aos/dist/aos.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,     
      easing: 'ease-in-out', 
      offset: 100,    
    });


    AOS.refresh();
  }, []);

  return (
    <>
      <HomePage />
    </>
  );
};

export default App;