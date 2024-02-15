import React, { useState, useEffect } from "react";
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

function AddTask({ memberId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [memberId]); // Fetch tasks when the memberId changes

  const fetchTasks = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks`);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasksData = await response.json();
      // Filter tasks to include only those belonging to the current member
      const memberTasks = tasksData.filter(
        (task) => task.memberId === memberId
      );
      console.log("memerTasks", memberTasks);
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
          10: "easy",
          20: "medium",
          30: "hard",
        },
        inputPlaceholder: "Select a points",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "You need to choose a title";
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
          Swal.fire("Success", "Task added successfully", "success");
        }
      }
    } catch (error) {
      console.error("Error adding task:", error);
      Swal.fire("Error", "Failed to add task", "error");
    }
  };

  const handleTaskDone = async (index, taskId) => {
    try {
      // Remove the task from the database
      await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      // Remove the task from the local state
      const updatedTasks = tasks.filter((task, i) => i !== index);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error marking task as done:", error);
      Swal.fire("Error", "Failed to mark task as done", "error");
    }
  };

  return (
    <>
      {/* Add task button */}
      <ButtonStyle onClick={handleAddTask}>
        <h6>Add task</h6>
      </ButtonStyle>
      {/* Displaying tasks */}
      <Box sx={{ width: "100%" }}>
        {tasks.map((task, index) => (
          <Paper key={index} elevation={3}>
            <p>
              {index + 1}. {task.title}
            </p>
            <p>Points: {task.points}</p>
            <p>done: {task.done ? "Yes" : "No"}</p>
            {/* Button to mark task as done */}
            <button onClick={() => handleTaskDone(index, task._id)}>
              Mark as Done
            </button>
          </Paper>
        ))}
      </Box>
    </>
  );
}

export default AddTask;
