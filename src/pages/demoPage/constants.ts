import { ResponseStyleConfig } from './types'

export const botResponses = {
    Friendly: [
        "Thanks for your comment! We really appreciate your support! 😊",
        "Hi there! Thanks for reaching out. We're so glad you like our content!",
        "We're thrilled to hear from you! Thanks for being part of our community! ❤️",
        "Your feedback means the world to us! Thanks for commenting!",
        "So happy you stopped by! We love hearing from our followers!",
    ],
    Professional: [
        "Thank you for your comment. We appreciate your engagement with our content.",
        "We value your feedback and thank you for taking the time to share your thoughts.",
        "Thank you for reaching out. Your input is important to us.",
        "We appreciate your interest in our brand. Thank you for your comment.",
        "Thank you for your engagement. We're committed to providing quality content for our audience.",
    ],
    Humorous: [
        "Well hello there! Your comment just made our day brighter than our neon workout gear! 😂",
        "Thanks for dropping by! You're officially our favorite person today! 🏆",
        "Your comment has us doing happy dances around the office! Keep that energy coming! 💃",
        "If comments were currency, you'd just made us millionaires! Thanks a bunch! 🤑",
        "Stop it, you're making us blush! But actually don't stop, we love the attention! 😜",
    ],
    Concise: [
        "Thanks for your comment!",
        "Appreciate your feedback!",
        "Thanks for reaching out!",
        "We value your input!",
        "Thanks for engaging!",
    ],
}

export const questionResponses = {
    Friendly: [
        "Great question! Our program is designed for all fitness levels, from beginners to advanced! Let us know if you need any specific modifications! 😊",
        "Thanks for asking! The program runs for 8 weeks with 3-4 sessions per week. It's perfect for building a consistent routine! ❤️",
        "Hi there! This photo was taken at Malibu Beach during our summer fitness retreat! It was such a beautiful day! 🌊",
        "We're so glad you asked! The price is $49.99 for the full program, and we offer payment plans too! Let us know if you have more questions! 💕",
        "Thanks for your interest! We ship worldwide and delivery usually takes 3-5 business days! Let us know if you need expedited shipping! 📦",
    ],
    Professional: [
        "Thank you for your inquiry. Our program accommodates all fitness levels with appropriate modifications available for beginners.",
        "The program duration is 8 weeks, with 3-4 recommended sessions per week for optimal results.",
        "This image was captured at our annual retreat in Malibu, California.",
        "The current price for our complete program is $49.99. We offer various payment options for your convenience.",
        "We provide worldwide shipping with standard delivery times of 3-5 business days.",
    ],
    Humorous: [
        "Our program is so beginner-friendly, even my grandma can do it! (And she's crushing it, by the way!) 💪😂",
        "It's an 8-week program, which is exactly how long it takes to transform from couch potato to slightly more athletic couch potato! 🥔→🏃",
        "That's Malibu Beach! We chose it because 'exercise on a beautiful beach' sounds way better than 'exercise in a sweaty gym,' right? 🏝️",
        "It's $49.99, which is less than what most people spend on takeout in a week! Your body will thank you more than it thanks that pizza! 🍕",
        "We ship faster than you can come up with excuses not to work out! (Usually 3-5 days, but who's counting?) 📦💨",
    ],
    Concise: [
        "Yes, suitable for all levels.",
        "8 weeks, 3-4 sessions weekly.",
        "Malibu Beach, California.",
        "$49.99 for the full program.",
        "3-5 days shipping worldwide.",
    ],
}

export const popularEmojis = [
    "😊", "👍", "❤️", "🔥", "😂", "🙌", "✨", "🎉", "👏", "🤩",
    "💪", "🏆", "🌟", "💯", "🙏", "😍", "👌", "💕", "🤗", "😎",
]

export const responseStyles: ResponseStyleConfig[] = [
    {
        label: "Friendly",
        description: "Casual and approachable responses",
        selected: true,
        emoji: "😊"
    },
    {
        label: "Professional",
        description: "Formal and business-like responses",
        selected: false,
        emoji: "👔"
    },
    {
        label: "Humorous",
        description: "Fun and entertaining responses",
        selected: false,
        emoji: "😄"
    },
    {
        label: "Concise",
        description: "Short and to-the-point responses",
        selected: false,
        emoji: "💬"
    }
]

export const createPostSteps = [
    {
        step: 1,
        title: "Upload Photo",
        description: "Choose a photo for post"
    },
    {
        step: 2,
        title: "Add Caption",
        description: "Write a caption for your post"
    }
]
