export interface SocialEntry {
  type: 'github' | 'twitter' | 'email'
  icon: string
  link: string
}

export interface Creator {
  avatar: string
  name: string
  username?: string
  title?: string
  org?: string
  desc?: string
  links?: SocialEntry[]
  nameAliases?: string[]
  emailAliases?: string[]
}

const getAvatarUrl = (name: string) => `https://github.com/${name}.png`

export const creators: Creator[] = [
  {
    name: 'Larry',
    avatar: '',
    username: 'indexss',
    title: 'Larry知识库的主人',
    desc: '开发者，研究人员，专注于Ai技术，略知后端',
    links: [
      { type: 'github', icon: 'github', link: 'https://github.com/indexss' },
    ],
    nameAliases: ['indexss', 'Larry', 'Larry Shi', 'Shi Larry', '史林立'],
    emailAliases: ['cnshilinli@gmail.com'],
  },
].map<Creator>((c) => {
  c.avatar = c.avatar || getAvatarUrl(c.username)
  return c as Creator
})

export const creatorNames = creators.map(c => c.name)
export const creatorUsernames = creators.map(c => c.username || '')
