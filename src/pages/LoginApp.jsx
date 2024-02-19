import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

const supaWeb = process.env.REACT_APP_SUPA_WEB;
const supaWebKey = process.env.REACT_APP_SUPA_WEB_KEY;

const supabase = createClient(supaWeb, supaWebKey);

function LoginApp() {
  const navigate = useNavigate();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      supabase.auth.onAuthStateChange(async (event) => {
        if (event === "SIGNED_IN") {
          navigate("/success");
        }
      });
    });
  }, [navigate]);

  return (
    <div className="App ">
      <header className="App-header BackSpecial">
        <div>
          <h1>FAPLA</h1> App for family plans
        </div>

        <Paper elevation={5} sx={{ padding: 5, backgroundColor: "#ffffff" }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
          />{" "}
        </Paper>
      </header>
    </div>
  );
}

export default LoginApp;
