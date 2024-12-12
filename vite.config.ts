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

      viteStaticCopy({
        targets: [
          {
            // 只匹配 assets 文件夹下的 .pdf 和 .html 文件
            src: '笔记/**/assets/**/*.{pdf,html}',
            dest: '', // 起始目标目录为空，动态生成路径
            rename: (filePath) => {
              // 动态生成目标路径
              const relativePath = filePath.split('笔记/')[1]; // 获取 `笔记` 之后的路径
              return relativePath; // 保持源目录结构
            },
          },
        ],
      }),

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
