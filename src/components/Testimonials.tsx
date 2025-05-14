
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Alex Rivera",
    role: "Travel Influencer, 230K followers",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    content: "Repaly.ai helped me maintain engagement with my audience even while I was traveling off-grid for weeks. The AI responses are surprisingly personalized and my followers can't tell the difference!",
    rating: 5
  },
  {
    name: "Mia Johnson",
    role: "Fitness Creator, 180K followers",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    content: "I used to spend 3 hours a day just responding to comments. With Repaly.ai, I've cut that down to 20 minutes of review time. The AI captures my voice and tone perfectly.",
    rating: 5
  },
  {
    name: "Jordan Chen",
    role: "Tech Reviewer, 350K followers",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
    content: "The tag-based response system is a game-changer. I can customize responses based on comment types, and the AI learns from my adjustments. Highly recommend to any creator looking to scale.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-teal-600/10 rounded-full filter blur-[120px]"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by <span className="text-gradient">500+ Creators</span>
          </h2>
          <p className="text-lg text-foreground/80">
            See how creators are saving time and boosting engagement with Repaly.ai
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl hover:border-violet-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
              </div>
              
              <p className="text-foreground/80 text-sm">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 glass p-8 rounded-xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Hours Saved", value: "1,500+", subtext: "per month across users" },
              { label: "Response Rate", value: "92%", subtext: "accuracy in AI replies" },
              { label: "Engagement Boost", value: "43%", subtext: "average increase" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-foreground/60 text-sm">{stat.label}</p>
                <h3 className="text-3xl md:text-4xl font-bold text-gradient my-2">{stat.value}</h3>
                <p className="text-sm text-foreground/70">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
