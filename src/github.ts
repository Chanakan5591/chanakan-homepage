
import { cachedFetch } from './cache';

export async function fetchGitHub(query: string, variables = {}) {
    const token = import.meta.env.GITHUB_TOKEN;
    const GITHUB_API = "https://api.github.com/graphql";

    const res = await fetch(GITHUB_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
        throw new Error(`GitHub API returned ${res.status}: ${res.statusText}. Token may be expired.`);
    }

    const json = await res.json();
    if (json.errors) {
        console.error(json.errors);
        throw new Error(`GitHub GraphQL error: ${json.errors[0]?.message || 'Unknown error'}`);
    }
    return json.data;
}

export async function fetchUserProfile(login: string) {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            name
            bio
            avatarUrl
            repositories(privacy: PUBLIC) { totalCount }
            followers { totalCount }
            following { totalCount }
            contributionsCollection {
                totalCommitContributions
                totalPullRequestContributions
                totalIssueContributions
                totalRepositoryContributions
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            contributionCount
                            date
                            weekday
                            color
                        }
                    }
                }
            }
        }
    }`;
    const data = await fetchGitHub(query, { login });
    return data.user;
}

export async function fetchPinnedRepos(login: string) {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                    ... on Repository {
                        name
                        description
                        url
                        stargazerCount
                        forkCount
                        primaryLanguage {
                            name
                            color
                        }
                        updatedAt
                    }
                }
            }
        }
    }`;
    const data = await fetchGitHub(query, { login });
    return data.user.pinnedItems.nodes;
}

export async function fetchTopRepos(login: string) {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            repositories(first: 12, orderBy: { field: STARGAZERS, direction: DESC }, privacy: PUBLIC, isFork: false) {
                nodes {
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                    primaryLanguage {
                        name
                        color
                    }
                    updatedAt
                }
            }
        }
    }`;
    const data = await fetchGitHub(query, { login });
    return data.user.repositories.nodes;
}

export async function fetchLanguageStats(login: string) {
    const query = `
    query ($login: String!) {
        user(login: $login) {
            repositories(first: 50, orderBy: { field: STARGAZERS, direction: DESC }, privacy: PUBLIC, isFork: false) {
                nodes {
                    languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
                        edges {
                            size
                            node {
                                name
                                color
                            }
                        }
                    }
                }
            }
        }
    }`;
    const data = await fetchGitHub(query, { login });
    const langMap: Record<string, { size: number; color: string }> = {};
    for (const repo of data.user.repositories.nodes) {
        for (const edge of repo.languages.edges) {
            const name = edge.node.name;
            if (!langMap[name]) {
                langMap[name] = { size: 0, color: edge.node.color || '#888' };
            }
            langMap[name].size += edge.size;
        }
    }
    const total = Object.values(langMap).reduce((s, l) => s + l.size, 0);
    return Object.entries(langMap)
        .map(([name, { size, color }]) => ({ name, color, percentage: Math.round((size / total) * 1000) / 10 }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 8);
}

// ── Cached wrappers (10 min fresh, 2 hour stale) ──

const GITHUB_CACHE = { freshTTL: 600, staleTTL: 7200 };

export function cachedUserProfile(login: string) {
    return cachedFetch(`github:profile:${login}`, () => fetchUserProfile(login), GITHUB_CACHE);
}

export function cachedPinnedRepos(login: string) {
    return cachedFetch(`github:pinned:${login}`, () => fetchPinnedRepos(login), GITHUB_CACHE);
}

export function cachedTopRepos(login: string) {
    return cachedFetch(`github:top:${login}`, () => fetchTopRepos(login), GITHUB_CACHE);
}

export function cachedLanguageStats(login: string) {
    return cachedFetch(`github:langs:${login}`, () => fetchLanguageStats(login), GITHUB_CACHE);
}