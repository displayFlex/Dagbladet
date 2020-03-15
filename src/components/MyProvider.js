import React from "react"
import axios from "axios"
import Context from './Context';
import { Modal, Button } from "react-bootstrap"

export default class MyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            editFunction: this.editTitle,
            deleteFunction: this.deleteArticle,
            opened: false,
            restoreFunction: this.restoreArticle,
            isDeleted: false,
            openModal: this.openModal
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

    deleteArticle = (parentId, childId) => {
        let articlesCopy = [...this.state.list];
        let deletedArticle = Object.assign({}, articlesCopy[parentId].columns[childId]);
        articlesCopy[parentId].columns.splice(childId, 1);

        this.setState({
            list: articlesCopy,
            deletedArticle: deletedArticle,
            parentIdOfDeletedArticle: parentId,
            idOfDeletedArticle: childId,
            isDeleted: true
        })

        setTimeout(() => {
            this.closeModal()
        }, 5000);
    }

    restoreArticle = () => {
        let articlesCopyForRestore = [...this.state.list];
        articlesCopyForRestore[this.state.parentIdOfDeletedArticle].columns.splice(this.state.idOfDeletedArticle, 0, this.state.deletedArticle);
        this.setState({
            list: articlesCopyForRestore,
            deletedArticle: null,
            parentIdOfDeletedArticle: null,
            idOfDeletedArticle: null,
            opened: false
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

    closeModal = () => {
        this.setState({
            opened: false
        })
    }

    openModal = () => {
        this.setState({
            opened: true,
            isDeleted: false
        })
    }

    render() {
        return (
            this.state.opened === false ?
                <Context.Provider value={this.state}>
                    {this.props.children}
                </Context.Provider>
                :
                <Modal show={this.state.opened} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hello</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to restore last deleted article?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.restoreArticle}>
                            Yes!
                        </Button>
                        <Button variant="primary" onClick={this.closeModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}