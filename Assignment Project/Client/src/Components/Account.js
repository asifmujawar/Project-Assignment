import axios from 'axios'
import react, { useEffect, useState } from 'react'
import { useHistory, useNavigate } from 'react-router'

function Profile() {
    const navigate = useNavigate();

    const [student, setStudent] = useState('')

    useEffect(async () => {
        const res = await axios.get('/account')
        console.log(res.data.student)
        if (res.status == 200) {
            setStudent(res.data.student)
        }
        else if (res.status == 300) {
            navigate('/');
        }
        else {
            alert("Access Denied,Make Sure You have Logged In")
            navigate('/')
        }
    }, [])

    const handleLogout = async () => {
        const res = await axios.get('/logout')
        if (res.status == 200) {
            alert("Logged Out Successfully")
            navigate('/')
        }
    }



    return (
        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {
                student ? <div>
                    <h1>Welcome Back {student.name}</h1><br /><br />
                    <button onClick={handleLogout} style={{ backgroundColor: 'blue', padding: '10px 20px', fontSize: '17px', fontWeight: 'bold', color: 'white' }}>Logout</button>
                </div> :
                    <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <h1>You are Not Logged In</h1>
                        <a href="/" style={{fontWeight:'bold'}}>click here to get Logged in</a>
                    </div>
            }

        </div>
    )
}

export default Profile