import { useState } from "react";
import { MDBCol } from "mdbreact";
import { Outlet } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import AdminSideBar from "./AdminSideBar";

const AdminLayout = () => {
  const [hide, setHide] = useState(false);
  const [isHumClicked, setIsHumClicked] = useState(false);

  const handleClose = () => setIsHumClicked(false);
  return (
    <div className="row">
      {!hide ? (
        <MDBCol>
          <AdminSideBar />
        </MDBCol>
      ) : (
        <Offcanvas
          show={isHumClicked}
          onHide={handleClose}
          style={{ backgroundColor: "#176B87", color: "#ffff" }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filter</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <AdminSideBar />
          </Offcanvas.Body>
        </Offcanvas>
      )}

      <MDBCol md={!hide ? "10" : null}>
        <Outlet />
      </MDBCol>
    </div>
  );
};

export default AdminLayout;
