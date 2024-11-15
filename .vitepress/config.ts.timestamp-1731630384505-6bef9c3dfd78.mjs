// .vitepress/config.ts
import process from "node:process";
import { defineConfig } from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/vitepress@1.1.4_@algolia+client-search@4.23.3_@types+node@20.12.11_less@4.2.0_markdown-it-mat_534ihya77wyyop4eg4kvgzei5y/node_modules/vitepress/dist/node/index.js";
import MarkdownItFootnote from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/markdown-it-footnote@3.0.3/node_modules/markdown-it-footnote/index.js";
import MarkdownItMathjax3 from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/markdown-it-mathjax3@4.3.2/node_modules/markdown-it-mathjax3/index.js";
import { BiDirectionalLinks } from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/@nolebase+markdown-it-bi-directional-links@2.0.0-rc11_markdown-it@13.0.2/node_modules/@nolebase/markdown-it-bi-directional-links/dist/index.mjs";
import { InlineLinkPreviewElementTransform } from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/@nolebase+vitepress-plugin-inline-link-preview@2.0.0-rc11_vitepress@1.1.4_@algolia+client-sea_puz3lwveka2akkk2cs7zr6fgey/node_modules/@nolebase/vitepress-plugin-inline-link-preview/dist/markdown-it/index.mjs";
import { buildEndGenerateOpenGraphImages } from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/@nolebase+vitepress-plugin-og-image@2.0.0-rc11_vitepress@1.1.4_@algolia+client-search@4.23.3__psj7fa5ryr3v7tc67v2g5sr7ty/node_modules/@nolebase/vitepress-plugin-og-image/dist/vitepress/index.mjs";
import { UnlazyImages } from "file:///Users/linlishi/projects/nolebase/node_modules/.pnpm/@nolebase+markdown-it-unlazy-img@2.0.0-rc11_@types+node@20.12.11_less@4.2.0_markdown-it@13.0.2/node_modules/@nolebase/markdown-it-unlazy-img/dist/index.mjs";

// metadata/index.ts
var siteName = "N\xF3l\xEBbase";
var siteDescription = "\u8BB0\u5F55\u56DE\u5FC6\uFF0C\u77E5\u8BC6\u548C\u7545\u60F3\u7684\u5730\u65B9";
var githubRepoLink = "https://github.com/indexss";
var plainTargetDomain = "nolebase.ayaka.io";
var targetDomain = `https://${plainTargetDomain}`;

// .vitepress/creators.ts
var getAvatarUrl = (name) => `https://github.com/${name}.png`;
var creators = [
  {
    name: "\u7D62\u9999\u732B",
    avatar: "",
    username: "nekomeowww",
    title: "N\xF3l\xEBbase \u539F\u59CB\u521B\u4F5C\u8005",
    desc: "\u5F00\u53D1\u8005\uFF0C\u4E13\u6CE8\u4E8E\u57FA\u7840\u8BBE\u65BD\u7EF4\u62A4\uFF0C\u6570\u636E\u5206\u6790\uFF0C\u540E\u7AEF\u3001DevOps \u5F00\u53D1",
    links: [
      { type: "github", icon: "github", link: "https://github.com/nekomeowww" },
      { type: "twitter", icon: "twitter", link: "https://twitter.com/ayakaneko" }
    ],
    nameAliases: ["nekomeowww", "\u7EDA\u9999\u732B", "\u7D62\u9999\u732B", "Neko Ayaka", "Ayaka Neko"],
    emailAliases: ["neko@ayaka.moe"]
  },
  {
    name: "\u7D62\u9999\u97F3",
    avatar: "",
    username: "LittleSound",
    title: "N\xF3l\xEBbase \u539F\u59CB\u521B\u4F5C\u8005",
    desc: "\u5F00\u6E90\u5F00\u53D1\u8005\uFF0C\u4E13\u6CE8\u4E8E\u524D\u7AEF\uFF0C\u4EE5\u53CA\u524D\u7AEF\u76F8\u5173\u5DE5\u5177\u5E93\u548C\u5DE5\u5177\u94FE\u5F00\u53D1",
    links: [
      { type: "github", icon: "github", link: "https://github.com/LittleSound" },
      { type: "twitter", icon: "twitter", link: "https://twitter.com/OikawaRizumu" }
    ],
    nameAliases: ["LittleSound", "\u7EDA\u9999\u97F3", "\u7D62\u9999\u97F3", "Rizumu Oikawa", "Rizumu Ayaka", "Ayaka Rizumu", "Rizumu"],
    emailAliases: ["rizumu@ayaka.moe", "rizumu@oqo.moe"]
  }
].map((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username);
  return c;
});
var creatorNames = creators.map((c) => c.name);
var creatorUsernames = creators.map((c) => c.username || "");

// .vitepress/docsMetadata.json
var sidebar = [
  {
    index: "\u{1F427} 38059-operating-systems-and-systems-programming",
    text: "\u{1F427} 38059-operating-systems-and-systems-programming",
    collapsed: true,
    items: [
      {
        index: "README",
        text: "README",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/README",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-0-intro",
        text: "week-0-intro",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-0-intro",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-1-computer-architecture-and-c",
        text: "week-1-computer-architecture-and-c",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-1-computer-architecture-and-c",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-10-file-system-and-device-drivers",
        text: "week-10-file-system-and-device-drivers",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-10-file-system-and-device-drivers",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-2-memory-and-structures",
        text: "week-2-memory-and-structures",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-2-memory-and-structures",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-3-file-function-and-compile",
        text: "week-3-file-function-and-compile",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-3-file-function-and-compile",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-4-multicore-concurrent-and-sockets",
        text: "week-4-multicore-concurrent-and-sockets",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-4-multicore-concurrent-and-sockets",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-5-os-design-principles-and-system-calls",
        text: "week-5-os-design-principles-and-system-calls",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-5-os-design-principles-and-system-calls",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-6-consolidation-week",
        text: "week-6-consolidation-week",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-6-consolidation-week",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-7-memory-management-and-kernel-programming",
        text: "week-7-memory-management-and-kernel-programming",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-7-memory-management-and-kernel-programming",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-8-process",
        text: "week-8-process",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-8-process",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-9-mutual-exclusion-for-cooperating-processes",
        text: "week-9-mutual-exclusion-for-cooperating-processes",
        link: "/\u7B14\u8BB0/\u{1F427} 38059-operating-systems-and-systems-programming/week-9-mutual-exclusion-for-cooperating-processes",
        lastUpdated: 1731630273e3
      }
    ]
  },
  {
    index: "\u{1F47E} 38965-machine-learning",
    text: "\u{1F47E} 38965-machine-learning",
    collapsed: true,
    items: [
      {
        index: "intro",
        text: "intro",
        link: "/\u7B14\u8BB0/\u{1F47E} 38965-machine-learning/intro",
        lastUpdated: 1731630273e3
      },
      {
        index: "logistic-regression",
        text: "logistic-regression",
        link: "/\u7B14\u8BB0/\u{1F47E} 38965-machine-learning/logistic-regression",
        lastUpdated: 1731630273e3
      },
      {
        index: "README",
        text: "README",
        link: "/\u7B14\u8BB0/\u{1F47E} 38965-machine-learning/README",
        lastUpdated: 1731630273e3
      },
      {
        index: "svm",
        text: "svm",
        link: "/\u7B14\u8BB0/\u{1F47E} 38965-machine-learning/svm",
        lastUpdated: 1731630273e3
      }
    ]
  },
  {
    index: "\u{1F4AC} CS224N-Natural Language Processing with Deep Learning",
    text: "\u{1F4AC} CS224N-Natural Language Processing with Deep Learning",
    collapsed: true,
    items: [
      {
        index: "test",
        text: "test",
        link: "/\u7B14\u8BB0/\u{1F4AC} CS224N-Natural Language Processing with Deep Learning/test",
        lastUpdated: 1731630273e3
      }
    ]
  },
  {
    index: "\u{1F510} 30195-security-and-networks",
    text: "\u{1F510} 30195-security-and-networks",
    collapsed: true,
    items: [
      {
        index: "README",
        text: "README",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/README",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-1-intro-to-security",
        text: "week-1-intro-to-security",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-1-intro-to-security",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-10-buffer-overflow",
        text: "week-10-buffer-overflow",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-10-buffer-overflow",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-2-hash-macs-authenticated-encryption-access-control",
        text: "week-2-hash-macs-authenticated-encryption-access-control",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-2-hash-macs-authenticated-encryption-access-control",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-3-symmetric-cryptography",
        text: "week-3-symmetric-cryptography",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-3-symmetric-cryptography",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-4-asymmetric-cryptography",
        text: "week-4-asymmetric-cryptography",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-4-asymmetric-cryptography",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-5-networking-and-protocols",
        text: "week-5-networking-and-protocols",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-5-networking-and-protocols",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-6-tls-and-tor",
        text: "week-6-tls-and-tor",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-6-tls-and-tor",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-7-web-attacks-part-1",
        text: "week-7-web-attacks-part-1",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-7-web-attacks-part-1",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-8-web-attacks-part-2",
        text: "week-8-web-attacks-part-2",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-8-web-attacks-part-2",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-9-reverse-engineering",
        text: "week-9-reverse-engineering",
        link: "/\u7B14\u8BB0/\u{1F510} 30195-security-and-networks/week-9-reverse-engineering",
        lastUpdated: 1731630273e3
      }
    ]
  },
  {
    index: "\u{1F916} 34255-artificial-intelligence-2",
    text: "\u{1F916} 34255-artificial-intelligence-2",
    collapsed: true,
    items: [
      {
        index: "README",
        text: "README",
        link: "/\u7B14\u8BB0/\u{1F916} 34255-artificial-intelligence-2/README",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-1-intro-and-mle",
        text: "week-1-intro-and-mle",
        link: "/\u7B14\u8BB0/\u{1F916} 34255-artificial-intelligence-2/week-1-intro-and-mle",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-2-and-3-lr-and-info-theory-and-tree",
        text: "week-2-and-3-lr-and-info-theory-and-tree",
        link: "/\u7B14\u8BB0/\u{1F916} 34255-artificial-intelligence-2/week-2-and-3-lr-and-info-theory-and-tree",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-4-bayesian-network",
        text: "week-4-bayesian-network",
        link: "/\u7B14\u8BB0/\u{1F916} 34255-artificial-intelligence-2/week-4-bayesian-network",
        lastUpdated: 1731630273e3
      },
      {
        index: "week-8-and-9-and-10-search-and-csp-and-game",
        text: "week-8-and-9-and-10-search-and-csp-and-game",
        link: "/\u7B14\u8BB0/\u{1F916} 34255-artificial-intelligence-2/week-8-and-9-and-10-search-and-csp-and-game",
        lastUpdated: 1731630273e3
      }
    ]
  },
  {
    index: "\u{1F9E0} 32167-neural-computation",
    text: "\u{1F9E0} 32167-neural-computation",
    collapsed: true,
    items: [
      {
        index: "backpropagation",
        text: "backpropagation",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/backpropagation",
        lastUpdated: 1731630273e3
      },
      {
        index: "cnn",
        text: "cnn",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/cnn",
        lastUpdated: 1731630273e3
      },
      {
        index: "gd-and-linear-classification",
        text: "gd-and-linear-classification",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/gd-and-linear-classification",
        lastUpdated: 1731630273e3
      },
      {
        index: "gnn",
        text: "gnn",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/gnn",
        lastUpdated: 1731630273e3
      },
      {
        index: "linear-models",
        text: "linear-models",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/linear-models",
        lastUpdated: 1731630273e3
      },
      {
        index: "README",
        text: "README",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/README",
        lastUpdated: 1731630273e3
      },
      {
        index: "rnn",
        text: "rnn",
        link: "/\u7B14\u8BB0/\u{1F9E0} 32167-neural-computation/rnn",
        lastUpdated: 1731630273e3
      }
    ]
  }
];

// .vitepress/config.ts
var config_default = defineConfig({
  vue: {
    template: {
      transformAssetUrls: {
        video: ["src", "poster"],
        source: ["src"],
        img: ["src"],
        image: ["xlink:href", "href"],
        use: ["xlink:href", "href"],
        NolebaseUnlazyImg: ["src"]
      }
    }
  },
  lang: "zh-CN",
  title: siteName,
  description: siteDescription,
  ignoreDeadLinks: true,
  head: [
    ["meta", {
      name: "theme-color",
      content: "#ffffff"
    }],
    [
      "link",
      {
        rel: "apple-touch-icon",
        href: "/apple-touch-icon.png",
        sizes: "180x180"
      }
    ],
    ["link", {
      rel: "icon",
      href: "/logo.svg",
      type: "image/svg+xml"
    }],
    [
      "link",
      {
        rel: "alternate icon",
        href: "/favicon.ico",
        type: "image/png",
        sizes: "16x16"
      }
    ],
    ["meta", {
      name: "author",
      content: creatorNames.join(", ")
    }],
    [
      "meta",
      {
        name: "keywords",
        content: ["markdown", "knowledge-base", "\u77E5\u8BC6\u5E93", "vitepress", "obsidian", "notebook", "notes", ...creatorUsernames].join(", ")
      }
    ],
    ["meta", {
      property: "og:title",
      content: siteName
    }],
    [
      "meta",
      {
        property: "og:image",
        content: `${targetDomain}/og.png`
      }
    ],
    ["meta", {
      property: "og:description",
      content: siteDescription
    }],
    ["meta", {
      property: "og:site_name",
      content: siteName
    }],
    ["meta", {
      name: "twitter:card",
      content: "summary_large_image"
    }],
    ["meta", {
      name: "twitter:creator",
      content: creatorUsernames.join(", ")
    }],
    [
      "meta",
      {
        name: "twitter:image",
        content: `${targetDomain}/og.png`
      }
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/safari-pinned-tab.svg",
        color: "#927baf"
      }
    ],
    ["link", {
      rel: "manifest",
      href: "/site.webmanifest"
    }],
    ["meta", {
      name: "msapplication-TileColor",
      content: "#603cba"
    }],
    // Proxying Plausible through Netlify | Plausible docs
    // https://plausible.io/docs/proxy/guides/netlify
    ["script", { "defer": "true", "data-domain": "nolebase.ayaka.io", "data-api": "/api/v1/page-external-data/submit", "src": "/assets/page-external-data/js/script.js" }]
  ],
  themeConfig: {
    outline: { label: "\u9875\u9762\u5927\u7EB2", level: "deep" },
    darkModeSwitchLabel: "\u5207\u6362\u4E3B\u9898",
    editLink: {
      pattern: `${githubRepoLink}/tree/main/:path`,
      text: "\u7F16\u8F91\u672C\u9875\u9762"
    },
    socialLinks: [
      { icon: "github", link: githubRepoLink }
      // { icon: 'discord', link: discordLink },
    ],
    footer: {
      message: '\u7528 <span style="color: #e25555;">&#9829;</span> \u64B0\u5199',
      copyright: '<a class="footer-cc-link" target="_blank" href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a> \xA9 2022-PRESENT N\xF3l\xEBbase \u7684\u521B\u4F5C\u8005\u4EEC'
    },
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362"
                }
              }
            }
          }
        },
        // Add title ang tags field in frontmatter to search
        // You can exclude a page from search by adding search: false to the page's frontmatter.
        _render(src, env, md) {
          let html = md.render(src, env);
          let tagsPart = "";
          let headingPart = "";
          let contentPart = "";
          let fullContent = "";
          const sortContent = () => [headingPart, tagsPart, contentPart];
          let { frontmatter, content } = env;
          if (!frontmatter)
            return html;
          if (frontmatter.search === false)
            return "";
          contentPart = content ||= src;
          const headingMatch = content.match(/^#{1} .*/m);
          const hasHeading = !!(headingMatch && headingMatch[0] && headingMatch.index !== void 0);
          if (hasHeading) {
            const headingEnd = headingMatch.index + headingMatch[0].length;
            headingPart = content.slice(0, headingEnd);
            contentPart = content.slice(headingEnd);
          } else if (frontmatter.title) {
            headingPart = `# ${frontmatter.title}`;
          }
          const tags = frontmatter.tags;
          if (tags && Array.isArray(tags) && tags.length)
            tagsPart = `Tags: #${tags.join(", #")}`;
          fullContent = sortContent().filter(Boolean).join("\n\n");
          html = md.render(fullContent, env);
          return html;
        }
      }
    },
    nav: [
      { text: "\u4E3B\u9875", link: "/" },
      // { text: '笔记', link: '/笔记/' },
      { text: "\u77E5\u8BC6\u5E93", link: "/\u7B14\u8BB0/" },
      { text: "\u6700\u8FD1\u66F4\u65B0", link: "/toc" }
    ],
    sidebar
  },
  markdown: {
    theme: {
      light: "github-light",
      dark: "one-dark-pro"
    },
    math: true,
    config: (md) => {
      md.use(MarkdownItFootnote);
      md.use(MarkdownItMathjax3);
      md.use(BiDirectionalLinks({
        dir: process.cwd()
      }));
      md.use(UnlazyImages(), {
        imgElementTag: "NolebaseUnlazyImg"
      });
      md.use(InlineLinkPreviewElementTransform, {
        tag: "VPNolebaseInlineLinkPreview"
      });
    }
  },
  async buildEnd(siteConfig) {
    await buildEndGenerateOpenGraphImages({
      baseUrl: targetDomain,
      category: {
        byLevel: 2
      }
    })(siteConfig);
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLnZpdGVwcmVzcy9jb25maWcudHMiLCAibWV0YWRhdGEvaW5kZXgudHMiLCAiLnZpdGVwcmVzcy9jcmVhdG9ycy50cyIsICIudml0ZXByZXNzL2RvY3NNZXRhZGF0YS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpbmxpc2hpL3Byb2plY3RzL25vbGViYXNlLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9saW5saXNoaS9wcm9qZWN0cy9ub2xlYmFzZS8udml0ZXByZXNzL2NvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbGlubGlzaGkvcHJvamVjdHMvbm9sZWJhc2UvLnZpdGVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgcHJvY2VzcyBmcm9tICdub2RlOnByb2Nlc3MnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlcHJlc3MnXG5pbXBvcnQgTWFya2Rvd25JdEZvb3Rub3RlIGZyb20gJ21hcmtkb3duLWl0LWZvb3Rub3RlJ1xuaW1wb3J0IE1hcmtkb3duSXRNYXRoamF4MyBmcm9tICdtYXJrZG93bi1pdC1tYXRoamF4MydcblxuaW1wb3J0IHsgQmlEaXJlY3Rpb25hbExpbmtzIH0gZnJvbSAnQG5vbGViYXNlL21hcmtkb3duLWl0LWJpLWRpcmVjdGlvbmFsLWxpbmtzJ1xuaW1wb3J0IHsgSW5saW5lTGlua1ByZXZpZXdFbGVtZW50VHJhbnNmb3JtIH0gZnJvbSAnQG5vbGViYXNlL3ZpdGVwcmVzcy1wbHVnaW4taW5saW5lLWxpbmstcHJldmlldy9tYXJrZG93bi1pdCdcbmltcG9ydCB7IGJ1aWxkRW5kR2VuZXJhdGVPcGVuR3JhcGhJbWFnZXMgfSBmcm9tICdAbm9sZWJhc2Uvdml0ZXByZXNzLXBsdWdpbi1vZy1pbWFnZS92aXRlcHJlc3MnXG5pbXBvcnQgeyBVbmxhenlJbWFnZXMgfSBmcm9tICdAbm9sZWJhc2UvbWFya2Rvd24taXQtdW5sYXp5LWltZydcblxuaW1wb3J0IHsgZGlzY29yZExpbmssIGdpdGh1YlJlcG9MaW5rLCBzaXRlRGVzY3JpcHRpb24sIHNpdGVOYW1lLCB0YXJnZXREb21haW4gfSBmcm9tICcuLi9tZXRhZGF0YSdcbmltcG9ydCB7IGNyZWF0b3JOYW1lcywgY3JlYXRvclVzZXJuYW1lcyB9IGZyb20gJy4vY3JlYXRvcnMnXG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSAnLi9kb2NzTWV0YWRhdGEuanNvbidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgdnVlOiB7XG4gICAgdGVtcGxhdGU6IHtcbiAgICAgIHRyYW5zZm9ybUFzc2V0VXJsczoge1xuICAgICAgICB2aWRlbzogWydzcmMnLCAncG9zdGVyJ10sXG4gICAgICAgIHNvdXJjZTogWydzcmMnXSxcbiAgICAgICAgaW1nOiBbJ3NyYyddLFxuICAgICAgICBpbWFnZTogWyd4bGluazpocmVmJywgJ2hyZWYnXSxcbiAgICAgICAgdXNlOiBbJ3hsaW5rOmhyZWYnLCAnaHJlZiddLFxuICAgICAgICBOb2xlYmFzZVVubGF6eUltZzogWydzcmMnXSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgbGFuZzogJ3poLUNOJyxcbiAgdGl0bGU6IHNpdGVOYW1lLFxuICBkZXNjcmlwdGlvbjogc2l0ZURlc2NyaXB0aW9uLFxuICBpZ25vcmVEZWFkTGlua3M6IHRydWUsXG4gIGhlYWQ6IFtcbiAgICBbJ21ldGEnLCB7XG4gICAgICBuYW1lOiAndGhlbWUtY29sb3InLFxuICAgICAgY29udGVudDogJyNmZmZmZmYnLFxuICAgIH1dLFxuICAgIFtcbiAgICAgICdsaW5rJyxcbiAgICAgIHtcbiAgICAgICAgcmVsOiAnYXBwbGUtdG91Y2gtaWNvbicsXG4gICAgICAgIGhyZWY6ICcvYXBwbGUtdG91Y2gtaWNvbi5wbmcnLFxuICAgICAgICBzaXplczogJzE4MHgxODAnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFsnbGluaycsIHtcbiAgICAgIHJlbDogJ2ljb24nLFxuICAgICAgaHJlZjogJy9sb2dvLnN2ZycsXG4gICAgICB0eXBlOiAnaW1hZ2Uvc3ZnK3htbCcsXG4gICAgfV0sXG4gICAgW1xuICAgICAgJ2xpbmsnLFxuICAgICAge1xuICAgICAgICByZWw6ICdhbHRlcm5hdGUgaWNvbicsXG4gICAgICAgIGhyZWY6ICcvZmF2aWNvbi5pY28nLFxuICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgc2l6ZXM6ICcxNngxNicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgWydtZXRhJywge1xuICAgICAgbmFtZTogJ2F1dGhvcicsXG4gICAgICBjb250ZW50OiBjcmVhdG9yTmFtZXMuam9pbignLCAnKSxcbiAgICB9XSxcbiAgICBbXG4gICAgICAnbWV0YScsXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdrZXl3b3JkcycsXG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgWydtYXJrZG93bicsICdrbm93bGVkZ2UtYmFzZScsICdcdTc3RTVcdThCQzZcdTVFOTMnLCAndml0ZXByZXNzJywgJ29ic2lkaWFuJywgJ25vdGVib29rJywgJ25vdGVzJywgLi4uY3JlYXRvclVzZXJuYW1lc10uam9pbignLCAnKSxcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIFsnbWV0YScsIHtcbiAgICAgIHByb3BlcnR5OiAnb2c6dGl0bGUnLFxuICAgICAgY29udGVudDogc2l0ZU5hbWUsXG4gICAgfV0sXG4gICAgW1xuICAgICAgJ21ldGEnLFxuICAgICAge1xuICAgICAgICBwcm9wZXJ0eTogJ29nOmltYWdlJyxcbiAgICAgICAgY29udGVudDogYCR7dGFyZ2V0RG9tYWlufS9vZy5wbmdgLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFsnbWV0YScsIHtcbiAgICAgIHByb3BlcnR5OiAnb2c6ZGVzY3JpcHRpb24nLFxuICAgICAgY29udGVudDogc2l0ZURlc2NyaXB0aW9uLFxuICAgIH1dLFxuICAgIFsnbWV0YScsIHtcbiAgICAgIHByb3BlcnR5OiAnb2c6c2l0ZV9uYW1lJyxcbiAgICAgIGNvbnRlbnQ6IHNpdGVOYW1lLFxuICAgIH1dLFxuXG4gICAgWydtZXRhJywge1xuICAgICAgbmFtZTogJ3R3aXR0ZXI6Y2FyZCcsXG4gICAgICBjb250ZW50OiAnc3VtbWFyeV9sYXJnZV9pbWFnZScsXG4gICAgfV0sXG4gICAgWydtZXRhJywge1xuICAgICAgbmFtZTogJ3R3aXR0ZXI6Y3JlYXRvcicsXG4gICAgICBjb250ZW50OiBjcmVhdG9yVXNlcm5hbWVzLmpvaW4oJywgJyksXG4gICAgfV0sXG4gICAgW1xuICAgICAgJ21ldGEnLFxuICAgICAge1xuICAgICAgICBuYW1lOiAndHdpdHRlcjppbWFnZScsXG4gICAgICAgIGNvbnRlbnQ6IGAke3RhcmdldERvbWFpbn0vb2cucG5nYCxcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIFtcbiAgICAgICdsaW5rJyxcbiAgICAgIHtcbiAgICAgICAgcmVsOiAnbWFzay1pY29uJyxcbiAgICAgICAgaHJlZjogJy9zYWZhcmktcGlubmVkLXRhYi5zdmcnLFxuICAgICAgICBjb2xvcjogJyM5MjdiYWYnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFsnbGluaycsIHtcbiAgICAgIHJlbDogJ21hbmlmZXN0JyxcbiAgICAgIGhyZWY6ICcvc2l0ZS53ZWJtYW5pZmVzdCcsXG4gICAgfV0sXG4gICAgWydtZXRhJywge1xuICAgICAgbmFtZTogJ21zYXBwbGljYXRpb24tVGlsZUNvbG9yJyxcbiAgICAgIGNvbnRlbnQ6ICcjNjAzY2JhJyxcbiAgICB9XSxcbiAgICAvLyBQcm94eWluZyBQbGF1c2libGUgdGhyb3VnaCBOZXRsaWZ5IHwgUGxhdXNpYmxlIGRvY3NcbiAgICAvLyBodHRwczovL3BsYXVzaWJsZS5pby9kb2NzL3Byb3h5L2d1aWRlcy9uZXRsaWZ5XG4gICAgWydzY3JpcHQnLCB7ICdkZWZlcic6ICd0cnVlJywgJ2RhdGEtZG9tYWluJzogJ25vbGViYXNlLmF5YWthLmlvJywgJ2RhdGEtYXBpJzogJy9hcGkvdjEvcGFnZS1leHRlcm5hbC1kYXRhL3N1Ym1pdCcsICdzcmMnOiAnL2Fzc2V0cy9wYWdlLWV4dGVybmFsLWRhdGEvanMvc2NyaXB0LmpzJyB9XSxcbiAgXSxcbiAgdGhlbWVDb25maWc6IHtcbiAgICBvdXRsaW5lOiB7IGxhYmVsOiAnXHU5ODc1XHU5NzYyXHU1OTI3XHU3RUIyJywgbGV2ZWw6ICdkZWVwJyB9LFxuICAgIGRhcmtNb2RlU3dpdGNoTGFiZWw6ICdcdTUyMDdcdTYzNjJcdTRFM0JcdTk4OTgnLFxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOiBgJHtnaXRodWJSZXBvTGlua30vdHJlZS9tYWluLzpwYXRoYCxcbiAgICAgIHRleHQ6ICdcdTdGMTZcdThGOTFcdTY3MkNcdTk4NzVcdTk3NjInLFxuICAgIH0sXG4gICAgc29jaWFsTGlua3M6IFtcbiAgICAgIHsgaWNvbjogJ2dpdGh1YicsIGxpbms6IGdpdGh1YlJlcG9MaW5rIH0sXG4gICAgICAvLyB7IGljb246ICdkaXNjb3JkJywgbGluazogZGlzY29yZExpbmsgfSxcbiAgICBdLFxuICAgIGZvb3Rlcjoge1xuICAgICAgbWVzc2FnZTogJ1x1NzUyOCA8c3BhbiBzdHlsZT1cImNvbG9yOiAjZTI1NTU1O1wiPiYjOTgyOTs8L3NwYW4+IFx1NjRCMFx1NTE5OScsXG4gICAgICBjb3B5cmlnaHQ6XG4gICAgICAgICc8YSBjbGFzcz1cImZvb3Rlci1jYy1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHBzOi8vY3JlYXRpdmVjb21tb25zLm9yZy9saWNlbnNlcy9ieS1zYS80LjAvXCI+Q0MgQlktU0EgNC4wPC9hPiBcdTAwQTkgMjAyMi1QUkVTRU5UIE5cdTAwRjNsXHUwMEVCYmFzZSBcdTc2ODRcdTUyMUJcdTRGNUNcdTgwMDVcdTRFRUMnLFxuICAgIH0sXG4gICAgc2VhcmNoOiB7XG4gICAgICBwcm92aWRlcjogJ2xvY2FsJyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgbG9jYWxlczoge1xuICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtb2RhbDoge1xuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1RleHQ6ICdcdTY1RTBcdTZDRDVcdTYyN0VcdTUyMzBcdTc2RjhcdTUxNzNcdTdFRDNcdTY3OUMnLFxuICAgICAgICAgICAgICAgIHJlc2V0QnV0dG9uVGl0bGU6ICdcdTZFMDVcdTk2NjRcdTY3RTVcdThCRTJcdTY3NjFcdTRFRjYnLFxuICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gQWRkIHRpdGxlIGFuZyB0YWdzIGZpZWxkIGluIGZyb250bWF0dGVyIHRvIHNlYXJjaFxuICAgICAgICAvLyBZb3UgY2FuIGV4Y2x1ZGUgYSBwYWdlIGZyb20gc2VhcmNoIGJ5IGFkZGluZyBzZWFyY2g6IGZhbHNlIHRvIHRoZSBwYWdlJ3MgZnJvbnRtYXR0ZXIuXG4gICAgICAgIF9yZW5kZXIoc3JjLCBlbnYsIG1kKSB7XG4gICAgICAgICAgLy8gd2l0aG91dCBgbWQucmVuZGVyKHNyYywgZW52KWAsIHRoZSBzb21lIGluZm9ybWF0aW9uIHdpbGwgYmUgbWlzc2luZyBmcm9tIHRoZSBlbnYuXG4gICAgICAgICAgbGV0IGh0bWwgPSBtZC5yZW5kZXIoc3JjLCBlbnYpXG4gICAgICAgICAgbGV0IHRhZ3NQYXJ0ID0gJydcbiAgICAgICAgICBsZXQgaGVhZGluZ1BhcnQgPSAnJ1xuICAgICAgICAgIGxldCBjb250ZW50UGFydCA9ICcnXG4gICAgICAgICAgbGV0IGZ1bGxDb250ZW50ID0gJydcbiAgICAgICAgICBjb25zdCBzb3J0Q29udGVudCA9ICgpID0+IFtoZWFkaW5nUGFydCwgdGFnc1BhcnQsIGNvbnRlbnRQYXJ0XSBhcyBjb25zdFxuICAgICAgICAgIGxldCB7IGZyb250bWF0dGVyLCBjb250ZW50IH0gPSBlbnZcblxuICAgICAgICAgIGlmICghZnJvbnRtYXR0ZXIpXG4gICAgICAgICAgICByZXR1cm4gaHRtbFxuXG4gICAgICAgICAgaWYgKGZyb250bWF0dGVyLnNlYXJjaCA9PT0gZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gJydcblxuICAgICAgICAgIGNvbnRlbnRQYXJ0ID0gY29udGVudCB8fD0gc3JjXG5cbiAgICAgICAgICBjb25zdCBoZWFkaW5nTWF0Y2ggPSBjb250ZW50Lm1hdGNoKC9eI3sxfSAuKi9tKVxuICAgICAgICAgIGNvbnN0IGhhc0hlYWRpbmcgPSAhIShoZWFkaW5nTWF0Y2ggJiYgaGVhZGluZ01hdGNoWzBdICYmIGhlYWRpbmdNYXRjaC5pbmRleCAhPT0gdW5kZWZpbmVkKVxuXG4gICAgICAgICAgaWYgKGhhc0hlYWRpbmcpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdFbmQgPSBoZWFkaW5nTWF0Y2guaW5kZXghICsgaGVhZGluZ01hdGNoWzBdLmxlbmd0aFxuICAgICAgICAgICAgaGVhZGluZ1BhcnQgPSBjb250ZW50LnNsaWNlKDAsIGhlYWRpbmdFbmQpXG4gICAgICAgICAgICBjb250ZW50UGFydCA9IGNvbnRlbnQuc2xpY2UoaGVhZGluZ0VuZClcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoZnJvbnRtYXR0ZXIudGl0bGUpIHtcbiAgICAgICAgICAgIGhlYWRpbmdQYXJ0ID0gYCMgJHtmcm9udG1hdHRlci50aXRsZX1gXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdGFncyA9IGZyb250bWF0dGVyLnRhZ3NcbiAgICAgICAgICBpZiAodGFncyAmJiBBcnJheS5pc0FycmF5KHRhZ3MpICYmIHRhZ3MubGVuZ3RoKVxuICAgICAgICAgICAgdGFnc1BhcnQgPSBgVGFnczogIyR7dGFncy5qb2luKCcsICMnKX1gXG5cbiAgICAgICAgICBmdWxsQ29udGVudCA9IHNvcnRDb250ZW50KCkuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcblxcbicpXG5cbiAgICAgICAgICBodG1sID0gbWQucmVuZGVyKGZ1bGxDb250ZW50LCBlbnYpXG5cbiAgICAgICAgICByZXR1cm4gaHRtbFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG5hdjogW1xuICAgICAgeyB0ZXh0OiAnXHU0RTNCXHU5ODc1JywgbGluazogJy8nIH0sXG4gICAgICAvLyB7IHRleHQ6ICdcdTdCMTRcdThCQjAnLCBsaW5rOiAnL1x1N0IxNFx1OEJCMC8nIH0sXG4gICAgICB7IHRleHQ6ICdcdTc3RTVcdThCQzZcdTVFOTMnLCBsaW5rOiAnL1x1N0IxNFx1OEJCMC8nIH0sXG4gICAgICB7IHRleHQ6ICdcdTY3MDBcdThGRDFcdTY2RjRcdTY1QjAnLCBsaW5rOiAnL3RvYycgfSxcbiAgICBdLFxuICAgIHNpZGViYXIsXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgdGhlbWU6IHtcbiAgICAgIGxpZ2h0OiAnZ2l0aHViLWxpZ2h0JyxcbiAgICAgIGRhcms6ICdvbmUtZGFyay1wcm8nLFxuICAgIH0sXG4gICAgbWF0aDogdHJ1ZSxcbiAgICBjb25maWc6IChtZCkgPT4ge1xuICAgICAgbWQudXNlKE1hcmtkb3duSXRGb290bm90ZSlcbiAgICAgIG1kLnVzZShNYXJrZG93bkl0TWF0aGpheDMpXG4gICAgICBtZC51c2UoQmlEaXJlY3Rpb25hbExpbmtzKHtcbiAgICAgICAgZGlyOiBwcm9jZXNzLmN3ZCgpLFxuICAgICAgfSkpXG4gICAgICBtZC51c2UoVW5sYXp5SW1hZ2VzKCksIHtcbiAgICAgICAgaW1nRWxlbWVudFRhZzogJ05vbGViYXNlVW5sYXp5SW1nJyxcbiAgICAgIH0pXG4gICAgICBtZC51c2UoSW5saW5lTGlua1ByZXZpZXdFbGVtZW50VHJhbnNmb3JtLCB7XG4gICAgICAgIHRhZzogJ1ZQTm9sZWJhc2VJbmxpbmVMaW5rUHJldmlldycsXG4gICAgICB9KVxuICAgIH0sXG4gIH0sXG4gIGFzeW5jIGJ1aWxkRW5kKHNpdGVDb25maWcpIHtcbiAgICBhd2FpdCBidWlsZEVuZEdlbmVyYXRlT3BlbkdyYXBoSW1hZ2VzKHtcbiAgICAgIGJhc2VVcmw6IHRhcmdldERvbWFpbixcbiAgICAgIGNhdGVnb3J5OiB7XG4gICAgICAgIGJ5TGV2ZWw6IDIsXG4gICAgICB9LFxuICAgIH0pKHNpdGVDb25maWcpXG4gIH0sXG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbGlubGlzaGkvcHJvamVjdHMvbm9sZWJhc2UvbWV0YWRhdGFcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9saW5saXNoaS9wcm9qZWN0cy9ub2xlYmFzZS9tZXRhZGF0YS9pbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbGlubGlzaGkvcHJvamVjdHMvbm9sZWJhc2UvbWV0YWRhdGEvaW5kZXgudHNcIjsvKiogXHU2NTg3XHU2NzJDICovXG5leHBvcnQgY29uc3Qgc2l0ZU5hbWUgPSAnTlx1MDBGM2xcdTAwRUJiYXNlJ1xuZXhwb3J0IGNvbnN0IHNpdGVTaG9ydE5hbWUgPSAnTlx1MDBGM2xcdTAwRUJiYXNlJ1xuZXhwb3J0IGNvbnN0IHNpdGVEZXNjcmlwdGlvbiA9ICdcdThCQjBcdTVGNTVcdTU2REVcdTVGQzZcdUZGMENcdTc3RTVcdThCQzZcdTU0OENcdTc1NDVcdTYwRjNcdTc2ODRcdTU3MzBcdTY1QjknXG5cbi8qKiBcdTY1ODdcdTY4NjNcdTYyNDBcdTU3MjhcdTc2RUVcdTVGNTUgKi9cbmV4cG9ydCBjb25zdCBpbmNsdWRlID0gWydcdTdCMTRcdThCQjAnLCAnXHU3NTFGXHU2RDNCJ11cblxuLyoqIFJlcG8gKi9cbmV4cG9ydCBjb25zdCBnaXRodWJSZXBvTGluayA9ICdodHRwczovL2dpdGh1Yi5jb20vaW5kZXhzcydcbi8qKiBEaXNjb3JkICovXG5leHBvcnQgY29uc3QgZGlzY29yZExpbmsgPSAnaHR0cHM6Ly9kaXNjb3JkLmdnL1h1TkZEY0RaR2onXG5cbi8qKiBcdTY1RTBcdTUzNEZcdThCQUVcdTUyNERcdTdGMDBcdTU3REZcdTU0MEQgKi9cbmV4cG9ydCBjb25zdCBwbGFpblRhcmdldERvbWFpbiA9ICdub2xlYmFzZS5heWFrYS5pbydcbi8qKiBcdTVCOENcdTY1NzRcdTU3REZcdTU0MEQgKi9cbmV4cG9ydCBjb25zdCB0YXJnZXREb21haW4gPSBgaHR0cHM6Ly8ke3BsYWluVGFyZ2V0RG9tYWlufWBcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2xpbmxpc2hpL3Byb2plY3RzL25vbGViYXNlLy52aXRlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9saW5saXNoaS9wcm9qZWN0cy9ub2xlYmFzZS8udml0ZXByZXNzL2NyZWF0b3JzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9saW5saXNoaS9wcm9qZWN0cy9ub2xlYmFzZS8udml0ZXByZXNzL2NyZWF0b3JzLnRzXCI7ZXhwb3J0IGludGVyZmFjZSBTb2NpYWxFbnRyeSB7XG4gIHR5cGU6ICdnaXRodWInIHwgJ3R3aXR0ZXInIHwgJ2VtYWlsJ1xuICBpY29uOiBzdHJpbmdcbiAgbGluazogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRvciB7XG4gIGF2YXRhcjogc3RyaW5nXG4gIG5hbWU6IHN0cmluZ1xuICB1c2VybmFtZT86IHN0cmluZ1xuICB0aXRsZT86IHN0cmluZ1xuICBvcmc/OiBzdHJpbmdcbiAgZGVzYz86IHN0cmluZ1xuICBsaW5rcz86IFNvY2lhbEVudHJ5W11cbiAgbmFtZUFsaWFzZXM/OiBzdHJpbmdbXVxuICBlbWFpbEFsaWFzZXM/OiBzdHJpbmdbXVxufVxuXG5jb25zdCBnZXRBdmF0YXJVcmwgPSAobmFtZTogc3RyaW5nKSA9PiBgaHR0cHM6Ly9naXRodWIuY29tLyR7bmFtZX0ucG5nYFxuXG5leHBvcnQgY29uc3QgY3JlYXRvcnM6IENyZWF0b3JbXSA9IFtcbiAge1xuICAgIG5hbWU6ICdcdTdENjJcdTk5OTlcdTczMkInLFxuICAgIGF2YXRhcjogJycsXG4gICAgdXNlcm5hbWU6ICduZWtvbWVvd3d3JyxcbiAgICB0aXRsZTogJ05cdTAwRjNsXHUwMEVCYmFzZSBcdTUzOUZcdTU5Q0JcdTUyMUJcdTRGNUNcdTgwMDUnLFxuICAgIGRlc2M6ICdcdTVGMDBcdTUzRDFcdTgwMDVcdUZGMENcdTRFMTNcdTZDRThcdTRFOEVcdTU3RkFcdTc4NDBcdThCQkVcdTY1QkRcdTdFRjRcdTYyQTRcdUZGMENcdTY1NzBcdTYzNkVcdTUyMDZcdTY3OTBcdUZGMENcdTU0MEVcdTdBRUZcdTMwMDFEZXZPcHMgXHU1RjAwXHU1M0QxJyxcbiAgICBsaW5rczogW1xuICAgICAgeyB0eXBlOiAnZ2l0aHViJywgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vbmVrb21lb3d3dycgfSxcbiAgICAgIHsgdHlwZTogJ3R3aXR0ZXInLCBpY29uOiAndHdpdHRlcicsIGxpbms6ICdodHRwczovL3R3aXR0ZXIuY29tL2F5YWthbmVrbycgfSxcbiAgICBdLFxuICAgIG5hbWVBbGlhc2VzOiBbJ25la29tZW93d3cnLCAnXHU3RURBXHU5OTk5XHU3MzJCJywgJ1x1N0Q2Mlx1OTk5OVx1NzMyQicsICdOZWtvIEF5YWthJywgJ0F5YWthIE5la28nXSxcbiAgICBlbWFpbEFsaWFzZXM6IFsnbmVrb0BheWFrYS5tb2UnXSxcbiAgfSxcbiAge1xuICAgIG5hbWU6ICdcdTdENjJcdTk5OTlcdTk3RjMnLFxuICAgIGF2YXRhcjogJycsXG4gICAgdXNlcm5hbWU6ICdMaXR0bGVTb3VuZCcsXG4gICAgdGl0bGU6ICdOXHUwMEYzbFx1MDBFQmJhc2UgXHU1MzlGXHU1OUNCXHU1MjFCXHU0RjVDXHU4MDA1JyxcbiAgICBkZXNjOiAnXHU1RjAwXHU2RTkwXHU1RjAwXHU1M0QxXHU4MDA1XHVGRjBDXHU0RTEzXHU2Q0U4XHU0RThFXHU1MjREXHU3QUVGXHVGRjBDXHU0RUU1XHU1M0NBXHU1MjREXHU3QUVGXHU3NkY4XHU1MTczXHU1REU1XHU1MTc3XHU1RTkzXHU1NDhDXHU1REU1XHU1MTc3XHU5NEZFXHU1RjAwXHU1M0QxJyxcbiAgICBsaW5rczogW1xuICAgICAgeyB0eXBlOiAnZ2l0aHViJywgaWNvbjogJ2dpdGh1YicsIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vTGl0dGxlU291bmQnIH0sXG4gICAgICB7IHR5cGU6ICd0d2l0dGVyJywgaWNvbjogJ3R3aXR0ZXInLCBsaW5rOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS9PaWthd2FSaXp1bXUnIH0sXG4gICAgXSxcbiAgICBuYW1lQWxpYXNlczogWydMaXR0bGVTb3VuZCcsICdcdTdFREFcdTk5OTlcdTk3RjMnLCAnXHU3RDYyXHU5OTk5XHU5N0YzJywgJ1JpenVtdSBPaWthd2EnLCAnUml6dW11IEF5YWthJywgJ0F5YWthIFJpenVtdScsICdSaXp1bXUnXSxcbiAgICBlbWFpbEFsaWFzZXM6IFsncml6dW11QGF5YWthLm1vZScsICdyaXp1bXVAb3FvLm1vZSddLFxuICB9LFxuXS5tYXA8Q3JlYXRvcj4oKGMpID0+IHtcbiAgYy5hdmF0YXIgPSBjLmF2YXRhciB8fCBnZXRBdmF0YXJVcmwoYy51c2VybmFtZSlcbiAgcmV0dXJuIGMgYXMgQ3JlYXRvclxufSlcblxuZXhwb3J0IGNvbnN0IGNyZWF0b3JOYW1lcyA9IGNyZWF0b3JzLm1hcChjID0+IGMubmFtZSlcbmV4cG9ydCBjb25zdCBjcmVhdG9yVXNlcm5hbWVzID0gY3JlYXRvcnMubWFwKGMgPT4gYy51c2VybmFtZSB8fCAnJylcbiIsICJ7XG4gIFwiZG9jc1wiOiBbXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvaW5kZXgubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcImE1NzY0NzY1OTQ4NWViNmQ3YzM4ZGFhY2ZiMTQzYjY5YTViZjlmMTY4NjI4ZmQ2MjRiNTRiMjAxZjM2NTQ3ZjJcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvUkVBRE1FLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJmMDk2N2NkNjM1MDRiOWYwYTA4YjViOTQxMTM2OTdhOGQ2YWMyOTA2MmY4YjFhMzBlODZjNGQ3MGM2ZDQ5M2I0XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstMC1pbnRyby5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiODYzMTcxNjc1NTBmODI1NGVlZDJiYTllOGIzYWY2NjdhMzBhMThjODMxNjY3YjY0NTQwOWQ2ZTg4OWQ5NTA2NVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZy93ZWVrLTEtY29tcHV0ZXItYXJjaGl0ZWN0dXJlLWFuZC1jLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCIzZWI4NjA1ZmM4Yzk5NzI1ZWI2N2UwMmU0NjE3NzQ4MGEyMTNkOWE0MGQ5NWRhYWNiNTg5N2YxYjYwZmY3OTYwXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstMTAtZmlsZS1zeXN0ZW0tYW5kLWRldmljZS1kcml2ZXJzLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJjMzU2YzQ5M2ZjZTg2NzYyMGUxZTg1Njg4MDQzMmVhMTdiNzhiZDFhYzQyNjZiNjA2MjAzMTI5Y2NhMTMzYmM0XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstMi1tZW1vcnktYW5kLXN0cnVjdHVyZXMubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjEyNWEyMjY4NDMxYzIyNDQ2YTJmMzNjNGY1ODJhZjE1NzY1YmE2OTllZTg0ZDA5YmNkN2JhODEzYjViMjExNTRcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay0zLWZpbGUtZnVuY3Rpb24tYW5kLWNvbXBpbGUubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjJkMDJiMDhjYzE5ZTU5ZTgyYTU4YjM1OWQxZDJlZDNmMTY0MmQ1NmM3YzIzZDcxNzViMDMwZjFjMTFhOTZmNjhcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay00LW11bHRpY29yZS1jb25jdXJyZW50LWFuZC1zb2NrZXRzLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJkMTRlNzUzZTE3ZTUzNDQ3MTVlNTVkNjYyZmQwODFmZDMzZjEwNTg3MDY0OGViNzczMzIyZjJiMmUyYzhhODVhXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstNS1vcy1kZXNpZ24tcHJpbmNpcGxlcy1hbmQtc3lzdGVtLWNhbGxzLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI5NTFiOTE1N2Q2YzNjODlhMjNmNTYzNTA5MTRlZDVkNzRiNzRkYTk0OWE2Njk5NGQ1OGMyZDYwMjRhMjdjZDk0XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstNi1jb25zb2xpZGF0aW9uLXdlZWsubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjYzYzYyODMwZDgxZTUxNzZjZTU5Y2YzNmYxYzM5OWNlODFhY2I4OGY3ODdiM2VlNDhkMjlkNDg1YTMzODYyZmJcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay03LW1lbW9yeS1tYW5hZ2VtZW50LWFuZC1rZXJuZWwtcHJvZ3JhbW1pbmcubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjJjNGE4ZmE2NWY0ZjQ4OTEyY2U4YzI2MWI0NjFiZTA3YjE2NzMwYjBjNWIyYzRlZjk4ZjY0ZmUyMjZmYTM2YjhcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay04LXByb2Nlc3MubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjQ5MjlhZDU5MmY4YjE5NTkwNjU0MjQ1ODNiNmU5MWFmYjEzOWQ0NDA1OTY1YmRkYjIyYjJiNTlmMWNmYjczM2ZcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay05LW11dHVhbC1leGNsdXNpb24tZm9yLWNvb3BlcmF0aW5nLXByb2Nlc3Nlcy5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiOGVhMTQwMDhjNmM5YmUwZTRiODgzY2QwN2IwZjFmYmFiZjAzNjA3Zjg3YzYzN2ZmM2M0ZDMyZDIwNjJlOTk5MFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REM3RSAzODk2NS1tYWNoaW5lLWxlYXJuaW5nL1JFQURNRS5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiNzM5MzM2MGMwODY0OTE3N2ZhMWFmZjAwODRiOTBjOGE4OWIxMzdhYzY3YTUxZjRiNjY2MWFkNGQ2NWQ4ODdlZFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REM3RSAzODk2NS1tYWNoaW5lLWxlYXJuaW5nL2ludHJvLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJmZmFjMGE1ZGY2MTBlNjQ0ZDg0MmIxZjViMjFhNGE2N2M0YzY4OTUxZWJlNGQ3YjQ1ZjdjNDlhOWExNjA5MzA5XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVEQzdFIDM4OTY1LW1hY2hpbmUtbGVhcm5pbmcvbG9naXN0aWMtcmVncmVzc2lvbi5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiODFmYmM5OWE0MmFjMDI4Yzc4YjA0MGFmNzhjM2ZiOTM5NjcxYzRjMTIwMzhhZDY5NDYzNTI4ZDg4MDdlNTAwZVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REM3RSAzODk2NS1tYWNoaW5lLWxlYXJuaW5nL3N2bS5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiN2E3NTgyNmYyNWFjZDk2YmE0NzA5Y2IwZjhkOWViZWY2OTkxZjA2ZmUyZGU5ZWM2OTBiNDQwZmFhYjJjMjg0N1wiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1RENBQyBDUzIyNE4tTmF0dXJhbCBMYW5ndWFnZSBQcm9jZXNzaW5nIHdpdGggRGVlcCBMZWFybmluZy90ZXN0Lm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJhNjY1YTQ1OTIwNDIyZjlkNDE3ZTQ4NjdlZmRjNGZiOGEwNGExZjNmZmYxZmEwN2U5OThlODZmN2Y3YTI3YWUzXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy9SRUFETUUubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjVjZjQwM2FmYjRkNmQ3NjVmYzkxYmNmZDllODcyZjAwNjAxYzlmMmNiMzllOWQxYzFlNjRhYzQzNzJkNTQ0M2JcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstMS1pbnRyby10by1zZWN1cml0eS5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiOWY3YzdjOWZmYjViMGNjMTIwYzE4MjRlMDVlNDg1NzhlMjFiNTQyZjBlMjc2NTNiNTg2NjhjNjYxMzgxYjNhYVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3Mvd2Vlay0xMC1idWZmZXItb3ZlcmZsb3cubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjMyMWYyNmJjYjgwMjI0NzliMTZjOTRiZTRlYWM2NTAzMGQzMzEyZjQzOTQwMGZlMjU1NjlkMTUxYzk0NzFkNGRcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstMi1oYXNoLW1hY3MtYXV0aGVudGljYXRlZC1lbmNyeXB0aW9uLWFjY2Vzcy1jb250cm9sLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCJiNDIwMWNiNTkzMGVkMDFiZDRkNzFhMmFkZjMyNWVkMzVjN2Y4ZDE1Y2EzNTcxZmE1YzQwMDI3ZTQ4MzNlNGFhXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTMtc3ltbWV0cmljLWNyeXB0b2dyYXBoeS5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiYWNmMDE4ZDlmMTE2OGMwMjFkMGQyMjgyNGI1ZWQzYjJmZmIzYTVhY2Y3Y2Q0ZjA4NTNkODgzNmJlZGNjOWVhMFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3Mvd2Vlay00LWFzeW1tZXRyaWMtY3J5cHRvZ3JhcGh5Lm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCIyYzQzOTE4MGYwNTdhMThlYjU1ZTU1ZGY1OTFlN2IxOWI3YTk4ODM1NzViMGU3ZDE4ZGYyYmJkY2ZhOTc1ZTdjXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTUtbmV0d29ya2luZy1hbmQtcHJvdG9jb2xzLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI0ZjExNGU2MGM5YzlhOGZmYjc5ODdlYmIwN2JjZjA2ZTA3N2ZmZTIzMGQ2YWZhMzdiMzAyMDI0NWNiYjc1NTU0XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTYtdGxzLWFuZC10b3IubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcImE5OTRmYWQyN2MzZGEyMzdhYTcwYTE2OTk5MmY1YTY4ZjU0YTM3NjRmMmU2NDFmYWQ1Mzc0ZmI4YTI2ZmY1OTZcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstNy13ZWItYXR0YWNrcy1wYXJ0LTEubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjY4MzJjOTU1OTIxYmNjMmIyMjlhY2UxNzA5MmJkZTZkYzc5MjJkODE5ZjE0ZjRlYjcyNTEzZmRjOWMwNWIzMjFcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstOC13ZWItYXR0YWNrcy1wYXJ0LTIubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjY2NTM1ZmY5NjJjOWE4NzcyMzc3MjEyZDVmZWUxZGM4NGFiMDhkYzdjOTVjZGI2OGIwYWRmMTQzOTc0NjMyYmZcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstOS1yZXZlcnNlLWVuZ2luZWVyaW5nLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI2YzQzMGYyOWFiZTlhM2JkMGM4NDMzM2ZhMzhlMzQyMDdlYzllMGE2MGMxODQ4MzgwOGQzNWJkMjRmZjcyODMyXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTIvUkVBRE1FLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCIzN2Y5NWZlZDRhYmJiMTNkMmQ3NTlkMTY0YjcxNTQzYzFiNjIyN2ZjMTU4NWQ3Y2M5MTMwZTBiMDkzZTM5ZjQ3XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTIvd2Vlay0xLWludHJvLWFuZC1tbGUubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcImFkZTI1ODA3MmRlZDQwOGFhNDM1YTQ4NjZkYmMzYzEwZDEwZDliNmJjMjY1ZmNjZTlkZWM2YWQ2ZWQ4ZDYzYTVcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0VcdUREMTYgMzQyNTUtYXJ0aWZpY2lhbC1pbnRlbGxpZ2VuY2UtMi93ZWVrLTItYW5kLTMtbHItYW5kLWluZm8tdGhlb3J5LWFuZC10cmVlLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI3NWIzZTE0ZjUyNDg5NmU0ZDBhZWQ2MWU3MGQ4M2I5YjQzYjdmNjg1MDA5NmRkMDY0OTViMWNiZDU0ODdlMTIxXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTIvd2Vlay00LWJheWVzaWFuLW5ldHdvcmsubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjEyYTMwZjJlOTcyNDMxYWViYWRlY2ZjNzhlNWMzNjdiZjA4ZTlkN2M2YzZlZDI1OWJmOTJhMWVlNThjZjA4ZjBcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0VcdUREMTYgMzQyNTUtYXJ0aWZpY2lhbC1pbnRlbGxpZ2VuY2UtMi93ZWVrLTgtYW5kLTktYW5kLTEwLXNlYXJjaC1hbmQtY3NwLWFuZC1nYW1lLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI2NTc2OWRjMjExZjgxYmQ3MTNmNGI1ZGY2ZTJlYmEzODEyOTllZWRlZWQyMDliNDI4ZDc4NTJjNzg5MjBmMTFjXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9SRUFETUUubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcImRjODA5MTQyMmUzZjdkNWE3ODI3MWNkZDNmYWYzZjM4MzhkNzEzNGI3ZTczYTI1NTlkOGZmMjllZTRjNTllODdcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0VcdURERTAgMzIxNjctbmV1cmFsLWNvbXB1dGF0aW9uL2JhY2twcm9wYWdhdGlvbi5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiOGM5ZDg4N2JlZjExOWRjOTAzNzI2MDI1OTFmNGI1ODlkNGRmNWFmZGE3ZDE4NDU0MjhiZTNiYWQyOTQ0ODBmZFwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwicmVsYXRpdmVQYXRoXCI6IFwiXHU3QjE0XHU4QkIwL1x1RDgzRVx1RERFMCAzMjE2Ny1uZXVyYWwtY29tcHV0YXRpb24vY25uLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI0OTkxNTE5OTk0ZTQ4MmI2NjQ4OTE3NmMxODZlY2JhYWMwNjAyOWQwNzdhNWRkYzcyOWZkMWFlYWFkN2IxNzg0XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9nZC1hbmQtbGluZWFyLWNsYXNzaWZpY2F0aW9uLm1kXCIsXG4gICAgICBcImhhc2hlc1wiOiB7XG4gICAgICAgIFwic2hhMjU2XCI6IHtcbiAgICAgICAgICBcImNvbnRlbnRcIjogXCI3NTg3YWNmMGViYWQ2MjgwNWVlMDg3YWVmZTdiYjdmMWM1NzExMjVhZjlmNjcxZGEwNDUxMmVlOTJhOGEzZDc5XCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgXCJyZWxhdGl2ZVBhdGhcIjogXCJcdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9nbm4ubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjg1MDkzMjcxMGQ1ZWE3ZTM3NzFkM2Q4NTBhMGI0MGQ4YjRmMTU0NzI5NGJiMDEwZDJlZDdjYTFhODk2YWQ5MjZcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0VcdURERTAgMzIxNjctbmV1cmFsLWNvbXB1dGF0aW9uL2xpbmVhci1tb2RlbHMubWRcIixcbiAgICAgIFwiaGFzaGVzXCI6IHtcbiAgICAgICAgXCJzaGEyNTZcIjoge1xuICAgICAgICAgIFwiY29udGVudFwiOiBcIjI4Y2U1MDNhZDU2ZmU5OTUxNzZjNGU5OGM4NmU1ZDE1MDMzNDNjZjU5YTA5Y2E0MjI5ZDAxZTBhN2U3NjgyMGJcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBcInJlbGF0aXZlUGF0aFwiOiBcIlx1N0IxNFx1OEJCMC9cdUQ4M0VcdURERTAgMzIxNjctbmV1cmFsLWNvbXB1dGF0aW9uL3Jubi5tZFwiLFxuICAgICAgXCJoYXNoZXNcIjoge1xuICAgICAgICBcInNoYTI1NlwiOiB7XG4gICAgICAgICAgXCJjb250ZW50XCI6IFwiZDhhNDNmYTczNDY4N2Y3M2YxZGNkNzA4YjliMWY3YzdkOWVkMGMwZGMzNjg3MDE2MTNlZTAxNjc2MTI2YWExMVwiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIF0sXG4gIFwic2lkZWJhclwiOiBbXG4gICAge1xuICAgICAgXCJpbmRleFwiOiBcIlx1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZ1wiLFxuICAgICAgXCJ0ZXh0XCI6IFwiXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nXCIsXG4gICAgICBcImNvbGxhcHNlZFwiOiB0cnVlLFxuICAgICAgXCJpdGVtc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvUkVBRE1FXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0wLWludHJvXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay0wLWludHJvXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay0wLWludHJvXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0xLWNvbXB1dGVyLWFyY2hpdGVjdHVyZS1hbmQtY1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstMS1jb21wdXRlci1hcmNoaXRlY3R1cmUtYW5kLWNcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZy93ZWVrLTEtY29tcHV0ZXItYXJjaGl0ZWN0dXJlLWFuZC1jXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0xMC1maWxlLXN5c3RlbS1hbmQtZGV2aWNlLWRyaXZlcnNcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTEwLWZpbGUtc3lzdGVtLWFuZC1kZXZpY2UtZHJpdmVyc1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstMTAtZmlsZS1zeXN0ZW0tYW5kLWRldmljZS1kcml2ZXJzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0yLW1lbW9yeS1hbmQtc3RydWN0dXJlc1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstMi1tZW1vcnktYW5kLXN0cnVjdHVyZXNcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZy93ZWVrLTItbWVtb3J5LWFuZC1zdHJ1Y3R1cmVzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0zLWZpbGUtZnVuY3Rpb24tYW5kLWNvbXBpbGVcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTMtZmlsZS1mdW5jdGlvbi1hbmQtY29tcGlsZVwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstMy1maWxlLWZ1bmN0aW9uLWFuZC1jb21waWxlXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay00LW11bHRpY29yZS1jb25jdXJyZW50LWFuZC1zb2NrZXRzXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay00LW11bHRpY29yZS1jb25jdXJyZW50LWFuZC1zb2NrZXRzXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDMjcgMzgwNTktb3BlcmF0aW5nLXN5c3RlbXMtYW5kLXN5c3RlbXMtcHJvZ3JhbW1pbmcvd2Vlay00LW11bHRpY29yZS1jb25jdXJyZW50LWFuZC1zb2NrZXRzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay01LW9zLWRlc2lnbi1wcmluY2lwbGVzLWFuZC1zeXN0ZW0tY2FsbHNcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTUtb3MtZGVzaWduLXByaW5jaXBsZXMtYW5kLXN5c3RlbS1jYWxsc1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstNS1vcy1kZXNpZ24tcHJpbmNpcGxlcy1hbmQtc3lzdGVtLWNhbGxzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay02LWNvbnNvbGlkYXRpb24td2Vla1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstNi1jb25zb2xpZGF0aW9uLXdlZWtcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZy93ZWVrLTYtY29uc29saWRhdGlvbi13ZWVrXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay03LW1lbW9yeS1tYW5hZ2VtZW50LWFuZC1rZXJuZWwtcHJvZ3JhbW1pbmdcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTctbWVtb3J5LW1hbmFnZW1lbnQtYW5kLWtlcm5lbC1wcm9ncmFtbWluZ1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstNy1tZW1vcnktbWFuYWdlbWVudC1hbmQta2VybmVsLXByb2dyYW1taW5nXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay04LXByb2Nlc3NcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTgtcHJvY2Vzc1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQzI3IDM4MDU5LW9wZXJhdGluZy1zeXN0ZW1zLWFuZC1zeXN0ZW1zLXByb2dyYW1taW5nL3dlZWstOC1wcm9jZXNzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay05LW11dHVhbC1leGNsdXNpb24tZm9yLWNvb3BlcmF0aW5nLXByb2Nlc3Nlc1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstOS1tdXR1YWwtZXhjbHVzaW9uLWZvci1jb29wZXJhdGluZy1wcm9jZXNzZXNcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REMyNyAzODA1OS1vcGVyYXRpbmctc3lzdGVtcy1hbmQtc3lzdGVtcy1wcm9ncmFtbWluZy93ZWVrLTktbXV0dWFsLWV4Y2x1c2lvbi1mb3ItY29vcGVyYXRpbmctcHJvY2Vzc2VzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIFwiaW5kZXhcIjogXCJcdUQ4M0RcdURDN0UgMzg5NjUtbWFjaGluZS1sZWFybmluZ1wiLFxuICAgICAgXCJ0ZXh0XCI6IFwiXHVEODNEXHVEQzdFIDM4OTY1LW1hY2hpbmUtbGVhcm5pbmdcIixcbiAgICAgIFwiY29sbGFwc2VkXCI6IHRydWUsXG4gICAgICBcIml0ZW1zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJpbnRyb1wiLFxuICAgICAgICAgIFwidGV4dFwiOiBcImludHJvXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDN0UgMzg5NjUtbWFjaGluZS1sZWFybmluZy9pbnRyb1wiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcImxvZ2lzdGljLXJlZ3Jlc3Npb25cIixcbiAgICAgICAgICBcInRleHRcIjogXCJsb2dpc3RpYy1yZWdyZXNzaW9uXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDN0UgMzg5NjUtbWFjaGluZS1sZWFybmluZy9sb2dpc3RpYy1yZWdyZXNzaW9uXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdURDN0UgMzg5NjUtbWFjaGluZS1sZWFybmluZy9SRUFETUVcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJzdm1cIixcbiAgICAgICAgICBcInRleHRcIjogXCJzdm1cIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REM3RSAzODk2NS1tYWNoaW5lLWxlYXJuaW5nL3N2bVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcImluZGV4XCI6IFwiXHVEODNEXHVEQ0FDIENTMjI0Ti1OYXR1cmFsIExhbmd1YWdlIFByb2Nlc3Npbmcgd2l0aCBEZWVwIExlYXJuaW5nXCIsXG4gICAgICBcInRleHRcIjogXCJcdUQ4M0RcdURDQUMgQ1MyMjROLU5hdHVyYWwgTGFuZ3VhZ2UgUHJvY2Vzc2luZyB3aXRoIERlZXAgTGVhcm5pbmdcIixcbiAgICAgIFwiY29sbGFwc2VkXCI6IHRydWUsXG4gICAgICBcIml0ZW1zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ0ZXN0XCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwidGVzdFwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVEQ0FDIENTMjI0Ti1OYXR1cmFsIExhbmd1YWdlIFByb2Nlc3Npbmcgd2l0aCBEZWVwIExlYXJuaW5nL3Rlc3RcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgXCJpbmRleFwiOiBcIlx1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3NcIixcbiAgICAgIFwidGV4dFwiOiBcIlx1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3NcIixcbiAgICAgIFwiY29sbGFwc2VkXCI6IHRydWUsXG4gICAgICBcIml0ZW1zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJSRUFETUVcIixcbiAgICAgICAgICBcInRleHRcIjogXCJSRUFETUVcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3MvUkVBRE1FXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0xLWludHJvLXRvLXNlY3VyaXR5XCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay0xLWludHJvLXRvLXNlY3VyaXR5XCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstMS1pbnRyby10by1zZWN1cml0eVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcIndlZWstMTAtYnVmZmVyLW92ZXJmbG93XCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay0xMC1idWZmZXItb3ZlcmZsb3dcIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRFx1REQxMCAzMDE5NS1zZWN1cml0eS1hbmQtbmV0d29ya3Mvd2Vlay0xMC1idWZmZXItb3ZlcmZsb3dcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ3ZWVrLTItaGFzaC1tYWNzLWF1dGhlbnRpY2F0ZWQtZW5jcnlwdGlvbi1hY2Nlc3MtY29udHJvbFwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstMi1oYXNoLW1hY3MtYXV0aGVudGljYXRlZC1lbmNyeXB0aW9uLWFjY2Vzcy1jb250cm9sXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstMi1oYXNoLW1hY3MtYXV0aGVudGljYXRlZC1lbmNyeXB0aW9uLWFjY2Vzcy1jb250cm9sXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay0zLXN5bW1ldHJpYy1jcnlwdG9ncmFwaHlcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTMtc3ltbWV0cmljLWNyeXB0b2dyYXBoeVwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTMtc3ltbWV0cmljLWNyeXB0b2dyYXBoeVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcIndlZWstNC1hc3ltbWV0cmljLWNyeXB0b2dyYXBoeVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstNC1hc3ltbWV0cmljLWNyeXB0b2dyYXBoeVwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTQtYXN5bW1ldHJpYy1jcnlwdG9ncmFwaHlcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ3ZWVrLTUtbmV0d29ya2luZy1hbmQtcHJvdG9jb2xzXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay01LW5ldHdvcmtpbmctYW5kLXByb3RvY29sc1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTUtbmV0d29ya2luZy1hbmQtcHJvdG9jb2xzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay02LXRscy1hbmQtdG9yXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay02LXRscy1hbmQtdG9yXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstNi10bHMtYW5kLXRvclwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcIndlZWstNy13ZWItYXR0YWNrcy1wYXJ0LTFcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTctd2ViLWF0dGFja3MtcGFydC0xXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0RcdUREMTAgMzAxOTUtc2VjdXJpdHktYW5kLW5ldHdvcmtzL3dlZWstNy13ZWItYXR0YWNrcy1wYXJ0LTFcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ3ZWVrLTgtd2ViLWF0dGFja3MtcGFydC0yXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay04LXdlYi1hdHRhY2tzLXBhcnQtMlwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTgtd2ViLWF0dGFja3MtcGFydC0yXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay05LXJldmVyc2UtZW5naW5lZXJpbmdcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTktcmV2ZXJzZS1lbmdpbmVlcmluZ1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNEXHVERDEwIDMwMTk1LXNlY3VyaXR5LWFuZC1uZXR3b3Jrcy93ZWVrLTktcmV2ZXJzZS1lbmdpbmVlcmluZ1wiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcImluZGV4XCI6IFwiXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTJcIixcbiAgICAgIFwidGV4dFwiOiBcIlx1RDgzRVx1REQxNiAzNDI1NS1hcnRpZmljaWFsLWludGVsbGlnZW5jZS0yXCIsXG4gICAgICBcImNvbGxhcHNlZFwiOiB0cnVlLFxuICAgICAgXCJpdGVtc1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0VcdUREMTYgMzQyNTUtYXJ0aWZpY2lhbC1pbnRlbGxpZ2VuY2UtMi9SRUFETUVcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ3ZWVrLTEtaW50cm8tYW5kLW1sZVwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcIndlZWstMS1pbnRyby1hbmQtbWxlXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0VcdUREMTYgMzQyNTUtYXJ0aWZpY2lhbC1pbnRlbGxpZ2VuY2UtMi93ZWVrLTEtaW50cm8tYW5kLW1sZVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcIndlZWstMi1hbmQtMy1sci1hbmQtaW5mby10aGVvcnktYW5kLXRyZWVcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTItYW5kLTMtbHItYW5kLWluZm8tdGhlb3J5LWFuZC10cmVlXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0VcdUREMTYgMzQyNTUtYXJ0aWZpY2lhbC1pbnRlbGxpZ2VuY2UtMi93ZWVrLTItYW5kLTMtbHItYW5kLWluZm8tdGhlb3J5LWFuZC10cmVlXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwid2Vlay00LWJheWVzaWFuLW5ldHdvcmtcIixcbiAgICAgICAgICBcInRleHRcIjogXCJ3ZWVrLTQtYmF5ZXNpYW4tbmV0d29ya1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTIvd2Vlay00LWJheWVzaWFuLW5ldHdvcmtcIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJ3ZWVrLTgtYW5kLTktYW5kLTEwLXNlYXJjaC1hbmQtY3NwLWFuZC1nYW1lXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwid2Vlay04LWFuZC05LWFuZC0xMC1zZWFyY2gtYW5kLWNzcC1hbmQtZ2FtZVwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVERDE2IDM0MjU1LWFydGlmaWNpYWwtaW50ZWxsaWdlbmNlLTIvd2Vlay04LWFuZC05LWFuZC0xMC1zZWFyY2gtYW5kLWNzcC1hbmQtZ2FtZVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBcImluZGV4XCI6IFwiXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvblwiLFxuICAgICAgXCJ0ZXh0XCI6IFwiXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvblwiLFxuICAgICAgXCJjb2xsYXBzZWRcIjogdHJ1ZSxcbiAgICAgIFwiaXRlbXNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcImJhY2twcm9wYWdhdGlvblwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcImJhY2twcm9wYWdhdGlvblwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9iYWNrcHJvcGFnYXRpb25cIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJjbm5cIixcbiAgICAgICAgICBcInRleHRcIjogXCJjbm5cIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRVx1RERFMCAzMjE2Ny1uZXVyYWwtY29tcHV0YXRpb24vY25uXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwiZ2QtYW5kLWxpbmVhci1jbGFzc2lmaWNhdGlvblwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcImdkLWFuZC1saW5lYXItY2xhc3NpZmljYXRpb25cIixcbiAgICAgICAgICBcImxpbmtcIjogXCIvXHU3QjE0XHU4QkIwL1x1RDgzRVx1RERFMCAzMjE2Ny1uZXVyYWwtY29tcHV0YXRpb24vZ2QtYW5kLWxpbmVhci1jbGFzc2lmaWNhdGlvblwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcImdublwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcImdublwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9nbm5cIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwiaW5kZXhcIjogXCJsaW5lYXItbW9kZWxzXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwibGluZWFyLW1vZGVsc1wiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9saW5lYXItbW9kZWxzXCIsXG4gICAgICAgICAgXCJsYXN0VXBkYXRlZFwiOiAxNzMxNjMwMjczMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcImluZGV4XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJ0ZXh0XCI6IFwiUkVBRE1FXCIsXG4gICAgICAgICAgXCJsaW5rXCI6IFwiL1x1N0IxNFx1OEJCMC9cdUQ4M0VcdURERTAgMzIxNjctbmV1cmFsLWNvbXB1dGF0aW9uL1JFQURNRVwiLFxuICAgICAgICAgIFwibGFzdFVwZGF0ZWRcIjogMTczMTYzMDI3MzAwMFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJpbmRleFwiOiBcInJublwiLFxuICAgICAgICAgIFwidGV4dFwiOiBcInJublwiLFxuICAgICAgICAgIFwibGlua1wiOiBcIi9cdTdCMTRcdThCQjAvXHVEODNFXHVEREUwIDMyMTY3LW5ldXJhbC1jb21wdXRhdGlvbi9ybm5cIixcbiAgICAgICAgICBcImxhc3RVcGRhdGVkXCI6IDE3MzE2MzAyNzMwMDBcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXSxcbiAgXCJ0YWdzXCI6IFtdXG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRTLE9BQU8sYUFBYTtBQUNoVSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLHdCQUF3QjtBQUMvQixPQUFPLHdCQUF3QjtBQUUvQixTQUFTLDBCQUEwQjtBQUNuQyxTQUFTLHlDQUF5QztBQUNsRCxTQUFTLHVDQUF1QztBQUNoRCxTQUFTLG9CQUFvQjs7O0FDUHRCLElBQU0sV0FBVztBQUVqQixJQUFNLGtCQUFrQjtBQU14QixJQUFNLGlCQUFpQjtBQUt2QixJQUFNLG9CQUFvQjtBQUUxQixJQUFNLGVBQWUsV0FBVyxpQkFBaUI7OztBQ0V4RCxJQUFNLGVBQWUsQ0FBQyxTQUFpQixzQkFBc0IsSUFBSTtBQUUxRCxJQUFNLFdBQXNCO0FBQUEsRUFDakM7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMLEVBQUUsTUFBTSxVQUFVLE1BQU0sVUFBVSxNQUFNLGdDQUFnQztBQUFBLE1BQ3hFLEVBQUUsTUFBTSxXQUFXLE1BQU0sV0FBVyxNQUFNLGdDQUFnQztBQUFBLElBQzVFO0FBQUEsSUFDQSxhQUFhLENBQUMsY0FBYyxzQkFBTyxzQkFBTyxjQUFjLFlBQVk7QUFBQSxJQUNwRSxjQUFjLENBQUMsZ0JBQWdCO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsSUFDVixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sVUFBVSxNQUFNLFVBQVUsTUFBTSxpQ0FBaUM7QUFBQSxNQUN6RSxFQUFFLE1BQU0sV0FBVyxNQUFNLFdBQVcsTUFBTSxtQ0FBbUM7QUFBQSxJQUMvRTtBQUFBLElBQ0EsYUFBYSxDQUFDLGVBQWUsc0JBQU8sc0JBQU8saUJBQWlCLGdCQUFnQixnQkFBZ0IsUUFBUTtBQUFBLElBQ3BHLGNBQWMsQ0FBQyxvQkFBb0IsZ0JBQWdCO0FBQUEsRUFDckQ7QUFDRixFQUFFLElBQWEsQ0FBQyxNQUFNO0FBQ3BCLElBQUUsU0FBUyxFQUFFLFVBQVUsYUFBYSxFQUFFLFFBQVE7QUFDOUMsU0FBTztBQUNULENBQUM7QUFFTSxJQUFNLGVBQWUsU0FBUyxJQUFJLE9BQUssRUFBRSxJQUFJO0FBQzdDLElBQU0sbUJBQW1CLFNBQVMsSUFBSSxPQUFLLEVBQUUsWUFBWSxFQUFFOzs7QUNzUmhFLGNBQVc7QUFBQSxFQUNUO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFTO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsTUFDUDtBQUFBLFFBQ0UsT0FBUztBQUFBLFFBQ1QsTUFBUTtBQUFBLFFBQ1IsTUFBUTtBQUFBLFFBQ1IsYUFBZTtBQUFBLE1BQ2pCO0FBQUEsTUFDQTtBQUFBLFFBQ0UsT0FB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
