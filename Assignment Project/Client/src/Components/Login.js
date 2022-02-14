import react, { useState } from 'react'
import { useNavigate } from 'react-router';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import '../Styles/Login.css'
function Login() {
    const clientId = "504281896037-f6tggc1m4d2qogni4v442a1sl8mbcfvp.apps.googleusercontent.com"
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async () => {
        const user = {
            email: email,
            password: password
        }
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status == 503) {
                window.alert("Logged in Successfully")
                navigate('/account');
            }
            else if (res.status == 501) {
                window.alert("User Not Found")
            }
            else if (res.status == 502) {
                window.alert("Password Incorrect")
            }
            else {
                window.alert("Something Went Wrong");
            }
        }).catch(err => {
            window.alert("Wrong");
        });
    }

    const onLoginSuccess = (res)=>{
        console.log('login Success',res.profileObj)
        navigate('/googleSignedaccount')
    }

    const onFailureSuccess = (res)=>{
        console.log('Login Failure',res);
    }
    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Sign-In</h1>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
                <button onClick={handleLogin}>Login</button>
                <p>Don't have an Account ?<span><a href="/signup">Signup</a></span></p>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Login With Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onFailureSuccess}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}

export default Login