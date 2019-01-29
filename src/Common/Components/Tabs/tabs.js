import React from 'react';
import './tabs.css';
import {NavLink} from 'react-router-dom';
const tabData=["class","section","roll"];
export default class Tabs extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tabs: tabData
    }
  }
  render(){
    let tabView=[];
    this.props.data.map(item=>{
      if(item["id"]===this.props.selectedTab["id"]){
        tabView.push(<li className='selected tab-cell' onClick={()=>this.props.handleTabChange(item)}>{item["displayName"]}</li>);
      }
      else{
        console.log('1111',`./${item}`);
        tabView.push(<li className='tab-cell' onClick={()=>this.props.handleTabChange(item)}>{item["displayName"]}</li>);
      }
    })
    return(
      <div className='tab-view'>
        <ul className="tab-wrapper">
        {tabView}
        </ul>
      </div>
    );
  }
}
