import React, { useState } from "react"
import { Col, Modal, Button } from "react-bootstrap"
import Context from "../components/Context"


const Article = (props) => {

    const { item, parentId, childId } = props;

    let [editMode, changeEditMode] = useState(false);
    let [title, changeTitle] = useState();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Context.Consumer>
                {({ editFunction, deleteFunction }) => (
                    <Col lg={item.width}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <a href={item.url} style={{ flex: "1" }}>
                                <img src={item.imageUrl} alt="" />
                            </a>
                            {editMode === false ? <a href={item.url} style={{ flex: "1" }}>
                                <p style={{ textAlign: "center" }}>{item.title}</p>
                            </a> : <div style={{ flex: "1" }}>
                                    <input type="text" defaultValue={item.title} onChange={(e) => changeTitle(e.target.value)} />
                                    <button
                                        titempe="button"
                                        className="btn btn-info"
                                        onClick={() => editFunction(parentId, childId, title)}
                                    >
                                        Save</button>
                                </div>}
                            <div style={{ display: "flex", justifyContent: "space-around", flex: "1" }}>
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    style={{ margin: "10px" }}
                                    onClick={() => changeEditMode(!editMode)}>Edit</button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    style={{ margin: "10px" }}
                                    onClick={handleShow}
                                >Delete</button>
                            </div>
                        </div>
                    </Col>
                )}
            </Context.Consumer>

            <Context.Consumer>
                {({ deleteFunction }) => (
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Hello</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this article?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => deleteFunction(parentId, childId)}>
                                Yes!
                    </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Cancel
                    </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </Context.Consumer>
        </>

    )
}

export default Article