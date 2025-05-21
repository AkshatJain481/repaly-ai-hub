
// Remove unused imports
const TestimonialSection = () => {
  return (
    <div className="py-10 md:py-20 bg-background px-1">
      <div className="flex flex-col items-center gap-6 mb-16 text-center">
        <span className="bg-primary/20 text-primary text-sm font-bold py-2 px-4 rounded-full">
          Testimonials
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
          Loved by Creators and Brands
        </h2>

        <p className="text-lg text-muted-foreground max-w-3xl">
          See what our users have to say about how repaly has transformed their
          social media presence
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl w-full mx-auto px-4 text-center">
        {[
          { value: "2,000+", label: "Active Users" },
          { value: "5M+", label: "Comments Managed" },
          { value: "42%", label: "Avg. Engagement Increase" },
        ].map((stat, index) => (
          <div key={index} className="bg-card p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md">
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl md:text-4xl font-bold text-primary leading-none">
                {stat.value}
              </p>
              <p className="text-md text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;
