import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.js";
import Login from "./pages/Login.js";
import NoPage from "./pages/NoPage.js";
import Signup from "./pages/Signup.js";

import SellAnItem from "./pages/SellAnItem.js";
import SellAnItemProvider from "./ContextProviders/SellAnItemProvider.jsx";
import AuthProvider from "./ContextProviders/AuthProvider.jsx";

const App = function() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}> {/* holds the layout file for the app */}
                    
                        <Route path="login" element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                        <Route 
                            path="sell-an-item" 
                            element={
                                <SellAnItemProvider>
                                    <SellAnItem />
                                </SellAnItemProvider>
                            } />
                        
                        <Route path="*" element={<NoPage />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App;