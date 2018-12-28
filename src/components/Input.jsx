import React from 'react';

const Input = (props) => {

    return (
        <input type="number" value={props.value} onChange={(e) => props.handleClick(e.target.value)} />
    )

}

export default Input;