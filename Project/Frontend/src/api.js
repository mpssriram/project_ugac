export async function fetchJson(path, init) {
    const resp = await fetch(path, init);
    const data = await resp.json();
    if (!resp.ok) {
        const message = data?.error || data?.message || `Request failed: ${resp.status}`;
        throw new Error(message);
    }
    return data;
}

export async function getContent() {
    return fetchJson('/content');
}

export async function getAnnouncements() {
    return fetchJson('/items');
}

export async function addAnnouncement(payload) {
    return fetchJson('/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
}
