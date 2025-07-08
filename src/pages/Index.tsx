import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import BasicInformation from '@/components/form-sections/BasicInformation';
import VoiceAIPurpose from '@/components/form-sections/VoiceAIPurpose';
import CallProcess from '@/components/form-sections/CallProcess';
import QualificationCriteria from '@/components/form-sections/QualificationCriteria';
import CustomerExperience from '@/components/form-sections/CustomerExperience';
import AgentKnowledge from '@/components/form-sections/AgentKnowledge';
import SuccessMetrics from '@/components/form-sections/SuccessMetrics';
import VoicePreferences from '@/components/form-sections/VoicePreferences';
import ServiceSelection from '@/components/form-sections/ServiceSelection';
import SMSFunctionality from '@/components/form-sections/SMSFunctionality';
import SMSIntroMessages from '@/components/form-sections/SMSIntroMessages';
import SMSFlow from '@/components/form-sections/SMSFlow';
import SMSObjective from '@/components/form-sections/SMSObjective';
import SMSKnowledge from '@/components/form-sections/SMSKnowledge';

export interface FormData {
  // Service Selection
  purchasedServices: string[];
  
  // SMS AI Specific
  smsOperationType: string;
  smsAdditionalContext: string;
  smsIntroMessages: string[];
  smsQualificationFlow: string;
  smsObjective: string;
  smsPersona: string;
  smsFAQs: string;
  smsWebsiteUrl: string;
  
  // Basic Information
  companyName: string;
  specificBusinessType: string;
  companyWebsite: string;
  contactName: string;
  email: string;
  
  // Voice AI Purpose
  agentType: string;
  leadSources: string[];
  leadSourcesOther: string;
  mainPurpose: string;
  mainPurposeOther: string;
  brandPersonality: string[];
  brandPersonalityOther: string;
  
  // Call Process
  currentCallProcess: string;
  salesScripts: File[];
  requiredInformation: string[];
  requiredInformationOther: string;
  
  // Qualification Criteria
  successCriteria: string;
  disqualificationCriteria: string;
  
  // Customer Experience
  emotionalStates: string[];
  emotionalStatesOther: string;
  commonProblems: string[];
  commonObjections: string;
  
  // Agent Knowledge
  companyServices: string;
  serviceAreas: string;
  keyDifferentiators: string;
  topicsToAvoid: string[];
  topicsToAvoidOther: string;
  
  // Success Metrics
  successDefinition: string;
  targetCallLength: number;
  crmSystem: string;
  crmSystemOther: string;
  schedulingSoftware: string;
  schedulingSoftwareOther: string;
  emailSystem: string;
  emailSystemOther: string;
  complianceRequirements: string;
  
  // Voice Preferences
  aiName: string;
  voiceGender: string;
  elevenLabsVoiceId: string;
  additionalVoiceRequirements: string;
}

const initialFormData: FormData = {
  purchasedServices: [],
  // SMS AI fields
  smsOperationType: '',
  smsAdditionalContext: '',
  smsIntroMessages: [],
  smsQualificationFlow: '',
  smsObjective: '',
  smsPersona: '',
  smsFAQs: '',
  smsWebsiteUrl: '',
  // Other fields
  companyName: '',
  specificBusinessType: '',
  companyWebsite: '',
  contactName: '',
  email: '',
  agentType: '',
  leadSources: [],
  leadSourcesOther: '',
  mainPurpose: '',
  mainPurposeOther: '',
  brandPersonality: [],
  brandPersonalityOther: '',
  currentCallProcess: '',
  salesScripts: [],
  requiredInformation: [],
  requiredInformationOther: '',
  successCriteria: '',
  disqualificationCriteria: '',
  emotionalStates: [],
  emotionalStatesOther: '',
  commonProblems: ['', '', ''],
  commonObjections: '',
  companyServices: '',
  serviceAreas: '',
  keyDifferentiators: '',
  topicsToAvoid: [],
  topicsToAvoidOther: '',
  successDefinition: '',
  targetCallLength: 0,
  crmSystem: '',
  crmSystemOther: '',
  schedulingSoftware: '',
  schedulingSoftwareOther: '',
  emailSystem: '',
  emailSystemOther: '',
  complianceRequirements: '',
  aiName: '',
  voiceGender: '',
  elevenLabsVoiceId: '',
  additionalVoiceRequirements: ''
};

const sections = [
  { id: 'services', title: 'Service Selection', component: ServiceSelection },
];

const serviceSections = {
  'SMS AI': [
    { id: 'sms-basic', title: 'Basic Information', component: BasicInformation },
    { id: 'sms-functionality', title: 'SMS Functionality', component: SMSFunctionality },
    { id: 'sms-intro', title: 'Intro Messages', component: SMSIntroMessages },
    { id: 'sms-flow', title: 'Qualification Flow', component: SMSFlow },
    { id: 'sms-objective', title: 'Objective & Persona', component: SMSObjective },
    { id: 'sms-knowledge', title: 'Knowledge Base', component: SMSKnowledge },
  ],
  'Inbound Voice AI': [
    { id: 'inbound-basic', title: 'Basic Information', component: BasicInformation },
    { id: 'inbound-purpose', title: 'Voice AI Purpose', component: VoiceAIPurpose },
    { id: 'inbound-process', title: 'Call Process & Flow', component: CallProcess },
    { id: 'inbound-qualification', title: 'Qualification Criteria', component: QualificationCriteria },
    { id: 'inbound-experience', title: 'Customer Experience', component: CustomerExperience },
    { id: 'inbound-knowledge', title: 'Agent Knowledge', component: AgentKnowledge },
    { id: 'inbound-metrics', title: 'Success Metrics & Integration', component: SuccessMetrics },
    { id: 'inbound-preferences', title: 'Voice Preferences & Specifications', component: VoicePreferences }
  ],
  'Outbound Voice AI': [
    { id: 'outbound-basic', title: 'Basic Information', component: BasicInformation },
    { id: 'outbound-purpose', title: 'Voice AI Purpose', component: VoiceAIPurpose },
    { id: 'outbound-process', title: 'Call Process & Flow', component: CallProcess },
    { id: 'outbound-qualification', title: 'Qualification Criteria', component: QualificationCriteria },
    { id: 'outbound-experience', title: 'Customer Experience', component: CustomerExperience },
    { id: 'outbound-knowledge', title: 'Agent Knowledge', component: AgentKnowledge },
    { id: 'outbound-metrics', title: 'Success Metrics & Integration', component: SuccessMetrics },
    { id: 'outbound-preferences', title: 'Voice Preferences & Specifications', component: VoicePreferences }
  ]
};

const Index = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentService, setCurrentService] = useState<string>('');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<number>>(new Set());
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('voiceAIFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData({ ...initialFormData, ...parsed });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem('voiceAIFormData', JSON.stringify(formData));
    }, 30000);

    return () => clearInterval(interval);
  }, [formData]);

  // Set current service when services are selected
  useEffect(() => {
    if (formData.purchasedServices.length > 0 && !currentService) {
      setCurrentService(formData.purchasedServices[0]);
      setCurrentServiceIndex(0);
    }
  }, [formData.purchasedServices, currentService]);

  // Get current sections based on whether services are selected and which service is active
  const getCurrentSections = () => {
    if (currentSection === 0) {
      return sections; // Service selection
    }
    
    if (currentService && serviceSections[currentService]) {
      return serviceSections[currentService];
    }
    
    return [];
  };

  const currentSections = getCurrentSections();
  const sectionIndex = currentSection === 0 ? 0 : currentSection - 1;

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const calculateProgress = () => {
    const totalFields = Object.keys(initialFormData).length;
    const filledFields = Object.entries(formData).filter(([key, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'string') return value.trim() !== '';
      if (typeof value === 'number') return value > 0;
      return false;
    }).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };

  const saveProgress = () => {
    localStorage.setItem('voiceAIFormData', JSON.stringify(formData));
    toast({
      title: "Progress Saved",
      description: "Your form progress has been saved locally",
    });
  };

  const handleSubmit = () => {
    // Save the form data (in a real app, this would send to a server)
    localStorage.setItem('voiceAIFormData', JSON.stringify(formData));
    
    toast({
      title: "Form Submitted Successfully",
      description: "Thank you for completing the Voice AI Discovery Form!",
    });

    // Navigate to thank you page
    navigate('/thank-you');
  };

  const CurrentSectionComponent = currentSection === 0 
    ? sections[0].component 
    : (currentSections[sectionIndex] ? currentSections[sectionIndex].component : sections[0].component);
  const progress = calculateProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-black via-deep-violet to-purple-grape">
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          {/* Brand Logo */}
          <div className="mb-4 md:mb-6">
            <img 
              src="/lovable-uploads/2a49b2d2-c9c4-4677-b30a-a089a34e4431.png"
              alt="RevSquared AI Logo" 
              className="mx-auto w-32 h-auto md:w-48 mb-4 max-w-full"
            />
            <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-neon-aqua to-hot-magenta mx-auto mb-3 md:mb-4"></div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-audiowide text-bright-white mb-2">
            Voice AI Discovery Form
          </h2>
          <p className="text-base md:text-xl text-soft-lavender mb-4 md:mb-6 font-manrope px-4">
            Help us build your custom voice AI agent
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mb-4 px-4">
            <div className="flex justify-between text-xs md:text-sm text-soft-lavender mb-2 font-manrope">
              <span>Progress: {progress}% complete</span>
              <span>
                {currentSection === 0 
                  ? 'Step 1: Service Selection' 
                  : `${currentService} - Section ${sectionIndex + 1} of ${currentSections.length}`
                }
              </span>
            </div>
            <div className="w-full bg-deep-violet rounded-full h-2 md:h-3 overflow-hidden">
              <div 
                className="h-full retro-gradient transition-all duration-500 ease-out neon-glow"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6 md:mb-8 px-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={saveProgress}
              className="bg-charcoal-black border-2 border-neon-aqua text-neon-aqua hover:bg-neon-aqua hover:text-charcoal-black font-manrope font-medium transition-all duration-300 shadow-lg text-xs md:text-sm"
            >
              <Save className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
              Save Progress
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8 max-w-7xl mx-auto">
          {/* Section Navigation */}
          <div className="w-full lg:w-80 flex-shrink-0 order-2 lg:order-1">
            <Card className="p-4 md:p-6 lg:sticky lg:top-4 bg-charcoal-black/80 border-2 border-purple-grape backdrop-blur-sm">
              <h3 className="font-audiowide text-neon-aqua mb-4 neon-text text-sm md:text-base">
                {currentSection === 0 ? 'Form Sections' : `${currentService} Sections`}
              </h3>
              
              {/* Show service indicator when working on specific service */}
              {currentSection > 0 && currentService && (
                <div className="mb-4 p-2 rounded-lg bg-neon-aqua/10 border border-neon-aqua/30">
                  <p className="text-neon-aqua font-manrope text-xs">
                    Working on: <span className="font-semibold">{currentService}</span>
                  </p>
                  <p className="text-soft-lavender font-manrope text-xs mt-1">
                    Service {currentServiceIndex + 1} of {formData.purchasedServices.length}
                  </p>
                </div>
              )}
              
              <ScrollArea className="h-64 lg:h-96">
                <div className="space-y-2">
                  {currentSections.map((section, index) => (
                    <div key={section.id}>
                      <button
                        onClick={() => currentSection === 0 ? setCurrentSection(index) : setCurrentSection(index + 1)}
                        className={`w-full text-left p-2 md:p-3 rounded-lg transition-all duration-300 font-manrope border text-xs md:text-sm ${
                          (currentSection === 0 && index === 0) || (currentSection > 0 && index === sectionIndex)
                            ? 'bg-neon-aqua text-charcoal-black border-neon-aqua font-semibold shadow-lg'
                            : 'bg-charcoal-black/60 border-purple-grape text-bright-white hover:bg-deep-violet hover:border-neon-aqua hover:text-bright-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{section.title}</span>
                          {completedSections.has(index) && (
                            <div className="w-4 h-4 md:w-5 md:h-5 bg-cyber-yellow rounded-full flex items-center justify-center">
                              <ChevronRight className="w-2 h-2 md:w-3 md:h-3 text-charcoal-black" />
                            </div>
                          )}
                        </div>
                      </button>
                      {index < currentSections.length - 1 && <Separator className="my-2 bg-purple-grape" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>

          {/* Main Form Content */}
          <div className="flex-1 order-1 lg:order-2">
            <Card className="p-4 md:p-8 bg-charcoal-black/80 border-2 border-purple-grape backdrop-blur-sm">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-audiowide text-neon-aqua mb-2 neon-text">
                  {currentSection === 0 ? sections[0].title : (currentSections[sectionIndex] ? currentSections[sectionIndex].title : 'Loading...')}
                </h2>
                <p className="text-soft-lavender font-manrope text-sm md:text-base">
                  {currentSection === 0 ? 'Step 1: Select your services' : `Section ${sectionIndex + 1} of ${currentSections.length}`}
                </p>
                
              </div>

              <CurrentSectionComponent
                formData={formData}
                updateFormData={updateFormData}
                {...(currentSection > 0 && { currentService })}
              />

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-purple-grape">
                <Button
                  variant="outline"
                  onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                  disabled={currentSection === 0}
                  className="w-full sm:w-auto bg-deep-violet border-2 border-soft-lavender text-soft-lavender hover:bg-soft-lavender hover:text-charcoal-black font-manrope font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous Section
                </Button>
                
                {currentSection === 0 || currentSection < currentSections.length ? (
                  <Button
                    onClick={() => {
                      if (currentSection === 0) {
                        // Move from service selection to first section of first service
                        setCurrentSection(1);
                      } else if (currentSection < currentSections.length) {
                        // Move to next section within current service
                        setCurrentSection(currentSection + 1);
                      } else {
                        // Check if there are more services to complete
                        const nextServiceIndex = currentServiceIndex + 1;
                        if (nextServiceIndex < formData.purchasedServices.length) {
                          setCurrentService(formData.purchasedServices[nextServiceIndex]);
                          setCurrentServiceIndex(nextServiceIndex);
                          setCurrentSection(1); // Start at first section of next service
                        }
                      }
                    }}
                    className="w-full sm:w-auto bg-neon-aqua text-charcoal-black hover:bg-hot-magenta hover:text-bright-white font-audiowide font-medium transition-all duration-300 shadow-lg"
                  >
                    {currentSection === 0 ? 'Start Form' : 'Next Section'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      // Check if there are more services to complete
                      const nextServiceIndex = currentServiceIndex + 1;
                      if (nextServiceIndex < formData.purchasedServices.length) {
                        setCurrentService(formData.purchasedServices[nextServiceIndex]);
                        setCurrentServiceIndex(nextServiceIndex);
                        setCurrentSection(1); // Start at first section of next service
                      } else {
                        handleSubmit();
                      }
                    }}
                    className="w-full sm:w-auto bg-gradient-to-r from-neon-aqua to-hot-magenta text-charcoal-black hover:from-hot-magenta hover:to-cyber-yellow font-audiowide font-medium transition-all duration-300 shadow-lg"
                  >
                    {currentServiceIndex + 1 < formData.purchasedServices.length ? 'Next Service' : 'Submit Form'}
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
