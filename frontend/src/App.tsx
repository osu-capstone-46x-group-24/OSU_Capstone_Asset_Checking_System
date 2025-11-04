//import React from "react";
import { useEffect} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";

//const ThemeContext = createContext(null);

function App() {
    useEffect(() => {
        // Use the user selected theme if chosen
        //const [theme, setTheme] = useState('light');
        const selectedTheme = localStorage.getItem("theme");

        if (selectedTheme) {
            document.body.classList.add(selectedTheme);
        }

        // If user OS set to prefer dark mode
        else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
        }

        // else fallback to light mode
        else {
            document.body.classList.add("light");
        }
    }, []);

    return (
          <Router basename='/OSU_Capstone_Asset_Checking_System/'>
              <Routes>
                  <Route path="/" element={<Navigate to="/Home" />} />
                  <Route path="/Home" element={<Home />} />
                  {/*<Route path="/about" element={<About />} />*/}
                  <Route path="/Admin" element={<AdminDashboard />} />
                  <Route path="/User" element={<UserDashboard />} />
              </Routes>
          </Router>


  );
}

export default App;
