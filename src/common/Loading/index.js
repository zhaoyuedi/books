import React, { Component } from 'react'
import {LoadingStyle} from './styled';

export class Loading extends Component {
    render() {
        return (
            <LoadingStyle>
                <img src="http://m.egu365.cn/img/loading.svg" alt=''></img>
            </LoadingStyle>
        )
    }
}

export default Loading
