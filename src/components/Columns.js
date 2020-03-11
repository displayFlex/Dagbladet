import React from "react"
import { Row } from "react-bootstrap"
import Article from "./Article.js"


const Columns = (props) => {

    const { item, parentId } = props;

    return (
        <Row style={{margin: "15px auto"}}>
            {item.columns.map(y =>
                <Article
                    key={y.title}
                    item={y}
                    parentId={parentId}
                    childId={item.columns.indexOf(y)}
                />
            )}
        </Row>
    )
}

export default Columns