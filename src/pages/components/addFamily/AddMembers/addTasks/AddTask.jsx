import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  maxWidth: "50%",
  marginLeft: "25%",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  backgroundColor: "#693ca9",
  color: "white",
  borderRadius: "5px",
}));

const Item = styled(Paper)(({ theme }) => ({
  color: "#693ca9",
}));

function AddTask({ familyMembers, setFamilyMembers }) {
  return (
    <>
      <ButtonStyle onClick={console.log("added task")}>
        <h6>Add task</h6>
      </ButtonStyle>
      <Box sx={{ width: "100%" }}>
        item
        {/* {familyMembers.map((member) => (
            <Grid item xs={4}>
              <Item key={member.name}>{member.name}</Item>
            </Grid>
          ))} */}
      </Box>
    </>
  );
}

export default AddTask;
