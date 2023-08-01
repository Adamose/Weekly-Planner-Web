import DayContainer from "./planner-section/DayContainer.jsx";
import TasksContainer from "./tasks-section/TasksContainer.jsx";
import TaskModal from "./TaskModal.jsx";

function Main() {
    return (
        <main>
            <DayContainer />
            <TasksContainer />
            <TaskModal />
        </main>
    );
}

export default Main;