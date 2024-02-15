import React from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import AddTask from "./addTasks/AddTask";
import ChangeRemoveMember from "./ChangeRemoveMember";

import Swal from "sweetalert2";

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

function AddFamilyMember({}) {
  const [familyMembers, setFamilyMembers] = React.useState([]);
  const [idRemoveLastname, setIdRemoveLastname] = React.useState(null);

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

  const fetchFamilyLastname = async () => {
    try {
      const response = await fetch("/api/families");
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      const membersData = data.map((item) => ({
        id: item._id,
        name: item.name,
        role: item.role,
        __v: item.__v,
      }));
      setFamilyMembers(membersData);
      if (membersData.length > 0) {
        const id = membersData[0].id;
        setIdRemoveLastname(id);
      }
    } catch (error) {
      console.error("Error fetching family members:", error);
    }
  };
  React.useEffect(() => {
    fetchFamilyLastname();
  }, []);

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
          fetchFamilyLastname();
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
      <Box sx={{ width: "100%", height: "30%" }}>
        <Grid container rowSpacing={4} columnSpacing={{ xs: 3, sm: 4, md: 5 }}>
          {familyMembers.map((member) => (
            <Grid
              item
              xs={12}
              md={4}
              sx={{ marginTop: "10px" }}
              key={member.id}
            >
              {" "}
              <ChangeRemoveMember
                familyMembers={familyMembers}
                setFamilyMembers={setFamilyMembers}
                memberID={member.id}
              />{" "}
              <Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <h6 style={{ marginRight: "10px" }}>{member.role}</h6>
                  <h2>{member.name}</h2>
                </div>

                <AddTask memberId={member.id} />
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default AddFamilyMember;
