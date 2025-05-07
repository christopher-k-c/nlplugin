import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../../../utils/supabaseClient";

// console.log("Supabase client in WorkSubmissions:", supabase);

const WorkSubmissions = () => {


    const dialogRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [user, setUser] = useState(null);
    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true);

    // Add useEffect to check user session on component mount
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data && data.session) {
        setUser(data.session.user);
      }
    };
    
    checkUser();
    
    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );


    // Clean up the subscription on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    console.log(user)
    const fetchWorkSubmissions = async () => {
      if (user) {
        console.log("User is true")
        setLoading(true);

        let test = await supabase.from('work_details').select("*")
        console.log(test)
        let { data: work_details, error } = await supabase
        .from('work_details')
        .select('*')
  
          console.log(data)
        if (error) {
          console.error("Error fetching work submissions:", error);
        } else {
          setSubmissions(data);
        }
        setLoading(false);
      }
    };
  
    fetchWorkSubmissions();
  }, [user]); // Only run when `user` changes
  
    const openDialog = () => {
      if (dialogRef.current) {
        dialogRef.current.showModal();
      }
    };
  
    const closeDialog = () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setUser(null); // Clear the authenticated user

    };


    // console.log("handleLogin called");
    // console.log("Email state:", email);
    // console.log("Password state:", password);

    const handleLogin = async (e) => {
        console.log("Hello")
        e.preventDefault(); // Prevent form submission from refreshing the page
        setErrorMessage("");
        setSuccessMessage("");
        try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        if (error) {
            console.error("Login error:", error); // Debugging
          setErrorMessage(error.message);
        } else {
            console.log("Login successful:", data); // Debugging
          setSuccessMessage("Login successful!");
          closeDialog(); // Close the dialog on successful login
        }
    } catch (err) {
        console.error("Unexpected error:", err); // Debugging
    setErrorMessage("An unexpected error occurred.");
    }
      };

  return (



    <>
    
    {user ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={openDialog}>Open Login Dialog</button>}
    
    {!user ? (
    <dialog ref={dialogRef}>
        <form onSubmit={handleLogin}>
          <sp-heading>Log In</sp-heading>
          <sp-divider size="large"></sp-divider>
          <sp-body>Enter your email and password:</sp-body>
          <sp-textfield
            id="email"
            placeholder="Email"
            type="email"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            required
          ></sp-textfield>
          <sp-textfield
            id="password"
            placeholder="Password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            required
          ></sp-textfield>
        <footer>
        <sp-button
          variant="primary"
          id="submitLogin"
          type="submit" // Keep for semantics, but onClick will be the primary actor
          onClick={handleLogin} // <<< --- ADD THIS
        >
          Log In
        </sp-button>
        <sp-button
          id="cancelLogin"
          type="button" // <<< --- ADD type="button" TO PREVENT ACCIDENTAL SUBMISSION
          uxp-variant="secondary"
          onClick={closeDialog}
        >
          Cancel
        </sp-button>
        </footer>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

</dialog>
  ) : (
    <>
          <div>
            <h3>Work Submissions</h3>
            {loading ? (
              <p>Loading...</p>
            ) : submissions.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>User ID</th>
                    <th>Notes</th>
                    <th>Date Updated</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission) => (
                    <tr key={submission.id}>
                      <td>{submission.id}</td>
                      <td>{submission.user_id}</td>
                      <td>{submission.notes}</td>
                      <td>{submission.date_updated}</td>
                      <td>{submission.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No submissions found.</p>
            )}
          </div>
    </>
  )}




</>





  );
};

export default WorkSubmissions;


//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchWorkSubmissions = async () => {
//       setLoading(true);
//       const { data, error } = await supabase
//         .from("work_submissions")
//         .select("*");

//       if (error) {
//         console.error("Error fetching work submissions:", error);
//       } else {
//         setSubmissions(data);
//       }
//       setLoading(false);
//     };

//     fetchWorkSubmissions();
//   }, []);

//     <div>
//       <h3>Work Submissions</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : submissions.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>User ID</th>
//               <th>Notes</th>
//               <th>Date Updated</th>
//               <th>Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((submission) => (
//               <tr key={submission.id}>
//                 <td>{submission.id}</td>
//                 <td>{submission.user_id}</td>
//                 <td>{submission.notes}</td>
//                 <td>{submission.date_updated}</td>
//                 <td>{submission.created_at}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No submissions found.</p>
//       )}
//     </div>