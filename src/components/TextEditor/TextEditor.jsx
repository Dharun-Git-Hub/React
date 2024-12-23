import React, { useEffect } from "react";
import "./TextEditor.css";

const TextEditor = () => {
  useEffect(() => {
    const optionsButtons = document.querySelectorAll(".option-button");
    const advancedOptionButton = document.querySelectorAll(".adv-option-button");
    const fontName = document.getElementById("fontName");
    const fontSizeRef = document.getElementById("fontSize");
    const linkButton = document.getElementById("createLink");
    const alignButtons = document.querySelectorAll(".align");
    const spacingButtons = document.querySelectorAll(".spacing");
    const formatButtons = document.querySelectorAll(".format");
    const scriptButtons = document.querySelectorAll(".script");

    const fontList = [
      "Arial",
      "Verdana",
      "Times New Roman",
      "Garamond",
      "Georgia",
      "Courier New",
      "Cursive",
    ];

    // Initialize the editor
    const initializer = () => {
      highlighter(alignButtons, true);
      highlighter(spacingButtons, true);
      highlighter(formatButtons, false);
      highlighter(scriptButtons, true);

      fontList.forEach((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
      });

      for (let i = 1; i <= 7; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
      }

      fontSizeRef.value = 3;
    };

    const modifyText = (command, defaultUi, value) => {
      document.execCommand(command, defaultUi, value);
    };

    optionsButtons.forEach((button) => {
      button.addEventListener("click", () => {
        modifyText(button.id, false, null);
      });
    });

    advancedOptionButton.forEach((button) => {
      button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
      });
    });

    linkButton.addEventListener("click", () => {
      let userLink = prompt("Enter a URL?");
      if (/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
      } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
      }
    });

    const highlighter = (className, needsRemoval) => {
      className.forEach((button) => {
        button.addEventListener("click", () => {
          if (needsRemoval) {
            let alreadyActive = false;
            if (button.classList.contains("active")) {
              alreadyActive = true;
            }
            highlighterRemover(className);
            if (!alreadyActive) {
              button.classList.add("active");
            }
          } else {
            button.classList.toggle("active");
          }
        });
      });
    };

    const highlighterRemover = (className) => {
      className.forEach((button) => {
        button.classList.remove("active");
      });
    };

    initializer();
  }, []);

  return (
    <div className="container">
      <div className="options">
        <button id="bold" className="option-button format">
          <i className="fa-solid fa-bold"></i>
        </button>
        <button id="superscript" className="option-button script">
          <i className="fa-solid fa-superscript"></i>
        </button>
        <button id="subscript" className="option-button script">
          <i className="fa-solid fa-subscript"></i>
        </button>
        <button id="insertOrderedList" className="option-button">
          <i className="fa-solid fa-list-ol"></i>
        </button>
        <button id="insertUnorderedList" className="option-button">
          <i className="fa-solid fa-list"></i>
        </button>
        <button id="undo" className="option-button">
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button id="redo" className="option-button">
          <i className="fa-solid fa-rotate-right"></i>
        </button>
        <button id="createLink" className="adv-option-button">
          <i className="fa fa-link"></i>
        </button>
        <button id="unlink" className="option-button">
          <i className="fa fa-unlink"></i>
        </button>
        <button id="justifyLeft" className="option-button align">
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button id="justifyCenter" className="option-button align">
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button id="justifyRight" className="option-button align">
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button id="justifyFull" className="option-button align">
          <i className="fa-solid fa-align-justify"></i>
        </button>
        <button id="indent" className="option-button spacing">
          <i className="fa-solid fa-indent"></i>
        </button>
        <button id="outdent" className="option-button spacing">
          <i className="fa-solid fa-outdent"></i>
        </button>
        <select id="formatBlock" className="adv-option-button">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        <select id="fontName" className="adv-option-button"></select>
        <select id="fontSize" className="adv-option-button"></select>
        <div className="input-wrapper">
          <input type="color" id="foreColor" className="adv-option-button" />
          <label htmlFor="foreColor">Font Color</label>
        </div>
        <div className="input-wrapper">
          <input type="color" id="backColor" className="adv-option-button" />
          <label htmlFor="backColor">Highlight Color</label>
        </div>
      </div>
      <div id="text-input" contentEditable="true"></div>
    </div>
  );
};

export default TextEditor;