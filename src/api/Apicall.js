import axios from "axios"

const regData = {
    email: '',
    password: ''
}

const userMessage = {
    "receiver_id": '',
    "receiver_class": 'User', //msgType
    "body": ''
}

const createChannel = {
    "name": '',
    "user_ids": []
}

const addMember = {
    "id": '', //channel id
    "member_id": ''
}

export const urlApi = 'http://206.189.91.54/api/v1/';

export const fetchRegister = async () => {
    const res = await fetch(`${urlApi}auth/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(regData)
    })
}

export const fetchSignIn = async (data) => {
  
    const res = await axios.post(`${urlApi}auth/sign_in`, {
      email: data.username, 
      password: data.password
    });

    let accessToken = {
        id: res.data.data.id,
        'access-token': res.headers.get('access-token'),
        client: res.headers.get('client'),
        expiry: res.headers.get('expiry'),
        uid: res.headers.get('uid')
    }

    return accessToken
}

export const fetchSendMessage = async (data, body) => {
    const res = await fetch(`${urlApi}messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        },
        body: JSON.stringify(body)
    });
}

export const fetchRetrieveMessage = async (data, id, msgType) => {
    const res = await axios.get(`${urlApi}messages?receiver_id=${id}&receiver_class=${msgType}`, {
        headers: data
    })
    const apidata = await res.data
    return apidata
}

export const fetchCreateChannel = async (data, body) => {
    const res = await fetch(`${urlApi}channels`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        },
        body: JSON.stringify(body)
    })
}

export const fetchGetUserChannel = async (data) => {
    const res = await fetch(`${urlApi}channels`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        }
    })
    const apidata = await res.json()
    return apidata
}

export const fetchChannelDetails = async (data, id) => {
    const res = await fetch(`${urlApi}channels/${id}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        }
    })
    const apidata = await res.json()
    return apidata
}

export const fetchAddMember = async (data) => {
    const res = await fetch(`${urlApi}channel/add_member`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        },
        body: JSON.stringify(addMember)
    });
}

export const fetchAllUsers = async (data) => {
    const res = await fetch(`${urlApi}users`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        },
    });
    const apidata = await res.json()
    return apidata
}