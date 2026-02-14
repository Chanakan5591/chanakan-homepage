import type { APIRoute } from "astro";
import { fetchGitHub } from "../../github";

export const GET: APIRoute = async () => {
  const query = `
  query ($login: String!) {
    user(login: $login) {
      contributionsCollection {
        totalCommitContributions
        restrictedContributionsCount
        contributionCalendar {
          totalContributions
        }
      }
    }
  }
`;

  const data = await fetchGitHub(query, { login: "Chanakan5591" });
  const commits = data.user.contributionsCollection.totalCommitContributions;
  const total =
    data.user.contributionsCollection.contributionCalendar.totalContributions;

  console.log(`Total commits this year: ${commits}`);
  console.log(`Total contributions this year (commits, PRs, etc.): ${total}`);

    return new Response(
        JSON.stringify({ commits, total }),
        { status: 200, headers: { "Content-Type": "application/json" } }
    );
};
