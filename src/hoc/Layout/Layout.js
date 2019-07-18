import React from 'react'

import Aux from '../HAux/HAux'
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    state = {
        sideDrawer : false
    }
    sideDrawerClosedHandler =()=>{
        this.setState({sideDrawer: false})
    }

    sideDrawerTogglehandler = () => {
        this.setState((prevState)=>{
            return {sideDrawer: !prevState.sideDrawer}
        })
    }
    render(){
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerTogglehandler}/>
                <SideDrawer 
                    open={this.state.sideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}
export default Layout