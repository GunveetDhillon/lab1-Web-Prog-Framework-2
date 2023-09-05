import React, { useState } from 'react';
import './styles.css';

type TaskList = {
  title: string;
  tasks: string[];
  id: number;
};

type TaskProps = {
  task: string;
  onDelete: () => void;
};

const Task: React.FC<TaskProps> = ({ task, onDelete }) => {
  return (
    <div>
      {task}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

type TaskListProps = {
  taskList: TaskList;
  onDeleteTask: (taskId: number, taskIndex: number) => void;
  onAddTask: (taskId: number, newTask: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ taskList, onDeleteTask, onAddTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      onAddTask(taskList.id, newTask);
      setNewTask('');
    }
  };

  return (
    <div className="task-list-container">
      <h2>{taskList.title}</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} className="add-button">Add Task</button>
      </div>
      {taskList.tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={() => onDeleteTask(taskList.id, index)}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [taskList, setTaskList] = useState<TaskList[]>([
    {
      title: 'Humber',
      tasks: ['Task 1', 'Task 2', 'Task 3'],
      id: 1,
    },
    {
      title: 'MERN',
      tasks: ['Lab', 'Project', 'Quiz'],
      id: 2,
    },
    {
      title: 'Java',
      tasks: ['Group Discussion', 'Exam', 'Assignment'],
      id: 3,
    },
  ]);

  const onDeleteTask = (taskId: number, taskIndex: number) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.forEach((task, index) => {
      if (task.id === taskId) {
        task.tasks.splice(taskIndex, 1);
      }
    });
    setTaskList(updatedTaskList);
  };

  const onAddTask = (taskId: number, newTask: string) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.forEach((task, index) => {
      if (task.id === taskId) {
        task.tasks.push(newTask);
      }
    });
    setTaskList(updatedTaskList);
  };

  return (
    <div>
      <h1>Task List</h1>
      <p>Total Number of Tasks: {taskList.reduce((total, task) => total + task.tasks.length, 0)}</p>
      {taskList.map((task) => (
        <TaskList
          key={task.id}
          taskList={task}
          onDeleteTask={onDeleteTask}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
};

export default App;
