import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Preview, PreviewDemo, PreviewCode } from '@/components/preview';
import { ComponentPreview } from '@/components/component-preview';
import { ComponentDepsTree } from '@/components/component-deps-tree';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Preview,
    PreviewDemo,
    PreviewCode,
    ComponentPreview,
    ComponentDepsTree,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
