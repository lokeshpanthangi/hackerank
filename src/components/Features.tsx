
import { Code, Brain, Video, Users, Clock, BarChart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Code,
      title: "Real-time Code Collaboration",
      description: "Watch candidates code in real-time with live syntax highlighting, shared debugging, and instant feedback capabilities.",
      color: "text-blue-400"
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI evaluates code quality, algorithmic thinking, and problem-solving approaches with detailed insights.",
      color: "text-tech-green"
    },
    {
      icon: Video,
      title: "HD Video Interviews",
      description: "Seamless video integration with screen sharing, recording, and automated transcription for comprehensive evaluation.",
      color: "text-purple-400"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Multiple interviewers can join sessions, share notes, and collaborate on candidate evaluation in real-time.",
      color: "text-orange-400"
    },
    {
      icon: Clock,
      title: "Time Management",
      description: "Built-in timers, progress tracking, and automated session management keep interviews structured and efficient.",
      color: "text-yellow-400"
    },
    {
      icon: BarChart,
      title: "Analytics & Reports",
      description: "Comprehensive analytics on candidate performance, interview metrics, and team productivity insights.",
      color: "text-pink-400"
    }
  ];

  return (
    <section id="features" className="bg-dark-secondary py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Everything You Need for
            <span className="text-tech-green"> Technical Interviews</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Powerful tools designed to help you identify top talent efficiently and effectively.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-dark-primary border-border-dark hover:border-tech-green/50 transition-all duration-300 group hover:shadow-lg hover:shadow-tech-green/10"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 bg-dark-secondary rounded-lg ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-tech-green transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 bg-dark-primary border border-border-dark rounded-lg">
            <div className="text-tech-green font-mono text-sm">$ npm install success</div>
            <div className="text-text-secondary">Ready to streamline your hiring process?</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
