import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./TaskTimeline.css";
import { fetchResource } from "../../services/resource";
import { useToast } from "../../components/ui/ToastProvider";
import Loading from "../../components/ui/Loading";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  status: string;
}

interface GroupedTasks {
  period: string;
  tasks: Task[];
}

export default function TaskTimeline() {
  const [groups, setGroups] = useState<GroupedTasks[]>([]);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];

  const toggleGroup = (period: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [period]: !prev[period],
    }));
  };

  const formatPeriod = (period: string) => {
    const [month, year] = period.split("-");
    const monthIndex = Number(month) - 1;
    return `${monthNames[monthIndex]}/${year}`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const weekday = date.toLocaleDateString("pt-BR", { weekday: "short" });
    const formatted = date.toLocaleDateString("pt-BR");
    return `${weekday} — ${formatted}`;
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchResource<GroupedTasks[]>("tasks-grouped");
      setLoading(false);
      if (response) {
        setGroups(response);

        // Marca todos os períodos como abertos inicialmente
        const initialOpenGroups: Record<string, boolean> = {};
        response.forEach((group) => {
          initialOpenGroups[group.period] = true;
        });
        setOpenGroups(initialOpenGroups);
      }
    } catch (error) {
      setLoading(false);
      showToast(
        "Erro inesperado ao tentar carregar as tarefas. Tente novamente mais tarde.",
        "error"
      );
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="task-timeline-wrapper">
      {loading && <Loading />}
      <h1 className="task-timeline-title">Tarefas Pendentes</h1>

      {groups.length === 0 && !loading ? (
        <div className="no-tasks-message">
          Tarefas pendentes para os próximos meses serão exibidas aqui.
        </div>
      ) : (
        groups.map((group, idx) => (
          <div key={idx} className="task-period">
            <div
              className="dropdown-toggle"
              onClick={() => toggleGroup(group.period)}
            >
              <span>{formatPeriod(group.period)}</span>
              <span className="arrow">
                {openGroups[group.period] ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>

            {openGroups[group.period] && (
              <div className="task-list">
                {group.tasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <span className="task-title">{task.title}</span>
                    <span className="task-desc">{task.description}</span>
                    <span className="task-date">
                      Prazo: {formatDate(task.due_date)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
