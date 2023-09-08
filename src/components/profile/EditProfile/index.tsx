import React, { useState, useEffect, useContext } from "react";
import { Box, Tab } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import "./editProfile.scss";
import {
  useDeleteUserProfileAvatarMutation,
  useDeleteUserProfileBannerMutation,
  useLazyGetProfileMeDataQuery,
  useUploadAvatarImageMutation,
} from "@/redux/api/user";
import Toast from "@/util/toast";
import { SetUserData } from "@/redux/features/userSlice";
import { useDropzone } from "react-dropzone";
import ProfileImageComponent from "./profileImage";
import StyledTabs from "@/styles/styled/styled_tabs";
import ThemeContext from "@/context/themeContext";
import ProfileData from "./profileData";
import UpdatePasswordComponent from "./password";

const EditProfile = () => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const { auth: AuthData } = useSelector((state: RootState) => state);

  const [tabBarValue, setTabbarValue] = useState(0);

  const [files, setFiles] = useState([]);
  const [bannerFiles, setBannerFiles] = useState([]);
  const [showRemoveAvatarMsg, setShowRemoveAvatarMsg] = useState(false);
  const [showRemoveBannerMsg, setShowRemoveBannerMsg] = useState(false);
  const theme = useContext(ThemeContext);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },

    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const {
    acceptedFiles: bannerAcceptedFiles,
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    accept: {
      "image/*": [],
    },

    onDrop: (bannerAcceptedFiles) => {
      setBannerFiles(
        bannerAcceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const [storeNewUserAvatar, respStoreNewUserAvatar] =
    useUploadAvatarImageMutation();

  const dispatch = useDispatch();
  const [DeleteUserProfileAvatarRequest, DeleteUserProfileAvatarResponse] =
    useDeleteUserProfileAvatarMutation();
  const [DeleteUserProfileBannerRequest, DeleteUserProfileBannerResponse] =
    useDeleteUserProfileBannerMutation();
  const [profileMeDataRequset, profileMeDataResponse] =
    useLazyGetProfileMeDataQuery();

  const handleUpdateAvatarImage = async ({ onlyRemove }) => {
    const file = files[0];
    DeleteUserProfileAvatarRequest({ onlyRemove, file })
      .unwrap()
      .then((respnose) => {
        Toast(respnose.msg, true, true);
        profileMeDataRequset({})
          .unwrap()
          .then((resp) => {
            const { email, fname, lname, userName, picture, gender } = resp;
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

            setFiles([]);
            setShowRemoveAvatarMsg(false);
          });
      });
  };

  const handleUpdateBannerImage = ({ onlyRemove }) => {
    const file = bannerFiles[0]; 

    if(file?.size > 2500000){
      Toast("Please select avatar image with 2.5mb size or less" ,false , true)
      return
    }
    if(file?.type !== "image/png" && file?.type !== "image/jpeg" && file?.type !== "image/jpg" ){

      Toast("Please select png or jpg avatar image" ,false , true)
      return

    }

    DeleteUserProfileBannerRequest({ onlyRemove, file })
      .unwrap()
      .then((respnose) => {
        Toast(respnose.msg, true, true);
        profileMeDataRequset({})
          .unwrap()
          .then((resp) => {
            const { email, fname, lname, userName, picture } = resp;
            dispatch(
              SetUserData({
                email,
                fname,
                lname,
                userName,
                picture,
              })
            );
            setBannerFiles([]);
            setShowRemoveBannerMsg(false);
          });
      });
  };

  const handleSaveUserImage = (which: string) => {
    const file = which === "avatar" ? files[0] : bannerFiles[0]; 
    
    if(file?.size > 2500000){
      Toast("Please select avatar image with 2.5mb size or less" ,false , true)
      return
    }
    if(file?.type !== "image/png" && file?.type !== "image/jpeg" && file?.type !== "image/jpg" ){

      Toast("Please select png or jpg avatar image" ,false , true)
      return

    }

    storeNewUserAvatar({
      file,
      avatarUploaded: which === "avatar" ? true : false,
    });
  };

  useEffect(() => {
    if (respStoreNewUserAvatar.isSuccess) {
      Toast(respStoreNewUserAvatar?.data?.msg, true, true, "🖼️");

      profileMeDataRequset({})
        .unwrap()
        .then((resp) => {
          const { email, fname, lname, userName, picture, gender } = resp;
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

          setFiles([]);
          setBannerFiles([]);
        });
    }
  }, [respStoreNewUserAvatar]);

  return (
    <Box
      id="edit-profile-parent"
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
      <Box
        className={
          tabBarValue === 2 || tabBarValue === 3
            ? "avatar profile-container"
            : "profile-container"
        }
      >
        <StyledTabs
          className="tabs"
          isDarkMode={theme.isDarkMode}
          backLight={true}
          variant="scrollable"
          scrollButtons="auto"
          value={tabBarValue}
          onChange={(e, newValue) => setTabbarValue(newValue)}
          aria-label="edit-profile-sections"
        >
          <Tab value={0} label="Profile Data" />
          <Tab value={1} label="Password" />
          <Tab value={2} label="Avatar" />
          <Tab value={3} label="Banner" />
        </StyledTabs>

        {tabBarValue === 0 && <ProfileData />}
        {tabBarValue === 1 && <UpdatePasswordComponent />}
        {tabBarValue === 2 && (
          <ProfileImageComponent
            item={"avatar"}
            AuthData={AuthData}
            files={files}
            setFiles={setFiles}
            handleUpdateAvatarImage={handleUpdateAvatarImage}
            acceptedFiles={acceptedFiles}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            handleSaveUserImage={handleSaveUserImage}
            setShowRemoveAvatarMsg={setShowRemoveAvatarMsg}
            showRemoveAvatarMsg={showRemoveAvatarMsg}
          />
        )}
        {tabBarValue === 3 && (
          <ProfileImageComponent
            item={"banner"}
            AuthData={AuthData}
            files={bannerFiles}
            setFiles={setBannerFiles}
            handleUpdateAvatarImage={handleUpdateBannerImage}
            acceptedFiles={bannerAcceptedFiles}
            getRootProps={getBannerRootProps}
            getInputProps={getBannerInputProps}
            handleSaveUserImage={handleSaveUserImage}
            setShowRemoveAvatarMsg={setShowRemoveBannerMsg}
            showRemoveAvatarMsg={showRemoveBannerMsg}
          />
        )}
      </Box>
    </Box>
  );
};

export default EditProfile;
