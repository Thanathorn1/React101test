import React from "react";

type Subject = {
  id: number;
  name: string;
  grade: string;
};

type SubjectItemProps = {
  subject: Subject;
  onDelete: (id: number) => void;
};

const SubjectItem: React.FC<SubjectItemProps> = ({ subject, onDelete }) => {
  return (
    <tr className={subject.grade === "F" ? "fail" : ""}>
      <td>{subject.name}</td>
      <td>{subject.grade}</td>
      <td>
        <button className="delete-btn" onClick={() => onDelete(subject.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default SubjectItem;
