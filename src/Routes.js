import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Login from "./pages/Login.js";
import NoPage from "./pages/NoPage.js";
import Signup from "./pages/Signup.js";
import SellAnItem from "./pages/SellAnItem.js";

const App = function() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}> {/* holds the layout file for the app */}
    
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="sell-an-item" element={<SellAnItem />} />
                    
                    <Route path="*" element={<NoPage />} />

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;