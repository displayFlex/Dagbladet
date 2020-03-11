import React from "react"
import Context from "./Context"
import Columns from "./Columns"

const ListArticles = () => {
    return (
        <Context.Consumer>
            {({ list }) => (
                <div className=" d-flex flex-column align-items-center justify-content-center">
                    {list && list.length > 0 && list.map(x =>
                        <Columns key={list.indexOf(x)} item={x} parentId={list.indexOf(x)} />
                    )}
                </div>
            )}
        </Context.Consumer>
    )
}

export default ListArticles 