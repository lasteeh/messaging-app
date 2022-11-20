import React, { useState, useEffect,useMemo } from 'react'

export default function Apicall() {

    const [accessData, setAccessData] = useState({})

    const userData = {
        email: 'daniel@email.com',
        password: '12345678',
    }

    const userMessage = {
        "receiver_id": 2919,
        "receiver_class": "User",
        "body": "hello world"
    }

    const addMember = {
        "id": 2919,
        "member_id": 3
    }

    const fetchSlackAppApi = async () => {
        const res = await fetch('http://206.189.91.54/api/v1/auth/sign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(userData)
        });

        await setAccessData({
            'access-token': res.headers.get('access-token'),
            client: res.headers.get('client'),
            expiry: res.headers.get('expiry'),
            uid: res.headers.get('uid')
        });
        await console.log(accessData)  
    }

    const fetchSlackAppMesage = async () => {
        const response = await fetch('http://206.189.91.54/api/v1/messages?receiver_id=2914&receiver_class=User', {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json', 
                ...accessData
            },
            // body: JSON.stringify(userMessage)
        });
        const data = await response.json();
    }

    const fetchAddMember = async () => {
        const response = await fetch('http://206.189.91.54/api/v1/channels', {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json', 
                ...accessData
            },
            // body: JSON.stringify(userMessage)
        });
        
    }
    
    useEffect(()=>{
        fetchSlackAppApi();
        // fetchSlackAppMesage();
        fetchAddMember();
    },[])
    

  return (
    <div>
        
    </div>
  )
}

// http://206.189.91.54/api/v1/auth/sign_in?email=${email}&password=${password}&pasword_confirmation=${cpassword}