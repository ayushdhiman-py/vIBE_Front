import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CardSkeleton from "./skeleton/homeSkeleton";
import "./Modal.css";
// import "./skeleton/ThreeD.css";

function Modal3D() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  });

  return (
    <div>
      <SkeletonTheme baseColor="#cfcfcf" highlightColor="#DFD8D7">
        <div>
          <Button
            variant="primary"
            onClick={() => {
              setShow(true);
              setLoading(true);
            }}
            className="Threed-btn"
          >
            3D
          </Button>

          <Modal
            show={show}
            onHide={() => setShow(false)}
            dialogClassName="modal-80w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-custom-modal-styling-title">
                3D View
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
              {loading ? (
                <>
                  <div className="skeleton">
                    <CardSkeleton />
                  </div>
                </>
              ) : (
                <div class="embed-responsive embed-responsive-16by9">
                  <iframe
                    className="iframe"
                    src="https://4-chill-nahi-hai-3d-vIBE.ishkapoor.repl.co/"
                    loading="eager"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </Modal.Body>
          </Modal>
        </div>
      </SkeletonTheme>
    </div>
  );
}

export default Modal3D;
