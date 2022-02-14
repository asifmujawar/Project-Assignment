import Login from './Components/Login';
import Register from './Components/Register'
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom'
import Account from './Components/Account';
import GoogleSignedUser from './Components/GoogleSignedUser'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/> } />
        <Route path="signup" element={ <Register/> } />
        <Route path="account" element={ <Account/> } />
        <Route path="googleSignedaccount" element={ <GoogleSignedUser/> }/>
      </Routes>
    </div>
  );
}

export default App;
