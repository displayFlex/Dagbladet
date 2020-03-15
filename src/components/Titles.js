import React from "react"
import Context from "../components/Context"

const Titles = () => {
    return (
        <Context.Consumer>
            {({ list }) => (
                list.map(x =>
                    <div key={list.indexOf(x)}>
                        {x.columns.map(y =>
                            <a key={y.title} href={y.url}>
                                <p style={{ textAlign: "center" }}>{y.title}</p>
                            </a>
                        )}
                    </div>)
            )}
        </Context.Consumer>
    )
}

export default Titles 