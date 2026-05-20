import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function normalize(text) {
    return (text || '').toLowerCase().trim();
}

export default function TopicsPage({ content }) {
    const [query, setQuery] = useState('');
    const sections = content?.sections || [];

    const filtered = useMemo(() => {
        const normalizedQuery = normalize(query);
        if (!normalizedQuery) return sections;
        return sections.filter(s => normalize(s.title).includes(normalizedQuery) || normalize(s.body).includes(normalizedQuery));
    }, [query, sections]);

    return (
        <div className="ui-page">
            <div className="ui-surface">
                <div className="ui-kicker">Browse</div>
                <div className="mt-2 text-2xl font-extrabold tracking-tight">Topics</div>
                <div className="mt-1 text-sm text-white/70">Search and open any topic page.</div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search topics..."
                        className="ui-input"
                    />
                    <button onClick={() => setQuery('')} className="ui-btn">
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {filtered.map(s => (
                    <div key={s.id} className="ui-card ui-cardHover">
                        <div className="font-semibold text-white/95">{s.title}</div>
                        <div className="mt-2 line-clamp-3 text-sm leading-6 text-white/70">
                            {s.body || 'Open to view details.'}
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                            <Link className="ui-btn ui-btnPrimary" to={`/topic/${s.id}`}>
                                Open
                            </Link>
                            <div className="truncate text-xs text-white/50">/topic/{s.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
