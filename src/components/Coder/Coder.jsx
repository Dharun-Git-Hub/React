import React, { useState, useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import "./Coder.css";
import { assets } from '../../assets/assets';

const Coder = () => {
  const livePreviewRef = useRef(null);
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);
  const [ isDarc, setDarc ] = useState(false);

  useEffect(() => {
  const initializeLivePreview = () => {
    const iframe = livePreviewRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.body.innerHTML = "";
    const styleElement = document.createElement("style");
    styleElement.setAttribute("id", "live-preview-style");
    doc.head.appendChild(styleElement);

    const pagedJsScript = document.createElement("script");
    pagedJsScript.src = "https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js";
    doc.head.appendChild(pagedJsScript);
  };

  const initializeCodeEditors = () => {
    const defaultOptions = (overrides) => ({
      lineNumbers: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      theme: isDarc ? "panda-syntax" : "mdn-like",
      ...overrides,
    });

    htmlEditorRef.current.CodeMirror = CodeMirror(htmlEditorRef.current, defaultOptions({ mode: "text/html", value: "" }));
    cssEditorRef.current.CodeMirror = CodeMirror(cssEditorRef.current, defaultOptions({ mode: "css", value: "" }));
    jsEditorRef.current.CodeMirror = CodeMirror(jsEditorRef.current, defaultOptions({ mode: "javascript", value: "" }));

    htmlEditorRef.current.CodeMirror.on("change", () => {
      const iframe = livePreviewRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.body.innerHTML = htmlEditorRef.current.CodeMirror.getValue();
    });

    cssEditorRef.current.CodeMirror.on("change", () => {
      const iframe = livePreviewRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const styleElement = doc.getElementById("live-preview-style");
      styleElement.innerHTML = cssEditorRef.current.CodeMirror.getValue();
    });

    jsEditorRef.current.CodeMirror.on("change", () => {
      const iframe = livePreviewRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const scriptElement = document.createElement("script");
      scriptElement.innerHTML = jsEditorRef.current.CodeMirror.getValue();
      doc.body.appendChild(scriptElement);
    });
  };

  initializeLivePreview();
  initializeCodeEditors();
}, []);

useEffect(() => {
  const updateTheme = () => {
    const theme = isDarc ? "panda-syntax" : "mdn-like";
    if (htmlEditorRef.current?.CodeMirror) {
      htmlEditorRef.current.CodeMirror.setOption("theme", theme);
    }
    if (cssEditorRef.current?.CodeMirror) {
      cssEditorRef.current.CodeMirror.setOption("theme", theme);
    }
    if (jsEditorRef.current?.CodeMirror) {
      jsEditorRef.current.CodeMirror.setOption("theme", theme);
    }
  };
  updateTheme();
}, [isDarc]);

  return (
    <div className="container">
      <div className="header">
        <div className="title">
          <div className="main-title">Live Code Editor
          <img src={assets.moon_icon} onClick={() => setDarc(prev=>!prev) } />
          </div>
        </div>
      </div>

      <div className="code-box">
        <div className="editor" id="html" ref={htmlEditorRef}></div>
        <div className="editor" id="css" ref={cssEditorRef}></div>
        <div className="editor" id="js" ref={jsEditorRef}></div>
      </div>

      <div className="preview">
        <iframe id="live-preview" ref={livePreviewRef}></iframe>
      </div>
    </div>
  );
};

export default Coder;