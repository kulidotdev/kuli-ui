import { visit } from 'unist-util-visit';
import { registryUrl } from './registry-url.mjs';

/**
 * Remark plugin that replaces the `REGISTRY_URL` placeholder in all code
 * blocks and inline code with the actual registry URL from lib/shared.ts.
 *
 * Change the domain once in lib/shared.ts — every doc page updates automatically.
 */
export function remarkRegistryUrl() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.value.includes('REGISTRY_URL')) {
        node.value = node.value.replaceAll('REGISTRY_URL', registryUrl);
      }
    });

    visit(tree, 'inlineCode', (node) => {
      if (node.value.includes('REGISTRY_URL')) {
        node.value = node.value.replaceAll('REGISTRY_URL', registryUrl);
      }
    });
  };
}
