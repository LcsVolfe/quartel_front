import './App.css';
import AppNavigator from "./AppNavigator";
import {Provider} from "react-redux";
import {initStore} from "./store";

const store = initStore();

const App = () => {
  return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
  );
}

export default App;
