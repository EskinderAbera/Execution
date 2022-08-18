import React from "react";
import { Detector } from "react-detect-offline";
import wifi from '../resources/images/icons8-wi-fi-disconnected-100.png'


const CheckConnection = props => {
    return (
        <>
            <Detector
                render={({ online }) => (
                    online ? props.children:
                    <div style = {{ paddingTop: '10px', textAlign: 'center'}}>
                        <img style={{ height: '100px', width: '100px'}} src={wifi} alt="icon" />
                        <h1 style={{ marginBottom: '5px'}}>No Connection</h1>
                        <h4 style={{ margin: '0'}}>Please check your internet connection</h4>
                    </div>
                )}
            />
        </>
    )
}

export default CheckConnection;