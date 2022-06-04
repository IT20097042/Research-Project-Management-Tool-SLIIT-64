import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { API_FILE_URL, USER_TYPE } from "../../constants/constant";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Input, ListItem, Button } from "@mui/material";
import documentsService from "../../services/documents.service";

class UploadDocuments extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.addDocument = this.addDocument.bind(this);
        this.onChangeDocument = this.onChangeDocument.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.state = {
          documents: [],
          errorMessage: null,
          document : null,
          description: "",
          open: false
        };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
        documentsService.getAllDocuments().then(
            response => {
                if (response.data.success) {
                    this.setState({
                        documents: response.data.data
                    });
                } else {
                    this.setState({
                      documents: [],
                      errorMessage: response.data.message,
                      open: true
                    });
                }
            },
            error => {
              this.setState({
                documents: [],
                errorMessage: error.response.data.message,
                open: true
              });
            }
        );
    }

    onChangeDocument(e) {
        this.setState({
          document: e.target.files[0],
        });
    }
    
    onChangeDescription(e) {
        this.setState({
          description: e.target.value,
        });
      }

    addDocument(file){
        console.log(file)
        if(file == null){
            this.state({
                open: true,
                errorMessage: "Please type any submission type"
            });
            return;
        }

        const formData = new FormData();
        formData.append('document', file);
        formData.append('description', this.state.description);

        documentsService.addDocument(formData).then(
            response => {
                if(response.data.success){
                    this.setState({
                        document: null
                    });
                    this.fetchData();
                } else {
                    this.setState({
                        chatMessages: [],
                        errorMessage: response.data.message,
                        open: true
                      });
                }
            },
            error => {
                this.setState({
                  chatMessages: [],
                  errorMessage: error.response.data.message,
                  open: true
                });
              }
        )
    }

    handleClose() {
      this.setState({
        open: false
      });
    }

   

  render() {
    const { user: currentUser } = this.props;
    const { documents, open, errorMessage } = this.state;

    if (!currentUser) {
        return <Redirect to="/signin" />;
    }

      return (
        <div className="container">
          <header className="jumbotron">
            <h3>
                Upload Documents/Presentation templates
            </h3>
          </header>
          <br/>
          <h4>Uploaded Documents</h4>
            {
              documents.map((document, index) => (
                  <ListItem key={index}>
                      <a href={`${API_FILE_URL}/${document.document}`}>{document.description}</a>
                  </ListItem>

              ))}

          <div className="list-group mt-4">
              {documents.length <= 0 && <h5>Data not available</h5>}
          </div>

          <h4>Add New Submission Type</h4>
          <form>
              <Input 
                placeholder="Document Description"
                variant="standard"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
              <br/>
            <input type="file" onChange={this.onChangeDocument} />
                <Button variant="contained" 
                    onClick={() => this.addDocument(this.state.document)}>
                    Add
                </Button>

          </form>
          <Snackbar open={open} autoHideDuration={3000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMessage ?? "Something went Wrong!"}
          </Alert>
        </Snackbar>
        </div>
      );
    }
}
function mapStateToProps(state) {
    const { documents, message } = state.request;
    const { user } = state.auth;
    return {
        user,
        documents,
        message
    };
}
export default connect(mapStateToProps)(UploadDocuments);