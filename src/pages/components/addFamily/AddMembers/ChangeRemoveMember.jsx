import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";

import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(-3.3),
  right: theme.spacing(-2),
}));

export default function ChangeRemoveMember({
  familyMembers,
  setFamilyMembers,
  // handleChangeMember,
  // handleRemoveMember,
  memberID,
}) {
  const handleChangeMember = async (id) => {
    console.log("memeber id in addFa ", id);
    try {
      const { value: newName } = await Swal.fire({
        title: "Enter New Name",
        input: "text",
        inputPlaceholder: "Enter new name",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a new name";
          }
        },
      });

      if (newName) {
        const response = await fetch(
          `http://localhost:4000/api/families/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newName }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update");
        }

        setFamilyMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === id ? { ...member, name: newName } : member
          )
        );
      }
    } catch (error) {
      console.error("Error handling update:", error);
      Swal.fire("Error", "Failed to update family member", "error");
    }
  };

  const handleRemoveMember = async (id) => {
    console.log("id remove", id);
    try {
      const response = await fetch(`http://localhost:4000/api/families/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      // Remove the member from the state
      setFamilyMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.error("Error handling deletion:", error);
      Swal.fire("Error", "Failed to delete family member", "error");
    }
  };
  return (
    <Box sx={{ transform: "translateZ(0px)", flexGrow: 1 }}>
      <Box sx={{ position: "relative", height: 0 }}>
        {/* {familyMembers &&
          familyMembers.map((member) => ( */}
        <StyledSpeedDial
          // key={member.id}
          ariaLabel="SpeedDial playground example"
          hidden={false}
          icon={<SpeedDialIcon />}
          direction="left"
          size="small"
          FabProps={{
            sx: {
              bgcolor: "secondary.main",
              "&:hover": {
                bgcolor: "error.main",
              },
              width: "34px",
              height: "24px",
            },
          }}
        >
          <SpeedDialAction
            icon={<DeleteForeverIcon />}
            tooltipTitle="Remove Member"
            onClick={() => {
              handleRemoveMember(memberID);
            }}
          />
          <SpeedDialAction
            icon={<ChangeCircleIcon />}
            tooltipTitle="Change Name"
            onClick={() => {
              handleChangeMember(memberID);
            }}
          />
          <SpeedDialAction
            icon={<PlaylistAddCircleIcon />}
            tooltipTitle="Add Task"
            onClick={() => {
              // Handle Add Task action
            }}
          />
        </StyledSpeedDial>
        {/* ))} */}
      </Box>
    </Box>
  );
}
