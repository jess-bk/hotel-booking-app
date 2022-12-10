import axios from "axios";
import { useState } from "react";

const useLogout = () => {
  // Define a state variable to indicate whether the user is logged out or not
  const [loggedOut, setLoggedOut] = useState(false);

  // Define the useLogout hook
  const logout = async () => {
    try {
      // Make an HTTP POST request to the /logout route on your server
      await axios.post("/auth/logout");

      // If the request is successful, update the loggedOut state variable
      setLoggedOut(true);
    } catch (err) {
      // If an error occurs, handle the error and display a message to the user
      console.error(err);
      alert("An error occurred while logging out.");
    }
  };

  // Return the logout function and the loggedOut state variable
  return [logout, loggedOut];
};

// Define a React component that uses the useLogout hook
const LogoutButton = () => {
  // Call the useLogout hook
  const [logout, loggedOut] = useLogout();

  return (
    <button onClick={logout}>{loggedOut ? "Logged out" : "Logout"}</button>
  );
};

export default LogoutButton;
