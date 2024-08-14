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
import WorkIcon from "@mui/icons-material/Work";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import ProjectCreate from "./create/ProjectCreate";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import "./Projects.css";
import ProjectEdit from "./edit/ProjectEdit";
import ProjectDetails from "./details/ProjectDetails";
import * as API from "../../utils/Api.Constants";
import * as apiService from "../../service/api/Api.Service";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarService from "../../service/snackbar/Snackbar.Service";

const Projects = () => {
  const params = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const [projectsData, setProjectsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [project, setProject] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // setProjectsData([
    //   {
    //     id: 5,
    //     name: "test proj",
    //     description: "from postman",
    //     start_date: "2024-08-09T14:30:00",
    //     end_date: "2024-08-09T14:30:00",
    //     status: "In-Progress",
    //     created_by: 2,
    //     created_on: "2024-08-12T19:20:05.689977",
    //     modified_by: 2,
    //     modified_on: "2024-08-12T19:20:05.689977"
    //   }
    // ]);
    getAllProjects();
  }, []);

  const getAllProjects = () => {
    setIsLoader(true);
    // call get user details API
    apiService
      .get(API.GET_ALL_PROJECTS(params["userId"]), token)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsLoader(false);
          setProjectsData(res["data"]);
        }
      })
      .catch((error) => {
        setIsLoader(false);
        setSnackbar(true); //! enable snackBar
        setSnackbarMsg(error.message);
        setTimeout(() => {
          setSnackbar(false);
        }, 4000);
      });
  };

  const clickHandler = (data) => {
    navigate(`/projects/tasks/${data["id"]}`, {
      state: {
        data,
      },
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
      setProject(data);
    } else if (str === "edit") {
      setCreateOpen(false);
      setDetailsOpen(false);
      setEditOpen(true);
      setProject(data);
    }
  };
  const handleClose = () => setOpen(false);

  const addNewProject = () => {
    getAllProjects();
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
                    Projects
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
              {projectsData.map((data) => {
                return (
                  <ListItem disablePadding key={data["id"]}>
                    <ListItemButton onClick={() => clickHandler(data)}>
                      <ListItemIcon>
                        <WorkIcon />
                      </ListItemIcon>
                      <ListItemText
                        className="projects__list__listItemText"
                        primary={data["name"]}
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
      <Modal open={open} onClose={handleClose}>
        <Box className="modal__box">
          {createOpen && (
            <ProjectCreate
              handleCloseHandler={handleClose}
              addNewProjectHandler={addNewProject}
            />
          )}
          {editOpen && (
            <ProjectEdit project={project} handleCloseHandler={handleClose} />
          )}
          {detailsOpen && <ProjectDetails project={project} />}
        </Box>
      </Modal>
    </div>
  );
};

export default Projects;
