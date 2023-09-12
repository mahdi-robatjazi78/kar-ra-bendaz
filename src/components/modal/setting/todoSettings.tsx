import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import { MdDoneOutline, MdOutlineKeyboardArrowDown } from "react-icons/md";
import Text from "@/styles/styled/styled_typography";
import SettingButton from "@compo/mini/settingButton";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import {
  handleChangeMetaItem,
  hideLayoutNav,
  showLayoutNav,
} from "@/redux/features/todoPageConfigSlice";
import ButtonGroupSetting from "@compo/mini/buttonGroupSetting";
import { handlePresentAndFilterTodoLayout } from "@/util/funcs";
import { FaRegSquare } from "react-icons/fa";
import { FiColumns } from "react-icons/fi";
import { BsTable } from "react-icons/bs";
import SelectMultiColumn from "@compo/mini/selectMultiColumn";
import { CgList } from "react-icons/cg";
import { PaginationComponent, PerPageComponent } from "@compo/Todos/paginate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setThreeColAll } from "@/redux/features/todoLayoutSlice";
import useWindowSize from "@hooks/useWindowSize";

const TodoPageSettings = (props) => {
  const { accordionExpanded, setAccordionExpanded } = props;

  const {
    meta,
    layout_nav_show,
    active_category: ActiveCategory,
  } = useSelector((state: RootState) => state.todoPageConfig);

  const dispatch = useDispatch();
  const sizeName = useWindowSize().sizeName;

  const { todoPageLayout: show } = useSelector(
    (state: RootState) => state.todoLayout
  );

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleCloseTodoViewCountTooltip = () => {
    setAnchorEl(null);
  };

  const handleOpenTodoViewCountTooltip = (event) => {
    if (sizeName !== "mobile") {
      setAnchorEl(event.currentTarget);
    } else {
      dispatch(setThreeColAll(2));
      handlePresentAndFilterTodoLayout("3col", 2);
    }
  };

  const handleChangeMeta = (page, perPage) => {
    dispatch(handleChangeMetaItem({ page: page, limit: perPage }));
  };

  return (
    <Box className="todo-settings-parent" >
      <Accordion
        tabIndex={4}
        expanded={accordionExpanded === "settings"}
        onChange={(e, val) => {
          if (val) {
            setAccordionExpanded("settings");
          } else {
            setAccordionExpanded(false);
          }
        }}
        sx={
          accordionExpanded === "settings" && {
            border: "2px solid var(--borders)",
            borderRadios: 8,
          }
        }
      >
        <AccordionSummary
          sx={{ background: "var(--background)" }}
          expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
        >
          <Text>Settings</Text>
        </AccordionSummary>
        <AccordionDetails className="background-style2">
          <SettingButton
            icon={layout_nav_show ? <HiOutlineEyeOff /> : <HiOutlineEye />}
            text={layout_nav_show ? "Hide Layout Nav" : "Show Layout Nav"}
            active={false}
            onClick={() => {
              if (layout_nav_show) {
                dispatch(hideLayoutNav());
              } else {
                dispatch(showLayoutNav());
              }
            }}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        tabIndex={5}
        expanded={accordionExpanded === "layout"}
        onChange={(e, val) => {
          if (val) {
            setAccordionExpanded("layout");
          } else {
            setAccordionExpanded(false);
          }
        }}
        sx={
          accordionExpanded === "layout" && {
            border: "2px solid var(--borders)",
            borderRadios: 8,
          }
        }
      >
        <AccordionSummary
          sx={{ background: "var(--background)" }}
          expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
        >
          <Text>Layout</Text>
        </AccordionSummary>
        <AccordionDetails
          className="background-style2"
          style={{ textAlign: "center" }}
        >
          <ButtonGroupSetting
            onClickList={[
              () => {
                handlePresentAndFilterTodoLayout("1col", null);
              },

              (e) => {
                handleOpenTodoViewCountTooltip(e);
              },
              () => {
                handlePresentAndFilterTodoLayout("table", null);
              },
            ]}
            textList={["Single Column", "Multi Column", "Table View"]}
            iconList={[
              <FaRegSquare style={{ marginRight: "10px" }} />,
              <FiColumns style={{ marginRight: "10px" }} />,
              <BsTable style={{ marginRight: "10px" }} />,
            ]}
            activeItem={show[0] === "1col" ? 0 : show[0] === "3col" ? 1 : 2}
          />

          <SelectMultiColumn
            handleCloseTodoViewCountTooltip={handleCloseTodoViewCountTooltip}
            open={open}
            id={id}
            anchorEl={anchorEl}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion
        tabIndex={6}
        expanded={accordionExpanded === "filter"}
        onChange={(e, val) => {
          if (val) {
            setAccordionExpanded("filter");
          } else {
            setAccordionExpanded(false);
          }
        }}
        sx={
          accordionExpanded === "filter" && {
            border: "2px solid var(--borders)",
            borderRadios: 8,
          }
        }
      >
        <AccordionSummary
          sx={{ background: "var(--background)" }}
          expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
        >
          <Text>Filter</Text>
        </AccordionSummary>
        <AccordionDetails
          className="background-style2"
          style={{ textAlign: "center" }}
        >
          <ButtonGroupSetting
            onClickList={[
              () => {
                handlePresentAndFilterTodoLayout("all", null);
              },

              () => {
                handlePresentAndFilterTodoLayout("done", null);
              },
            ]}
            textList={["All Todos", "Done Todos"]}
            iconList={[
              <CgList style={{ marginRight: "10px" }} />,
              <MdDoneOutline style={{ marginRight: "10px" }} />,
            ]}
            activeItem={show[1] === "all" ? 0 : 1}
          />
        </AccordionDetails>
      </Accordion>

      {!ActiveCategory.id && (
        <Accordion
          tabIndex={7}
          expanded={accordionExpanded === "pagination"}
          onChange={(e, val) => {
            if (val) {
              setAccordionExpanded("pagination");
            } else {
              setAccordionExpanded(false);
            }
          }}
          sx={
            accordionExpanded === "pagination" && {
              border: "2px solid var(--borders)",
              borderRadios: 8,
            }
          }
        >
          <AccordionSummary
            sx={{ background: "var(--background)" }}
            expandIcon={<MdOutlineKeyboardArrowDown color="var(--borders)" />}
          >
            <Text>Pagination</Text>
          </AccordionSummary>
          <AccordionDetails className="background-style2">
            <Box className="d-flex-between-wrap">
              <PerPageComponent
                meta={meta}
                handleChangeMeta={handleChangeMeta}
                fullWidth={true}
              />
              <Box style={{ margin: "auto" }}>
                <PaginationComponent
                  meta={meta}
                  handleChangeMeta={handleChangeMeta}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default TodoPageSettings;
