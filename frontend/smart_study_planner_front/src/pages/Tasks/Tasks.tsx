import React from "react";
import NewTaskButton from "../../components/ui/NewTaskButton/NewTaskButton";
import TaskFilter from "../../components/TaskFilter/TaskFilter";
import "./Tasks.css";

export function Tasks() {
  return (
    <div className="container-tasks">
      <div className="button-tasks">
        <h1 className="title-tasks">Tarefas</h1>
        <NewTaskButton />
      </div>
      <TaskFilter />
    </div>
  );
}
