import React, { useState, useContext } from "react"
import { Col } from "react-bootstrap"
import Context from "../components/Context"

const Article = (props) => {

    const { item, parentId, childId } = props;

    let [editMode, changeEditMode] = useState(false);
    let [title, changeTitle] = useState();

    const myContext = useContext(Context);

    const handleShow = () => {
        myContext.deleteFunction(parentId, childId);
    }

    const sendTitleForEditing = () => {
        if (title) {
            myContext.editFunction(parentId, childId, title);
        } else {
            changeEditMode(!editMode)
        }
    }
    

    return (
        <Col lg={item.width}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <a href={item.url} style={{ flex: "1" }}>
                    <img src={item.imageUrl + "&width=340" + "&height=226"} alt="" />
                </a>
                {editMode === false ? <a href={item.url} style={{ flex: "1" }}>
                    <p style={{ textAlign: "center", margin: "15px 0" }}>{item.title}</p>
                </a> : <div style={{ margin: "15px 0" }}>
                        <input type="text" defaultValue={item.title} onChange={(e) => changeTitle(e.target.value)} />
                        <button
                            titempe="button"
                            className="btn btn-info"
                            onClick={sendTitleForEditing}
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
    )
}

export default Article