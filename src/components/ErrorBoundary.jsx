import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error reporting service here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We're sorry, but there was an error loading this page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Reload Page
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded overflow-auto">
                <pre className="text-sm text-red-600 dark:text-red-400">
                  {this.state.error && this.state.error.toString()}
                </pre>
                <pre className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
