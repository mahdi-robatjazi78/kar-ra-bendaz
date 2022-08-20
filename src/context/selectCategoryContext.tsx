import React , {useState} from 'react'


export const SelectedCategoryContext = React.createContext(null)


export const SelectedCategoryContextProvider = ({children})=>{

    const [selected,setSelected] = useState('all-task')
    const newCategorySelected = (categoryId = "all-task")=>{
        setSelected(categoryId)
    }

    return (
        <SelectedCategoryContext.Provider value={{ selected  , newCategorySelected}}>

        {children}

        </SelectedCategoryContext.Provider>
    )
}



