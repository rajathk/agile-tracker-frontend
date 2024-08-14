import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import * as API from "../../utils/Api.Constants";
import * as apiService from "../../service/api/Api.Service";
import SnackbarService from "../../service/snackbar/Snackbar.Service";
import CircularProgress from "@mui/material/CircularProgress";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    isNameError: false,
    isPasswordError: false,
  });
  const [isLoader, setIsLoader] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const navigate = useNavigate();

  // handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData["name"] === "" || formData["name"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isNameError"]: true }));
    }
    if (formData["password"] === "" || formData["password"] === " ") {
      setFormData((prevForm) => ({ ...prevForm, ["isPasswordError"]: true }));
    }
    if (
      formData["name"] !== "" &&
      formData["name"] !== " " &&
      formData["password"] !== "" &&
      formData["password"] !== " "
    ) {
      setIsLoader(true);
      let reqBody = {
        username: formData["name"],
        password: formData["password"],
      };

      // Call Authenticate API to get token
      apiService
        .post(API.AUTHENTICATE, reqBody)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            console.log(res);
            localStorage.setItem("token", JSON.stringify(res.data["token"]));
            getUserDetails(res.data);
          }
        })
        //* API error catch
        .catch((error) => {
          setIsLoader(false);
          setSnackbar(true); //! enable snackBar
          setSnackbarMsg(error.message);
          setTimeout(() => {
            setSnackbar(false);
          }, 4000);
        });
    }
  };

  // get User Details
  const getUserDetails = (data) => {
    // call get user details API
    apiService
      .get(API.GET_USER_DETAILS(formData["name"]), data["token"])
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setIsLoader(false);
          setFormData({
            name: "",
            password: "",
            isNameError: false,
            isPasswordError: false,
          });
          navigate(`/projects/${res["data"].id}`);
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

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center" }} className="login-parent-box">
        <Card sx={{ minWidth: 275 }} variant="outlined">
          <CardContent>
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <TextField
                error={formData["isNameError"]}
                label="Username"
                variant="outlined"
                value={formData["name"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ["name"]: e.target.value,
                    ["isNameError"]: false,
                  })
                }
                size="small"
              />
              <TextField
                error={formData["isPasswordError"]}
                type="password"
                label="Password"
                variant="outlined"
                value={formData["password"]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ["password"]: e.target.value,
                    ["isPasswordError"]: false,
                  })
                }
                size="small"
              />
              <Box sx={{ textAlign: "center" }}>
                {!isLoader && (
                  <Button
                    variant="contained"
                    size="small"
                    type="submit"
                    className="login-form__button"
                  >
                    Submit
                  </Button>
                )}
                {isLoader && <CircularProgress />}
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      {/* Snackbar Service  */}
      <SnackbarService snackbar={snackbar} snackbarMsg={snackbarMsg} />
    </Container>
  );
};

export default Login;
