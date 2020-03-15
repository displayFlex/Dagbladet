import React, { useEffect, useContext } from "react"
import Columns from "./Columns"
import MyContext from "./Context";

const ListArticles = () => {

    let myContext = useContext(MyContext);

    useEffect(() => {
        if (myContext.isDeleted === true) {
            setTimeout(() => {
                myContext.openModal()
            }, 2000);
        }
    });

    return (
        myContext.list && myContext.list.length > 0 && myContext.list.map(x =>
            <Columns key={myContext.list.indexOf(x)} item={x} parentId={myContext.list.indexOf(x)} />
        )
    )
}

export default ListArticles 