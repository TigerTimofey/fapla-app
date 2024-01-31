import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

const supabase = createClient(
  "https://ejptakqzjdjnyservufe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcHRha3F6amRqbnlzZXJ2dWZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0Njk5MDksImV4cCI6MjAyMjA0NTkwOX0.8THRHyVvP1aDBqa_l5et6cHoPz9VTRK5ZtN1uu7fhds"
);

function LoginApp() {
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      console.log("event", event);
      supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
          navigate("/success");
        }
      });
    });
  }, [navigate]);
  return (
    <div className="App">
      <header className="App-header">
        <Paper elevation={10} sx={{ padding: 10 }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
            providers={["google"]}
          />{" "}
        </Paper>
      </header>
    </div>
  );
}
export default LoginApp;
