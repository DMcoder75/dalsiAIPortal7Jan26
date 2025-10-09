import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, Star, Shield } from 'lucide-react';

const PricingSection = () => {
 const pricingTiers = [
 {
  name: "Starter",
  price: "$299",
  period: "/month",
  description: "Perfect for small practices and educational institutions getting started with AI",
  color: "bg-card border-border",
  buttonColor: "bg-primary hover:bg-primary/90",
  popular: false,
  features: [
  "Up to 10,000 AI queries per month",
  "Basic DalSiAI text processing",
  "Standard response time (< 5 seconds)",
  "Email support (48-hour response)",
  "Basic analytics dashboard",
  "API access with rate limiting",
  "Standard security protocols",
  "Community forum access",
  "Basic training materials",
  "Single domain deployment"
  ],
  limitations: [
  "No multimodal AI (DalSiAIVi)",
  "Limited customization options",
  "No priority support"
  ]
 },
 {
  name: "Professional",
  price: "$899",
  period: "/month",
  description: "Comprehensive AI solution for growing healthcare providers and educational organizations",
  color: "bg-card border-primary",
  buttonColor: "bg-primary hover:bg-primary/90",
  popular: true,
  features: [
  "Up to 50,000 AI queries per month",
  "Full DalSiAI + DalSiAIVi access",
  "Advanced multimodal processing",
  "Priority response time (< 2 seconds)",
  "24/7 priority support",
  "Advanced analytics & insights",
  "Full API access with higher limits",
  "Enhanced security & compliance",
  "Custom integrations support",
  "Multi-domain deployment",
  "Advanced training & onboarding",
  "Custom AI model fine-tuning",
  "Dedicated account manager",
  "Monthly strategy consultations"
  ],
  limitations: [
  "Usage limits apply",
  "Standard SLA terms"
  ]
 },
 {
  name: "Enterprise",
  price: "Custom",
  period: "pricing",
  description: "Unlimited AI power for large healthcare systems and educational networks",
  color: "bg-card border-accent",
  buttonColor: "bg-accent hover:bg-accent/90",
  popular: false,
  features: [
  "Unlimited AI queries",
  "Full DalSiAI + DalSiAIVi suite",
  "Real-time processing (< 1 second)",
  "White-label solutions available",
  "Dedicated cloud infrastructure",
  "Custom AI model development",
  "Advanced security & compliance",
  "24/7 dedicated support team",
  "On-premise deployment options",
  "Custom integrations & APIs",
  "Advanced analytics & reporting",
  "Multi-tenant architecture",
  "Regulatory compliance assistance",
  "Executive-level consultations",
  "Custom training programs",
  "Revenue sharing opportunities"
  ],
  limitations: []
 }
 ];

 return (
 <section className="py-20 bg-background relative overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
  <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl text-white"></div>
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
  
  <div className="container mx-auto px-4 relative z-10">
  {/* Section Header */}
  <div className="text-center mb-16">
   <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6 text-white">
   <span className="text-primary font-semibold text-sm">Revenue Model</span>
   </div>
   <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-accent bg-clip-text text-transparent">
   Choose Your AI Journey
   </h2>
   <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
   Transparent, scalable pricing designed to grow with your organization. 
   From startups to enterprise giants, we have the perfect AI solution for your needs.
   </p>
  </div>

  {/* Pricing Cards Container - NEW APPROACH */}
  <div className="pricing-grid-container">
   <style jsx>{`
   .pricing-grid-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;
   }
   
   @media (min-width: 768px) {
    .pricing-grid-container {
    grid-template-columns: repeat(2, 1fr);
    }
   }
   
   @media (min-width: 1024px) {
    .pricing-grid-container {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    }
   }
   
   .pricing-card {
    position: relative;
    height: auto;
    min-height: 700px;
    display: flex;
    flex-direction: column;
   }
   
   .pricing-card-content {
    flex: 1;
    display: flex;
    flex-direction: column;
   }
   
   .pricing-features {
    flex: 1;
   }
   `}</style>
   
   {pricingTiers.map((tier, index) => (
   <Card key={index} className={`pricing-card ${tier.color} ${tier.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : 'hover:shadow-xl'} transition-all duration-300 hover:scale-105`}>
    {tier.popular && (
    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
     <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold animate-pulse text-white">
     Most Popular
     </div>
    </div>
    )}
    
    <CardHeader className="text-center pb-6">
    <div className="mb-4">
     <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
     <div className="flex items-baseline justify-center mb-4">
     <span className="text-4xl font-bold">{tier.price}</span>
     <span className="text-muted-foreground ml-1">{tier.period}</span>
     </div>
     <p className="text-muted-foreground text-sm leading-relaxed">
     {tier.description}
     </p>
    </div>
    </CardHeader>

    <CardContent className="pricing-card-content">
    <div className="pricing-features">
     {/* Features List */}
     <div className="space-y-3 mb-6">
     {tier.features.map((feature, featureIndex) => (
      <div key={featureIndex} className="flex items-start gap-3">
      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
      <span className="text-sm text-muted-foreground">{feature}</span>
      </div>
     ))}
     </div>

     {/* Limitations */}
     {tier.limitations.length > 0 && (
     <div className="mb-6">
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Limitations:</h4>
      <div className="space-y-2">
      {tier.limitations.map((limitation, limitIndex) => (
       <div key={limitIndex} className="flex items-start gap-3">
       <div className="w-2 h-2 bg-muted-foreground/50 rounded-full mt-2 flex-shrink-0"></div>
       <span className="text-sm text-muted-foreground">{limitation}</span>
       </div>
      ))}
      </div>
     </div>
     )}
    </div>

    {/* CTA Button */}
    <div className="mt-auto space-y-4">
     <Button 
     className={`w-full ${tier.buttonColor} text-white hover:scale-105 transition-all duration-300 group`}
     size="lg"
     >
     {tier.name === "Enterprise" ? "Contact Sales" : "Start Free Trial"}
     <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
     </Button>

     {/* Additional Info */}
     <div className="text-center">
     <p className="text-xs text-muted-foreground">
      {tier.name === "Enterprise" ? "Custom implementation timeline" : "14-day free trial • No credit card required"}
     </p>
     </div>
    </div>
    </CardContent>
   </Card>
   ))}
  </div>

  {/* Value Propositions */}
  <div className="grid md:grid-cols-3 gap-8 mt-16">
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 group">
   <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse text-white">
    <Zap className="h-6 w-6 text-primary" />
   </div>
   <h3 className="text-lg font-semibold mb-2">ROI Guarantee</h3>
   <p className="text-muted-foreground text-sm">
    See measurable improvements in efficiency and outcomes within 90 days, or get your money back.
   </p>
   </div>
   
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 group">
   <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
    <Star className="h-6 w-6 text-accent" />
   </div>
   <h3 className="text-lg font-semibold mb-2">Scalable Growth</h3>
   <p className="text-muted-foreground text-sm">
    Start small and scale seamlessly as your organization grows. No migration headaches.
   </p>
   </div>
   
   <div className="text-center p-6 bg-card/50 rounded-lg border border-border hover:border-destructive/50 transition-all duration-300 group">
   <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
    <Shield className="h-6 w-6 text-destructive" />
   </div>
   <h3 className="text-lg font-semibold mb-2">Enterprise Ready</h3>
   <p className="text-muted-foreground text-sm">
    Built for the most demanding environments with enterprise-grade security and compliance.
   </p>
   </div>
  </div>

  {/* CTA Section */}
  <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary/10 via-purple-500/10 to-accent/10 rounded-2xl border border-primary/20">
   <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Organization?</h3>
   <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
   Join thousands of healthcare providers and educational institutions already using Dalsi AI 
   to deliver better outcomes and enhanced experiences.
   </p>
   <div className="flex flex-col sm:flex-row gap-4 justify-center">
   <Button size="lg" className="bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 text-white">
    Start Your Free Trial
   </Button>
   <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 text-white">
    Schedule a Demo
   </Button>
   </div>
  </div>
  </div>
 </section>
 );
};

export default PricingSection;
