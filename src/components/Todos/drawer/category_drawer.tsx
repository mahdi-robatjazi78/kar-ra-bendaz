import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { CiEdit } from "react-icons/ci";
import ThemeContext from "@context/themeContext";
import {
  useRenameCategoryMutation,
  useRemoveOnlyCategoryMutation,
  useRemoveCategoryWithAllTodosMutation,
} from "@/redux/api/categories";
import {
  DrawerClose,
  SetActiveCategory,
  UnActiveCategory,
} from "@/redux/features/todoPageConfigSlice";
import { deactiveBlur } from "@/redux/features/settingSlice";
import StyledButton from "@/styles/styled/styled_button";
import Toast from "@/util/toast";
import StyledTextFieldWhite from "@/styles/styled/styled_textField";
import { soundPlay } from "@/util/funcs";

const CategoryDrawer = (props) => {
  const { CategoryItem, UpdateOnlyCategories, UpdateOnlyTodos } = props;
  const {
    active_category: { id: ActiveCategoryId, title: ActiveCategoryTitle },
    active_ws: { id: ActiveWsId },
  } = useSelector((state: RootState) => state.todoPageConfig);
  const { playSound } = useSelector((state: RootState) => state.settings);

  const dispatch = useDispatch();
  const [
    renameCategoryRequest,
    renameCategoryResponse,
  ] = useRenameCategoryMutation();
  const theme = useContext(ThemeContext);
  const [disabledEditTitle, setDisabledEditTitle] = useState(true);
  const [categoryTitle, setCategoryTitle] = useState<String>("");
  const [
    removeOnlyCategoryRequest,
    removeOnlyCategoryResponse,
  ] = useRemoveOnlyCategoryMutation();
  const [
    removeCategoryWithTodosRequest,
    removeCategoryWithTodosResponse,
  ] = useRemoveCategoryWithAllTodosMutation();

  useEffect(() => {
    if (ActiveCategoryId) {
      setCategoryTitle(ActiveCategoryTitle);
    }
  }, [ActiveCategoryId]);

  const RenameCategory = () => {
    renameCategoryRequest({ uuid: ActiveCategoryId, newTitle: categoryTitle });
    dispatch(SetActiveCategory({ id: ActiveCategoryId, title: categoryTitle }));
    UpdateOnlyCategories();
    setDisabledEditTitle(true);
    dispatch(deactiveBlur());
    dispatch(DrawerClose());
  };
  const checkKeyDown = (e) => {
    e.stopPropagation();
    if (e.keyCode === 13) {
      // Enter
      RenameCategory();
    }
    if (e.keyCode === 27) {
      setCategoryTitle(ActiveCategoryTitle);
      setDisabledEditTitle(true);
    }
  };

  const RemoveCategoryOnly = () => {
    removeOnlyCategoryRequest({
      id: ActiveCategoryId,
      ws: ActiveWsId,
    });
    if (playSound) {
      soundPlay("sound1.wav");
    }
  };

  const RemoveCategoryWithAllTodosInsideIt = () => {
    removeCategoryWithTodosRequest({
      id: ActiveCategoryId,
      ws: ActiveWsId,
    });

    if (playSound) {
      soundPlay("sound1.wav");
    }
  };

  useEffect(() => {
    if (removeOnlyCategoryResponse.isSuccess) {
      // Remove only category
      Toast(removeOnlyCategoryResponse?.data?.msg, true, true);
      UpdateOnlyCategories();
      dispatch(UnActiveCategory());
      dispatch(DrawerClose());
      dispatch(deactiveBlur());
    }
  }, [removeCategoryWithTodosResponse.isSuccess]);
  useEffect(() => {
    if (removeCategoryWithTodosResponse.isSuccess) {
      // Remove only category
      Toast(removeCategoryWithTodosResponse?.data?.msg, true);
      UpdateOnlyCategories();
      UpdateOnlyTodos();
      dispatch(UnActiveCategory());
      dispatch(DrawerClose());
      dispatch(deactiveBlur());
    }
  }, [removeCategoryWithTodosResponse.isSuccess]);

  return (
    <Box className="drawer-box">
      <Box sx={{ mt: 3 }}>
        <StyledTextFieldWhite
          fullWidth
          variant="outlined"
          label="Category title"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
          onKeyDown={(e) => checkKeyDown(e)}
          disabled={disabledEditTitle}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <>
                <InputAdornment position="end">
                  {disabledEditTitle ? (
                    <Tooltip title={"Edit category"}>
                      <IconButton
                        onClick={() => {
                          setDisabledEditTitle(false);
                        }}
                      >
                        <CiEdit style={{ color: theme.borders }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <IconButton onClick={RenameCategory}>
                      <Typography
                        style={{ color: theme.borders, fontSize: ".8rem" }}
                      >
                        Enter
                      </Typography>
                    </IconButton>
                  )}
                </InputAdornment>
              </>
            ),
          }}
        />
        <Box sx={{ mt: 3 }}>
          {CategoryItem?.task_count ? (
            <Typography sx={{ my: 3, mx: 1 }}>
              Number of todos : {CategoryItem?.task_count}
            </Typography>
          ) : null}
          <Box>
            <StyledButton
              onClick={RemoveCategoryOnly}
              variant="outlined"
              size="medium"
            >
              Remove category
            </StyledButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <StyledButton
              onClick={RemoveCategoryWithAllTodosInsideIt}
              variant="outlined"
              size="medium"
            >
              Remove category with all todos inside it
            </StyledButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryDrawer;
