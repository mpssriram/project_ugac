import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function normalize(s) {
    return (s || '').toLowerCase().trim();
}

export default function TopicsPage({ content }) {
    const [q, setQ] = useState('');
    const sections = content?.sections || [];

    const filtered = useMemo(() => {
        const nq = normalize(q);
        if (!nq) return sections;
        return sections.filter(s => normalize(s.title).includes(nq) || normalize(s.body).includes(nq));
    }, [q, sections]);

    return (
        <div className="ui-page">
            <div className="ui-surface">
                <div className="text-2xl font-extrabold tracking-tight">Topics</div>
                <div className="mt-1 text-sm text-white/70">Search and open any topic page.</div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search topics…"
                        className="ui-input"
                    />
                    <button
                        onClick={() => setQ('')}
                        className="ui-btn"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {filtered.map(s => (
                    <div key={s.id} className="ui-card ui-cardHover">
                        <div className="font-semibold text-white/95">{s.title}</div>
                        <div className="mt-2 line-clamp-3 text-sm text-white/70">{s.body || 'Open to view details.'}</div>
                        <div className="mt-3 flex items-center gap-2">
                            <Link
                                className="ui-btn ui-btnPrimary"
                                to={`/topic/${s.id}`}
                            >
                                Open
                            </Link>
                            <div className="text-xs text-white/50">/topic/{s.id}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
