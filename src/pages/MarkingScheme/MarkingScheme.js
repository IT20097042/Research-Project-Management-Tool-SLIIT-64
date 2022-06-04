import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Input, ListItem, Button } from "@mui/material";
import MarkingSchemeService from "../../services/marking-scheme.service";


class MarkingScheme extends Component {
    constructor(props) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        // this.fetchData = this.fetchData.bind(this);
        this.createMarkingScheme = this.createMarkingScheme.bind(this);
        this.onChangeDescription =this.onChangeDescription.bind(this);
        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeMark = this.onChangeMark.bind(this);
        this.state = {
          items: [0],
          errorMessage: null,
          description: "",
          descs: [],
          marks: [],
          desc: "",
          mark: "",
          open: false
        };
    }

    componentDidMount() {
    }

    createMarkingScheme(type){
        if(!this.state.description || this.state.description == ""){
            this.state({
                open: true,
                errorMessage: "Please type any submission type"
            });
            return;
        }

        var descs = this.state.descs;
        var marks = this.state.marks;

        let marking = '[';

        for(let i = 0; i<this.state.descs.length; i++){
            marking += '{"description" : "'+descs[i]+'", "allocated_mark": '+marks[i]+'},'
        }
        marking += ']'

        MarkingSchemeService.createMarkingScheme({"description": this.state.description, "marking": eval(marking)})

        .then(
            response => {
                if(response.data.success){
                    this.setState({
                        description: "",
                        descs: [],
                        marks: [],
                    });
                    // this.fetchData();
                } else {
                    this.setState({
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
    

    onChangeDescription(e) {
        this.setState({
          description: e.target.value,
        });
      }

    handleClose() {
      this.setState({
        open: false
      });
    }

    onChangeDesc(e) {
        this.setState({
          desc: e.target.value,
        });
      }

    onChangeMark(e) {
        this.setState({
          mark: e.target.value,
        });
      }
    
    addColumn(d,m){
        if(d != '' && m != ''){
            let addedDesc = [];
            addedDesc = this.state.descs;
            addedDesc.push(d);

            let addedMark = [];
            addedMark = this.state.marks;
            addedMark.push(m);

            this.setState({
                descs: addedDesc,
                desc: "",
                marks: addedMark,
                mark: ''
            });        
        }
    }
    

  

  render() {
    const { user: currentUser } = this.props;
    const { descs, marks, open, errorMessage } = this.state;

    if (!currentUser) {
        return <Redirect to="/signin" />;
    }

      return (
        <div className="container">
          <header className="jumbotron">
            <h3>
              Marking Schemes
            </h3>
          </header>
          <Input 
                type=""
                placeholder="Marking Description"
                variant="standard"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
              <br/><br/>

              {
              descs.map((desc, index) => (
                  <ListItem key={index}>
                      <span>{desc} : {marks[index]}</span>
                  </ListItem>

              ))}
            
                <Input 
                    placeholder="Marking Description"
                    value={this.state.desc}
                    onChange={this.onChangeDesc}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <Input
                    type="number"
                    placeholder="Mark"
                    value={this.state.mark}
                    onChange={this.onChangeMark}
                />
                    <br/>
                    <br/>
                
              
              <Button variant="contained" 
                    onClick={() => this.addColumn(this.state.desc, this.state.mark)}>
                    Add New Column
                </Button>
                <br/><br/>
        
                <Button variant="contained" 
                    onClick={() => this.createMarkingScheme(this.state.description)}>
                    Create Marking Scheme
                </Button>

          
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
    const { types, message } = state.request;
    const { user } = state.auth;
    return {
        user,
        types,
        message
    };
}
export default connect(mapStateToProps)(MarkingScheme);