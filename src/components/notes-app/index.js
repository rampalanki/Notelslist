

import React, { Component } from "react";
import "./index.css";

export default class NotesApp extends Component {
  state = {
    notesList: [],
    notes: [],
  }
  addNotes() {
    let title = document.getElementById("title").value;
    let status = document.getElementById("status").value;
    let obj = { title, status }
    this.state.notes.push(obj)
    this.setState({notesList:[...this.state.notes],notes:this.state.notes})
  }
  filterStatus(status){
    let {notesList,notes}=this.state
    this.setState({
      notesList:notes
    },()=>{
      if(status!=="All"){
        let notesArray = notesList.filter((el) =>{
          return el.status.toLowerCase() ===  status.toLowerCase()
        });
        this.setState({
          notesList:notesArray
        })
      }
    })
   
   
  }
  render() {
    let {notesList} = this.state
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" id="title" type="text" className="large mx-8"
            placeholder="Note Title" />
          <input data-testid="input-note-status" id="status" type="text" className="large mx-8"
            placeholder="Note Status" />
          <button className="" data-testid="submit-button" onClick={this.addNotes.bind(this)}>Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li className="tab-item slide-up-fade-in" data-testid="allButton" onClick={this.filterStatus.bind(this,"All")}>All</li>
            <li className="tab-item slide-up-fade-in" data-testid="activeButton" onClick={this.filterStatus.bind(this,"Active")}>Active</li>
            <li className="tab-item slide-up-fade-in" data-testid="completedButton" onClick={this.filterStatus.bind(this,"Completed")}>Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {notesList && notesList.length > 0 ? notesList.map((note) => {
              return  <tr>
                  <td>{note.title}</td>
                  <td>{note.status}</td>
                </tr>
              }) : null}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
