import { cachedFetch } from './cache';

interface UnsplashPhoto {
    id: string;
    description: string | null;
    alt_description: string | null;
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
    };
    width: number;
    height: number;
    color: string;
    created_at: string;
    exif?: {
        make: string | null;
        model: string | null;
        exposure_time: string | null;
        aperture: string | null;
        focal_length: string | null;
        iso: number | null;
    };
    location?: {
        name: string | null;
        city: string | null;
        country: string | null;
    };
}

export async function fetchUnsplashPhotos(username: string, perPage = 30): Promise<UnsplashPhoto[]> {
    const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
        console.error('UNSPLASH_ACCESS_KEY not set');
        return [];
    }

    const res = await fetch(
        `https://api.unsplash.com/users/${username}/photos?per_page=${perPage}&order_by=latest`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        }
    );

    if (!res.ok) {
        console.error(`Unsplash API error: ${res.status}`);
        return [];
    }

    return res.json();
}

export async function fetchUnsplashUser(username: string) {
    const accessKey = import.meta.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
        console.error('UNSPLASH_ACCESS_KEY not set');
        return null;
    }

    const res = await fetch(
        `https://api.unsplash.com/users/${username}`,
        {
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        }
    );

    if (!res.ok) {
        console.error(`Unsplash API error: ${res.status}`);
        return null;
    }

    return res.json();
}

// ── Cached wrappers (15 min fresh, 3 hour stale) ──

const UNSPLASH_CACHE = { freshTTL: 900, staleTTL: 10800 };

export function cachedUnsplashPhotos(username: string, perPage = 30) {
    return cachedFetch(`unsplash:photos:${username}:${perPage}`, () => fetchUnsplashPhotos(username, perPage), UNSPLASH_CACHE);
}

export function cachedUnsplashUser(username: string) {
    return cachedFetch(`unsplash:user:${username}`, () => fetchUnsplashUser(username), UNSPLASH_CACHE);
}
