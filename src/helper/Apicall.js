import axios from "axios";

export const urlApi = "http://206.189.91.54/api/v1/";

export const fetchRegister = async (body) => {
  const res = await fetch(`${urlApi}auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const fetchSignIn = async (data) => {
  const res = await axios.post(`${urlApi}auth/sign_in`, {
    email: data.username,
    password: data.password,
  });

  let accessToken = {
    id: res.data.data.id,
    "access-token": res.headers.get("access-token"),
    client: res.headers.get("client"),
    expiry: res.headers.get("expiry"),
    uid: res.headers.get("uid"),
  };

  return accessToken;
};

export const fetchSendMessage = async (data, body) => {
  const res = await fetch(`${urlApi}messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const fetchRetrieveMessage = async (data, id, msgType) => {
  const res = await axios.get(
    `${urlApi}messages?receiver_id=${id}&receiver_class=${msgType}`,
    {
      headers: data,
    }
  );
  return res.data;
};

export const fetchCreateChannel = async (data, body) => {
  const res = await fetch(`${urlApi}channels`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const fetchGetUserChannel = async (data) => {
  const res = await fetch(`${urlApi}channels`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
  });
  const apidata = await res.json();
  return apidata;
};

export const fetchChannelDetails = async (data, id) =>{
  const res = await fetch(`${urlApi}channels/${id}`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
  });
  return res.json();
};

export const fetchAddMember = async (data, body) => {
  const res = await fetch(`${urlApi}channel/add_member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

export const fetchAllUsers = async (data) => {
  const res = await fetch(`${urlApi}users`, {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
      ...data,
    },
  }); 
  return res.json();
};
