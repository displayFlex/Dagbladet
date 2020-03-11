import React from "react"
import axios from "axios"
import Context from './Context';

export default class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            editFunction: this.editTitle,
            deleteFunction: this.deleteArticle
        };
    }

    componentDidMount() {
        let self = this;

        axios.get('https://storage.googleapis.com/aller-structure-task/test_data.json')
            .then(function (response) {

                if (response.status === 200) {
                    self.setState({
                        list: response.data[0]
                    })
                }
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    // showPrompt () {

    //     let result
    //     setTimeout(() => {
    //         result = prompt("If you want to restore this article, please, type \"Yes\" and press \"OK\" button");
    //     }, 1000);

    //     if (result !== null ) {
    //       let articlesCopyForRestore = [...this.state.list];
    //       articlesCopyForRestore[this.state.parentIdOfDeletedArticle].columns.splice(this.state.idOfDeletedArticle, 0,this.state.deletedArticle);
    //       this.setState({
    //         list: articlesCopyForRestore,
    //         deletedArticle: null,
    //         parentIdOfDeletedArticle: null,
    //         idOfDeletedArticle: null
    //       })
    //     } else {
    //       this.setState({
    //         deletedArticle: null,
    //         parentIdOfDeletedArticle: null,
    //         idOfDeletedArticle: null
    //       })
    //     }

    // }

    deleteArticle = (parentId, childId) => {
        let articlesCopy = [...this.state.list];
        let deletedArticle = Object.assign({}, articlesCopy[parentId].columns[childId]);
        articlesCopy[parentId].columns.splice(childId, 1);

        this.setState({
            list: articlesCopy,
            deletedArticle: deletedArticle,
            parentIdOfDeletedArticle: parentId,
            idOfDeletedArticle: childId,
            opened: true
        })

    }


    editTitle = (parentIndex, childIndex, text) => {
        let copy = [...this.state.list];
        if (text) {
            copy[parentIndex].columns[childIndex].title = text;
            this.setState({
                list: copy
            })
        }
    }

    render() {
        return (
            <Context.Provider
                value={this.state}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}