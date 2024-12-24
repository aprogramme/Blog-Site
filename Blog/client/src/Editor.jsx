import React from 'react'
import ReactQuill from 'react-quill'

const Editor = ({value, onChange}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }], // Dropdown for headers
            ["bold", "italic", "underline", "strike"], // Text formatting
            [{ list: "ordered" }, { list: "bullet" }], // Lists
            [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
            ["link", "image"], // Add links and images
            [{ align: [] }], // Alignment options
            ["clean"], // Remove formatting
        ],
    };

  return (
    <ReactQuill value={value} onChange={onChange} modules={modules}  />
  )
}

export default Editor
