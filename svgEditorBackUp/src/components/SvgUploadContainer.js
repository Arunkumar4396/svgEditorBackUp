import React, { useState } from "react";
import classes from "./SvgUploadContainer.module.css";
import AddIcon from "@mui/icons-material/Add";
import SvgEditor from "./SvgEditor";
import Header from "./Header";
import { UndoRedoProvider } from "../context/UndoRedoContext";
const imageMimeType = /image\/(svg)/;

const SvgUploadContainer = () => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [svgData, setSvgData] = useState(null);
  const [svgColors, setSvgColors] = useState({});

  console.log("svgColors==>", svgColors);

  const loadColors = (svgData) => {
    console.log("Load Colors Called");
    console.log("SVg Data", svgData);
    getOriginalColorFromSvg(svgData);

    console.log("SVGCOLORS==>", svgColors);
  };

  const getOriginalColorFromSvg = (svgData) => {
    return getAllSvgColors(svgData).reduce(
      (a, v) => ({
        ...a,
        [v]: v,
      }),
      {}
    );
  };

  const getAllSvgColors = (svgData) => {
    let colors = [];

    colors.push(...getColorsFromStyleFill(svgData));
    colors.push(...getColorsFromFillAttributes(svgData));

    colors = [...new Set(colors)];

    return colors;
  };

  const getColorsFromStyleFill = (svgData) => {
    let colors = [];
    if (svgData) {
      svgData.replace(/(#[abcdef0-9]{3,6})/gi, (v, c) => {
        colors.push(c);
        return v;
      });
    }
    // setColors(colors);
    setSvgColors(colors);
    return colors;
  };

  const getColorsFromFillAttributes = (svgData) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgData, "image/svg+xml");
    const elements = getAllElementsWithAttribute(doc, ["fill", "style"]);
    const colors = [];

    elements.forEach((e) => {
      const color = e.getAttribute("fill");
      if (color && color !== "none" && colors.indexOf(color) === -1) {
        colors.push(color);
      }

      const styleAttr = e.getAttribute("style");
      let color2 = null;
      if (styleAttr) {
        color2 = getColorsFromFill(styleAttr);
      }

      if (color2 && colors.indexOf(color2) === -1) {
        colors.push(color2);
      }
    });

    return colors;
  };

  const getAllElementsWithAttribute = (doc, [fill, style]) => {
    let matchingElements = [];
    let allElements = doc.getElementsByTagName("*");

    for (let i = 0, n = allElements.length; i < n; i++) {
      if (
        allElements[i].getAttribute(fill) ||
        allElements[i].getAttribute(style)
      ) {
        matchingElements.push(allElements[i]);
      }
    }

    return matchingElements;
  };

  const getColorsFromFill = (inputString) => {
    let res = null;
    if (inputString) {
      inputString.replace(/(#[abcdef0-9]{3,6})/gi, (v, c) => {
        res = c;
        return v;
      });
    }
    return res;
  };

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Please Select SVG file");
      return;
    }
    setFile(file);
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setSvgData(result);
          loadColors(result);
        }
      };

      fileReader.readAsText(file);
    }
  };
  return (
    <>
      {!fileDataURL && (
        <>
          <Header />
          <div className={classes.container}>
            <div className={classes.upload}>
              <label htmlFor="inputTag">
                Drop your SVG here <br />
                <AddIcon className={classes.Icon} />
                <input
                  id="inputTag"
                  type="file"
                  accept=".svg"
                  onChange={changeHandler}
                />
                <br />
              </label>
            </div>
          </div>
        </>
      )}

      {fileDataURL && (
        <>
          <UndoRedoProvider>
            <SvgEditor
              fileDataURL={fileDataURL}
              svgData={svgData}
              file={file}
              colors={svgColors}
            />
          </UndoRedoProvider>
        </>
      )}
    </>
  );
};

export default SvgUploadContainer;
