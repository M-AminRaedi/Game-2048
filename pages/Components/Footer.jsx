export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "0.5px",
        padding: "1.2rem 0",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        textAlign: "center",
        color: "#6b7280",
        fontSize: "0.9rem",
      }}
    >
      <p
        style={{
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "6px",
          flexWrap: "wrap",
        }}
      >
        Crafted with <span style={{ color: "#ef4444" }}>❤️</span> by{" "}
        <strong style={{ color: "#111827" }}>Mohammad Amin Raedi</strong>
        <span style={{ opacity: 0.7 }}>
          • Frontend Developer (React & Next.js)
        </span>
      </p>
    </footer>
  );
}
