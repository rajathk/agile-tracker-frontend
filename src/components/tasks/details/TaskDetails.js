import React from "react";
import Box from "@mui/material/Box";

const TaskDetails = ({ data }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0px" }}>{data["title"]} Details</h3>
      {Object.keys(data).map((key, i) => {
        return (
          <p key={i}>
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {key}:
            </span>{" "}
            {data[key]}
          </p>
        );
      })}
    </Box>
  );
};

export default TaskDetails;
