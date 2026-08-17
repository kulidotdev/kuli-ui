import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Preview, PreviewDemo, PreviewCode } from '@/components/preview';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentDepsTree } from '@/components/component-deps-tree';
import { createGenerator, createFileSystemGeneratorCache } from 'fumadocs-typescript';
import { AutoTypeTable, type AutoTypeTableProps } from 'fumadocs-typescript/ui';

const generator = createGenerator({
  cache: createFileSystemGeneratorCache('.next/fumadocs-typescript'),
});

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Preview,
    PreviewDemo,
    PreviewCode,
    ComponentPreview,
    ComponentDepsTree,
    AutoTypeTable: (props: Partial<AutoTypeTableProps>) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
