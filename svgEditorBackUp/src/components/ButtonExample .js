import React from "react";
import { ChromePicker } from "react-color";

class ButtonExample extends React.Component {
  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    console.log("button clicked");
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  col = this.props.colors;

  render() {
    const popover = {
      position: "absolute",
      zIndex: "2",
    };
    const cover = {
      position: "fixed",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    };
    return (
      <div>
        <button
          style={{ color: `"${this.props.colors[0]}"` }}
          onClick={this.handleClick}
        >
          {this.props.colors.map((col) => (
            <h1 key={col}>{col}</h1>
          ))}
        </button>
        {this.state.displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={this.handleClose} />
            <ChromePicker color={this.props.colors} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ButtonExample;
