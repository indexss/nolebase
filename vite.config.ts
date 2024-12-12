import { defineConfig } from 'vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import Inspect from 'vite-plugin-inspect'

import { GitChangelog, GitChangelogMarkdownSection } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { PageProperties, PagePropertiesMarkdownSection } from '@nolebase/vitepress-plugin-page-properties/vite'
import { ThumbnailHashImages } from '@nolebase/vitepress-plugin-thumbnail-hash/vite'

import { githubRepoLink } from './metadata'

import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(async () => {
  return {
    assetsInclude: ['**/*.pdf'],
    optimizeDeps: {
      // vitepress is aliased with replacement `join(DIST_CLIENT_PATH, '/index')`
      // This needs to be excluded from optimization
      exclude: [
        'vitepress',
      ],
    },
    plugins: [
      Inspect(),
      GitChangelog({
        repoURL: () => githubRepoLink,
      }),
      GitChangelogMarkdownSection({
        getChangelogTitle: (): string => {
          return '文件历史'
        },
        getContributorsTitle: (): string => {
          return '贡献者'
        },
        excludes: [
          'toc.md',
          'index.md',
        ],
      }),
      PageProperties(),
      PagePropertiesMarkdownSection({
        excludes: [
          'toc.md',
          'index.md',
        ],
      }),
      ThumbnailHashImages(),
      Components({
        include: [/\.vue$/, /\.md$/],
        dirs: '.vitepress/theme/components',
        dts: '.vitepress/components.d.ts',
      }),
      UnoCSS(),
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: '笔记/**/assets/**/*',
      //       dest: 'assets',
      //     },
      //   ],
      // }),
      // src: '笔记/**/assets/**/*.{pdf,html}',

      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: '笔记/**/assets/*.{pdf,html}',
      //       dest: '',
      //       transform: (filePath) => {
      //         // 提取相对路径并保留完整结构
      //         const relativePath = filePath.replace(/.*笔记[\/\\]/, '');
      //         return relativePath;
      //       },
      //     },
      //   ],
      // }),

    ],
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/vitepress-plugin-inline-link-preview',
      ],
    },
  }
})
