import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import NotesToolbar from "./toolbar";
import Space from "./space";

const NoteBoard = () => {
  const [boardCount, setBoardCount] = useState(4);

  const boardStyles1 = {
    height: "40vh",
    width: "100%",
    padding: "1rem",
  };

  return (
    <Box
      style={{
        overflowY: "auto",
        position: "relative",
      }}
    >
      <NotesToolbar boardCount={boardCount} setBoardCount={setBoardCount} />

      {!boardCount ? (
        <h1>empty</h1>
      ) : (
        <Box style={{ marginTop: "2.5rem" }}>
          <Grid container>
            {Array(boardCount)
              .fill("board")
              .map((item) => (
                <Grid xs={12} sm={3} item style={boardStyles1}>
                  <Space />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default NoteBoard;
