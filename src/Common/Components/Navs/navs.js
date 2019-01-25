import React from 'react';
import './navs.css';
import {NavLink,Link} from 'react-router-dom';
const navData=["class","section","roll"];
export default class Navs extends React.Component{
  constructor(props){
    super(props);
    this.state={
      navs: navData
    }
  }
  render(){
    let navView=[];
    this.props.data.map(item=>{
      if(item["id"]===this.props.selectedNav["id"]){
        navView.push(<li className='selected nav-cell' onClick={()=>this.props.handleNavChange(item)}>{item["displayName"]}</li>);
      }
      else{
        console.log('1111',`./${item}`);
        navView.push(<li className='nav-cell' onClick={()=>this.props.handleNavChange(item)}>{item["displayName"]}</li>);
      }
    })
    return(
      <div className='nav-view'>
        <ul className="nav-wrapper">
        {navView}
        </ul>
      </div>
    );
  }
}
