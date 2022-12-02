import React, {useContext} from "react";
import { useQuery, useQueryClient } from "react-query";
import { ApiContext } from "../context/apiContext";
import { fetchAllUsers,fetchGetUserChannel } from "./Apicall";

const Queryloader = () => {
  
  const { accessData } = useContext(ApiContext);
  
  const queryClient = useQueryClient();

  useQuery(['ALL_USERS', accessData], ()=> fetchAllUsers(accessData),
    {
      refetchInterval: 90000,
      onSuccess: data => queryClient.setQueryData('ALL_USERS', data)
    })

  return(
    <></>
  )
}

export default Queryloader;