import React from 'react';

export function Cards({ children }) {
    return <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>;
}

export function Card({ title, text, linkUrl, linkLabel = 'Open', hint }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-semibold">{title}</div>
            {text ? <div className="mt-2 text-sm text-white/70">{text}</div> : null}
            {linkUrl ? (
                <a className="mt-3 inline-block text-sm text-[#7cf0ff]" href={linkUrl} target="_blank" rel="noreferrer">
                    {linkLabel}
                </a>
            ) : hint ? (
                <div className="mt-3 text-xs text-white/50">{hint}</div>
            ) : null}
        </div>
    );
}
