import React, { useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Card, Cards } from '../components/SectionCards';

export default function TopicPage({ content }) {
    const { id } = useParams();
    if (id === 'gap') return <Navigate to="/topics" replace />;
    const section = (content?.sections || []).find(s => s.id === id);
    const [copied, setCopied] = useState(false);
    const shareUrl = useMemo(() => `${window.location.origin}/topic/${id}`, [id]);

    if (!section) {
        return (
            <div className="ui-page">
                <div className="rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-100">
                    Topic not found.
                </div>
                <div className="mt-3">
                    <Link className="ui-btn" to="/">
                        Back to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ui-page">
            <div className="ui-surface">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <h1 className="text-2xl font-extrabold tracking-tight">{section.title}</h1>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(shareUrl);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1200);
                                } catch {
                                    setCopied(false);
                                }
                            }}
                            className="ui-btn"
                        >
                            {copied ? 'Copied' : 'Copy link'}
                        </button>
                        <Link className="ui-btn ui-btnPrimary" to="/topics">
                            Topics
                        </Link>
                    </div>
                </div>
                {section.body ? <p className="mt-3 max-w-3xl text-sm leading-6 text-white/70">{section.body}</p> : null}

                {section.links?.length ? (
                    <>
                        <h2 className="mt-6 ui-sectionTitle">Links</h2>
                        <Cards>
                            {section.links.map((l, idx) => (
                                <Card key={`${l.label}-${idx}`} title={l.label} linkUrl={l.url} hint="Add a URL in `PythonBackend/content.json`." />
                            ))}
                        </Cards>
                    </>
                ) : null}

                {section.people?.length ? (
                    <>
                        <h2 className="mt-6 ui-sectionTitle">People</h2>
                        <Cards>
                            {section.people.map((p, idx) => (
                                <Card
                                    key={`${p.name}-${idx}`}
                                    title={p.name}
                                    text={p.role}
                                    linkUrl={p.email ? `mailto:${p.email}` : ''}
                                    linkLabel={p.email || ''}
                                    hint="Add email in `PythonBackend/content.json`."
                                />
                            ))}
                        </Cards>
                    </>
                ) : null}

                {section.flowcharts?.length ? (
                    <>
                        <h2 className="mt-6 ui-sectionTitle">Flowcharts</h2>
                        <Cards>
                            {section.flowcharts.map((c, idx) => (
                                <Card key={`${c.title}-${idx}`} title={c.title} text={c.description} linkUrl={c.link} hint="Add a link in `PythonBackend/content.json`." />
                            ))}
                        </Cards>
                    </>
                ) : null}

                {section.timeline?.length ? (
                    <>
                        <h2 className="mt-6 ui-sectionTitle">Timeline</h2>
                        <div className="mt-2 grid gap-2">
                            {section.timeline.map((t, idx) => (
                                <div key={`${t.milestone}-${idx}`} className="ui-card">
                                    <div className="font-semibold text-white/95">{t.milestone}</div>
                                    <div className="mt-1 text-sm text-white/70">{t.date || 'TBD'}</div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
}
