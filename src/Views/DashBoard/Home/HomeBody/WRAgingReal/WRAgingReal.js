import React from 'react';
import DefaultData from './defaultDataNew';
import './WRAging.css';
import _ from 'underscore';

export default class WRAgingReal extends React.Component{
  constructor(props){
    super(props);
    this.state={
      "isCheckBoxEnabled" : true,
      "isExportEnabled" : false,
      "data" : DefaultData["sampleData"],
      "noDataView": "-"
    }
  }
  getHeader=()=>{
    let headerView = [],
        headerData = DefaultData["gridHeaderData"];
    headerView.push(<div className='row-header-cell headerCell'></div>);
    headerData.map(item => {
        headerView.push(<div className="headerCell" title={`${item["displayName"]}`}>{item["displayName"]}</div>);
    })
    if(this.state.isExportEnabled){
      headerView.push(<div className='export-header-cell headerCell' title="Action">Action</div>);
    }
    return <div className="headerRow">{headerView}</div>;
  }
  handleExpansion=(row)=>{
    let tempData=[...this.state.data],
        delimiter="%";
    //////**** check this logic later *****/////
    tempData.map(item=>{
      if(item["id"]===row["id"]){
        item["isExpanded"]=!item["isExpanded"];
      }
    })
    if(row["isExpanded"]){
      tempData.map(item=>{
        if(item["id"].indexOf(row["id"])>=0 && item["level"] > row["level"]){
          item["isExpanded"]=false;
          item["isVisible"]=false;
        }
      })
    }
    else{
      tempData.map(item=>{
        if(item["id"].indexOf(row["id"])>=0 && item["level"] === row["level"]+1){
          item["isExpanded"]=false;
          item["isVisible"]=true;
        }
      })
    }
    this.setState({
      data : JSON.parse(JSON.stringify(tempData))
    })


  }
  getBody=()=>{
    let tableBodyView = [],
        rowView = [],
        headerData = DefaultData["gridHeaderData"],
        expansionIcon="",
        checkListView = [];
    this.state.data.map(item => {
        rowView = [];
          if(item["isExpanded"]){
            expansionIcon='-';
          }
          else{
            expansionIcon='+';
          }
        rowView.push(<div className={`cell row-first-Cell`} title={`${item["displayName"]}`}>
        {
          item["isExpandable"] ?
          <div className={`expansion-icon-wrap level-${item["level"]}-view`} onClick={()=>this.handleExpansion(JSON.parse(JSON.stringify(item)))}>
            {expansionIcon}
          </div> :
          <div className={`expansion-icon-wrap level-${item["level"]}-view`}>
          </div>
        }

            <div className="first-cell-label">{item["displayName"]}</div>
          </div>);
        let groupedRowData = _.groupBy(JSON.parse(JSON.stringify(item["data"])), "id");
        console.log('grouped row data', groupedRowData);
        headerData.map(dataObj => {
            console.log('final check 111', dataObj["id"], groupedRowData);
            let cellVal = groupedRowData && groupedRowData[dataObj["id"]] ?
            `${groupedRowData[dataObj["id"]][0]["formattedVal"]}`:
            this.state.noDataView;
            rowView.push(<div className="cell" title={`${cellVal}`}>{cellVal}</div>);

        })
        if(this.state.isExportEnabled){
          if(item["isExport"]){
            rowView.push(<div className='export-each-cell cell'>export</div>);
          }
          else{
            rowView.push(<div className='export-each-cell cell'></div>);
          }

        }
        tableBodyView.push(<div className={item["isVisible"] ? "rowView" : "rowView hide-view"}>{rowView}</div>);
            // console.log('check list check',item);
            // let checkListClass= item["isChecked"] ? "checkListEach" : "checkListEach hidenClass" ;
            // checkListView.push(<div className='checkListWrap'><div className={checkListClass} onClick={() => this.selectRow(item["caseid"])}>{this.state.selectedRow.indexOf(item["caseid"]) !== -1 ? "*" : ""}</div></div>);

    })
    return [
        <div className="tableBodyWrapper"><div className='tableBodyView'>{tableBodyView}</div></div>
    ];
  }
  render(){
    let tableBody = this.getBody(),
        tableHeader = this.getHeader();
        // serachBar = this.getSearchRow();
    return (
        <div className='gridMain'>
            <div className="tableHeaderWrapper">{tableHeader}</div>
            <div className='tableColumnsWrap'>{tableBody}</div>
        </div>
    )
  }
}
