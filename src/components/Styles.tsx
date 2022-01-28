import React from 'react';
import css from '../lib/css';

export const Styles = () => {
  return (
    <style>
      {css`
        * {
          font-family: Inter, Helvetica, Segoe UI, Arial, sans-serif !important;
        }

        .type-icon {
          color: #3fad33;
        }

        .icon-button {
          border: 0;
        }

        .branches {
          font-size: 85%;
        }

        .pr-state {
          display: inline-block;
          font-size: 12px;
          background-color: #aaa;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          text-transform: capitalize;
        }
        .pr-state-opened {
          color: var(--theme-green-text);
          background-color: var(--theme-green-background);
        }
        .pr-state-merged {
          color: #463159;
          background-color: #e5dced;
        }
        .pr-state-closed {
          color: var(--theme-red-text);
          background-color: var(--theme-red-background);
        }
        .pr-state-draft {
          color: #0b0b0b;
          background-color: #b8c0c9;
        }

        .pr-label {
          font-size: 12px;
          white-space: nowrap;
        }

        .pr-reviews-icon {
          color: var(--aha-gray-700);
        }

        .approved .pr-reviews-icon {
          color: var(--theme-green-text);
        }

        .changes_requested .pr-reviews-icon {
          color: var(--theme-red-text);
        }

        .pr-reviews-tooltip {
          border: 1px solid var(--theme-primary-border);
          background: var(--theme-primary-background);
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
          z-index: 1000;
          font-size: 12px;
          padding: 8px;
          margin-top: 4px;
        }

        .pr-status {
          cursor: pointer;
          white-space: nowrap;
        }

        .pr-checks {
          font-size: 12px;
          z-index: 1000;
          background: var(--theme-primary-background);
          border: 1px solid var(--theme-primary-border);
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          padding: 15px;
        }

        .pr-check-detail {
          margin-bottom: 2px;
        }

        .pr-icon {
          margin-right: 3px;
        }

        .pr-count {
          color: var(--theme-tertiary-text);
        }

        .hidden {
          opacity: 0;
          visibility: hidden;
        }

        .pr-check {
          vertical-align: middle;
        }
        .pr-check-icon {
          width: 16px;
          display: flex;
          justify-content: center;
        }
        .pr-check-avatar {
          width: 16px;
          display: flex;
          justify-content: center;
        }
        .pr-check-avatar img {
          max-width: 14px;
          max-height: 14px;
        }
        .pr-check-error,
        .pr-check-failure {
          color: var(--aha-red-600);
        }
        .pr-check-expected,
        .pr-check-pending {
          color: var(--aha-yellow-600);
        }
        .pr-check-success {
          color: var(--aha-green-600);
        }
        .sections {
          background-color: var(--theme-secondary-background);
          display: flex;
          padding: 16px;
          gap: 18px;
          flex-wrap: wrap;
        }

        .sections section {
          background: var(--theme-primary-background);
          border: 1px solid var(--theme-primary-border);
          box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          min-height: 100px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          flex-shrink: 1;
          max-width: 800px;
        }

        .sections h2 {
          border-bottom: 1px solid var(--theme-primary-border);
          padding: 15px 21px;
          margin: 0;

          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 18px;
          color: var(--theme-primary-text);
        }

        .sections .subsection {
          padding: 21px 26px;
        }

        .sections h3 {
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 21px;
        }

        .record-table--feature-link {
          font-size: 90%;
          color: var(--theme-tertiary-text);
          padding-left: 5px;
        }

        .record-table--feature-link .bottom-left {
          margin-right: 3px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-left: 1px solid var(--theme-tertiary-text);
          border-bottom: 1px solid var(--theme-tertiary-text);
          position: relative;
          top: 2px;
        }

        .record-table--feature-link a {
          color: var(--theme-tertiary-text);
        }
      `}
    </style>
  );
};
