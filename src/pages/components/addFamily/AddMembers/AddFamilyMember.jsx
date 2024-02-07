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

function AddFamilyMember() {
  const [familyMembers, setFamilyMembers] = useState([]);

  const handleCreateMember = async (name, role) => {
    try {
      const response = await fetch("http://localhost:4000/api/families", {
        method: "POST",
        body: JSON.stringify({ name, role }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      console.log("data", data);
      // Handle data or UI update as necessary
    } catch (error) {
      console.error("Error handling member:", error);
      Swal.fire("Error", "Failed to create member", "error");
    }
  };

  const handleAddFamilyMember = async () => {
    try {
      const result = await Swal.fire({
        title: "Add Family Member",
        html: `
          <input id="swal-input-name" class="swal2-input" placeholder="Name">

          <select id="swal-input-role" class="swal2-select">

            <option value="dad">Dad</option>
            <option value="mom">Mom</option>
            <option value="child">Child</option>
          </select>
        `,
        focusConfirm: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input-name").value;
          const role = document.getElementById("swal-input-role").value;
          if (name) {
            return { name, role };
          } else {
            Swal.showValidationMessage("Name cannot be empty");
          }
        },
      });

      if (result.isConfirmed) {
        const { name, role } = result.value;
        await handleCreateMember(name, role);
        setFamilyMembers([...familyMembers, { name, role }]);
        if (role === "child") {
          const addMoreChildren = await Swal.fire({
            title: "Add More Children?",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          });
          if (addMoreChildren.isConfirmed) {
            await handleAddFamilyMember();
          }
        }
      }
    } catch (error) {
      console.error("Error creating family member:", error);
      Swal.fire("Error", "Failed to create family member", "error");
    }
  };

  return (
    <>
      <ButtonStyle onClick={handleAddFamilyMember}>
        <Paper elevation={8} sx={{ paddingX: 1, color: "#693ca9" }}>
          <h6>Add Family Members</h6>
        </Paper>
      </ButtonStyle>
    </>
  );
}

export default AddFamilyMember;
