import "./App.css";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import "codemirror/keymap/sublime";
import "codemirror/theme/dracula.css";
import { useState } from "react";

function App() {
  const [code, setCode] = useState("a = 0");
  const [testCases, setTestCases] = useState([]);

  // send code to server
  const submitCode = () => {
    axios.post("http://localhost:80/python", { code }).then(({ data }) => {
      setTestCases([data.passOrFail]);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="absolute top-20 bottom-40 left-10 right-10 text-left">
          <h1>Create a function that adds two numbers in Python</h1>
          {testCases.map((testCase, i) => {
            return (
              <div key={i}>
                <div>{testCase === "True" ? "✅ success" : "❌ failed"}</div>
              </div>
            );
          })}
          <CodeMirror
            value={code}
            options={{
              theme: "dracula",
              keyMap: "sublime",
              mode: "python",
            }}
            onChange={(editor, change) => {
              setCode(editor.getValue());
            }}
          />
          <div className="border-2 bg-green-500" onClick={submitCode}>
            Submit
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
