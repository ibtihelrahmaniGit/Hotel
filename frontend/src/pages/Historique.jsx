import React, { useState } from 'react';
import './Historique.css'; 

const Historique = () => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleShowAttendance = () => {
    // Logic to fetch and display attendance data based on selectedDate
    console.log('Showing attendance for:', selectedDate);
  };

  // Sample attendance data - replace with actual data 
  const attendanceData = [
    { name: 'Rahmani', time: '09:00 AM' },

  ];

  return (
    <div className="attendance-container">
      <h1>Attendance Tracker Sheet</h1>
      
      <div className="date-selector">
        <label htmlFor="datePicker">Select Date:</label>
        <input 
          type="date" 
          id="datePicker" 
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button onClick={handleShowAttendance}>Show attendance</button>
      </div>

      <hr className="divider" />

      <div className="attendance-table">
        <h2>Attendance Data Table</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historique;