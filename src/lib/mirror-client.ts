import {
  mirrorMeta,
  validRepoPath,
  type Mirror,
  type MirrorFeed,
  type MirrorMetadata,
} from './mirrors';
const metadata: Record<string, MirrorMetadata> = JSON.parse(
  document.querySelector<HTMLElement>('[data-mirror-docs]')!.dataset
    .mirrorDocs!,
);
const rows = document.querySelector<HTMLTableSectionElement>('#mirror-rows')!;
const input = document.querySelector<HTMLInputElement>('#mirror-search')!;
const message = document.querySelector<HTMLElement>('#feed-message')!;
const refresh = document.querySelector<HTMLButtonElement>('#refresh')!;
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-category]');
let mirrors: Mirror[] | undefined;
let category = '';
function element(tag: string, text: string, className = '') {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}
function link(text: string, href: string) {
  const a = document.createElement('a');
  a.textContent = text;
  a.href = href;
  a.className = 'docs-link';
  return a;
}
function render() {
  if (!mirrors) return;
  const query = input.value.trim().toLocaleLowerCase();
  const filtered = mirrors.filter((m) => {
    const meta = mirrorMeta(m, metadata);
    return (
      (!category || meta.category === category) &&
      `${m.name} ${meta.label}`.toLowerCase().includes(query)
    );
  });
  rows.replaceChildren(
    ...filtered.map((m) => {
      const meta = mirrorMeta(m, metadata);
      const row = document.createElement('tr');
      const cells = Array.from({ length: 4 }, () => row.insertCell());
      const name = element('div', '', 'mirror-name');
      const icon = element('span', meta.mark, 'mirror-icon');
      icon.style.setProperty('--icon-color', meta.color);
      icon.setAttribute('aria-hidden', 'true');
      if (meta.icon) {
        const logo = document.createElement('img');
        logo.src = meta.icon;
        logo.alt = '';
        logo.width = 22;
        logo.height = 22;
        logo.loading = 'lazy';
        logo.addEventListener(
          'error',
          () => icon.replaceChildren(document.createTextNode(meta.mark)),
          { once: true },
        );
        icon.replaceChildren(logo);
      }
      const details = element('div', '');
      const title = link('', `${m.path}/`);
      title.append(element('strong', m.name));
      details.append(
        title,
        element(
          'small',
          meta.label === m.name ? '校园网联合镜像站' : meta.label,
        ),
      );
      name.append(icon, details);
      cells[0].append(name);
      cells[1].textContent = meta.category;
      const visit = link('访问 ↗', `${m.path}/`);
      visit.setAttribute('aria-label', `访问 ${m.name}`);
      cells[2].append(visit);
      if (meta.slug) cells[3].append(link('指南 ↗', `/docs/${meta.slug}/`));
      else cells[3].textContent = '—';
      return row;
    }),
  );
  document.querySelector('#mirror-count')!.textContent = String(
    filtered.length,
  );
  document.querySelector<HTMLElement>('#empty-state')!.hidden =
    filtered.length !== 0;
}
async function load() {
  refresh.disabled = true;
  message.textContent = '正在读取 CERNET 镜像目录…';
  try {
    const response = await fetch('/mirrors.json', {
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok) throw new Error('Feed unavailable');
    const feed: MirrorFeed = await response.json();
    if (
      !Array.isArray(feed.mirrors) ||
      !feed.mirrors.every(
        (m) =>
          typeof m.name === 'string' &&
          typeof m.path === 'string' &&
          validRepoPath(m.path),
      )
    )
      throw new Error('Invalid feed');
    mirrors = feed.mirrors;
    render();
    document.querySelector('#initial-error')?.remove();
    document.querySelector<HTMLElement>('#mirror-controls')!.hidden = false;
    message.textContent = feed.stale
      ? '上游暂时不可用，展示缓存目录'
      : '目录来自 CERNET · 文件由各高校镜像站提供';
  } catch {
    const initial = document.querySelector('#initial-error');
    if (initial)
      initial.textContent = '镜像目录暂时不可用，请刷新重试或访问 CERNET。';
    message.textContent = '目录刷新失败，保留当前列表。请重试。';
  } finally {
    refresh.hidden = false;
    refresh.disabled = false;
  }
}
input.addEventListener('input', render);
buttons.forEach((button) =>
  button.addEventListener('click', () => {
    category = button.dataset.category ?? '';
    buttons.forEach((b) =>
      b.setAttribute('aria-pressed', String(b === button)),
    );
    render();
  }),
);
document.querySelector('#clear-filters')!.addEventListener('click', () => {
  input.value = '';
  buttons[0].click();
  input.focus();
});
document.addEventListener('keydown', (event) => {
  if (
    event.key === '/' &&
    !event.ctrlKey &&
    !event.metaKey &&
    !(
      event.target instanceof HTMLElement &&
      (event.target.matches('input, textarea, select') ||
        event.target.isContentEditable)
    )
  ) {
    event.preventDefault();
    input.focus();
  }
});
refresh.addEventListener('click', load);
load();
