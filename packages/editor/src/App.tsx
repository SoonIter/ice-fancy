import React from 'react';
import Editor from 'react-simple-code-editor';
// @ts-expect-error
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
// import 'prismjs/themes/prism.css'; // Example style, you can use another
// import myButton from './components/myButton';
// console.log(myButton);

function App() {
  const [code, setCode] = useState(
    '<div>Hello World</div>',
  );
  return (
    <>
      <h1>hello</h1>
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
        }}
      />
      <div h="100" w="100">
      <x-search height="100px" width="100px" code={code}></x-search>
      </div>
    </>
  );
}
export default App;
