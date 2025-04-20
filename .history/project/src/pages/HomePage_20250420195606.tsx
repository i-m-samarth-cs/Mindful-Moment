import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Users, BookOpen, ArrowRight } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import CrisisResources from '../components/CrisisResources';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <CheckCircle className="h-6 w-6 text-blue-500" />,
      title: 'Daily Mood Tracking',
      description: 'Log your mood and identify patterns to better understand your mental health journey.'
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      title: 'Mindfulness Exercises',
      description: 'Access guided exercises to help manage stress, anxiety, and improve focus.'
    },
    {
      icon: <Users className="h-6 w-6 text-green-500" />,
      title: 'Community Support',
      description: 'Connect with others in a safe, anonymous space to share experiences and support.'
    },
    {
      icon: <BookOpen className="h-6 w-6 text-orange-500" />,
      title: 'Curated Resources',
      description: 'Find professional resources and self-help tools tailored to your needs.'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <Container>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Your journey to better mental health starts here
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Track your mood, practice mindfulness, connect with others, and access resources to support your mental wellbeing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/dashboard')}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/resources')}
                >
                  View Resources
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3807738/pexels-photo-3807738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Person meditating peacefully in nature" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </Container>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MindfulMoment Helps You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our app provides tools and resources to support your mental health journey with a simple, accessible approach.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-gray-100">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>
      
      {/* Call-to-Action Section */}
      <section className="py-16 bg-white">
        <Container>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 md:p-12 shadow-lg text-white">
            <div className="md:w-2/3 mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to start your journey?</h2>
              <p className="text-xl mb-8 text-purple-100">
                Begin tracking your mood, practicing mindfulness, and accessing resources today.
              </p>
              <Button 
  size="lg" 
  className="bg-white hover:bg-purple-50"
  onClick={() => navigate('/dashboard')}
  icon={<ArrowRight size={18} />}
  style={{ color: '#6b21a8' }} // Purple color for text
>
  Get Started Now
</Button>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Crisis Resources Section */}
      <section className="py-16 bg-gray-50">
        <Container size="md">
          <CrisisResources />
        </Container>
      </section>
    </div>
  );
};

export default HomePage;