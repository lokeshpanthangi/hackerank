import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-dark-primary py-20 px-4 overflow-hidden">
      {/* Background Elements - Moved to the bottom of the stack */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-primary via-dark-primary to-dark-secondary/80 pointer-events-none" style={{ zIndex: 0 }} />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tech-green/5 rounded-full blur-3xl" style={{ zIndex: 0 }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-tech-green/5 rounded-full blur-3xl" style={{ zIndex: 0 }} />
      
      {/* Content - Ensure it's above the background */}
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center animate-fade-in">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            AI-Powered
            <span className="block text-tech-green">Technical Interviews</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your technical recruitment with real-time code collaboration, 
            AI-powered candidate analysis, and seamless video interviews.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              asChild
              className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold px-8 py-6 h-auto text-lg shadow-lg shadow-tech-green/20 hover:shadow-tech-green/30 transition-all duration-200"
            >
              <Link to="/auth">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-tech-green border-2 text-tech-green hover:bg-dark-secondary hover:text-white px-8 py-6 h-auto text-lg group shadow-lg shadow-tech-green/10 hover:shadow-tech-green/20 transition-all duration-200"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">10k+</div>
              <div className="text-text-secondary">Interviews Conducted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">500+</div>
              <div className="text-text-secondary">Companies Trust Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-tech-green mb-2">95%</div>
              <div className="text-text-secondary">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
