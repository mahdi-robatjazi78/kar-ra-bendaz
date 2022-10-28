import React , {useState, useEffect} from 'react'
import themes from '../theme'

interface ITheme {
    foreground:string,
    background:string,
    sidebar:string,
    secondSidebar:string,
    text1:string,
    text2:string,
    text3:string,
    isDarkMode:boolean,
    toggleDark():void,
    setDark():void,
    setLight():void,
}


const ThemeContext = React.createContext<ITheme>({
    foreground:"",
    background:"",
    sidebar:"",
    secondSidebar:"",
    text1:"",
    text2:"",
    text3:"",
    isDarkMode:false,
    toggleDark:Function,
    setDark:Function,
    setLight:Function,
});



export const ThemeContextProvider =({children}:any)=>{
    
    const [isDarkMode, setIsDarkMode] = useState <boolean>(
        false
        );

        const [selectedTheme , setSelectedTheme]  = useState({
            foreground:"",
            background:"",
            sidebar:"",
            secondSidebar:"",
            text1:"",
            text2:"",
            text3:"",
 
        })



        // const darkModeTheme = createTheme(getDesignTokens("dark"));
      
        useEffect(()=>{
          setIsDarkMode(JSON.parse(localStorage.getItem("darkmode")!))
        },[])


        useEffect(()=>{
            if(isDarkMode){
                
                setSelectedTheme(themes.dark)
                document.documentElement.style.setProperty("--foreground" ,  themes.dark.foreground)
                document.documentElement.style.setProperty("--background" ,  themes.dark.background)
                document.documentElement.style.setProperty("--sidebar" ,  themes.dark.sidebar)
                document.documentElement.style.setProperty("--secondSidebar" , themes.dark.secondSidebar)
                document.documentElement.style.setProperty("--text1" , themes.dark.text1)
                document.documentElement.style.setProperty("--text2" , themes.dark.text2)
                document.documentElement.style.setProperty("--text3" , themes.dark.text3)
                document.documentElement.style.setProperty("--header" , themes.dark.header)
                 
            
            }
            if(!isDarkMode){


                document.documentElement.style.setProperty("--foreground" ,  themes.light.foreground)
                document.documentElement.style.setProperty("--background" ,  themes.light.background)
                document.documentElement.style.setProperty("--sidebar" ,  themes.light.sidebar)
                document.documentElement.style.setProperty("--secondSidebar" , themes.light.secondSidebar)
                document.documentElement.style.setProperty("--text1" , themes.light.text1)
                document.documentElement.style.setProperty("--text2" , themes.light.text2)
                document.documentElement.style.setProperty("--text3" , themes.light.text3)
                document.documentElement.style.setProperty("--header" , themes.light.header)

                
                setSelectedTheme(themes.light)
            
            
            }

        },[isDarkMode])

        const toggleDark = ()=>{
            
            localStorage.setItem("darkmode", JSON.stringify(!isDarkMode)); 
            setIsDarkMode(!isDarkMode)
        }



        const setDark = ()=>{
            
            localStorage.setItem("darkmode", JSON.stringify(true)); 
            setIsDarkMode(true)
        } 

        
        const setLight = ()=>{
            
            localStorage.setItem("darkmode", JSON.stringify(false)); 
            setIsDarkMode(false)
        } 

    return (
    <ThemeContext.Provider value={ {...selectedTheme , toggleDark , isDarkMode , setDark , setLight}  }>
        {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContext