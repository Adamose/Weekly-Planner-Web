import { useState } from 'react'
import AddTask from './components/AddTask.jsx'
import Nav from './components/Nav.jsx'
import TasksCard from './components/TasksCard.jsx'
import DayContainer from './components/DayContainer.jsx'
import Header from './components/Header.jsx'

function App() {

    return (
        <>
            <Header />
            <Nav />
            <AddTask />
            <DayContainer/>
        </>
    );
}

export default App;