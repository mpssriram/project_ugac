import React, { useMemo, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function classNames(...parts) {
    return parts.filter(Boolean).join(' ');
}

export default function Header({ title, subtitle, sections }) {
    const [open, setOpen] = useState(false);
    const topics = useMemo(() => sections || [], [sections]);

    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b1020]/70 backdrop-blur">
            <div className="mx-auto flex w-[min(1080px,calc(100%-40px))] items-center justify-between gap-4 py-3">
                <Link to="/" className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl border border-white/15 bg-white/5" />
                    <div className="leading-tight">
                        <div className="font-extrabold tracking-tight">{title}</div>
                        <div className="mt-0.5 text-xs text-white/70">{subtitle}</div>
                    </div>
                </Link>

                <nav className="hidden items-center gap-2 md:flex">
                    <NavLink
                        to="/topics"
                        className={({ isActive }) =>
                            classNames(
                                'rounded-xl border px-3 py-2 text-sm text-white/80 hover:bg-white/5',
                                isActive ? 'border-white/20 bg-white/5 text-white' : 'border-transparent'
                            )
                        }
                    >
                        Topics
                    </NavLink>
                    <NavLink
                        to="/announcements"
                        className={({ isActive }) =>
                            classNames(
                                'rounded-xl border px-3 py-2 text-sm text-white/80 hover:bg-white/5',
                                isActive ? 'border-white/20 bg-white/5 text-white' : 'border-transparent'
                            )
                        }
                    >
                        Announcements
                    </NavLink>
                    <NavLink
                        to="/contacts"
                        className={({ isActive }) =>
                            classNames(
                                'rounded-xl border px-3 py-2 text-sm text-white/80 hover:bg-white/5',
                                isActive ? 'border-white/20 bg-white/5 text-white' : 'border-transparent'
                            )
                        }
                    >
                        Contacts
                    </NavLink>
                    <button
                        onClick={() => setOpen(true)}
                        className="ml-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/25"
                    >
                        Menu
                    </button>
                </nav>

                <button
                    onClick={() => setOpen(true)}
                    className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/25 md:hidden"
                >
                    Menu
                </button>
            </div>

            {open ? (
                <div className="fixed inset-0 z-30">
                    <button
                        className="absolute inset-0 bg-black/60"
                        aria-label="Close menu"
                        onClick={() => setOpen(false)}
                    />
                    <div className="absolute right-0 top-0 h-full w-[min(420px,100%)] border-l border-white/10 bg-[#0b1020] p-4">
                        <div className="flex items-center justify-between">
                            <div className="font-bold">Navigation</div>
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-lg border border-white/15 px-2 py-1 text-sm text-white/90"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-4 grid gap-2">
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20"
                            >
                                Home
                            </Link>
                            <Link
                                to="/topics"
                                onClick={() => setOpen(false)}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20"
                            >
                                Topics
                            </Link>
                            <Link
                                to="/announcements"
                                onClick={() => setOpen(false)}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20"
                            >
                                Announcements
                            </Link>
                            <Link
                                to="/contacts"
                                onClick={() => setOpen(false)}
                                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:border-white/20"
                            >
                                Contacts
                            </Link>
                        </div>

                        <div className="mt-6 text-xs text-white/60">Topics</div>
                        <div className="mt-2 grid gap-2">
                            {topics.map(t => (
                                <Link
                                    key={t.id}
                                    to={`/topic/${t.id}`}
                                    onClick={() => setOpen(false)}
                                    className="rounded-xl border border-white/10 px-3 py-2 text-sm text-white/80 hover:border-white/20 hover:bg-white/5"
                                >
                                    {t.title}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </header>
    );
}
