import React from 'react';

export function Cards({ children }) {
    return <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>;
}

export function Card({ title, text, linkUrl, linkLabel = 'Open', hint }) {
    return (
        <div className="ui-card ui-cardHover">
            <div className="font-semibold text-white/95">{title}</div>
            {text ? <div className="mt-2 text-sm leading-6 text-white/70">{text}</div> : null}
            {linkUrl ? (
                <a className="ui-link mt-3 inline-block" href={linkUrl} target="_blank" rel="noreferrer">
                    {linkLabel}
                </a>
            ) : hint ? (
                <div className="mt-3 text-xs text-white/50">{hint}</div>
            ) : null}
        </div>
    );
}
