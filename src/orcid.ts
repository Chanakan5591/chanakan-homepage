import { cachedFetch } from './cache';

interface OrcidWork {
    title: string;
    doi: string | null;
    url: string | null;
    type: string;
    year: string | null;
    month: string | null;
    day: string | null;
    journalTitle: string | null;
}

export async function fetchOrcidWorks(orcidId: string): Promise<OrcidWork[]> {
    const res = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!res.ok) {
        console.error(`ORCID API error: ${res.status}`);
        return [];
    }

    const data = await res.json();
    const works: OrcidWork[] = [];

    for (const group of data.group || []) {
        // Take the first work summary from each group (they're duplicates from different sources)
        const summary = group['work-summary']?.[0];
        if (!summary) continue;

        const title = summary.title?.title?.value || 'Untitled';
        const type = summary.type || 'unknown';
        const pubDate = summary['publication-date'];
        const year = pubDate?.year?.value || null;
        const month = pubDate?.month?.value || null;
        const day = pubDate?.day?.value || null;
        const url = summary.url?.value || null;

        // Extract DOI from external IDs
        let doi: string | null = null;
        const externalIds = summary['external-ids']?.['external-id'] || [];
        for (const eid of externalIds) {
            if (eid['external-id-type'] === 'doi') {
                doi = eid['external-id-value'];
                break;
            }
        }

        // Try to get journal title
        const journalTitle = summary['journal-title']?.value || null;

        works.push({ title, doi, url, type, year, month, day, journalTitle });
    }

    return works;
}

export async function fetchOrcidPerson(orcidId: string) {
    const res = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/person`, {
        headers: {
            'Accept': 'application/json',
        },
    });

    if (!res.ok) {
        console.error(`ORCID API error: ${res.status}`);
        return null;
    }

    const data = await res.json();
    return {
        givenName: data.name?.['given-names']?.value || '',
        familyName: data.name?.['family-name']?.value || '',
        emails: (data.emails?.email || []).map((e: any) => e.email),
    };
}

// ── Cached wrappers (30 min fresh, 6 hour stale) ──

const ORCID_CACHE = { freshTTL: 1800, staleTTL: 21600 };

export function cachedOrcidWorks(orcidId: string) {
    return cachedFetch(`orcid:works:${orcidId}`, () => fetchOrcidWorks(orcidId), ORCID_CACHE);
}

export function cachedOrcidPerson(orcidId: string) {
    return cachedFetch(`orcid:person:${orcidId}`, () => fetchOrcidPerson(orcidId), ORCID_CACHE);
}
