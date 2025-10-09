import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { 
 MessageSquare, 
 Brain, 
 Zap, 
 Shield, 
 CheckCircle, 
 ArrowRight, 
 Clock, 
 Users, 
 TrendingUp,
 Star,
 Quote
} from 'lucide-react'

export default function DalSiAIPage() {
 const features = [
 {
  icon: Brain,
  title: "Advanced Language Understanding",
  description: "State-of-the-art natural language processing with 99.9% accuracy in context comprehension and response generation."
 },
 {
  icon: Zap,
  title: "Lightning-Fast Processing",
  description: "Sub-second response times with optimized inference engines capable of handling 10,000+ concurrent queries."
 },
 {
  icon: Shield,
  title: "Enterprise Security",
  description: "HIPAA, SOC 2, and GDPR compliant with end-to-end encryption and advanced data protection protocols."
 },
 {
  icon: Users,
  title: "Multi-Domain Expertise",
  description: "Specialized knowledge bases for healthcare, education, legal, finance, and technical domains."
 },
 {
  icon: TrendingUp,
  title: "Continuous Learning",
  description: "Self-improving AI that learns from interactions while maintaining privacy and security standards."
 },
 {
  icon: Clock,
  title: "24/7 Availability",
  description: "Round-the-clock AI assistance with 99.99% uptime guarantee and global infrastructure support."
 }
 ]

 const useCases = [
 {
  title: "Healthcare Query Resolution",
  description: "Instant medical information lookup, symptom analysis, and treatment guidance for healthcare professionals.",
  metrics: "95% faster diagnosis support"
 },
 {
  title: "Educational Content Generation",
  description: "Automated curriculum development, personalized learning materials, and intelligent tutoring systems.",
  metrics: "70% reduction in content creation time"
 },
 {
  title: "Clinical Decision Support",
  description: "Evidence-based recommendations, drug interaction checks, and treatment protocol assistance.",
  metrics: "40% improvement in decision accuracy"
 },
 {
  title: "Patient Communication",
  description: "Automated patient education, appointment scheduling, and follow-up care instructions.",
  metrics: "85% patient satisfaction increase"
 }
 ]

 const testimonials = [
 {
  name: "Dr. Sarah Chen",
  role: "Chief Medical Officer, Metro Health System",
  content: "DalSiAI has revolutionized our clinical workflows. The accuracy and speed of medical query resolution has improved our patient care quality significantly.",
  rating: 5
 },
 {
  name: "Prof. Michael Rodriguez",
  role: "Dean of Education, State University",
  content: "The educational applications of DalSiAI are remarkable. Our faculty can now create personalized learning experiences at scale.",
  rating: 5
 },
 {
  name: "Dr. Emily Watson",
  role: "Director of Innovation, Regional Medical Center",
  content: "Implementation was seamless, and the ROI was evident within the first month. DalSiAI is now integral to our operations.",
  rating: 5
 }
 ]

 return (
 <div className="min-h-screen bg-background text-foreground">
  {/* Hero Section */}
  <section className="pt-20 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/5">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="text-center mb-12">
   <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6 text-white">
    <MessageSquare className="h-5 w-5 text-primary animate-pulse" />
    <span className="text-primary font-semibold">DalSiAI - Text AI Engine</span>
   </div>
   <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
    The Most Advanced
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
    Text AI Engine
    </span>
    Ever Built
   </h1>
   <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
    DalSiAI represents the pinnacle of natural language AI technology. Built for enterprise-scale 
    applications in healthcare and education, it delivers unmatched accuracy, speed, and reliability.
   </p>
   <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-white">
    Start Free Trial
    <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-white">
    Schedule Demo
    </Button>
   </div>
   </div>

   {/* Key Metrics */}
   <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
    <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
    <div className="text-sm text-muted-foreground">Accuracy Rate</div>
   </div>
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300">
    <div className="text-3xl font-bold text-accent mb-2">&lt;500ms</div>
    <div className="text-sm text-muted-foreground">Response Time</div>
   </div>
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300">
    <div className="text-3xl font-bold text-primary mb-2">10K+</div>
    <div className="text-sm text-muted-foreground">Concurrent Users</div>
   </div>
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300">
    <div className="text-3xl font-bold text-accent mb-2">99.99%</div>
    <div className="text-sm text-muted-foreground">Uptime SLA</div>
   </div>
   </div>
  </div>
  </section>

  {/* Features Section */}
  <section className="py-16 bg-card/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="text-center mb-12">
   <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
    Powerful Features That Drive Results
   </h2>
   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    Every feature in DalSiAI is designed to deliver measurable business value and exceptional user experiences.
   </p>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   {features.map((feature, index) => (
    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-border hover:border-primary/50">
    <CardHeader>
     <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors text-white">
     <feature.icon className="h-6 w-6 text-primary group-hover:animate-pulse" />
     </div>
     <CardTitle className="text-xl">{feature.title}</CardTitle>
    </CardHeader>
    <CardContent>
     <CardDescription className="text-base">{feature.description}</CardDescription>
    </CardContent>
    </Card>
   ))}
   </div>
  </div>
  </section>

  {/* Use Cases Section */}
  <section className="py-16 bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="text-center mb-12">
   <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
    Real-World Applications
   </h2>
   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    See how organizations are using DalSiAI to transform their operations and deliver better outcomes.
   </p>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
   {useCases.map((useCase, index) => (
    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
    <CardContent className="p-6">
     <div className="flex items-start space-x-4">
     <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/30 transition-colors">
      <CheckCircle className="h-6 w-6 text-accent group-hover:animate-bounce" />
     </div>
     <div className="flex-1">
      <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.title}</h3>
      <p className="text-muted-foreground mb-4">{useCase.description}</p>
      <div className="inline-flex items-center space-x-2 bg-primary/10 px-3 py-1 rounded-full text-white">
      <TrendingUp className="h-4 w-4 text-primary" />
      <span className="text-sm font-medium text-primary">{useCase.metrics}</span>
      </div>
     </div>
     </div>
    </CardContent>
    </Card>
   ))}
   </div>
  </div>
  </section>

  {/* Testimonials Section */}
  <section className="py-16 bg-card/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   <div className="text-center mb-12">
   <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
    What Our Customers Say
   </h2>
   <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
    Don't just take our word for it. Here's what industry leaders are saying about DalSiAI.
   </p>
   </div>

   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   {testimonials.map((testimonial, index) => (
    <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
    <CardContent className="p-6">
     <div className="flex items-center mb-4">
     {[...Array(testimonial.rating)].map((_, i) => (
      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
     ))}
     </div>
     <Quote className="h-8 w-8 text-primary/30 mb-4" />
     <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
     <div>
     <div className="font-semibold text-foreground">{testimonial.name}</div>
     <div className="text-sm text-muted-foreground">{testimonial.role}</div>
     </div>
    </CardContent>
    </Card>
   ))}
   </div>
  </div>
  </section>

  {/* CTA Section */}
  <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
   <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
   Ready to Transform Your Organization?
   </h2>
   <p className="text-lg text-muted-foreground mb-8">
   Join thousands of healthcare providers and educational institutions already using DalSiAI 
   to deliver exceptional results.
   </p>
   <div className="flex flex-col sm:flex-row gap-4 justify-center">
   <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-white">
    Start Your Free Trial
    <ArrowRight className="ml-2 h-5 w-5" />
   </Button>
   <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-white">
    Contact Sales Team
   </Button>
   </div>
   <p className="text-sm text-muted-foreground mt-4">
   14-day free trial • No credit card required • Full feature access
   </p>
  </div>
  </section>
 </div>
 )
}
