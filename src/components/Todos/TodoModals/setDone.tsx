import React, { useEffect, useState, useContext } from "react";
import Toast from "@utils/toast";
 
import { AppDataContext } from "@context/appDataContext";
import Axios from "@/services/api";
 

const SetDoneAction = (props) => {
  const { getAllTodos,drawerState ,setDrawerState } = useContext(AppDataContext);
  const { id ,setDoneActionState } = props;

  const setTodoDone = async () => {
    try {
      const response = await Axios.put("/todos/done", { id });
 
      if (response.status === 200) { 
        setDrawerState({
          ...drawerState , 
          item:{
            ...drawerState,
            flag:"isDone"
          }
        
        })
        Toast(response.data.msg);
        setDoneActionState(false)
      }
    } catch (error) {
      console.log(error);
      Toast(error.response.data, false);
      setDoneActionState(false)
    }
  };

  useEffect(() => {
    setTodoDone();
  }, []);

  return <></>;
};

export default SetDoneAction;
