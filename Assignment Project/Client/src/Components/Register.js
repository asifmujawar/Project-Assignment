import react, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../Styles/Register.css'
function Register(){
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [mobno,setMobno] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = ()=>{
        const user = {
            name:name,
            email:email,
            mobno:mobno,
            password:password
        }
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }).then(res => {
            if (res.status == 200) {
                window.alert("Registration Successfull")
                navigate('/');
            }
            else if (res.status == 401) {
                window.alert("Registration Failed")
            }
            else if(res.status == 400){
                window.alert("User Already Exist")
            }
            else {
                window.alert("Something Went Wrong");

            }
        }).catch(err => {
            window.alert("Wrong");
        });
    }
    return(
        <div className="register-container">
            <div className="register-box">
                <h1>Registration</h1>
                <input type="text" placeholder="Enter Your Full Name" onChange={(e)=>setName(e.target.value)}/><br/>
                <input type="text" placeholder="Email Address" onChange={(e)=>setEmail(e.target.value)}/><br/>
                <input type="text" placeholder="Mobile Number" onChange={(e)=>setMobno(e.target.value)}/><br/>
                <input type="text" placeholder="Set Password" onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button onClick={handleSubmit}>Register</button>
                <p>Already have an Account ? <span><a href="/">Sign-In</a></span></p>
            </div>
        </div>
    )
}

export default Register