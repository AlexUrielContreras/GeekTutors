import React from "react";
import { useQuery } from "@apollo/client";
// import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Auth from '../utils/auth'
import { GET_CURRENT_USER } from "../utils/queries"
function NavList(props) {
  const { currentTab, setCurrentTab } = props;
  const {loading,error,data}=useQuery(GET_CURRENT_USER,{variables:{token:Auth.getToken()||"GUEST"}})
  if (loading) return "LOADING..."
  if (error) console.log(error);
  console.log(data);
  const logout = event => {
    event.preventDefault()
    Auth.logout();
  }
  const renderOptions = () => {
    if (!data || !data.GetCurrentUser) return
    if (data.GetCurrentUser.isTutor) {
      return (
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentTab("tutor")} eventKey="tutor">
            Dashboard
          </Nav.Link>
        </Nav.Item>
      )
    } else if (data.GetCurrentUser.selectedTutor) {
      return (
        <Nav.Item>
          <Nav.Link onClick={() => setCurrentTab("tutor")} eventKey="tutor">
            Tutor
          </Nav.Link>
        </Nav.Item>
      )
    }
  }


  return (
    <Navbar collapseOnSelect fill activekey={currentTab} >
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-center fs-5">
        <Nav activeKey={currentTab} onSelect={setCurrentTab} >
          <Nav.Item>
            <Nav.Link onClick={() => setCurrentTab("home")} eventKey="home" >
              Home
            </Nav.Link>
          </Nav.Item>
          {renderOptions()}

          {Auth.loggedIn() ? (
            <Nav.Link>
              <button type='button' className='logout-btn' onClick={logout}>Logout</button>
            </Nav.Link>
          ) : (
            <>
              <Nav.Item>
                <Nav.Link onClick={() => setCurrentTab("signup")} eventKey="signup">
                  Signup
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link onClick={() => setCurrentTab("login")} eventKey="login">
                  Login
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavList;
