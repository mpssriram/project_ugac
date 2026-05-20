import React from 'react';
import { Card } from '../components/SectionCards';

export default function ContactsPage({ content }) {
    const contacts = content?.contacts || [];
    return (
        <div className="mx-auto w-[min(1080px,calc(100%-40px))] py-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <h1 className="text-2xl font-extrabold tracking-tight">Contacts</h1>
                <div className="mt-1 text-sm text-white/70">Email the relevant point of contact.</div>

                {contacts.length ? (
                    <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                        {contacts.map((c, idx) => {
                            const isLastOdd = contacts.length % 2 === 1 && idx === contacts.length - 1;
                            return (
                                <div key={`${c.email}-${idx}`} className={isLastOdd ? 'md:col-span-2' : ''}>
                                    <Card
                                        title={c.name}
                                        text={c.role}
                                        linkUrl={`mailto:${c.email}`}
                                        linkLabel={c.email}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="mt-4 text-sm text-white/70">Add contacts in `PythonBackend/content.json`.</div>
                )}
            </div>
        </div>
    );
}
