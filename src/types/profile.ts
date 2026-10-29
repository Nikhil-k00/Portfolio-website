export type Social = {
  platform: string
  url: string
}

export type Profile = {
  name: string
  title: string
  location?: string
  summary?: string
  email?: string
  socials: Social[]
}
