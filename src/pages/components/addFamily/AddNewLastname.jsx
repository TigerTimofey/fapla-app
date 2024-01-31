import React, { useState } from "react";
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

function AddNewLastname() {
  const [showCreateFamilyModal, setShowCreateFamilyModal] = useState(false);

  const handleClick = () => {
    setShowCreateFamilyModal(true);

    // Show alert here
    (async () => {
      const { value: formValues } = await Swal.fire({
        title: "Family Lastname",
        html: `
            <input id="swal-input1" class="swal2-input LogoFont">
          `,
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("swal-input1").value];
        },
      });
      if (formValues) {
        Swal.fire(JSON.stringify(formValues));
      }
    })();

    async function getFamilyLastnames() {
      try {
        const response = await fetch("/api/lastname");
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        return data.lastnames;
      } catch (error) {
        console.error("Error fetching family lastnames:", error);
        return null;
      }
    }
    getFamilyLastnames();
  };

  return (
    <>
      <ButtonStyle onClick={handleClick}>
        <Paper elevation={8} sx={{ padding: 2 }}>
          Place to Create
        </Paper>
      </ButtonStyle>
    </>
  );
}

export default AddNewLastname;
