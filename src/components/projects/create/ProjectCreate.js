import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useParams } from "react-router-dom";
import * as API from "../../../utils/Api.Constants";
import * as apiService from "../../../service/api/Api.Service";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarService from "../../../service/snackbar/Snackbar.Service";

const ProjectCreate = ({ handleCloseHandler, addNewProjectHandler }) => {
  const params = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoader, setIsLoader] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    status: "",
    isNameError: false,
    isDescriptionError: false,
    isStartDateError: false,
    isEndDateError: false,
    isStatusError: false
  });

  // handle Submit
  const handleSubmit = e => {
    e.preventDefault();
    if (formData["name"] === "" || formData["name"] === " ") {
      setFormData(prevForm => ({ ...prevForm, ["isNameError"]: true }));
    }
    if (formData["description"] === "" || formData["description"] === " ") {
      setFormData(prevForm => ({ ...prevForm, ["isDescriptionError"]: true }));
    }
    if (formData["startDate"] === "") {
      setFormData(prevForm => ({ ...prevForm, ["isStartDateError"]: true }));
    }
    if (formData["endDate"] === "") {
      setFormData(prevForm => ({
        ...prevForm,
        ["isEndDateError"]: true
      }));
    }
    if (
      formData["name"] !== "" &&
      formData["name"] !== " " &&
      formData["description"] !== "" &&
      formData["description"] !== " " &&
      formData["startDate"] !== "" &&
      formData["endDate"] !== "" &&
      formData["status"] !== "" &&
      formData["status"] !== " "
    ) {
      setIsLoader(true);
      let reqBody = {
        name: formData["name"],
        description: formData["description"],
        start_date: formData["startDate"]["$d"].toISOString(),
        end_date: formData["endDate"]["$d"].toISOString(),
        status: formData["status"],
        created_by: params["userId"],
        created_on: new Date().toISOString(),
        modified_by: params["userId"]
      };
      // Call Authenticate API to get token
      apiService
        .post(API.CREATE_PROJECT, reqBody, token)
        .then(res => {
          if (res.status === 200 || res.status === 201) {
            handleCloseHandler();
            addNewProjectHandler();
          }
        })
        //* API error catch
        .catch(error => {
          setIsLoader(false);
          setSnackbar(true); //! enable snackBar
          setSnackbarMsg(error.message);
          setTimeout(() => {
            setSnackbar(false);
          }, 4000);
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0px" }}>Create a Project</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          style={{
            margin: "0px",
            width: "100%"
          }}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={formData["isNameError"]}
              label="Name"
              variant="outlined"
              value={formData["name"]}
              onChange={e =>
                setFormData({
                  ...formData,
                  ["name"]: e.target.value,
                  ["isNameError"]: false
                })
              }
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Description"
              error={formData["isDescriptionError"]}
              multiline
              maxRows={1}
              value={formData["description"]}
              onChange={e =>
                setFormData({
                  ...formData,
                  ["description"]: e.target.value,
                  ["isDescriptionError"]: false
                })
              }
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Start Date"
                  slotProps={{
                    textField: {
                      error: !!formData["isStartDateError"]
                    }
                  }}
                  value={formData["startDate"]}
                  format="DD-MM-YYYY"
                  onChange={e =>
                    setFormData({
                      ...formData,
                      ["startDate"]: e,
                      ["isStartDateError"]: false
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="End date"
                  slotProps={{
                    textField: {
                      error: !!formData["isEndDateError"]
                    }
                  }}
                  value={formData["endDate"]}
                  format="DD-MM-YYYY"
                  onChange={e =>
                    setFormData({
                      ...formData,
                      ["endDate"]: e,
                      ["isEndDateError"]: false
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={formData["isStatusError"]}
              label="Status"
              variant="outlined"
              value={formData["status"]}
              onChange={e =>
                setFormData({
                  ...formData,
                  ["status"]: e.target.value,
                  ["isStatusError"]: false
                })
              }
              size="small"
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          {!isLoader && (
            <Button
              variant="contained"
              size="small"
              type="submit"
              className="login-form__button"
            >
              Create
            </Button>
          )}
          {isLoader && <CircularProgress />}
        </Box>
      </form>
      {/* Snackbar Service  */}
      <SnackbarService snackbar={snackbar} snackbarMsg={snackbarMsg} />
    </Box>
  );
};

export default ProjectCreate;
