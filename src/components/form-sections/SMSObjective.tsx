import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/pages/Index';

interface SMSObjectiveProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const SMSObjective = ({ formData, updateFormData }: SMSObjectiveProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          SMS AI Objective & Persona
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          Define what you want your SMS AI to accomplish and its personality.
        </p>

        <div className="space-y-6">
          <div>
            <Label className="text-bright-white font-manrope font-medium mb-4 block">
              What do you want to happen?
            </Label>
            <RadioGroup
              value={formData.smsObjective || ''}
              onValueChange={(value) => updateFormData({ smsObjective: value })}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="send-application" 
                  id="send-application"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="send-application" className="text-bright-white font-manrope cursor-pointer">
                  Send Application Only
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="book-appointment" 
                  id="book-appointment"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="book-appointment" className="text-bright-white font-manrope cursor-pointer">
                  Book an Appointment
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="live-transfer" 
                  id="live-transfer"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="live-transfer" className="text-bright-white font-manrope cursor-pointer">
                  Live Transfer
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-bright-white font-manrope font-medium mb-4 block">
              SMS AI Persona
            </Label>
            <RadioGroup
              value={formData.smsPersona || ''}
              onValueChange={(value) => updateFormData({ smsPersona: value })}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="friendly" 
                  id="friendly"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="friendly" className="text-bright-white font-manrope cursor-pointer">
                  <div>
                    <div className="font-medium">Friendly</div>
                    <div className="text-sm text-soft-lavender mt-1">
                      Warm, approachable, and conversational
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="professional" 
                  id="professional"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="professional" className="text-bright-white font-manrope cursor-pointer">
                  <div>
                    <div className="font-medium">Professional</div>
                    <div className="text-sm text-soft-lavender mt-1">
                      Business-focused, formal, and direct
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="aggressive" 
                  id="aggressive"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="aggressive" className="text-bright-white font-manrope cursor-pointer">
                  <div>
                    <div className="font-medium">Aggressive</div>
                    <div className="text-sm text-soft-lavender mt-1">
                      Persistent, urgent, and results-driven
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSObjective;