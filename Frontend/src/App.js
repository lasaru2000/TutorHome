import "./App.css";
import * as React from 'react';
import Grid from '@mui/material/Grid';
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes,Navigate } from "react-router-dom";
import Home from  "./pages/Home/Home"
import Courses from "./pages/Courses/Courses";
import Library from "./pages/E-Library/library";
import Libcont from "./pages/Librarycontents/Libcont";
import Moduleui from "./pages/Moduleui/Moduleui";
import Collabui from "./pages/Collabui/Collabui";
import Gradeui from "./pages/Gradeui/Gradeui";
import Login from "./pages/Login/Login";
import Managem from "./pages/Manage/Manage";
import ManageNoti from "./pages/ManageNotification/ManageNoti";
import AddModule from "./pages/Addmodule/AddModule";
import AddLibrary from "./pages/AddLibrary/AddLibrary";
import ManageModule from "./pages/ManageModule/ManageModule";
import AddLibCont from "./pages/AddLibraryContents/AddLibCont";
import AddGrade from "./pages/AddMarks/AddGrade";
import GradeBook from "./pages/GradeBook/GradeBook";
import AssignmentDown from "./pages/AssignmentDown/AssignmentDown";
import Collabst from "./pages/Collabui/Collabuist";


const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const name = params.name;
const role = params.role;


if (name) {
  sessionStorage.setItem('name', name);
}
if (role) {
  sessionStorage.setItem('role', role);
}

const storedName = sessionStorage.getItem('name') || name;
const storedRole = sessionStorage.getItem('role') || role;


function App() {

  const storedName = sessionStorage.getItem('name');

  // Check if the name is stored in session storage
  if (!storedName) {
    return <Login />;
  }

  const defaultRoute = '/home';

  let routes = (
    <>
              <Route path="/home" element={<Home />} />
              <Route path="/Courses" element={<Courses />} />
              <Route path="/library" element={<Library/>} />
              <Route path="/libcont" element={<Libcont />} />
              <Route path="/Moduleui" element={<Moduleui />} />
              <Route path="/gradebook" element={< GradeBook />} />
              <Route path="/managemodule" element={<ManageModule />} />
              <Route path="/managenoti" element={< ManageNoti />} />
              <Route path="/addgrade" element={<AddGrade />} />
              <Route path="/addlibcont" element={< AddLibCont />} />
              <Route path="/assignmentdown" element={< AssignmentDown />} />
              <Route path="/addlibrary" element={< AddLibrary />} />
              <Route path="/Gradeui" element={<Gradeui />} />
              <Route path="/manage" element={< Managem />} />
              <Route path="/addmodule" element={< AddModule />} />
              <Route path="*" element={<Navigate to={defaultRoute} replace />} />
    </>
  );

  if (storedRole === 'admin') {
    // If the user is an admin, add all routes
    routes = (
      <>
        {routes}
        <Route path="/collabui" element={<Collabui/>} />
      </>
    );
  } else if (storedRole === 'teacher') {
    // If the user is a teacher, exclude manage and addmodule routes
    routes = (
      <>
        {routes.props.children.filter(
          (route) =>
            route.props.path !== '/manage' &&
            route.props.path !== '/addmodule'  
        )}
         <Route path="/collabui" element={<Collabui/>} />
      </>
    );
  }else if (storedRole === 'student') {

    routes = (
      <>
        {routes.props.children.filter(
          (route) =>
            route.props.path !== '/managemodule' &&
            route.props.path !== '/manage' &&
            route.props.path !== '/addmodule' &&
            route.props.path !== '/collabuist' &&
            route.props.path !== '/managenoti' &&
            route.props.path !== '/addgrade' &&
            route.props.path !== '/addlibcont' &&
            route.props.path !== '/assignmentdown' &&
            route.props.path !== '/addlibrary' &&
            route.props.path !== '/Gradeui' 
            

        )}
         <Route path="/collabuist" element={<Collabst />} />
      </>
    );
  }

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      {(storedRole === 'teacher' || storedRole === 'admin' ) && (
        <Route path="/Collabui" element={
          <Grid container spacing={0}>
            <Grid item xs={0}>
              <SideBar />
            </Grid>
            <Grid item xs={12}>
              <Collabui />
            </Grid>
          </Grid>
        } 
        />
      )}
      {(storedRole === 'teacher' || storedRole === 'admin' || storedRole === 'student') && (
        <Route
          path="/Collabuist"
          element={
            <Grid container spacing={0}>
              <Grid item xs={0}>
                <SideBar />
              </Grid>
              <Grid item xs={12}>
                <Collabst />
              </Grid>
            </Grid>
          }
        />
      )}
      <Route path="/*" element={
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <SideBar />
          </Grid>
          <Grid item xs={10}>
            <Routes>
              {routes}
            </Routes>
          </Grid>
        </Grid>
      } />
    </Routes>
  </Router>
  
  );
}

export default App;
