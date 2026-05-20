import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_TOPIC_IDS = ['overview', 'flowcharts', 'curriculum', 'opportunities', 'principles', 'team'];

function sanitizeSnippet(text) {
    if (!text) return '';
    return String(text)
        .replace(/\([^)]*demo[^)]*\)/gi, '')
        .replace(/demo data below[^.]*\./gi, '')
        .replace(/demo links below[^.]*\./gi, '')
        .replace(/replace with official[^.]*\./gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}

export default function HomePage({ content }) {
    const sections = content?.sections || [];

    const byId = new Map(sections.map(s => [s.id, s]));
    const curated = FEATURED_TOPIC_IDS.map(id => byId.get(id)).filter(Boolean);
    const filler = sections.filter(s => s.id !== 'gap' && (s.title || '').trim() && !FEATURED_TOPIC_IDS.includes(s.id));
    const featured = [...curated, ...filler].slice(0, 6);

    return (
        <div className="ui-page">
            <div className="ui-surface p-5">
                <div className="ui-kicker">Undergraduate academics</div>
                <div className="mt-2 ui-title">Welcome to UGAC</div>
                <div className="ui-subtitle">
                    UGAC is building a single source of truth for undergraduate academic processes, opportunities, and resources.
                    Use the Topics pages for details, and Announcements for the latest updates.
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                    <Link className="ui-btn ui-btnDense ui-btnPrimary" to="/topics">
                        Browse topics
                    </Link>
                    <Link className="ui-btn ui-btnDense" to="/announcements">
                        View announcements
                    </Link>
                    <Link className="ui-btn ui-btnDense" to="/contacts">
                        Contact UGAC
                    </Link>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-12">
                <div className="ui-card md:col-span-4 ui-cardTight">
                    <div className="ui-h2">Quick actions</div>
                    <div className="mt-1 text-sm text-white/65">Jump to commonly used pages.</div>
                    <div className="mt-3 grid gap-2">
                        <Link className="ui-btn ui-btnDense ui-cardHover justify-start border-white/10 bg-white/[0.02]" to="/topics">
                            Search topics
                        </Link>
                        <Link className="ui-btn ui-btnDense ui-cardHover justify-start border-white/10 bg-white/[0.02]" to="/topic/flowcharts">
                            View flowcharts
                        </Link>
                        <Link className="ui-btn ui-btnDense ui-cardHover justify-start border-white/10 bg-white/[0.02]" to="/contacts">
                            Email UGAC
                        </Link>
                    </div>
                </div>

                <div className="ui-card md:col-span-8 ui-cardTight">
                    <div className="flex items-baseline justify-between">
                        <div>
                            <div className="ui-h2">Featured topics</div>
                            <div className="mt-1 text-sm text-white/65">Start here for the most requested information.</div>
                        </div>
                        <Link className="ui-btn ui-btnDense" to="/topics">View all</Link>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {featured.map(s => (
                            <Link key={s.id} to={`/topic/${s.id}`} className="ui-topicCard ui-cardTight group">
                                <div className="font-semibold text-white/95">{s.title}</div>
                                <div className="mt-2 line-clamp-2 text-sm leading-6 text-white/70">
                                    {sanitizeSnippet(s.body) || 'Open to view details.'}
                                </div>
                                <div className="ui-topicMeta mt-2">
                                    <span className="truncate">/topic/{s.id}</span>
                                    <span className="text-cyan-200/90 group-hover:text-cyan-200">Open →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
