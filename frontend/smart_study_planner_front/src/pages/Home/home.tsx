import React from 'react';
import HomeCarousel from '../../components/ui/Carousel/Carousel';
import TaskFilter from '../../components/TaskFilter/TaskFilter';
import "./style.css"; 
import NewNoteButton from '../../components/ui/NewNoteButton/NewNoteButton';
import NewTaskButton from '../../components/ui/NewTaskButton/NewTaskButton';

export function Home() {
  return (
    <div>
      <div className="content">
        <div className="carousel">
          <HomeCarousel/>
        </div>
        <div className="addButtons">
          <NewNoteButton/>
          <NewTaskButton/>
        </div>
        <TaskFilter />
      </div>
    </div>
  );
}
