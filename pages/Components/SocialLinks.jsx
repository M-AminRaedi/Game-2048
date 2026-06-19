import Link from "next/link";

export default function SocialLinks() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "1rem",
        padding: "1rem",
        color: "#6b7280",
        fontSize: "0.95rem",
      }}
    >
      <p style={{ margin: 0, lineHeight: "1.8" }}>
        View my projects and connect with me on{" "}
        <Link
          href="https://github.com/M-AminRaedi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#111827",
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "1px solid rgba(17,24,39,0.2)",
          }}
        >
          GitHub
        </Link>{" "}
        and{" "}
        <Link
          href="https://www.linkedin.com/in/m-aminreadi"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#0a66c2",
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "1px solid rgba(10,102,194,0.3)",
          }}
        >
          LinkedIn
        </Link>
        .
      </p>
    </div>
  );
}
