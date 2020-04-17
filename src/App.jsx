import React from "react";

import { Provider } from "react-redux";
import store from "./store";

import TodoApp from "./components/TodoApp";
import Center from "./components/Center/Center";
import Container from "./components/Container/Container";

const App = () => {
  return (
    <Provider store={store}>
      <Container color="#f9fbfc">
        <Center>
          <TodoApp title="Todo App" />
        </Center>
      </Container>
    </Provider>
  );
};

export default App;
