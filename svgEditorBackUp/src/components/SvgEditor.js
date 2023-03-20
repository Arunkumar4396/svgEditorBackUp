import React, { useState } from "react";
import classes from "./SvgEditor.module.css";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Header from "./Header";
import ColorPickerComponent from "./ColorPickerComponent";
import { useContext } from "react";
import { UndoRedoContext } from "../context/UndoRedoContext";
import { useEffect } from "react";
const SvgEditor = (props) => {
  const useUndoRedo = useContext(UndoRedoContext);
  const [initialState, setInitialState] = useState({
    originalSvg: props.svgData,
    colors: props.colors,
    svgUrl: props.fileDataURL,
    updatedsvgData: props.svgData,
  });
  useEffect((e) => {
    handleColorChange();
  }, []);

  useUndoRedo.state = initialState;

  let updatedSvg = null;

  const handleColorChange = (key, value) => {
    console.log("Handle COlor Change Called");
    let mapData = { key: key, value: value };
    useUndoRedo.execute(
      () => updatedSvg(initialState.updatedsvgData, mapData),
      () => updatedSvg(initialState.updatedsvgData, mapData)
    );
  };

  updatedSvg = (inputString, colorMap) => {
    return replaceALlStringColor(inputString, colorMap);
  };

  const replaceALlStringColor = (svgString, colorMap) => {
    svgString = svgString.split(colorMap.key).join(colorMap.value);
    let newColors = [...initialState.colors];
    var index = newColors.indexOf(colorMap.key);

    if (index !== -1) {
      newColors[index] = colorMap.value;
    }

    setInitialState({
      ...initialState,
      svgUrl: svgToBase64(svgString),
      updatedsvgData: svgString,
      colors: newColors,
    });

    return svgString;
  };

  const handleExport = () => {
    downloadSVGAsText(initialState.updatedsvgData);
  };

  const downloadSVGAsText = (svg) => {
    const a = document.createElement("a");
    const e = new MouseEvent("click");
    a.download = "download.svg";
    a.href = svgToBase64(svg);
    a.dispatchEvent(e);
  };

  const svgToBase64 = (svgData) => {
    return "data:image/svg+xml;base64," + window.btoa(svgData);
  };

  return (
    <div className={classes.SvgEditor}>
      <>
        <Header />
        <div
          className={classes.editFullBody}
          style={{ backgroundColor: "lightpink" }}
        >
          <div className={classes.sideBar} style={{ backgroundColor: "white" }}>
            {initialState.colors &&
              initialState.colors.map((col, index) => (
                <ColorPickerComponent
                  key={index}
                  colors={col}
                  handleColorChange={(value, color) =>
                    handleColorChange(color, value)
                  }
                ></ColorPickerComponent>
              ))}
          </div>
          <div
            className={classes.centerBody}
            style={{ backgroundColor: "lightblue" }}
          >
            <div className={classes.buttonGroup}>
              <button className={classes.button} onClick={handleExport}>
                <FileDownloadIcon className={classes.downloadIcon} />
                Download Svg
              </button>

              <button className={classes.button} onClick={useUndoRedo.undo}>
                Undo
              </button>
              <button className={classes.button} onClick={useUndoRedo.redo}>
                Redo
              </button>
            </div>

            <div className={classes.ImageContainer}>
              <img
                src={initialState.svgUrl}
                alt="svg data"
                className={classes.fileDataURL}
                height="300"
                width="300"
              />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SvgEditor;
