import classes from "./App.module.css";
import SvgUploadContainer from "./components/SvgUploadContainer";

function App() {
  return (
    <div className={classes.AppContainer}>
      <SvgUploadContainer />
    </div>
  );
}

export default App;
