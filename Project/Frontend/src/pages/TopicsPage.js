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
        <div className="mx-auto w-[min(1080px,calc(100%-40px))] py-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold tracking-tight">Topics</div>
                <div className="mt-1 text-sm text-white/70">
                    Search and open any topic page.
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search topics…"
                        className="w-full flex-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7cf0ff]/50"
                    />
                    <button
                        onClick={() => setQ('')}
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:border-white/25"
                    >
                        Clear
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                {filtered.map(s => (
                    <div key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="font-semibold">{s.title}</div>
                        <div className="mt-2 line-clamp-3 text-sm text-white/70">{s.body || 'Open to view details.'}</div>
                        <div className="mt-3 flex items-center gap-2">
                            <Link
                                className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/25"
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

