import logo from './logo.svg';
import './App.css';
import { saveAs } from 'file-saver';
import {useState} from 'react'

function App() {

  const [fileEvent, setFileEvent] = useState("")
  const [isFileSelected, setSelected] = useState(false)

  const onChangeFile = () => {
    const zip = require('jszip')();
    let files = fileEvent.target.files;
    for (let file = 0; file < fileEvent.target.files.length; file++) {
      // Zip file with the file name.
      zip.file(files[file].name, files[file]);
    }
    zip.generateAsync({ type: "blob" }).then(content => {
      saveAs(content, "download.zip");
    });
  }

  const onUpload = (event) => {
    setFileEvent(event)
    setSelected(true)
  }

  return (
    <div className="App">
      <div className='div2'>
        <h1 style={{ fontSize: "40px", marginBottom: "40px" }}>Upload file(s)</h1>
        <div>
          <input multiple type="file" name="file" className='inputStyle' onChange={onUpload}/>
        </div>
        <button type="button" className='buttonStyle' disabled={!isFileSelected} onClick={onChangeFile}>
          Download
        </button>
      </div>
    </div>
  );
}

export default App;
