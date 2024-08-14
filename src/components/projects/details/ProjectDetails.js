import React from "react";
import Box from "@mui/material/Box";

const ProjectDetails = ({ project }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h3 style={{ margin: "0px" }}>Project Details</h3>
      {Object.keys(project).map(key => {
        return (
          <p>
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {key}:
            </span>{" "}
            {project[key]}
          </p>
        );
      })}
    </Box>
  );
};

export default ProjectDetails;
