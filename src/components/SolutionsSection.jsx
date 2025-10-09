import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { MessageSquare, Image, Video, Brain, Stethoscope, GraduationCap, ArrowRight } from 'lucide-react'

export default function SolutionsSection() {
 return (
 <section id="solutions" className="py-24 bg-card/30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Section header */}
  <div className="text-center mb-16">
   <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
   Our AI Solutions
   </h2>
   <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
   Discover the power of our dual AI ecosystem designed to revolutionize how you interact with technology, 
   process information, and deliver exceptional outcomes in healthcare and education.
   </p>
  </div>

  {/* Main AI Products */}
  <div className="grid md:grid-cols-3 gap-8 mb-16">
   {/* DalSi AI */}
   <Card className="group hover:shadow-2xl transition-all duration-300 border-primary/20 hover:border-primary/40">
   <CardHeader className="text-center pb-4">
    <div className="mx-auto w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors text-white">
    <MessageSquare className="h-8 w-8 text-primary" />
    </div>
    <CardTitle className="text-2xl font-bold text-primary">Dalsi AI</CardTitle>
    <CardDescription className="text-lg">Text-Based AI Engine</CardDescription>
   </CardHeader>
   <CardContent className="space-y-4 text-center">
    <p className="text-muted-foreground">
    Advanced text-based AI for content creation, code generation, business communication, and research.
    </p>
    <div className="space-y-2">
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-primary rounded-full text-white"></div>
     <span className="text-sm">Content & copywriting</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-primary rounded-full text-white"></div>
     <span className="text-sm">Code generation & debugging</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-primary rounded-full text-white"></div>
     <span className="text-sm">Business automation</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-primary rounded-full text-white"></div>
     <span className="text-sm">Research & analysis</span>
    </div>
    </div>
    <Button 
    onClick={() => window.navigate?.('/models/dalsi-ai')}
    className="w-full bg-primary hover:bg-primary/90 text-white"
    >
    Learn More
    <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
   </CardContent>
   </Card>

   {/* Dalsi AI Vi */}
   <Card className="group hover:shadow-2xl transition-all duration-300 border-accent/20 hover:border-accent/40">
   <CardHeader className="text-center pb-4">
    <div className="mx-auto w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
    <Image className="h-8 w-8 text-accent" />
    </div>
    <CardTitle className="text-2xl font-bold text-accent">Dalsi AI Vi</CardTitle>
    <CardDescription className="text-lg">Vision AI Engine</CardDescription>
   </CardHeader>
   <CardContent className="space-y-4 text-center">
    <p className="text-muted-foreground">
    Advanced vision AI for image analysis, document processing, medical imaging, and quality control.
    </p>
    <div className="space-y-2">
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-accent rounded-full"></div>
     <span className="text-sm">OCR & document intelligence</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-accent rounded-full"></div>
     <span className="text-sm">Medical image analysis</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-accent rounded-full"></div>
     <span className="text-sm">Image generation & editing</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-accent rounded-full"></div>
     <span className="text-sm">Quality inspection</span>
    </div>
    </div>
    <Button 
    onClick={() => window.navigate?.('/models/dalsi-ai-vi')}
    className="w-full bg-accent hover:bg-accent/90"
    >
    Learn More
    <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
   </CardContent>
   </Card>

   {/* Dalsi AI Vd */}
   <Card className="group hover:shadow-2xl transition-all duration-300 border-purple/20 hover:border-purple/40">
   <CardHeader className="text-center pb-4">
    <div className="mx-auto w-16 h-16 bg-purple/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple/30 transition-colors text-white">
    <Video className="h-8 w-8 text-purple" />
    </div>
    <CardTitle className="text-2xl font-bold text-purple">Dalsi AI Vd</CardTitle>
    <CardDescription className="text-lg">Media AI Engine</CardDescription>
   </CardHeader>
   <CardContent className="space-y-4 text-center">
    <p className="text-muted-foreground">
    Comprehensive media AI for video production, translation, music generation, and multimedia content.
    </p>
    <div className="space-y-2">
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-purple rounded-full text-white"></div>
     <span className="text-sm">Video creation & editing</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-purple rounded-full text-white"></div>
     <span className="text-sm">100+ language translation</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-purple rounded-full text-white"></div>
     <span className="text-sm">Music & audio generation</span>
    </div>
    <div className="flex items-center justify-center space-x-2">
     <div className="w-2 h-2 bg-purple rounded-full text-white"></div>
     <span className="text-sm">Marketing video ads</span>
    </div>
    </div>
    <Button 
    onClick={() => window.navigate?.('/models/dalsi-ai-vd')}
    className="w-full bg-purple hover:bg-purple/90 text-white"
    >
    Learn More
    <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
   </CardContent>
   </Card>
  </div>

  {/* Domain Applications */}
  <div className="grid md:grid-cols-2 gap-8">
   {/* Healthcare */}
   <Card className="group hover:shadow-xl transition-all duration-300">
   <CardHeader className="text-center">
    <div className="flex flex-col items-center space-y-3 mb-4">
    <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center group-hover:bg-destructive/30 transition-colors">
     <Stethoscope className="h-6 w-6 text-destructive" />
    </div>
    <div>
     <CardTitle className="text-xl">Healthcare Solutions</CardTitle>
     <CardDescription>Transforming Patient Care</CardDescription>
    </div>
    </div>
   </CardHeader>
   <CardContent className="space-y-4 text-center">
    <p className="text-muted-foreground">
    Revolutionizing healthcare delivery through intelligent automation, predictive analytics, 
    and personalized patient care solutions.
    </p>
    <div className="grid grid-cols-2 gap-2 text-sm text-left max-w-md mx-auto">
    <div>• Remote Patient Monitoring</div>
    <div>• Diagnostic Assistance</div>
    <div>• Treatment Recommendations</div>
    <div>• Medical Image Analysis</div>
    <div>• Clinical Decision Support</div>
    <div>• Patient Query Resolution</div>
    </div>
    <Button variant="outline" className="w-full group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors">
    Explore Healthcare AI
    <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
   </CardContent>
   </Card>

   {/* Education */}
   <Card className="group hover:shadow-xl transition-all duration-300">
   <CardHeader className="text-center">
    <div className="flex flex-col items-center space-y-3 mb-4">
    <div className="w-12 h-12 bg-chart-4/20 rounded-lg flex items-center justify-center group-hover:bg-chart-4/30 transition-colors">
     <GraduationCap className="h-6 w-6 text-chart-4" />
    </div>
    <div>
     <CardTitle className="text-xl">Education & Training</CardTitle>
     <CardDescription>Empowering Learning Excellence</CardDescription>
    </div>
    </div>
   </CardHeader>
   <CardContent className="space-y-4 text-center">
    <p className="text-muted-foreground">
    Enhancing educational experiences through personalized learning paths, intelligent tutoring, 
    and comprehensive knowledge management systems.
    </p>
    <div className="grid grid-cols-2 gap-2 text-sm text-left max-w-md mx-auto">
    <div>• Personalized Learning</div>
    <div>• Intelligent Tutoring</div>
    <div>• Content Generation</div>
    <div>• Assessment Automation</div>
    <div>• Knowledge Management</div>
    <div>• Student Support Systems</div>
    </div>
    <Button variant="outline" className="w-full group-hover:bg-chart-4 group-hover:text-chart-4-foreground transition-colors">
    Explore Education AI
    <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
   </CardContent>
   </Card>
  </div>

  {/* Automation Section */}
  <div className="mt-16 text-center">
   <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
   <CardContent className="py-12">
    <Brain className="h-16 w-16 text-primary mx-auto mb-6" />
    <h3 className="text-3xl font-bold text-foreground mb-4">
    Intelligent Automation at Scale
    </h3>
    <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8">
    Our AI solutions don't just process information—they learn, adapt, and evolve. Through advanced 
    machine learning algorithms and neural networks, we deliver automation that thinks, reasons, 
    and improves continuously, ensuring your organization stays ahead of the curve.
    </p>
    <div className="grid md:grid-cols-3 gap-6 mt-8">
    <div className="text-center">
     <div className="text-2xl font-bold text-primary mb-2">Self-Learning</div>
     <p className="text-sm text-muted-foreground">Continuous improvement through experience</p>
    </div>
    <div className="text-center">
     <div className="text-2xl font-bold text-accent mb-2">Adaptive</div>
     <p className="text-sm text-muted-foreground">Dynamic response to changing requirements</p>
    </div>
    <div className="text-center">
     <div className="text-2xl font-bold text-destructive mb-2">Scalable</div>
     <p className="text-sm text-muted-foreground">Enterprise-grade performance and reliability</p>
    </div>
    </div>
   </CardContent>
   </Card>
  </div>
  </div>
 </section>
 )
}
