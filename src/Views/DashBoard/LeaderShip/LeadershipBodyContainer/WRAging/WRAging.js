import React, { Component } from 'react';
import ReactTable from 'react-table';
import { ReactTableDefaults } from "react-table";
import 'react-table/react-table.css';
import DefaultData from './defaultGridData';

const gridcolumnData=DefaultData["gridColumnData"];
class WRAging extends Component {
  constructor(props){
    super(props);
    this.state={
      gridData:[]
    }
  }
  componentDidMount(){
    const reqObj=new Request('/Fixtures/gridData.json');
    fetch(reqObj)
      .then(r=>{
        return r.json();
      })
      .then(data=>{
        this.setState({
          gridData : data
        })
        console.log('data 111',data);
      })
  }
  render() {
    let columns=[];
    gridcolumnData.map(item=>{
      let columnObbj={};
      columnObbj["Header"]=item["displayName"];
      columnObbj["accessor"]=item["id"];
      columns.push(columnObbj);
    })

    return (
      <div >
        WRAging: Select search for the demo grid view
        <ReactTable
          classsName={'-striped -highlight'}
          data={this.state.gridData}
          columns={columns}
          showPagination={true}
          showPaginationTop={true}
          showPaginationBottom={false}
          defaultPageSize={10}
          sortable= {true}

        />
      </div>
    );
  }
}

export default WRAging;
