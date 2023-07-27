import React, { useState, useEffect } from "react";
import { Box, Drawer } from "@mui/material";
import useWindowSize from "@hooks/useWindowSize";
import { deactiveBlur } from "@/redux/features/settingSlice";
import { DrawerClose } from "@/redux/features/todoPageConfigSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import TodoDrawer from "./todo_drawer";
import CategoryDrawer from "./category_drawer";
import { deselectAllTodos } from "@/util/funcs";

const TodoPageDrawer = (props) => {
  const { UpdateOnlyCategories, UpdateOnlyTodos } = props;
  const [modalOpen, setModalOpen] = useState({
    status: false,
    modal: "",
  });
  const {
    drawer: { open: Open, state: State, item: Item, anchor: Anchor },
  } = useSelector((state: RootState) => state.todoPageConfig);

  const dispatch = useDispatch();
  const [width, height] = useWindowSize().size;

  const handleCloseDrawer = () => {
    dispatch(DrawerClose());
  };

  useEffect(() => {
    if (Open) {
      // debugger;
      deselectAllTodos();
    }
  }, [Open]);
  return (
    <Box id="drawer-parent" sx={modalOpen.status ? { zIndex: 3 } : {}}>
      <Drawer
        anchor={Anchor}
        elevation={16}
        transitionDuration={200}
        sx={{
          "& .css-1160xiw-MuiPaper-root-MuiDrawer-paper": {
            width: width < 800 ? "85%" : "50%",
          },
        }}
        className={modalOpen.status ? "blur-drawer" : ""}
        open={Open}
        onClose={() => {
          handleCloseDrawer();

          dispatch(deactiveBlur());
        }}
      >
        {State === "todo" ? (
          <TodoDrawer
            props={props}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
          />
        ) : null}
        {State === "category" ? (
          <CategoryDrawer
            UpdateOnlyCategories={UpdateOnlyCategories}
            CategoryItem={Item}
            UpdateOnlyTodos={UpdateOnlyTodos}
          />
        ) : null}
      </Drawer>
    </Box>
  );
};

export default TodoPageDrawer;
