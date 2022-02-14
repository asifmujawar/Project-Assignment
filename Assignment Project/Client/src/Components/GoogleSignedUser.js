import react, { useState } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router';
import '../Styles/googleuser.css'
function GoogleSignedUser(props) {
    const [user, setUser] = useState('')
    const clientId = "504281896037-f6tggc1m4d2qogni4v442a1sl8mbcfvp.apps.googleusercontent.com"
    const navigate = useNavigate();

    const onLoginSuccess = (res) => {
        setUser(res.profileObj)
        console.log("new", res.profileObj)
        console.log("user", user)
    }


    const logout = () => {
        alert("You Have Logged Out Now")
        navigate('/');
    }
    return (
        <div className="google-account">
            <div className="google-box">
                <h1>You are Now Logged In with Your Google Account</h1>
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onSuccess={onLoginSuccess}
                    onLogoutSuccess={logout}
                >
                </GoogleLogout>
            </div>
        </div>
    )
}

export default GoogleSignedUser