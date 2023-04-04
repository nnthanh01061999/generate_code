import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any): State {
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any): void {
        console.log({ error, errorInfo });
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
