'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          style={{
            padding: '24px',
            margin: '16px 0',
            borderRadius: '8px',
            background: 'rgba(217, 79, 79, 0.04)',
            border: '1px solid rgba(217, 79, 79, 0.15)',
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-danger)', marginBottom: '4px' }}>
            <span className="en">Content failed to load</span>
            <span className="zh">內容載入失敗</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-g500)' }}>
            <span className="en">This section encountered an error. Try refreshing the page.</span>
            <span className="zh">此章節發生錯誤。請嘗試重新整理頁面。</span>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              marginTop: '8px',
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 700,
              background: 'var(--color-turquoise-500)',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <span className="en">Retry</span>
            <span className="zh">重試</span>
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
