import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import { useParams, useLocation } from "react-router-dom";
import TaskCreate from "./create/TaskCreate";
import "./Tasks.css";
import TaskDetails from "./details/TaskDetails";
import TaskIcon from "@mui/icons-material/Task";
import TaskEdit from "./edit/TaskEdit";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import * as API from "../../utils/Api.Constants";
import * as apiService from "../../service/api/Api.Service";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarService from "../../service/snackbar/Snackbar.Service";

const Tasks = () => {
  const params = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const [tasksData, setTasksData] = useState([]);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  useEffect(() => {
    // setTasksData([
    //   {
    //     id: 4,
    //     proj_id: 1,
    //     title: "latest create from postman",
    //     description: "test description",
    //     assignee: 1,
    //     priority: "High",
    //     status: "In-Progress",
    //     due_date: "2024-08-10T05:55:32.426975",
    //     created_by: 2,
    //     created_on: "2024-08-10T05:55:32.426975",
    //     modified_by: 2,
    //     modified_on: "2024-08-10T05:55:32.426975"
    //   }
    // ]);
    // setCreatedBy(2);
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    setIsLoader(true);
    // call get user details API
    apiService
      .get(API.GET_ALL_TASKS(params["projectId"]), token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsLoader(false);
          setTasksData(res["data"]);
          setCreatedBy(res["data"][0]["created_by"]);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        //setSnackbar(true); //! enable snackBar
        setSnackbarMsg(error.message);
        setTimeout(() => {
          setSnackbar(false);
        }, 4000);
      });
  };

  const handleOpen = (str, data = {}) => {
    setOpen(true);
    if (str === "create") {
      setCreateOpen(true);
      setDetailsOpen(false);
      setEditOpen(false);
    } else if (str === "details") {
      setCreateOpen(false);
      setDetailsOpen(true);
      setEditOpen(false);
      setDetails(data);
    } else if (str === "edit") {
      setCreateOpen(false);
      setDetailsOpen(false);
      setEditOpen(true);
      setDetails(data);
    }
  };
  const handleClose = () => setOpen(false);

  const addNewTask = () => {
    getAllTasks();
  };

  return (
    <div className="projects">
      <Container className="projects__parentContainer" maxWidth="sm">
        <Box
          className="projects__parentBox"
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            textAlign: "center",
          }}
        >
          {!isLoader && (
            <List
              subheader={
                <div className="projects__list__headerDiv">
                  <ListSubheader
                    component="div"
                    className="projects__list__subHeader"
                  >
                    Tasks
                  </ListSubheader>
                  <div style={{ alignSelf: "center" }}>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen("create")}
                    >
                      <AddIcon fontSize="small" color="primary" />
                    </IconButton>
                  </div>
                </div>
              }
            >
              {tasksData.map((data) => {
                return (
                  <ListItem disablePadding key={data["title"]}>
                    <ListItemButton>
                      <ListItemIcon>
                        <TaskIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="projects__list__listItemText"
                        primary={data["title"]}
                      />
                    </ListItemButton>
                    <Tooltip title="Details" placement="left">
                      <IconButton size="small">
                        <InfoIcon
                          fontSize="small"
                          color="primary"
                          onClick={() => handleOpen("details", data)}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit" placement="right">
                      <IconButton size="small">
                        <EditIcon
                          fontSize="small"
                          color="primary"
                          onClick={() => handleOpen("edit", data)}
                        />
                      </IconButton>
                    </Tooltip>
                  </ListItem>
                );
              })}
            </List>
          )}
          {isLoader && <CircularProgress style={{ margin: "20px 0px" }} />}
        </Box>
      </Container>
      {/* Snackbar Service  */}
      <SnackbarService snackbar={snackbar} snackbarMsg={snackbarMsg} />
      {/* Create Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box className="modal__box">
          {createOpen && (
            <TaskCreate
              handleCloseHandler={handleClose}
              addNewTaskHandler={addNewTask}
              createdBy={createdBy}
            />
          )}
          {editOpen && (
            <TaskEdit data={details} handleCloseHandler={handleClose} />
          )}
          {detailsOpen && <TaskDetails data={details} />}
        </Box>
      </Modal>
    </div>
  );
};

export default Tasks;
