import React, {useState} from "react";

type EditableSpanType = {
    title: string,
    callback: (title: string, id: string) => void

}
const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(true)
    const [title, setTitle] = useState(props.title)
    return (
        <>
            {edit ? <input/> : <span>{props.title}</span>}
        </>


    )

}
export default EditableSpan
