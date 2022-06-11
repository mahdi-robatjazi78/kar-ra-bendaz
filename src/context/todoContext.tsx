import React , {useState,createContext} from 'react'
import { ITodosShow } from '../types/types'

export const TodoContext =  createContext<ITodosShow|null>(null)



export const TodoContextProvider = ({children})=>{

    const [todoListShowStatus ,setTodoListShowStatus] = useState<ITodosShow["show"]>(['3col','all'])

    const setThreeColAll=()=>{
      setTodoListShowStatus(["3col",'all'])
    }
    const setThreeColDone=()=>{
      setTodoListShowStatus(["3col",'done'])
    }
    const setOneColAll=()=>{
      setTodoListShowStatus(["1col",'all'])
    }
    const setOneColDone=()=>{
      setTodoListShowStatus(["1col",'done'])
    }
    const setTableAll=()=>{
      setTodoListShowStatus(["table",'all'])
    }
    const setTableDone=()=>{
      setTodoListShowStatus(["table",'done'])
    }

    return (
        <TodoContext.Provider value={{show:todoListShowStatus , setThreeColAll,setThreeColDone , setOneColAll,setOneColDone ,setTableAll , setTableDone}}>

        {children}

        </TodoContext.Provider>
    )

}