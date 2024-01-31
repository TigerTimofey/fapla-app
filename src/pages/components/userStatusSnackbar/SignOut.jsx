import Button from "@mui/material/Button";

function SignOut({ signOutUser }) {
  return (
    <div className="SignOut-button">
      <Button variant="contained" color="error" onClick={() => signOutUser()}>
        Sign Out
      </Button>
    </div>
  );
}
export default SignOut;
