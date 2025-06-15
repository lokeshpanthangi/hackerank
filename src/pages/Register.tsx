
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterFormData {
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  company?: string;
  skills?: string;
  experience?: string;
}

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterFormData>({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    skills: '',
    experience: ''
  });
  const [errors, setErrors] = useState<Partial<RegisterFormData>>({});
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const totalSteps = 3;

  const roleOptions = [
    {
      id: 'recruiter',
      title: 'Recruiter',
      description: 'Conduct interviews and manage hiring processes',
      icon: '👔'
    },
    {
      id: 'candidate',
      title: 'Candidate',
      description: 'Take technical interviews and showcase your skills',
      icon: '💻'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage platform settings and user accounts',
      icon: '⚙️'
    }
  ];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<RegisterFormData> = {};
    
    if (step === 1) {
      if (!formData.role) {
        newErrors.role = 'Please select a role';
      }
    }
    
    if (step === 2) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 3) {
      if (formData.role === 'recruiter' && !formData.company) {
        newErrors.company = 'Company name is required';
      }
      if (formData.role === 'candidate' && !formData.skills) {
        newErrors.skills = 'Skills are required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    // Mock registration
    setTimeout(() => {
      localStorage.setItem('auth', JSON.stringify({
        user: { 
          email: formData.email, 
          role: formData.role,
          firstName: formData.firstName,
          lastName: formData.lastName
        },
        token: 'mock-token'
      }));
      
      toast({
        title: 'Registration successful',
        description: 'Welcome to CodeInterview Pro!',
      });
      
      navigate(`/${formData.role}-dashboard`);
      setIsLoading(false);
    }, 1000);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-tech-green text-dark-primary' 
                  : 'bg-dark-primary border border-border-dark text-text-secondary'
              }`}
            >
              {step < currentStep ? <Check size={16} /> : step}
            </div>
            {step < 3 && (
              <div 
                className={`w-12 h-0.5 mx-2 ${
                  step < currentStep ? 'bg-tech-green' : 'bg-border-dark'
                }`} 
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-text-secondary text-sm">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-2">Choose Your Role</h2>
              <p className="text-text-secondary">Select the role that best describes you</p>
            </div>
            
            <div className="space-y-3">
              {roleOptions.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, role: role.id })}
                  className={`w-full p-4 rounded-lg border text-left transition-all ${
                    formData.role === role.id
                      ? 'border-tech-green bg-tech-green/10'
                      : 'border-border-dark bg-dark-primary hover:border-tech-green/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{role.icon}</span>
                    <div>
                      <h3 className="font-medium text-text-primary">{role.title}</h3>
                      <p className="text-sm text-text-secondary">{role.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-2">Basic Information</h2>
              <p className="text-text-secondary">Tell us about yourself</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-text-primary">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
                />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-text-primary">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
                />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-primary">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-text-primary">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-text-primary">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-text-primary mb-2">
                {formData.role === 'recruiter' ? 'Company Details' : 
                 formData.role === 'candidate' ? 'Your Skills' : 'Admin Details'}
              </h2>
              <p className="text-text-secondary">
                {formData.role === 'recruiter' ? 'Tell us about your company' :
                 formData.role === 'candidate' ? 'What technologies do you work with?' :
                 'Additional information'}
              </p>
            </div>
            
            {formData.role === 'recruiter' && (
              <div className="space-y-2">
                <Label htmlFor="company" className="text-text-primary">Company Name</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company}</p>}
              </div>
            )}
            
            {formData.role === 'candidate' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-text-primary">Skills</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="e.g. JavaScript, React, Node.js, Python..."
                    className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
                  />
                  {errors.skills && <p className="text-red-500 text-sm">{errors.skills}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-text-primary">Experience (Optional)</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Tell us about your experience..."
                    className="bg-dark-primary border-border-dark text-text-primary focus:border-tech-green"
                  />
                </div>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Create Account</h1>
          <p className="text-text-secondary">Join CodeInterview Pro today</p>
        </div>

        <Card className="bg-dark-secondary border-border-dark">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-text-primary">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            {renderProgressBar()}
            
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="border-border-dark text-text-primary hover:bg-dark-primary"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              ) : (
                <div />
              )}
              
              {currentStep < totalSteps ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold"
                >
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-tech-green hover:bg-tech-green/90 text-dark-primary font-semibold"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              )}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-text-secondary text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-tech-green hover:text-tech-green/80">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
