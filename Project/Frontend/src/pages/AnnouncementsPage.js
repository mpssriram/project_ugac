import React, { useState } from 'react';

export default function AnnouncementsPage({ announcements, onAdd, error }) {
    const [newAnnouncement, setNewAnnouncement] = useState({ name: '', description: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement(prev => ({ ...prev, [name]: value }));
    };

    const add = () => onAdd(newAnnouncement).then(ok => ok && setNewAnnouncement({ name: '', description: '' }));

    return (
        <div className="mx-auto w-[min(1080px,calc(100%-40px))] py-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h1 className="text-2xl font-extrabold tracking-tight">Announcements</h1>
                {error ? <div className="mt-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-4 text-red-100">{error}</div> : null}

                <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
                    <input
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7cf0ff]/50"
                        type="text"
                        name="name"
                        placeholder="Title"
                        value={newAnnouncement.name}
                        onChange={handleInputChange}
                    />
                    <input
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#7cf0ff]/50 md:col-span-2"
                        type="text"
                        name="description"
                        placeholder="Details"
                        value={newAnnouncement.description}
                        onChange={handleInputChange}
                    />
                    <button
                        className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white hover:border-white/25 md:col-span-3"
                        onClick={add}
                    >
                        Add
                    </button>
                </div>

                <div className="mt-4 grid gap-3">
                    {announcements?.length ? (
                        announcements
                            .slice()
                            .reverse()
                            .map(a => (
                                <div key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                                    <div className="font-semibold">{a.name}</div>
                                    <div className="mt-1 text-sm text-white/70">{a.description}</div>
                                </div>
                            ))
                    ) : (
                        <div className="text-sm text-white/70">No announcements yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
