import { useState, useEffect } from "react";


export default function Form() {
    const [text, setText] = useState('Halo');

    useEffect(() => {
        console.log('Halo Dunia');
    }, []);

    return(
        <>
            <form>
                <input value={text} onChange={(e) => setText(e.target.value)}/>
            </form>
            <p>{text}</p>
        </>
    )
}