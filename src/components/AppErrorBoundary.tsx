import React from "react";

type AppErrorBoundaryProps = {
  children: React.ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends React.Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  constructor(props: AppErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Givebridge app crashed", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-cream px-6 py-10 flex items-center justify-center">
          <div className="max-w-xl rounded-3xl border-2 border-black/10 bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-black uppercase tracking-tight text-black">Something went wrong</h1>
            <p className="mt-3 text-sm leading-relaxed text-black/70">
              The app hit a runtime error while rendering. Refresh the page. If it still shows a blank screen,
              check the browser console for the first error.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
