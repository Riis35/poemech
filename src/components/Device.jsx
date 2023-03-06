import DeviceCss from './Device.module.css';

import React from 'react';
import TankContainer from './TankContainer';

export default class Device extends React.Component{
    constructor(props){
        super(props);
}

    

    addTank(){
        alert('tank added')

    }

    render(){
        return(
            
            <div className={DeviceCss.container}>
                <button className={DeviceCss.name}> {this.props.name}</button>
                <div className={DeviceCss.tankContainer}> <TankContainer isCollapsed="yes"   />  </div>
            </div>
        
        )
    }
}