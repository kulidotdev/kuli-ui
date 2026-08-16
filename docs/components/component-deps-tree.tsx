import * as React from 'react';
import { Files, Folder, File } from 'fumadocs-ui/components/files';
import registryData from '../../registry.json';

export interface RegistryFile {
  path: string;
  type: string;
  target?: string;
  content?: string;
}

export interface RegistryItem {
  name: string;
  type: string;
  title?: string;
  description?: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
}

export interface ComponentDepsTreeProps {
  /**
   * Component name matching an entry in registry.json (e.g. "auth-signin")
   */
  name: string;
  /**
   * Whether to recursively include files from registryDependencies
   * @defaultValue true
   */
  includeDependencies?: boolean;
  /**
   * Whether folders should be open by default
   * @defaultValue true
   */
  defaultOpen?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

interface TreeNode {
  name: string;
  isFolder: boolean;
  path: string;
  children: Map<string, TreeNode>;
}

function collectComponentFiles(
  name: string,
  items: RegistryItem[],
  includeDependencies = true,
  visited = new Set<string>(),
): string[] {
  if (visited.has(name)) return [];
  visited.add(name);

  const item = items.find((it) => it.name === name);
  const files: string[] = [];

  if (item) {
    files.push(...(item.files || []).map((f) => f.path));
  } else {
    // Fallback for external components (like official shadcn components)
    // that are not explicitly defined in the local registry.json
    files.push(`src/components/ui/${name}.tsx`);
  }

  if (includeDependencies && item?.registryDependencies) {
    for (const dep of item.registryDependencies) {
      files.push(...collectComponentFiles(dep, items, true, visited));
    }
  }

  return Array.from(new Set(files));
}

function buildFileTree(paths: string[]): TreeNode[] {
  const rootMap = new Map<string, TreeNode>();

  for (const rawPath of paths) {
    const cleanPath = rawPath.replace(/\\/g, '/').replace(/^\/+/, '');
    const segments = cleanPath.split('/').filter(Boolean);

    let currentMap = rootMap;
    let accumulatedPath = '';

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${segment}` : segment;

      let node = currentMap.get(segment);
      if (!node) {
        node = {
          name: segment,
          isFolder: !isLast,
          path: accumulatedPath,
          children: new Map(),
        };
        currentMap.set(segment, node);
      } else if (!isLast) {
        node.isFolder = true;
      }

      currentMap = node.children;
    }
  }

  const sortNodes = (map: Map<string, TreeNode>): TreeNode[] => {
    const list = Array.from(map.values());
    return list.sort((a, b) => {
      if (a.isFolder !== b.isFolder) {
        return a.isFolder ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  };

  return sortNodes(rootMap);
}

function renderTreeNodes(nodes: TreeNode[], defaultOpen: boolean): React.ReactNode {
  return nodes.map((node) => {
    if (node.isFolder) {
      const children = Array.from(node.children.values()).sort((a, b) => {
        if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1;
        return a.name.localeCompare(b.name);
      });

      return (
        <Folder key={node.path} name={node.name} defaultOpen={defaultOpen}>
          {renderTreeNodes(children, defaultOpen)}
        </Folder>
      );
    }

    return <File key={node.path} name={node.name} />;
  });
}

export function ComponentDepsTree({
  name,
  includeDependencies = true,
  defaultOpen = true,
  className,
}: ComponentDepsTreeProps) {
  const item = (registryData.items as RegistryItem[]).find((it) => it.name === name);

  if (!item) {
    return (
      <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive my-4">
        Component not found in registry: <code>{name}</code>
      </div>
    );
  }

  const files = collectComponentFiles(
    name,
    registryData.items as RegistryItem[],
    includeDependencies,
  );

  if (files.length === 0) {
    return (
      <div className="rounded-xl border border-muted p-4 text-sm text-muted-foreground my-4">
        No files found in registry for: <code>{name}</code>
      </div>
    );
  }

  const tree = buildFileTree(files);

  return (
    <div className={`not-prose my-4 ${className ?? ''}`.trim()}>
      <Files>
        {renderTreeNodes(tree, defaultOpen)}
      </Files>
    </div>
  );
}
