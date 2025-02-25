import React from 'react'

function Alert(props) {
    let cap = (word) => {
        if(word==='danger') {
            word='Error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
            <div style={{ height: '50px' }}>
                {props.alert && (<div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                    <strong>{cap(props.alert.type)}</strong>: {props.alert.mag}
                </div>)}
            </div>
        </>
    )
}

export default Alert
