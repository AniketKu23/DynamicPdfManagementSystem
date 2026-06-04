import { Component, ErrorInfo, ReactNode } from "react";

type State = { hasError: boolean };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-950">
          <div>
            <h1 className="text-lg font-semibold text-slate-950 dark:text-white">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Refresh the page or check the API connection.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
