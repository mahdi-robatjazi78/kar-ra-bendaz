import React , {useState,useContext} from 'react'
import { Box, IconButton, TextField, Tooltip } from '@mui/material'
import {AiOutlineExpand} from 'react-icons/ai'
import ThemeContext from '@context/themeContext'
import { IoCopyOutline, IoExtensionPuzzleOutline } from 'react-icons/io5'
import { MdContentPaste } from 'react-icons/md'
import { TfiDownload } from 'react-icons/tfi'
import { HiOutlineQrcode } from 'react-icons/hi'
const HeaderSpaceBox = (props) => {
  const {}  = props
  const theme = useContext(ThemeContext)
  const iconStyles = {
    color:theme.text1,
    fontSize:".8rem",
  }
  const headerContainer = {

  }


  return (
    <Box display='flex' justifyContent="space-around"  flexWrap={"nowrap"}

  >
      <Box style={{width:120}}>

        <TextField 
        size="small"
        variant='standard'
        placeholder='title'
        />
      </Box>
        <Box style={headerContainer}>

        <Tooltip title="Expand"><IconButton><AiOutlineExpand style={iconStyles} /></IconButton></Tooltip>
        <Tooltip title="Copy"><IconButton><IoCopyOutline style={iconStyles} /></IconButton></Tooltip>
        <Tooltip title="Paste"><IconButton><MdContentPaste style={iconStyles} /></IconButton></Tooltip>
        <Tooltip title="Download"><IconButton><TfiDownload style={iconStyles} /></IconButton></Tooltip>
        <Tooltip title="Extention"><IconButton><IoExtensionPuzzleOutline style={iconStyles} /></IconButton></Tooltip>
        <Tooltip title="Scan"><IconButton><HiOutlineQrcode style={iconStyles} /></IconButton></Tooltip>


        </Box>
    </Box>
  )
}

export default HeaderSpaceBox