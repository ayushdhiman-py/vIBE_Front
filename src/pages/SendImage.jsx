import React from 'react';
import axios from 'axios';

const SendImage = () => {
  // a local state to store the currently selected file.
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    try {
      const response = axios({
        method: "post",
        mode: "cors",
        url: "https://aws143.arnavgoyal4.repl.co/upload",
        data: formData
      }).then(()=>{
        // console.log(response)
      })
    //   response.then((json)=>{console.log(json)})
    } catch(error) {
      // console.log(error)
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form>
  )
};

export default SendImage;