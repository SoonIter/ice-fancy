import type { FC } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import transform from '../utils/transform';

const App: FC<{ code: string }> = ({ code }) => {
  const [_code, setCode] = useSafeState('');
  useEffect(() => {
    transform(code).then((res) => {
      setCode(res)
    });
  }, [code]);
  return (
    new Function(_code)()  // eslint-disable-line
  );
}
class XSearch extends HTMLElement {
  root: ReactDOM.Root | null = null
  static get observedAttributes() {
    return ['code']
  }

  connectedCallback() {
    const mountPoint = document.createElement('div');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
    const code = this.getAttribute('code') ?? '';
    const root = ReactDOM.createRoot(mountPoint)
    this.root = root
    root.render(<App code={code} />);
  }

  attributeChangedCallback(name: string, _, newVal: string) {
    this.root?.render(<App code={newVal} />)
  }
}

customElements.define('x-search', XSearch);

