
export type JourneyImage = {
  src: string
  alt: string
  caption?: string
  kind: "photo" | "certificate"
}

export type JourneyLink = {
  label: string
  url: string
}

export type JourneyEntry = {
  name: string
  period?: string
  type: string
  status: string
  summary: string
  details: string
  image?: JourneyImage
  links?: JourneyLink[]
}
