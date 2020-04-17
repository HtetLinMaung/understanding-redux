import React, { useEffect } from "react";
import axios from "axios";
import { api_domain } from "../configs.json";

import { connect } from "react-redux";
import {
  fetchTodos,
  toggleHideComplete,
  toggleCompleteAll,
  setTodoText,
  filterTodos,
} from "../actions/todoActions";

import Card from "./Card/Card";
import Text from "./Text/Text";
import TodoList from "./TodoList";
import Flex from "./Flex/Flex";
import SwitchControl from "./SwitchControl/SwitchControl";
import Checkbox from "./Checkbox/Checkbox";
import Textfield from "./Textfield/Textfield";

const TodoApp = ({
  title,
  fetchTodos,
  hideComplete,
  toggleHideComplete,
  completeAll,
  toggleCompleteAll,
  setTodoText,
  filterTodos,
  addTodoText,
}) => {
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const reload = (callback = () => {}) => {
    if (hideComplete) {
      fetchTodos("completed=false", callback);
    } else {
      fetchTodos("", callback);
    }
  };

  const onSwitchHandle = (e) => {
    toggleHideComplete();
    if (e.target.checked) {
      fetchTodos("completed=false");
    } else {
      fetchTodos();
    }
  };

  const onCompleteAll = (e) => {
    toggleCompleteAll();
    axios
      .patch(`${api_domain}todos/complete-all`, {
        completed: e.target.checked,
      })
      .then(() => reload())
      .catch((err) => alert(err));
  };

  const onPressEnter = (e) => {
    if (e.key === "Enter") {
      axios
        .post(`${api_domain}todos`, { title: addTodoText })
        .then(() => {
          reload();
          setTodoText("");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Card>
      <Text title justify="center">
        {title}
      </Text>
      <Flex>
        <Flex flex="1"></Flex>
        <Flex>
          <SwitchControl
            checked={hideComplete}
            handleClick={onSwitchHandle}
            label="Hide Completed"
          />
        </Flex>
      </Flex>
      <Flex align="center">
        <Flex>
          <Checkbox
            size="20"
            label="Complete All"
            checked={completeAll}
            handleClick={onCompleteAll}
          />
        </Flex>
        <Flex flex={1}>
          <Textfield
            value={addTodoText}
            handleInput={(e) => {
              setTodoText(e.target.value);
              filterTodos(e.target.value);
            }}
            handleKeyPress={onPressEnter}
            rounded
            placeholder="Search Or Add Todos here..."
            height="40px"
          />
        </Flex>
      </Flex>
      <TodoList reload={reload} />
    </Card>
  );
};

const mapStateToProps = (state, ownProps) => {
  const { hideComplete, completeAll, addTodoText } = state.todoReducer;
  return { title: ownProps.title, hideComplete, completeAll, addTodoText };
};

const mapDispatchToProps = {
  fetchTodos,
  toggleHideComplete,
  toggleCompleteAll,
  setTodoText,
  filterTodos,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
