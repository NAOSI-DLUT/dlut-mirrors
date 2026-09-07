import {
  catalog,
  formatDate,
  parseMirrors,
  statusLabel,
  type Mirror,
} from './mirrors';
const rows = document.querySelector<HTMLTableSectionElement>('#mirror-rows')!;
const input = document.querySelector<HTMLInputElement>('#mirror-search')!;
const select = document.querySelector<HTMLSelectElement>('#status-filter')!;
const message = document.querySelector<HTMLElement>('#feed-message')!;
const refresh = document.querySelector<HTMLButtonElement>('#refresh')!;
let mirrors: Mirror[] | undefined;
let category = '';
const buttons = document.querySelectorAll<HTMLButtonElement>('[data-category]');
function element(tag: string, text: string, className = '') {
  const node = document.createElement(tag);
  node.textContent = text;
  node.className = className;
  return node;
}
function render() {
  if (!mirrors) return;
  const query = input.value.trim().toLocaleLowerCase();
  const filtered = mirrors.filter(
    (m) =>
      (!category || catalog[m.name]?.category === category) &&
      (!select.value ||
        (select.value === 'unknown'
          ? !['success', 'syncing', 'failed'].includes(m.status)
          : m.status === select.value)) &&
      `${m.name} ${m.description}`.toLocaleLowerCase().includes(query),
  );
  rows.replaceChildren(
    ...filtered.map((m) => {
      const meta = catalog[m.name];
      const row = document.createElement('tr');
      const cells = Array.from({ length: 5 }, () => row.insertCell());
      const name = element('div', '', 'mirror-name');
      const icon = element(
        'span',
        meta?.mark ?? m.name.slice(0, 1),
        'mirror-icon',
      );
      icon.style.setProperty('--icon-color', meta?.color ?? '#587f6d');
      const details = element('div', '');
      details.append(
        element('strong', m.name),
        element('small', m.description),
      );
      name.append(icon, details);
      cells[0].append(name);
      cells[1].append(
        element(
          'span',
          statusLabel(m.status),
          `status ${['success', 'syncing', 'failed'].includes(m.status) ? m.status : 'unknown'}`,
        ),
      );
      cells[2].className = 'mono';
      cells[2].textContent = m.size === 'unknown' ? '—' : m.size;
      cells[3].className = 'date-cell';
      cells[3].append(
        element('span', formatDate(m.last_update)),
        element('small', `下次：${formatDate(m.next_schedule)}`),
      );
      if (meta) {
        const link = document.createElement('a');
        link.className = 'help-link';
        link.href = `/docs/${meta.slug}/`;
        link.textContent = '指南 ↗';
        link.setAttribute('aria-label', `${m.name} 使用帮助`);
        cells[4].append(link);
      } else cells[4].textContent = '—';
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
  message.textContent = '正在读取镜像数据…';
  try {
    const response = await fetch('/mirrors.json', {
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    mirrors = parseMirrors(await response.json());
    render();
    document.querySelector<HTMLElement>('#mirror-controls')!.hidden = false;
    message.textContent = '同步记录供参考 · 请留意最近更新时间';
  } catch {
    message.textContent = '数据刷新失败，保留上次数据。请重试。';
  } finally {
    refresh.hidden = false;
    refresh.disabled = false;
  }
}
input.addEventListener('input', render);
select.addEventListener('change', render);
buttons.forEach((button) =>
  button.addEventListener('click', () => {
    category = button.dataset.category ?? '';
    buttons.forEach((item) =>
      item.setAttribute('aria-pressed', String(item === button)),
    );
    render();
  }),
);
document.querySelector('#clear-filters')!.addEventListener('click', () => {
  input.value = '';
  select.value = '';
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
