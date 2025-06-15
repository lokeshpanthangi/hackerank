
const SocialProof = () => {
  const companies = [
    { name: "TechCorp", logo: "TC" },
    { name: "InnovateLabs", logo: "IL" },
    { name: "DevStudio", logo: "DS" },
    { name: "CodeFirst", logo: "CF" },
    { name: "ByteWorks", logo: "BW" },
    { name: "NexGen", logo: "NG" }
  ];

  const stats = [
    { number: "10,000+", label: "Interviews Conducted" },
    { number: "500+", label: "Companies Trust Us" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "40%", label: "Time Saved" }
  ];

  return (
    <section className="bg-dark-primary py-16">
      <div className="container mx-auto px-4">
        {/* Companies Section */}
        <div className="text-center mb-16">
          <p className="text-text-secondary mb-8 text-lg">Trusted by innovative companies worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-16 h-16 bg-dark-secondary border border-border-dark rounded-lg flex items-center justify-center mb-2 group-hover:border-tech-green/50 transition-colors">
                  <span className="text-text-primary font-bold text-lg group-hover:text-tech-green transition-colors">
                    {company.logo}
                  </span>
                </div>
                <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl lg:text-4xl font-bold text-tech-green mb-2 group-hover:scale-110 transition-transform">
                {stat.number}
              </div>
              <div className="text-text-secondary group-hover:text-text-primary transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <div className="bg-dark-secondary border border-border-dark rounded-lg p-8">
            <blockquote className="text-lg text-text-primary mb-4 italic">
              "CodeInterview Pro transformed our hiring process. We reduced time-to-hire by 40% 
              while significantly improving the quality of our technical assessments."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-tech-green rounded-full flex items-center justify-center">
                <span className="text-dark-primary font-bold">SM</span>
              </div>
              <div>
                <div className="text-text-primary font-semibold">Sarah Mitchell</div>
                <div className="text-text-secondary text-sm">VP Engineering, TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
