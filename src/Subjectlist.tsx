import React, { useState } from "react";
import SubjectItem from "./SubjectItem";
import "./index.css";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

const gradePoints: Record<string, number> = {
  A: 4.0,
  "B+": 3.5,
  B: 3.0,
  "C+": 2.5,
  C: 2.0,
  "D+": 1.5,
  D: 1.0,
  F: 0.0,
  W: 0.0,
};

const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [grade, setGrade] = useState("A");
  const [gpa, setGpa] = useState<number | null>(null);

  const addSubject = () => {
    if (!subjectName.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name: subjectName, grade }]);
    setSubjectName("");
  };

  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  const calculateGPA = () => {
    const validSubjects = subjects.filter((s) => s.grade !== "W");
    if (validSubjects.length === 0) {
      setGpa(0);
      return;
    }
    const total = validSubjects.reduce((sum, s) => sum + gradePoints[s.grade], 0);
    setGpa(total / validSubjects.length);
  };

  return (
    <div className="mj-container">
      <h1>📘 Maejo Subject Manager</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter subject name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          {Object.keys(gradePoints).map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={addSubject}>
          Add Subject
        </button>
      </div>

      <table className="subject-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Grade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((s) => (
            <SubjectItem key={s.id} subject={s} onDelete={removeSubject} />
          ))}
        </tbody>
      </table>

      <button className="gpa-btn" onClick={calculateGPA}>
        Calculate GPA
      </button>

      {gpa !== null && <div className="gpa-result">🎓 GPA: <b>{gpa.toFixed(2)}</b></div>}
    </div>
  );
};

export default SubjectList;
