import React from "react";
import { ChromePicker } from "react-color";
import reactCSS from "reactcss";

class ColorPickerComponent extends React.Component {
  state = {
    viewPicker: false,
    color: {
      rgb: {
        r: 33,
        b: 143,
        g: 34,
        a: 1,
      },
      hex: this.props.colors,
      hsl: {
        a: 1,
        h: 239,
        l: 0,
        s: 5,
      },
    },
  };

  handleOnClick = () => {
    console.log("COLOR PICKER COMPONENT CLICKED");
    this.setState({
      viewPicker: !this.state.viewPicker,
    });
  };

  handleOnClose = () => {
    this.setState({
      viewPicker: false,
    });
  };

  handleOnChange = (color) => {
    this.setState({
      color: {
        rgb: color.rgb,
        hex: color.hex,
        hsl: color.hsl,
      },

      val: true,
    });

    // this.getHexCode(this.state.color);
    // Passing the selected color to parent component
    setTimeout(() => {
      // SetTimeout added to update color correctly
      this.getHexCode(this.state.color, this.props.colors);
    });
  };

  getHexCode = (value, color) => {
    this.props.handleColorChange(value.hex, color);
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: "30px",
          height: "30px",
          borderRadius: "15px",
          border: "1px solid black",

          // background: `rgba(${this.state.color.rgb.r}, ${this.state.color.rgb.g}, ${this.state.color.rgb.b}, ${this.state.color.rgb.a})`,
          background: this.state.color.hex,
        },
        swatch: {
          padding: "10px",
          // background: "white",
          // borderRadius: "2px",
          // boxShadow: "0 0 0 1px rgba(0,0,0,.2)",
          cursor: "pointer",
          display: "flex",
        },
        cover: {
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
        },
        popover: {
          position: "absolute",
          zIndex: "4",
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleOnClick}>
          <div style={styles.color} />
        </div>
        {this.state.viewPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleOnClose} />
            <ChromePicker
              color={this.state.color.hex}
              onChange={this.handleOnChange}
              getHexCode={this.getHexCode}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ColorPickerComponent;
