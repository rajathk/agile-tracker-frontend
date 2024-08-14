import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const ProjectEdit = ({ project, handleCloseHandler }) => {
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

  useEffect(() => {
    setFormData(prevForm => ({
      ...prevForm,
      ["name"]: project["name"],
      ["description"]: project["description"],
      ["startDate"]: project["start_date"],
      ["endDate"]: project["end_date"],
      ["status"]: project["status"]
    }));
  }, []);

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
        handleCloseHandler();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0px" }}>Edit a Project</h3>
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
                  value={dayjs(formData["startDate"])}
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
                  value={dayjs(formData["endDate"])}
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
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="login-form__button"
          >
            Create
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProjectEdit;
