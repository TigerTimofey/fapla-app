import React from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

import Swal from "sweetalert2";

import ChangeRemoveMember from "../../addMembers/ChangeRemoveMember";

const ButtonStyle = styled("div")(({ theme }) => ({
  cursor: "pointer",
  maxWidth: "20%",
  marginLeft: "40%",

  padding: "2px",
  fontSize: "1.2rem",
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  minWidth: "50px",
  backgroundColor: "#693ca9",
  color: "white",
  borderRadius: "5px",
}));

const Item = styled(Paper)(({ theme }) => ({
  color: "#693ca9",
  padding: "2px",
  marginTop: "10px",
}));

function AddTask({
  memberId,
  // stars,
  fetchFamilyLastname,
  setPoints,
  familyMembers,
  setFamilyMembers,
}) {
  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    fetchTasks();
  }, [memberId]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasksData = await response.json();
      const memberTasks = tasksData.filter(
        (task) => task.memberId === memberId
      );
      setTasks(memberTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const { value: points } = await Swal.fire({
        title: "Choose points",
        input: "select",
        inputOptions: {
          10: "10 points - EASY",
          20: "20 points - MEDIUM",
          30: "30 points - HARD",
        },
        inputPlaceholder: "Select a points",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to choose a points";
          }
        },
      });

      if (points) {
        const { value: title } = await Swal.fire({
          title: `Provide task`,
          input: "text",
          inputPlaceholder: `Provide task for ${points} points`,
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return `Please enter task`;
            }
          },
        });

        if (title) {
          const response = await fetch("http://localhost:4000/api/tasks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              memberId: memberId,
              points: points,
              title: title,
              done: false, // Set done field to false
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to add task");
          }

          // Add the task locally for immediate display
          setTasks([
            ...tasks,
            { memberId: memberId, points: points, title: title, done: false },
          ]);
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire("Error", "Failed to add task", "error");
    }
  };

  // const handleTaskDone = async (index, taskId, points) => {
  //   try {
  //     await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
  //       method: "DELETE",
  //     });
  //     const updatedTasks = tasks.filter((task, i) => i !== index);
  //     setTasks(updatedTasks);
  //     setPoints(stars + Number(points));
  //   } catch (error) {
  //     console.error("Error marking task as done:", error);
  //     Swal.fire("Error", "Failed to mark task as done", "error");
  //   }
  // };

  const handleTaskDone = async (index, taskId, points) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/families/${memberId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch member's stars");
      }
      const memberData = await response.json();
      const currentStars = memberData.stars;

      await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      const updatedStars = currentStars + Number(points);

      await fetch(`http://localhost:4000/api/families/${memberId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stars: updatedStars }),
      });

      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
      setPoints(updatedStars);
      fetchFamilyLastname();
    } catch (error) {
      console.error("Error marking task as done:", error);
      Swal.fire("Error", "Failed to mark task as done", "error");
    }
  };

  return (
    <>
      {" "}
      <ChangeRemoveMember
        handleAddTask={handleAddTask}
        familyMembers={familyMembers}
        setFamilyMembers={setFamilyMembers}
        memberId={memberId}
      />{" "}
      <Box sx={{ width: "100%" }}>
        {tasks.map((task, index) => (
          <Item key={index}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              key={index}
            >
              <Grid item xs={12}>
                <h5
                  style={{
                    wordWrap: "break-word",
                    marginBottom: "-20px",
                    padding: "5px",
                  }}
                >
                  {index + 1}. {task.title}
                </h5>
              </Grid>

              <Grid item xs={6}>
                <h6>{task.points} ★</h6>
              </Grid>
              <Grid item xs={6} sx={{ marginTop: "50px" }}>
                <ButtonStyle
                  onClick={() => handleTaskDone(index, task._id, task.points)}
                >
                  Done
                </ButtonStyle>
              </Grid>
            </Grid>
          </Item>
        ))}
      </Box>
    </>
  );
}

export default AddTask;
