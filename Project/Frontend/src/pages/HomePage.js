import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage({ content }) {
    const sections = content?.sections || [];
    const featured = sections.filter(s => s.id !== 'gap').slice(0, 4);
    return (
        <div className="mx-auto w-[min(1080px,calc(100%-40px))] py-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-extrabold tracking-tight">Welcome</div>
                <div className="mt-2 max-w-3xl text-sm leading-6 text-white/70">
                    UGAC is building a single source of truth for undergraduate academic processes, opportunities, and resources.
                    Use the Topics pages for details, and Announcements for the latest updates.
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                    <Link className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-white/25" to="/topics">
                        Browse topics
                    </Link>
                    <Link className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-white/25" to="/announcements">
                        View announcements
                    </Link>
                    <Link className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm hover:border-white/25" to="/contacts">
                        Contact UGAC
                    </Link>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">Quick actions</div>
                    <div className="mt-3 grid gap-2">
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:border-white/20" to="/topics">
                            Search topics
                        </Link>
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:border-white/20" to="/topic/flowcharts">
                            View flowcharts
                        </Link>
                        <Link className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/85 hover:border-white/20" to="/contacts">
                            Email UGAC
                        </Link>
                    </div>
                </div>

                <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-baseline justify-between">
                        <div className="text-sm font-semibold">Featured topics</div>
                        <Link className="text-xs text-[#7cf0ff]" to="/topics">
                            View all
                        </Link>
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {featured.map(s => (
                            <Link key={s.id} to={`/topic/${s.id}`} className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:border-white/20">
                                <div className="font-semibold">{s.title}</div>
                                <div className="mt-2 line-clamp-2 text-sm text-white/70">{s.body || 'Open to view details.'}</div>
                                <div className="mt-3 text-xs text-white/50">Open topic</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-4 text-xs text-white/60">
                © {new Date().getFullYear()} UG Academic Council
            </div>
        </div>
    );
}
