import React, { useEffect, useState } from "react";
import { deleteResource, fetchResource, updatePartialResource } from "../../services/resource";
import { Task } from "../../services/models/Task";
import { useToast } from "../ui/ToastProvider";
import "./TaskFilter.css";
import Loading from "../ui/Loading";
import RoundCheckbox from "../ui/RoundCheckBox/RoundCheckBox";
import { Status } from "../../services/response/TaskResponse";
import { FaTrash } from "react-icons/fa";

export default function TaskFilter() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [filter, setFilter] = useState<"concluidas" | "pendentes">("pendentes");

  const filtered = tasks.filter((t) =>
    filter === "concluidas"
      ? t.status === "concluida"
      : t.status === "nao_concluida"
  );

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchResource<Task[]>("tasks");
      setLoading(false);
      if (response) {
        setTasks(response);
      }
    } catch (error) {
      setLoading(false);
      showToast(
        "Erro inesperado ao tentar carregar as tarefas. Tente novamente mais tarde.",
        "error"
      );
    }
  };

  const concludeTask = async (task: Task) => {
    const newStatus: Status =
      task.status === "nao_concluida" ? "concluida" : "nao_concluida";

    try {
      setLoading(true);
      const response = await updatePartialResource<Task>("tasks", task.id, {
        status: newStatus,
      });

      if (response.status === 200) {
        showToast(`Status da tarefa atualizado para ${newStatus}`, "success");
        setTasks((prev) =>
          prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t))
        );
      } else {
        showToast("Não foi possível atualizar a tarefa.", "error");
      }
    } catch (error) {
      showToast("Erro ao atualizar a tarefa.", "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteTasks = async (taskId: number) => {
    try {
      setLoading(true);
      await deleteResource("tasks", taskId);
    } catch (error) {
      setLoading(false);
      showToast(
        "Erro inesperado ao tentar excluir a tarefa. Tente novamente mais tarde.",
        "error"
      );
    } finally {
      setLoading(false);
      showToast("Tarefa excluída com sucesso!", "success");
      loadTasks();
    }
  };

  return (
    <div className="taskfilter-wrapper">
      <div className="taskfilter-actionsRow">
        <div className="taskfilter-toggleWrap">
          <button
            onClick={() => setFilter("concluidas")}
            aria-pressed={filter === "concluidas"}
            className={`taskfilter-toggleButton ${
              filter === "concluidas" ? "active" : ""
            }`}
          >
            ✓ Concluídas
          </button>
          <button
            onClick={() => setFilter("pendentes")}
            aria-pressed={filter === "pendentes"}
            className={`taskfilter-toggleButton ${
              filter === "pendentes" ? "active" : ""
            }`}
          >
            Pendentes
          </button>
        </div>
      </div>

      <div className="taskfilter-list">
        {loading && <Loading />}

        {!loading && filtered.length === 0 && (
          <div className="taskfilter-emptyMessage">
            {filter === "pendentes"
              ? "Nenhuma tarefa pendente."
              : "Nenhuma tarefa concluída."}
          </div>
        )}

        {filtered.map((task) => {
          const isCompleted = task.status === "concluida";

          let priorityClass = "";
          if (task.priority === "alta")
            priorityClass = "taskfilter-priorityHigh";
          if (task.priority === "media")
            priorityClass = "taskfilter-priorityMedium";
          if (task.priority === "baixa")
            priorityClass = "taskfilter-priorityLow";

          return (
            <div
              key={task.id}
              className={`taskfilter-cardBase ${
                isCompleted
                  ? "taskfilter-completedCard"
                  : "taskfilter-pendingCard"
              }`}
            >
              {/* MOBILE TOP ROW */}
              <div className="taskfilter-mobileTopRow">
                <RoundCheckbox
                  checked={isCompleted}
                  onChange={() => concludeTask(task)}
                />

                <FaTrash
                  className="trash-icon mobile-trash"
                  onClick={() => deleteTasks(task.id)}
                />
              </div>

              {/* DESKTOP CHECKBOX */}
              <div className="taskfilter-checkboxColumn">
                <RoundCheckbox
                  checked={isCompleted}
                  onChange={() => concludeTask(task)}
                />
              </div>

              <div className="taskfilter-contentColumn">
                <div className="taskfilter-footer">
                  <div
                    className={
                      isCompleted
                        ? "taskfilter-completedTitle"
                        : "taskfilter-pendingTitle"
                    }
                  >
                    {task.title}
                  </div>

                  <div className="taskfilter-rightGroup">
                    <div className={`taskfilter-priorityBase ${priorityClass}`}>
                      Prioridade - {task.priority}
                    </div>

                    <div
                      className={
                        isCompleted
                          ? "taskfilter-dueDateBase taskfilter-dueDateCompleted"
                          : "taskfilter-dueDateBase taskfilter-dueDate"
                      }
                    >
                      Data de entrega -{" "}
                      {new Date(task.due_date).toLocaleDateString("pt-BR")}
                    </div>
                  </div>
                </div>

                <div className="taskfilter-supporting">{task.description}</div>
              </div>

              {/* DESKTOP TRASH */}
              <div className="taskfilter-trashColumn">
                <FaTrash
                  className="trash-icon"
                  onClick={() => deleteTasks(task.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
