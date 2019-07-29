import React from 'react'

import Model from '../../components/UI/Modal/Modal'
import Aux from '../HAux/HAux'
const withErrorHandler = (WrappedComponent, axiosInstance) =>{
    return class extends React.Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axiosInstance.interceptors.request.use(req=>{
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axiosInstance.interceptors.response.use(res => res, error=>{
                this.setState({error: error})
            })
        }

        componentWillUnmount () {
            axiosInstance.interceptors.request.eject(this.reqInterceptor)
            axiosInstance.interceptors.response.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render(){
            return(
                <Aux>
                    <Model
                        show={this.state.error}
                        modelClosed={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler