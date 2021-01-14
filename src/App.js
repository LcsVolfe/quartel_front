import './App.css';
import AppNavigator from "./AppNavigator";
import {Provider} from "react-redux";
import {initStore} from "./store";
import { ThemeProvider } from '@material-ui/core/styles';
import {theme} from "./components/template/presentation/theme";
const store = initStore();

const App = () => {
  return (
      <Provider store={store}>
          <ThemeProvider theme={theme}>
                <AppNavigator />
          </ThemeProvider>
      </Provider>
  );
}

export default App;
