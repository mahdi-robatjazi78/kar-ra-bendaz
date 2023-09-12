import React, { useContext, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import { pairColors } from "@/util/funcs";
import { GiSoundOff, GiSoundOn } from "react-icons/gi";
import {
  customBlur,
  handleListenFromOs,
  handlePauseSound,
  handlePlaySound,
} from "@/redux/features/settingSlice";
import Text from "@/styles/styled/styled_typography";
import DarkLight from "@compo/mini/darkLight";
import StyledSwitch from "@/styles/styled/styled_switch";
import HeaderPosition from "@compo/mini/headerPosition";
import StyledSliderComponent from "@/styles/styled/styled_Slider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ThemeContext from "@context/themeContext";
import useDebounce from "@hooks/useDebounce";

const GeneralSettings = (props) => {
  const {
    modal,
    blur,
    theme: OsTheme,
    playSound,
    headerPosition,
  } = useSelector((state: RootState) => state.settings);

  const dispatch = useDispatch();

  const theme = useContext(ThemeContext);

  const handleChangeListenFromOs = (listen) => {
    dispatch(handleListenFromOs(listen));
  };

  const [blurSliderNewValue, setBlurSliderNewValue] = useState(
    +blur?.size * 10 || 50
  );

  const handleChangeBlurSlider = (newValue: number) => {
    if (typeof newValue === "number") {
      dispatch(
        customBlur({
          head: true,
          body: true,
          sidebar: true,
          size: String(newValue / 10),
        })
      );
    }
  };
  useDebounce(
    () => {
      handleChangeBlurSlider(+blurSliderNewValue);
    },
    [blurSliderNewValue],
    600
  );

  return (
    <Box>
      <Box className="general-settings-parent">
        <Box
          className="box"
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
        >
          {" "}
          <Box className="head">Sound</Box>
          <Box className="body">
            {playSound ? (
              <Tooltip arrow  title="Set sound off">
                <span>
              <GiSoundOff
                onClick={() => {
                  dispatch(handlePauseSound());
                }}
                fontSize={"5rem"}
                color={pairColors(
                  "var(--header)",
                  "var(--text2)",
                  theme.isDarkMode
                )}
              />
              </span>
              </Tooltip>
            ) : (
              <Tooltip arrow  title="Set sound on">
                <span>
              <GiSoundOn
                onClick={() => {
                  dispatch(handlePlaySound());
                }}
                fontSize={"5rem"}
                color={pairColors(
                  "var(--header)",
                  "var(--text2)",
                  theme.isDarkMode
                )}
                style={{ cursor: "pointer" }}
              />
              </span>
              </Tooltip>

            )}
          </Box>
          <Box className="s-b-footer">
          <Text inline={true} >State : </Text>
          <Text inline={true} success={playSound} error={!playSound} selectable={false}>
            {playSound ? " On" : " Off"}
          </Text>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
          className="box"
        >
          {" "}
          <Box className="head">Theme</Box>
          <Box className="body" style={{marginTop:14}}>
            <DarkLight />
          </Box>
          <Box className="s-b-footer d-flex-center">
          <Text selectable={false} >
              {" "}
              Os Listen{" "}
            </Text>
            <StyledSwitch
              smallSwitch={true}
              isOn={OsTheme.listen}
              name="listen-to-os"
              id="listen-to-os"
              toggleSwitch={(checked, id) => {
                handleChangeListenFromOs(checked);
              }}
            />
          
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: pairColors(
              "var(--foreground)",
              "var(--header)",
              theme.isDarkMode
            ),
          }}
          className="box"
        >
          <Box className="head-navigation">Navigation</Box>
          <Box className="body">
            <HeaderPosition />
          </Box>
          <Box className="s-b-footer">
            <Text center selectable={false} >
              {" "}
              State :{" "}
              {headerPosition === "left"
                ? "Left"
                : headerPosition === "top"
                ? "Top"
                : headerPosition === "right"
                ? "Right"
                : "Bottom"}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: pairColors(
            "var(--foreground)",
            "var(--header)",
            theme.isDarkMode
          ),
        }}
        className="blurBox"
      >
        <Box className="head">Blur</Box>
        <Box className="body">
          <StyledSliderComponent
            valueLabelDisplay="auto"
            aria-label="kar ra bendaz blur slider"
            defaultValue={blurSliderNewValue || blur?.size || 50}
            onChange={(event: Event, newValue: number) => {
              setBlurSliderNewValue(newValue);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default GeneralSettings;
