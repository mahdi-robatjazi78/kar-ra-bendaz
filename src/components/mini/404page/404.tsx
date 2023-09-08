import React from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import Text from "@/styles/styled/styled_typography";
import StyledButton from "@/styles/styled/styled_button";
import "./404.scss";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const { headerPosition } = useSelector((state: RootState) => state.settings);
  const { token } = useSelector((state: RootState) => state.auth);
  const Navigate = useNavigate();
  return (
    <Box
      className="notfound-page"
      style={
        headerPosition === "top" || headerPosition === "bottom"
          ? {
              height: "92vh",
              position: "relative",
            }
          : {
              height: "100vh",
              position: "relative",
            }
      }
    >
      <Box className="position-central-parent">
        <Box className="text-box-404">
          <Box>
            <Text className="text-404">
              4<span>0</span>4
            </Text>
          </Box>
          <Box className="desc-box-404">
            <Text>
              he page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </Text>
          </Box>
          <Box className="button-links">
            {token ? (
              <Box className="d-flex-center" style={{ gap: "1rem" }}>
                <StyledButton onClick={() => Navigate(-1)}>
                  Back to previous page
                </StyledButton>
                <StyledButton onClick={() => Navigate("/")}>
                  Go to home
                </StyledButton>
              </Box>
            ) : (
              <StyledButton onClick={() => Navigate("/login")}>
                Back to login
              </StyledButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Page404;
