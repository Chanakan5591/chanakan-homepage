<script>
  let { repo } = $props();
</script>

<a
  href={repo.url}
  target="_blank"
  rel="noopener noreferrer"
  class="repo-card"
>
  <div class="repo-header">
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" class="repo-icon">
      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
    </svg>
    <span class="repo-name">{repo.name}</span>
  </div>

  {#if repo.description}
    <p class="repo-desc">{repo.description}</p>
  {/if}

  <div class="repo-meta">
    {#if repo.primaryLanguage}
      <span class="repo-lang">
        <span class="lang-dot" style="background-color: {repo.primaryLanguage.color}"></span>
        {repo.primaryLanguage.name}
      </span>
    {/if}
    {#if repo.stargazerCount > 0}
      <span class="repo-stat">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
        {repo.stargazerCount}
      </span>
    {/if}
    {#if repo.forkCount > 0}
      <span class="repo-stat">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 0-1.5 0v.878H6.75v-.878a2.25 2.25 0 1 0-1.5 0ZM8 1.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm-2.25.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm4.5 0a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 13a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"/></svg>
        {repo.forkCount}
      </span>
    {/if}
  </div>
</a>

<style>
  .repo-card {
    display: block;
    padding: 20px 24px;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 6px;
    background: rgba(255,255,255,0.03);
    text-decoration: none;
    color: inherit;
    transition: all 0.25s ease;
  }

  .repo-card:hover {
    border-color: rgba(0,204,102,0.4);
    background: rgba(0,204,102,0.05);
    transform: translateY(-2px);
  }

  .repo-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }

  .repo-icon {
    opacity: 0.5;
    flex-shrink: 0;
  }

  .repo-name {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    color: rgba(0,204,102,0.9);
  }

  .repo-desc {
    font-size: 13px;
    line-height: 1.5;
    color: rgba(255,255,255,0.55);
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .repo-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 12px;
    color: rgba(255,255,255,0.4);
    font-family: var(--font-mono);
  }

  .repo-lang {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .lang-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .repo-stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .repo-stat svg {
    opacity: 0.6;
  }
</style>
