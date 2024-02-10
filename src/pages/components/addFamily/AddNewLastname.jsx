import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function AddNewLastname({
  setFamilyLastname,
  familyLastname,
  idRemoveLastname,
  setIdRemoveLastname,
}) {
  const handleCreateFamily = async () => {
    try {
      const { value: famname } = await Swal.fire({
        title: "Family Lastname",
        html: `<input id="swal-input1" class="swal2-input LogoFont">`,
        focusConfirm: false,
        preConfirm: () => {
          return document.getElementById("swal-input1").value;
        },
      });

      if (famname) {
        const response = await fetch("http://localhost:4000/api/lastnames", {
          method: "POST",
          body: JSON.stringify({ famname }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log("data", data);
        setFamilyLastname(data.famname);
        setIdRemoveLastname(data._id);
      }
    } catch (error) {
      console.error("Error handling lastname:", error);
      Swal.fire("Error", "Failed to create lastname", "error");
    }
  };

  return (
    <>
      <ButtonStyle onClick={handleCreateFamily}>
        <Paper elevation={8} sx={{ padding: 2, color: "#693ca9" }}>
          <h2>Create new Family</h2>
        </Paper>
      </ButtonStyle>
    </>
  );
}

export default AddNewLastname;
