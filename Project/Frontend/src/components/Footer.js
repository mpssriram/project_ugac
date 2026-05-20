import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative z-10 mt-10 border-t border-white/10 bg-[#0b1020]/30">
            <div className="ui-container flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
                <div className="text-xs text-white/60">© {new Date().getFullYear()} UG Academic Council</div>
                <nav className="flex flex-wrap gap-2">
                    <Link className="ui-btn ui-btnDense" to="/topics">
                        Topics
                    </Link>
                    <Link className="ui-btn ui-btnDense" to="/announcements">
                        Announcements
                    </Link>
                    <Link className="ui-btn ui-btnDense" to="/contacts">
                        Contacts
                    </Link>
                </nav>
            </div>
        </footer>
    );
}

