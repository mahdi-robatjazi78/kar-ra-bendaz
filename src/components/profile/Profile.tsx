import React, { useEffect, useState } from "react";
import ThemeContext from "../../context/themeContext";
import { RootState } from "@/redux/store";
import "./profile.scss";
import { Avatar, Box, IconButton } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Text from "@/styles/styled/styled_typography";
import { useWsListQuery } from "@/redux/api/workspaces";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import {
  useUploadAvatarImageMutation,
  useLazyGetProfileMeDataQuery,
} from "@/redux/api/user";
import { useSelector, useDispatch } from "react-redux";
import { SetUserData } from "@/redux/features/userSlice";
import Toast from "@/util/toast";
import { IWsStructure } from "@/types/types";
import { NavLink } from "react-router-dom";
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            ".MuiLinearProgress-bar": {
              backgroundColor:
                props.value < 31
                  ? "#ffed33"
                  : props.value >= 31 && props.value < 81
                  ? "orange"
                  : "var(--errorBorder)",
            },
          }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Text variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Text>
      </Box>
    </Box>
  );
}

export default function Profile() {
  const theme = React.useContext(ThemeContext);
  const { auth: AuthData } = useSelector((state: RootState) => state);
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const [profileMeDataRequset, profileMeDataResponse] =
    useLazyGetProfileMeDataQuery();
  const dispatch = useDispatch();
  const { data = [], isLoading, isSuccess, refetch } = useWsListQuery("");

  useEffect(() => {
    refetch();
  }, []);

  const [storeNewUserAvatar, respStoreNewUserAvatar] =
    useUploadAvatarImageMutation();

  useEffect(() => {
    if (respStoreNewUserAvatar.isSuccess) {
      Toast(respStoreNewUserAvatar?.data?.msg, true, true, "🖼️");

      profileMeDataRequset({})
        .unwrap()
        .then((resp) => {
          const { email, fname, lname, userName, picture , gender } = resp;
          dispatch(
            SetUserData({
              email,
              fname,
              lname,
              userName,
              gender,
              picture,
            })
          );
        });
    }
  }, [respStoreNewUserAvatar]);

  function handleChangeUserAvatar(which) {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target?.files[0];

      if (file) {
        storeNewUserAvatar({
          file,
          avatarUploaded: which === "avatar" ? true : false,
        });
      }
    };
    input.click();
  }


  const handleClickAvatar = (event:any) => {
      event.stopPropagation();
      if (!AuthData.me?.picture?.avatar) {
        handleChangeUserAvatar("avatar");
      }
    
  }

  return (
    <Box
      id="profile-parent"
      style={
        headerPosition === "top" || headerPosition === "bottom"
          ? {
              height: "92vh",
            }
          : {
              height: "100vh",
            }
      }
    >
      <Box className="profile-container">
        <Box
          id="profile-header"
          onClick={() => {
            if (!AuthData.me?.picture?.banner) {
              handleChangeUserAvatar("banner");
            }
          }}
          style={
            AuthData.me?.picture?.banner
              ? {
                  backgroundImage: `url(${process.env.BACKEND_APP_BASE_URL_UPLOADS}/${AuthData.me?.picture?.banner})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 8rem",
                }
              : {
                  cursor: "pointer",
                }
          }
        >
          <Box className="profile-avatar-container">
            <Avatar
              onClick={handleClickAvatar}
              alt={
                AuthData.me?.picture?.avatar
                  ? "user-profile-avatar"
                  : AuthData.me.fname || AuthData.me.email
              }
              src={`${process.env.BACKEND_APP_BASE_URL_UPLOADS}/${AuthData.me?.picture?.avatar}`}
              sx={{
                width: 140,
                cursor: !AuthData.me?.picture?.avatar ? "pointer" : "none",
              }}
            />
          </Box>
        </Box>

        <Box className="profile-body">
          <section className="section-one">
            {AuthData.me.fname || AuthData.me.lname ? (
              <Text
                style={{ textAlign: "center" }}
              >{`${AuthData.me.fname} ${AuthData.me.lname}`}</Text>
            ) : (
              <Text
                style={{ textAlign: "center" }}
              >{`${AuthData.me.email}`}</Text>
            )}
            {AuthData.me.fname && AuthData.me.lname && (
              <Text
                style={{ textAlign: "center" }}
              >{`${AuthData.me.email}`}</Text>
            )}
          </section>

          <section className="section-two">
            <ul>
              <li><Text>Account type : {AuthData?.me?.accountType}</Text></li>
              <li><Text>Maximum workspaces : {AuthData?.me?.accountType === "Free" ? 6 : 100}</Text></li>
              <li><Text>Maximum todos in workspace : {AuthData?.me?.accountType === "Free" ? 100 : 250}</Text></li>
            </ul>
           
          </section>

          <Box className="ws-max-count-section">
              <Box className="progress-container">
                <Text>
                  Workspace Count : {data?.workspaces?.length || 0}{" "}
                  {data?.workspaces?.length === 6 &&
                  AuthData?.me?.accountType === "Free"
                    ? "(full)"
                    : ""}
                </Text>

                <LinearProgressWithLabel
                  value={
                    ((data?.workspaces?.length || 0) /
                      (AuthData?.me?.accountType === "Free" ? 6 : 100)) *
                    100
                  }
                />
              </Box>
            </Box>



          <section className="section-three-ws-list">
            {
            
              
            !data?.workspaces?.length ? 
            
              <Box style={{fontSize:"1rem" , gap:"1rem"}} className="d-flex">

                  <Text>You have no workspaces do you want add new one ? </Text> {" "} <NavLink className="linkStyles" to="/"> Click here </NavLink> 

              </Box>
            
            :data?.workspaces?.map((ws: IWsStructure) => (
              <Box key={ws?._id}>
                <Box className="progress-container">
                  <Text>{ws?.title}</Text>

                  <LinearProgressWithLabel
                    value={
                      ((ws.todoSum || 0) /
                        (AuthData?.me?.accountType === "Free" ? 100 : 200)) *
                      100
                    }
                  />
                </Box>
              </Box>
            ))}
          </section>
        </Box>
      </Box>
    </Box>
  );
}
