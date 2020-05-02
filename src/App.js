import React, { useRef,useEffect, useState} from 'react';
import CodeMirror from 'react-codemirror'
import axios from 'axios'
import './App.css'
import './codemirror.css'
import {runInOp} from "codemirror/src/display/operations";



function App(){

    const [arcode, setArcode] = useState('');
    const[code, setCode]=useState('//Welcome to coding game\nvar a = 1;\nvar b = 2;\nalert(a+b)');
    const myEditor = useRef('js_editor');
    let instance = null;
    const updateCode = (newcode) =>{
        setCode(newcode);
    };
    const options = {
        lineNumbers: true,
        mode: 'javascript'
    };
    const getData=()=>{
        let url = 'http://localhost:8081/';
        axios.get(url).then((res)=>{
            // console.log(res);
            setArcode(res.data);
        }).catch((err)=>console.log(err));
        setTimeout(getData, 2000);
    };

    const handleRun = ()=>{
        eval(code);
    };

    useEffect(()=>{
        setInterval(()=>{
            getData();
        },1000);
        const editor = myEditor.current.getCodeMirror();
        // editor.setValue(' the coding game\n');
        editor.setSelection({line:2,ch:0},{line:3,ch:0});
        editor.replaceSelection(arcode+"\n")

    },[]);

    return (
    <div className="App">
        <button onClick={handleRun}>Run</button>
        <CodeMirror
            ref={myEditor}
            value={code}
            width="100%"
            onChange={updateCode}
            options={options}
        />
        <div className="game_container">

        </div>
    </div>
  );
}

export default App;
