export type ResponseStyleOption = "Friendly" | "Professional" | "Humorous" | "Concise"

export interface ResponseStyleConfig {
    label: ResponseStyleOption
    description: string
    selected: boolean
    emoji: string
}

export interface Comment {
    id: string
    username: string
    text: string
    timestamp: string
    replies?: Reply[]
    isQuestion?: boolean
    userImage?: string
    image?: string
}

export interface Reply {
    id: string
    username: string
    text: string
    timestamp: string
    isBot?: boolean
    userImage?: string
}

export interface CreatePostStep {
    step: number
    title: string
    description: string
}

export interface CreatePostData {
    image: string | null
    caption: string
} 

export interface TourStep {
    target: string
    title: string
    content: string
    position: "top" | "bottom" | "left" | "right"
}