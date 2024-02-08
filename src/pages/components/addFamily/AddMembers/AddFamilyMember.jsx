import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AddTask from "./addTasks/AddTask";

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const Item = styled(Paper)(({ theme }) => ({
  color: "#693ca9",
}));

function AddFamilyMember({ familyMembers, setFamilyMembers }) {
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
      const { value: role } = await Swal.fire({
        title: "Choose Role",
        input: "select",
        inputOptions: {
          dad: "Dad",
          mom: "Mom",
          child: "Child",
        },
        inputPlaceholder: "Select a role",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to choose a role";
          }
        },
      });

      if (role) {
        const { value: name } = await Swal.fire({
          title: `Enter ${role}'s Name`,
          input: "text",
          inputPlaceholder: `Enter ${role}'s name`,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return `Please enter ${role}'s name`;
            }
          },
        });

        if (name) {
          await handleCreateMember(name, role);
          setFamilyMembers([...familyMembers, { name, role }]);
        }
      }
    } catch (error) {
      console.error("Error creating family member:", error);
      Swal.fire("Error", "Failed to create family member", "error");
    }
  };
  React.useEffect(() => {
    async function fetchFamilyLastname() {
      const response = await fetch("/api/families");
      const data = await response.json();
      console.log("members DATA", data);
      if (response.ok) {
        const membersData = data.map((item) => ({
          id: item._id,
          name: item.name,
          role: item.role,
          __v: item.__v,
        }));
        setFamilyMembers(membersData);
        if (membersData.length > 0) {
          const id = membersData[0].id;
          console.log("ID members:", id);
          // setIdRemoveLastname(id);
        }
      }
    }
    fetchFamilyLastname();
  }, []);
  return (
    <>
      <ButtonStyle onClick={handleAddFamilyMember}>
        <Paper elevation={8} sx={{ paddingX: 1, color: "#693ca9" }}>
          <h6>Add Family Members</h6>
        </Paper>
      </ButtonStyle>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {familyMembers.map((member) => (
            <Grid item xs={4}>
              <Item key={member.name}>
                {member.name}
                <br />
                <AddTask />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default AddFamilyMember;
