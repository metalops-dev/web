# MetalOps identity and site structure proposal

Future direction for evolving MetalOps into an independent engineering publication while preserving its visual identity.

## Positioning

**Independent infrastructure engineering**

From bare metal to distributed systems.

Open-source software, practical research and technical writing for infrastructure that is understandable, reproducible and resilient.

**BUILD. MEASURE. BREAK. UNDERSTAND.**

The unifying philosophy: infrastructure should be understandable, measurable, recoverable and under the operator's control. Present MetalOps as an independent engineering practice, grounding its identity in published work rather than claiming work that has yet to be done.

## Technical pillars

1. **Systems engineering:** Rust, Linux internals, storage engines, networking, concurrency, memory management and performance engineering.
2. **Infrastructure engineering:** NixOS, bare metal, virtualization, container orchestration, declarative infrastructure and self-hosting.
3. **Distributed systems and data:** replication, consensus, event streaming, databases, storage architectures and distributed execution.
4. **Reliability engineering:** observability, disaster recovery, fault injection, backup systems, operational automation and incident analysis.
5. **AI infrastructure:** inference systems, model serving, distributed training, resource scheduling and MLOps infrastructure.

## Proposed site structure

| Route | Purpose |
| --- | --- |
| `/writing` | Technical articles and engineering essays; present the existing blog collection. |
| `/projects` | Open-source software and active projects, with links and status. |
| `/lab` | Experiments, benchmarks and findings, including methods and limitations. |
| `/engineering` | Design documents, RFCs and architectural decisions. |
| `/infra` | How MetalOps operates its infrastructure, without exposing sensitive details. |
| `/notes` | Concise technical observations. |
| `/reading` | Curated papers and resources; consider relevant existing bookmarks. |
| `/about` | Mission, engineering philosophy and technical pillars. |

The pillars are topics; the sections are formats. For example, a reliability experiment belongs in `/lab`, while a reliability essay belongs in `/writing`.

## Presentation and navigation

- Keep the existing restrained visual language. Favor clear hierarchy, typography and substance over decorative dashboards.
- Structure the homepage around the mission, five pillars, latest work and engineering philosophy.
- Consider primary navigation for Writing, Projects, Lab, Engineering and About; place secondary sections in a menu or footer when useful.
- Establish the architecture but prominently link only sections with useful content; avoid empty placeholder pages.
- Preserve access to tags, archive and existing content.

## Implementation considerations

- Reuse the existing Astro blog collection, about page and bookmarks where practical; avoid building a new publishing system prematurely.
- Preserve existing `/blog/...` article URLs, RSS, tags and internal links. Prefer a `/writing` index linking to existing article URLs over a full migration; verify hosting behavior before changing URLs.
- Select actual projects, articles and resources before featuring them. Publish experiments and operational documentation as evidence becomes available.

## Suggested rollout

1. **Identity:** revise homepage, about page, navigation and site descriptions; introduce `/writing` while preserving existing content and URLs.
2. **Evidence:** add project and reading pages using real material; publish an initial lab or engineering document.
3. **Operating practice:** add infra and notes sections as content becomes available, using existing Astro patterns.
