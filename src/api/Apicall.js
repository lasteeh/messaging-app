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

export const fetchSemdMessage = async (data) => {
    const res = await fetch(`${urlApi}messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        },
        body: JSON.stringify(userMessage)
    });
}

export const fetchRetrieveMessage = async (data, id, msgType) => {
    const res = await fetch(`${urlApi}messages?receiver_id=${id}&receiver_class=${msgType}`, {
        method: 'Get',
        headers: {
            'Content-Type': 'application/json', 
            ...data
        }
    })
    const apidata = await res.json()
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