"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            background: "#fff",
            color: "#1e293b",
            fontFamily: "system-ui, sans-serif",
            textAlign: "center",
            gap: "1rem",
          }}
        >
          <h1 style={{ fontSize: 20, fontWeight: 700, color: "#dc2626" }}>
            Something went wrong
          </h1>
          <p style={{ color: "#666", maxWidth: 480, lineHeight: 1.5 }}>
            An unexpected error occurred. Please try refreshing the page.
          </p>
          {this.state.error ? (
            <details style={{ maxWidth: 600, width: "100%", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", color: "#999", fontSize: 12 }}>
                Technical details
              </summary>
              <pre
                style={{
                  marginTop: 8,
                  padding: 12,
                  borderRadius: 8,
                  background: "#f8fafc",
                  border: "1px solid #e0e0e0",
                  color: "#991b1b",
                  fontSize: 11,
                  overflow: "auto",
                  maxHeight: 200,
                }}
              >
                {this.state.error.message}
                {"\n"}
                {this.state.error.stack}
              </pre>
            </details>
          ) : null}
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              border: "1px solid #d1d5db",
              background: "#2563eb",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
