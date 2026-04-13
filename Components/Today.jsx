"use client"
import TaskHeader from '@/Components/Heading';
import DateStrip from '@/Components/Datestrip';
import TaskList from '@/Components/Tasklist';
import { useState } from 'react';

const Today = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    // 'h-screen' aur 'overflow-hidden' bahar wali dandi ko gayab kar dega
    <div className="flex-1 h-screen flex flex-col bg-white overflow-hidden">

      {/* Upper Section (Fixed rahega) */}
      <div className="p-10 pb-4">
        <TaskHeader           selectedDate={selectedDate}
/>
        <DateStrip
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>

      {/* Task Section (Sirf ye scroll hoga) */}
      {/* 'custom-scrollbar' class use karke dandi ko patla/sundar banayenge */}
      <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
        <TaskList selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      </div>

    </div>
  );
};

export default Today;