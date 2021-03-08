import React, { useState } from 'react';



export default function Jumper({currentId, action}) {
    const [typedValue, setTypedValue] = useState("");

    function submitJump(event) {
        if (event.key === 'Enter') {
            action(parseInt(typedValue, 10));
        }

    }

    return (
        <div id="jumperBox">
        <label htmlFor="jumper">Jump to: </label>
        <input type="text" id="jumper"
            onChange={(event) => setTypedValue(event.target.value)}
            onKeyUp={submitJump}
            />
        <button type="button" onClick={() => action(parseInt(typedValue, 10))}>Go</button>
        </div>
    )
}