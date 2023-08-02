import PlannerSection from "./planner-section/PlannerSection.jsx";
import TasksSection from "./tasks-section/TasksSection.jsx";
import TaskModal from "./TaskModal.jsx";

function Main() {
    return (
        <main>
            <PlannerSection />
            <TasksSection />
            <TaskModal />
        </main>
    );
}

export default Main;