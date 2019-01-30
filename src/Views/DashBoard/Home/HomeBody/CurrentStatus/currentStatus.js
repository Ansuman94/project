import React, { Component } from 'react';
import './currentStatus.css';
import DefaultData from './defaultGridData';
import _ from "underscore";

export default class SearchGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: [],
            selectedRow: [],
            selectedRowData: [],
            searchedObject: {}
        }
    }
    componentDidMount() {
        console.log('1111111');
        const reqObj = new Request('/Fixtures/formattedGrid.json');
        fetch(reqObj)
            .then(r => {
                console.log('responseData 111', r);
                return r.json();
            })
            .then(data => {
                this.setState({
                    gridData: data
                })
                console.log('data 111', data);
            })
    }
    getHeader = () => {
        let headerView = [],
            headerData = DefaultData["gridHeader"];
        headerData.map(item => {
            headerView.push(<div className="headerCell">{item["displayName"]}</div>);
        })
        return <div className="headerRow">{headerView}</div>;
    }
    getSearchRow = () => {

        let searchBarView = [],
            searchData = DefaultData["gridHeader"];
        searchData.map(item => {
            searchBarView.push(<div className="searchBarCell"><input type="text" className="searchBoxGrid" ref={item["id"]} onChange={this.updateSearchObj} name={item["id"]} /></div>);
        })
        return <div className="searchBarRow">{searchBarView}</div>;

    }
    updateSearchObj = (ev) => {
        let searchedObject = DefaultData["searchObj"];
        searchedObject[ev.target.name] = ev.target.value;
        this.setState({
            searchedObject
        });
    }
    getBody = () => {
        let tableBodyView = [],
            rowView = [],
            headerData = DefaultData["gridHeader"],
            checkListView = [],
            searchedString = "",
            unsearchedRowFlag = false;
        this.state.gridData.map(item => {
            rowView = [];
            unsearchedRowFlag = false;
            // item["data"].map(dataObj=>{
            //   rowView.push(<div className="cell">{dataObj["value"]}</div>);
            // })
            let groupedRowData = _.groupBy(JSON.parse(JSON.stringify(item["data"])), "id");
            console.log('grouped row data', groupedRowData);
            headerData.map(dataObj => {
                searchedString = this.state.searchedObject[dataObj["id"]] === undefined ? "" : this.state.searchedObject[dataObj["id"]].toLowerCase();
                console.log('final check 111', dataObj["id"], groupedRowData);
                let cellVal = `${groupedRowData[dataObj["id"]][0]["value"]}`,
                    lowerCaseCellVal = cellVal.toLowerCase();
                console.log('checlk 11111');
                if (lowerCaseCellVal.indexOf(searchedString) === -1) {
                    unsearchedRowFlag = true;
                }

                rowView.push(<div className="cell" title={`${cellVal}`}>{cellVal}</div>);

            })
            if (!unsearchedRowFlag) {
                tableBodyView.push(<div className="rowView">{rowView}</div>);
                checkListView.push(<div className='checkListWrap'><div className="checkListEach" onClick={() => this.selectRow(item["caseid"])}>{this.state.selectedRow.indexOf(item["caseid"]) !== -1 ? "*" : ""}</div></div>);
            }
        })
        return [
            <div className='checkListColumnView'>{checkListView}</div>,
            <div className="tableBodyWrapper"><div className='tableBodyView'>{tableBodyView}</div></div>
        ];
    }
    selectRow = (rowId) => {
        // let gridData=JSON.parse(JSON.stringify(this.state.gridData)),
        //     ;
        let selectedData = [],
            selectedRow = JSON.parse(JSON.stringify(this.state.selectedRow));
        // selectedData.map((item,index)=>{
        //
        // })
        if (this.state.selectedRow.indexOf(rowId) === -1) {
            selectedRow.push(rowId);
        }
        else {
            selectedRow.splice(selectedRow.indexOf(rowId), 1);
        }
        this.state.gridData.map(item => {
            if (selectedRow.indexOf(item["caseid"]) >= 0) {
                selectedData.push(JSON.parse(JSON.stringify(item)));
            }
        })
        this.setState({
            selectedRow,
            selectedData
        })

    }
    render() {
        let tableBody = this.getBody(),
            tableHeader = this.getHeader(),
            serachBar = this.getSearchRow();
        return (
            <div className='gridMain'>
                <div className="tableHeaderWrapper">{tableHeader}</div>
                <div className="searchRowWrapper">{serachBar}</div>
                <div className='tableColumnsWrap'>{tableBody}</div>
            </div>
        )
    }
}
