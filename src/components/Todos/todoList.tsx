import React, { useContext, useState, useEffect } from "react";
import "./todos.css";
import ThemeContext from "../../context/colorModeContext";
import CardIcons from "./cardIcons";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { useWindowSize } from "../../hooks/useWindowSize";
import { SidebarContext } from "../../context/sidebarContext";
import { TodoContext } from "../../context/todoContext";

const getCardStyles = (todo: any) => {
  return {
    background:
      todo.flag === "isDone"
        ? "rgba( 166, 255, 177, 0.25 );"
        : "rgba( 255, 255, 255, 0.25 )",
    boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
    backdropFilter: "blur( 4px )",
    WebkitBackdropFilter: "blur( 4px )",
    borderRadius: "10px",
    border: "1px solid rgba( 255, 255, 255, 0.18 )",
    cursor: "pointer",
    minHeight: "6rem",
    maxHeight: "6rem",
  };
};

const TodoList = (props) => {
  const { todoList, getAllTodos, setSelectedEditTask } = props;
  const theme = useContext(ThemeContext);
  const { open } = useContext(SidebarContext);
  const [hover, setHover] = useState(null);
  const [windowWidth, windowHeight] = useWindowSize();
  const [width, setWidth] = useState<any>(0);
  const { show } = useContext(TodoContext);

  useEffect(() => {
    const board = document.getElementsByClassName("board");
    setWidth(board[0].clientWidth);
  }, [windowWidth, open]);

  const textShadow = {
    color: "transparent",
    textShadow: " 0 0 8px #000",
    fontSize: 14,
  };

  return (
    <Box >
      {!todoList.length ? (
        <Box
        // style={{position:"relative",backgroundColor:"gray" ,width:"100%" , height:"100vh"}}
        
        sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"80vh",
            width:"70vw"
            
            
            }}
            >
          <Typography color="red" fontSize="2rem" 
          
          style={{
            
              position:"absolute",
              top:"50%",
              left:"50%",
              transform:"translate(-50%,-50%)"
            }}
          
          >Empty List ????</Typography>
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          style={{
            // height: "77vh",
            width: width + 16 + "px",
            padding: "1rem",
          }}
        >
          {todoList.map((todo, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sm={show[0] === "1col" ? 12 : 6}
              md={show[0] === "1col" ? 12 : 6}
              lg={show[0] === "1col" ? 12 : 4}
            >
              <Card
                style={{
                  background:
                    todo.flag === "isDone"
                      ? "#E6FFE9"
                      : "rgba( 255, 255, 255, 0.25 )",
                  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                  backdropFilter: "blur( 4px )",
                  WebkitBackdropFilter: "blur( 4px )",
                  // borderRadius: "1rem",
                  border: "1px solid rgba( 255, 255, 255, 0.18 )",
                  cursor: "pointer",
                  minHeight: "6rem",
                  maxHeight: "6rem",
                }}
                onMouseLeave={() => setHover(null)}
                onClick={() => setHover(index)}
              >
                <CardContent style={{ position: "relative" }}>
                  <Typography
                    sx={
                      index === hover
                        ? textShadow
                        : {
                            fontSize: 14,
                            color:
                              todo.flag === "isDone" ? "black" : theme.text1,
                          }
                    }
                    gutterBottom
                    // className={}
                  >
                    {todo.body}
                  </Typography>
                  {index === hover && (
                    <span>
                      <CardIcons
                        todo={todoList[hover]}
                        getAllTodos={getAllTodos}
                        setSelectedEditTask={setSelectedEditTask}
                      />
                    </span>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TodoList;
