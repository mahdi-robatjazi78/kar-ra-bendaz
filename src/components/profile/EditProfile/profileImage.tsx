import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import Text from "@/styles/styled/styled_typography";
import StyledButton from "@/styles/styled/styled_button";
import useWindowSize from "@/hooks/useWindowSize";

const ProfileImageComponent = (props: any) => {
  const {
    item,
    AuthData,
    files,
    setFiles,
    handleUpdateAvatarImage,
    setShowRemoveAvatarMsg,
    showRemoveAvatarMsg,
    acceptedFiles,
    getRootProps,
    getInputProps,
    handleSaveUserImage,
  } = props;


  const [w,h] = useWindowSize().size

  return (
    <section className="edit-users-images-section">
      <Box
        className="d-flex-center row"
        style={{
          gap: AuthData.me?.picture?.[item] || files[0]?.preview ? "2rem" : "0",
        }}
      >
        <Box
          style={{
            position: "relative",
            display: !AuthData.me?.picture?.[item] ? "none" : "block",
          }}
        >
          {(!showRemoveAvatarMsg && !files.length) && (
            <Box 
              style={{ 
                position: "absolute", right: "-20px", top: "-20px" 
              }}
             >
              <Tooltip title="Remove Avatar Image">
                <IconButton onClick={() => setShowRemoveAvatarMsg(true)}>
                  <IoCloseSharp color="red" />
                </IconButton>
              </Tooltip>
            </Box>
          )}

          <img
            width={130}
            height={140}
            alt={`User-Profile-${item}`}
            src={`http://localhost:8888/uploads/${AuthData.me?.picture?.[item]}`}
          />
        </Box>
        <Box
          className={` ${
            AuthData.me?.picture?.[item] && files[0]?.preview
              ? "both-side-image"
              : ""
          }`}
        >
          <Box
            style={{ flexGrow: 1 }}
            {...getRootProps({ className: `dropzone` })}
          >
            <input {...getInputProps()} />
            <Text className="dropzone-text">
              {AuthData.me?.picture?.[item]
                ? `Drag 'n' drop your ${item} here, or click to select`
                : `You have no ${item} , Drag 'n' drop your ${item} here, or click to select`}
            </Text>
          </Box>
        </Box>
        {files.length ? (
          <Box>
            <img
              alt="preview new image"
              width={130}
              height={140}
              src={files[0]?.preview}
            />
          </Box>
        ) : (
          <span></span>
        )}
      </Box>
      {files.length ? (
        <Box
          className="d-flex-center"
          style={{
            gap: "1rem",
            flexDirection:w  < 700 ? "column" : "row"
          }}
        >
          <Text style={{ fontSize:w  < 700 ? "1rem" : "1.3rem"   }}>
            {!AuthData.me?.picture?.[item]
              ? `Are you sure ! you want select this image for your ${item} ? `
              : `Do you want change your ${item} ?`}
          </Text>
          <Box>
          <StyledButton style={{marginRight:"1rem"}} onClick={() => setFiles([])}>Cancel</StyledButton>
          <StyledButton
            onClick={() => {
              if (AuthData.me?.picture?.[item]) {
                handleUpdateAvatarImage({ onlyRemove: false });
              } else {
                handleSaveUserImage(item);
              }
            }}
          >
            Yes
          </StyledButton>
          </Box>
        </Box>
      ) : showRemoveAvatarMsg ? (
        <Box
          className="d-flex-center"
          style={{
            gap: "1rem",
            flexDirection:w  < 700 ? "column" : "row"
          }}
        >
          <Text style={{ fontSize : w  < 700 ? "1rem" : "1.3rem"   }}>
            Do you want delete {item} ?
          </Text>
          <Box>
            <StyledButton style={{marginRight:"1rem"}}   onClick={() => setShowRemoveAvatarMsg(false)}>
              Cancel
            </StyledButton>
            <StyledButton
              onClick={() => handleUpdateAvatarImage({ onlyRemove: true })}
            >
              Yes
            </StyledButton>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ProfileImageComponent;
