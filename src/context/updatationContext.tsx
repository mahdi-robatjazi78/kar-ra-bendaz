import React ,{useState}  from 'react'


export const UpdateCategory = React.createContext(null)


export const UpdatationContextProvider = ({children})=>{
  
    const [updateCategory ,setUpdateCategory] = useState(false)
    const updateCategoryOn = ()=>setUpdateCategory(true)
    const updateCategoryOff = ()=>setUpdateCategory(false)



    return (
        <UpdateCategory.Provider value={{updateCategory , updateCategoryOn , updateCategoryOff}}>

        {
            children
        }

        </UpdateCategory.Provider>
    )
}