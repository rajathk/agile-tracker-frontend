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

const TaskEdit = ({ data, handleCloseHandler }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "",
    status: "",
    dueDate: null,
    isTitleError: false,
    isDescriptionError: false,
    isAssigneeError: false,
    isPriorityError: false,
    isStatusError: false,
    isDueDateError: false,
  });

  useEffect(() => {
    setFormData((prevForm) => ({
      ...prevForm,
      ["title"]: data["title"],
      ["description"]: data["description"],
      ["assignee"]: data["assignee"],
      ["priority"]: data["priority"],
      ["status"]: data["status"],
      ["dueDate"]: data["dueDate"],
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData["title"] === "" || formData["title"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isTitleError"]: true }));
    }
    if (formData["description"] === "" || formData["description"] === " ") {
      setFormData((prevForm) => ({
        ...prevForm,
        ["isDescriptionError"]: true,
      }));
    }
    if (formData["assignee"] === "" || formData["assignee"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isAssigneeError"]: true }));
    }
    if (formData["priority"] === "" || formData["priority"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isPriorityError"]: true }));
    }
    if (formData["status"] === "" || formData["status"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isStatusError"]: true }));
    }
    if (formData["dueDate"] === null) {
      setFormData((prevForm) => ({ ...prevForm, ["isDueDateError"]: true }));
    }
    if (
      formData["title"] !== "" &&
      formData["title"] !== " " &&
      formData["description"] !== "" &&
      formData["description"] !== " " &&
      formData["description"] !== undefined &&
      formData["assignee"] !== "" &&
      formData["assignee"] !== " " &&
      formData["priority"] !== "" &&
      formData["priority"] !== " " &&
      formData["status"] !== "" &&
      formData["status"] !== " " &&
      formData["dueDate"] !== null
    ) {
      //setIsLoader(true);
      // let reqBody = {
      //   taskId: params["taskId"],
      //   proj_id: params["projectId"],
      //   title: formData["title"],
      //   description: formData["description"],
      //   assignee: formData["assignee"],
      //   priority: formData["priority"],
      //   status: formData["status"],
      //   due_date: formData["dueDate"]["$d"].toISOString(),
      //   created_by: createdBy,
      //   created_on: new Date().toISOString(),
      //   modified_by: createdBy,
      //   modified_on: new Date().toISOString(),
      // };
      // // Call Authenticate API to get token
      // apiService
      //   .post(`${API.UPDATE_TASK}/${reqBody.taskId}`, reqBody, token)
      //   .then((res) => {
      //     if (res.status === 200 || res.status === 201) {
      //       setIsLoader(false);
      //       handleCloseHandler();
      //       //addNewTaskHandler();
      //     }
      //   })
      //   //* API error catch
      //   .catch((error) => {
      //     setIsLoader(false);
      //     setSnackbar(true); //! enable snackBar
      //     setSnackbarMsg(error.message);
      //     setTimeout(() => {
      //       setSnackbar(false);
      //     }, 4000);
      //   });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0px" }}>Edit a Task</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          style={{
            margin: "0px",
            width: "100%",
          }}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              error={formData["isTitlError"]}
              label="Title"
              variant="outlined"
              value={formData["title"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ["title"]: e.target.value,
                  ["isTitleError"]: false,
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
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ["description"]: e.target.value,
                  ["isDescriptionError"]: false,
                })
              }
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Assignee"
              error={formData["isAssigneeError"]}
              multiline
              maxRows={1}
              value={formData["assignee"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ["assignee"]: e.target.value,
                  ["isAssigneeError"]: false,
                })
              }
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="priority"
              error={formData["isPriorityError"]}
              multiline
              maxRows={1}
              value={formData["priority"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ["priority"]: e.target.value,
                  ["isPriorityError"]: false,
                })
              }
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              error={formData["isStatusError"]}
              label="Status"
              variant="outlined"
              value={formData["status"]}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  ["status"]: e.target.value,
                  ["isStatusError"]: false,
                })
              }
              size="small"
            />
          </Grid>

          <Grid item xs={6} style={{ paddingTop: "8px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Due Date"
                  slotProps={{
                    textField: {
                      error: !!formData["isDueDateError"],
                    },
                  }}
                  value={dayjs(formData["dueDate"])}
                  format="DD-MM-YYYY"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ["dueDate"]: e,
                      ["isDueDateError"]: false,
                    })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="small"
            type="submit"
            className="login-form__button"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TaskEdit;
