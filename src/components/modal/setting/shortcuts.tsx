import React from 'react'
import {Box} from "@mui/material";
import Text from "@/styles/styled/styled_typography";
import useWindowSize from "@hooks/useWindowSize";


const ShortcutsList = (props) => {

  const sizeName = useWindowSize().sizeName
  return (
    <Box sx={sizeName === "mobile" ? {padding: "1rem 0"} :{padding: "1rem 3rem"}}>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Home Page </Text>
        <Text>
          <code>alt</code> <code>h</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Todo Page </Text>
        <Text>
          <code>alt</code> <code>w</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Profile Page </Text>
        <Text>
          <code>alt</code> <code>p</code>
        </Text>
      </Box>
      <hr/>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Setting Modal </Text>
        <Text>
          <code>ctrl</code> <code>shift</code> <code>s</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text> Navigation Menu Position </Text>
        <Text>
          <code>ctrl</code> <code>shift</code> <code>arrow key</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Change Theme </Text>
        <Text>
        <code>ctrl</code> <code>alt</code> <code>t</code>
        </Text>
      </Box>
      <hr/>

      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>New Todo </Text>
        <Text>
          {" "}
          <code>alt</code> <code>n</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>New Category </Text>
        <Text>
          {" "}
          <code>alt</code> <code>c</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Search Mode </Text>
        <Text>
          <code>ctrl</code> <code>shift</code> <code>f</code>
        </Text>
      </Box>
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Select All Todos</Text>
        <Text>
          <code>ctrl</code> <code>a</code>
        </Text>
      </Box>



      <hr/>


      
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Single Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>1</code>
        </Text>
      </Box>


     
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Two Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>2</code>
        </Text>
      </Box>


 
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Three Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>3</code>
        </Text>
      </Box>


 
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Four Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>4</code>
        </Text>
      </Box>


 
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Five Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>5</code>
        </Text>
      </Box>


 
      <Box className="d-flex-between" sx={{m: 2, flexWrap: "nowrap"}}>
        <Text>Set Six Column </Text>
        <Text>
          {" "}
          <code>ctrl</code> <code>alt</code> <code>6</code>
        </Text>
      </Box>


    </Box>
  )
}


export default ShortcutsList