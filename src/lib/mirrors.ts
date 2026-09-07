export interface Mirror {
  name: string;
  description: string;
  status: string;
  size: string;
  last_update: string;
  next_schedule: string;
}
export const catalog: Record<
  string,
  { slug: string; category: string; mark: string; color: string }
> = {
  Ubuntu: {
    slug: 'ubuntu',
    category: 'Linux 发行版',
    mark: 'U',
    color: '#d65a30',
  },
  CentOS: {
    slug: 'centos',
    category: 'Linux 发行版',
    mark: 'C',
    color: '#8663a5',
  },
  Debian: {
    slug: 'debian',
    category: 'Linux 发行版',
    mark: 'D',
    color: '#c34764',
  },
  Fedora: {
    slug: 'fedora',
    category: 'Linux 发行版',
    mark: 'f',
    color: '#3c73aa',
  },
  'Arch Linux': {
    slug: 'arch-linux',
    category: 'Linux 发行版',
    mark: 'A',
    color: '#298ab2',
  },
  Elvish: { slug: 'elvish', category: '开发工具', mark: 'E', color: '#587f6d' },
  'Node.js': {
    slug: 'nodejs',
    category: '开发工具',
    mark: 'N',
    color: '#618944',
  },
  Python: {
    slug: 'python',
    category: '开发工具',
    mark: 'Py',
    color: '#b18a26',
  },
};
export function statusLabel(status: string) {
  return (
    (
      { success: '同步完成', syncing: '同步中', failed: '同步失败' } as Record<
        string,
        string
      >
    )[status] ?? '未知状态'
  );
}
// Normalize Go timestamps for Safari; always display the feed in Asia/Shanghai.
export function formatDate(value: string) {
  if (!value || value.startsWith('0001-')) return '暂无记录';
  const date = new Date(
    value.replace(' ', 'T').replace(/ ([+-]\d{2})(\d{2})$/, '$1:$2'),
  );
  if (Number.isNaN(date.getTime())) return '暂无记录';
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
    .format(date)
    .replaceAll('/', '-');
}
export function parseMirrors(value: unknown): Mirror[] {
  if (
    !Array.isArray(value) ||
    !value.every(
      (item) =>
        item &&
        ['name', 'status', 'size', 'last_update', 'next_schedule'].every(
          (key) => typeof item[key] === 'string',
        ) &&
        (item.description === undefined ||
          typeof item.description === 'string'),
    )
  )
    throw new Error('Invalid mirror feed');
  return value.map((item) => ({
    ...item,
    description: item.description ?? '',
  }));
}
