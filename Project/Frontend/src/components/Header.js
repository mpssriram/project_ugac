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
            <div className="ui-container flex items-center justify-between gap-4 py-3">
                <Link to="/" className="flex items-start gap-3">
                    <div className="h-9 w-9 overflow-hidden rounded-xl border border-white/12 bg-gradient-to-br from-white/10 to-white/0 shadow-[0_10px_25px_rgba(0,0,0,0.25)]">
                        <img
                            src="/ugac-icon.png"
                            alt="IIT Mandi"
                            className="h-full w-full object-cover"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
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
                                'rounded-xl border px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.06]',
                                isActive ? 'border-white/20 bg-white/[0.06] text-white' : 'border-transparent hover:border-white/12'
                            )
                        }
                    >
                        Topics
                    </NavLink>
                    <NavLink
                        to="/announcements"
                        className={({ isActive }) =>
                            classNames(
                                'rounded-xl border px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.06]',
                                isActive ? 'border-white/20 bg-white/[0.06] text-white' : 'border-transparent hover:border-white/12'
                            )
                        }
                    >
                        Announcements
                    </NavLink>
                    <NavLink
                        to="/contacts"
                        className={({ isActive }) =>
                            classNames(
                                'rounded-xl border px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.06]',
                                isActive ? 'border-white/20 bg-white/[0.06] text-white' : 'border-transparent hover:border-white/12'
                            )
                        }
                    >
                        Contacts
                    </NavLink>
                    <button
                        onClick={() => setOpen(true)}
                        className="ui-btn ml-1"
                    >
                        Menu
                    </button>
                </nav>

                <button
                    onClick={() => setOpen(true)}
                    className="ui-btn md:hidden"
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
                    <div className="absolute right-0 top-0 h-full w-[min(420px,100%)] border-l border-white/10 bg-[#0b1020] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04),_-30px_0_80px_rgba(0,0,0,0.35)]">
                        <div className="flex items-center justify-between">
                            <div className="font-bold">Navigation</div>
                            <button
                                onClick={() => setOpen(false)}
                                className="ui-btn px-2 py-1"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-4 grid gap-2">
                            <Link
                                to="/"
                                onClick={() => setOpen(false)}
                                className="ui-btn justify-start border-white/10 bg-white/[0.03]"
                            >
                                Home
                            </Link>
                            <Link
                                to="/topics"
                                onClick={() => setOpen(false)}
                                className="ui-btn justify-start border-white/10 bg-white/[0.03]"
                            >
                                Topics
                            </Link>
                            <Link
                                to="/announcements"
                                onClick={() => setOpen(false)}
                                className="ui-btn justify-start border-white/10 bg-white/[0.03]"
                            >
                                Announcements
                            </Link>
                            <Link
                                to="/contacts"
                                onClick={() => setOpen(false)}
                                className="ui-btn justify-start border-white/10 bg-white/[0.03]"
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
                                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
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
