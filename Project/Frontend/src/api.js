const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
const configuredApiBaseUrl = (process.env.REACT_APP_API_BASE_URL || '').trim().replace(/\/$/, '');
const apiBaseUrl = configuredApiBaseUrl || (isLocalHost ? '' : null);

function buildUrl(path) {
    if (apiBaseUrl === null) {
        throw new Error('Missing REACT_APP_API_BASE_URL for production deployment.');
    }
    return `${apiBaseUrl}${path}`;
}

export async function fetchJson(path, init) {
    const resp = await fetch(buildUrl(path), init);
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
