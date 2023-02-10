import React, { useState } from "react";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { BiMessageSquareAdd } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";
import Axios from "@services/api";
import Toast from "../../util/toast";

const CreateSpace = () => {
  const [showCreateItems, setShowCreateItems] = useState({
    state: true,
    item: "",
  });
  const [title, setTitle] = useState("");
  const sendData = async()=>{

    if(title.length > 2){
      if(showCreateItems.item === "workspace"){

       try{
        const response = await Axios.post("/ws/new" , {title})
        Toast(response.data.msg)

       }
       catch(error){
        console.log(error.response)
       } 
        
      }
    }

  }



  return (
    <Box className="add-space-box">
      <Box className="add-space-icon-box d-flex-between">
        <IconButton>
          {" "}
          <BiMessageSquareAdd className="add-space-icon" />{" "}
        </IconButton>
        {!showCreateItems.state && (
          <IconButton
            onClick={() => {
              setTitle("");
              setShowCreateItems({ state: true, item: "" });
            }}
          >
            <IoMdArrowRoundBack className="icon-styles" />
          </IconButton>
        )}
      </Box>
      <Box className="add-space-item-box">
        {showCreateItems.state ? (
          <>
            <Typography
              onClick={() =>
                setShowCreateItems({ state: false, item: "workspace" })
              }
              className="add-space-item"
            >
              Create todo workspace +
            </Typography>
            <Typography
              onClick={() =>
                setShowCreateItems({ state: false, item: "board" })
              }
              className="add-space-item"
            >
              Create note board +{" "}
            </Typography>
          </>
        ) : (
          <>
          <Box className="add-space-item-text">
            <TextField
              variant="outlined"
              fullWidth
              autoFocus
              size="small"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label={`${showCreateItems.item} title`}
              sx={{
                "& label": {
                  fontSize: ".7rem",
                  lineHeight: "1.4rem",
                },
              }}
            />
          </Box>
          <Button disabled={title.length < 3} onClick={()=>sendData()}>Send</Button>
        </>
        )}
      </Box>
    </Box>
  );
};

export default CreateSpace;
