import React, { useState, useEffect, useContext, useRef } from "react";
import { Box, Drawer } from "@mui/material";
import { MdOutlineDownloadDone } from "react-icons/md";
import { RiDeleteBin3Fill, RiFolderAddFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import ShowModalDelete from "../TodoModals/delete";
import ShowModalAddToCategory from "../TodoModals/addToCategory";
import useWindowSize from "@hooks/useWindowSize";
import { deactiveBlur, setBlurPage } from "@/redux/features/settingSlice";
import Toast from "@/util/toast";
import { DrawerClose } from "@/redux/features/todoPageConfigSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import TodoDrawer from "./todo_drawer";
import CategoryDrawer from "./category_drawer";

const TodoPageDrawer = (props) => {
  const { UpdateOnlyCategories ,UpdateOnlyTodos } = props;
  const [modalOpen, setModalOpen] = useState({
    status: false,
    modal: "",
  });
  const {
    drawer: { open: Open, state: State, item: Item, anchor: Anchor },
  } = useSelector((state: RootState) => state.todoPageConfig);

  const dispatch = useDispatch();
  const [width, height] = useWindowSize();

  const handleCloseDrawer = () => {
    dispatch(DrawerClose());
  };

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
