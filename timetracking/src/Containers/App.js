import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React from "react";
import Router from "../Containers/Router";
import themeObject from "../Helpers/theme";

const theme = createMuiTheme(themeObject);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Router />
      </div>
    </MuiThemeProvider>
  );
};
export default App;
