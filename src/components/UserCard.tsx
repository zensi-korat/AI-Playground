import { useCallback, CSSProperties } from "react";
import { formatUser } from "../utils/formatUser";

interface UserCardProps {
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export default function UserCard({
  name,
  email,
  role,
  isActive,
}: UserCardProps) {
  const containerStyle: CSSProperties = {
    border: "1px solid #ddd",
    borderRadius: 8,
    padding: 16,
    margin: 12,
    maxWidth: 360,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  };

  const headerStyle: CSSProperties = {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
  };

  const labelStyle: CSSProperties = {
    display: "inline-block",
    width: 72,
    color: "#555",
  };

  const statusStyle: CSSProperties = {
    marginTop: 8,
    padding: "4px 8px",
    borderRadius: 12,
    display: "inline-block",
    backgroundColor: isActive ? "#e6ffed" : "#f5f5f5",
    color: isActive ? "#046b2e" : "#666",
  };

  const fakeButtonStyle: CSSProperties = {
    marginTop: 12,
    display: "inline-block",
    padding: "8px 12px",
    backgroundColor: "#0070f3",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  };

  const handleContact = useCallback(() => {
    alert("Contact action");
  }, []);

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>{formatUser(name)}</h3>
      <p>
        <span style={labelStyle}>Email</span>
        <a href={`mailto:${email}`}>{email}</a>
      </p>
      <p>
        <span style={labelStyle}>Role</span>
        <span>{role}</span>
      </p>
      <div style={statusStyle} role="status" aria-live="polite">
        {isActive ? "Active" : "Inactive"}
      </div>

      <button style={fakeButtonStyle} onClick={handleContact}>
        Contact
      </button>
    </div>
  );
}
