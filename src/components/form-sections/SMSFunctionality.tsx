import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from '@/pages/Index';

interface SMSFunctionalityProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const SMSFunctionality = ({ formData, updateFormData }: SMSFunctionalityProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          SMS AI Functionality
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          How do you want your SMS AI to function?
        </p>

        <div className="space-y-6">
          <div>
            <Label className="text-bright-white font-manrope font-medium mb-4 block">
              SMS AI Operation Type
            </Label>
            <RadioGroup
              value={formData.smsOperationType || ''}
              onValueChange={(value) => updateFormData({ smsOperationType: value })}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="outbound-leads" 
                  id="outbound-leads"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="outbound-leads" className="text-bright-white font-manrope cursor-pointer">
                  <div>
                    <div className="font-medium">Outbound to Lead Lists</div>
                    <div className="text-sm text-soft-lavender mt-1">
                      SMS AI reaches out to existing lead lists or purchased data
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
                <RadioGroupItem 
                  value="form-followup" 
                  id="form-followup"
                  className="border-neon-aqua text-neon-aqua"
                />
                <Label htmlFor="form-followup" className="text-bright-white font-manrope cursor-pointer">
                  <div>
                    <div className="font-medium">Form Submission Follow-up</div>
                    <div className="text-sm text-soft-lavender mt-1">
                      People fill out forms and AI sends outbound messages to them
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="sms-additional-context" className="text-bright-white font-manrope font-medium mb-3 block">
              Additional Context or Requirements
            </Label>
            <Textarea
              id="sms-additional-context"
              value={formData.smsAdditionalContext || ''}
              onChange={(e) => updateFormData({ smsAdditionalContext: e.target.value })}
              placeholder="Any additional details about how your SMS AI should function..."
              className="bg-charcoal-black/60 border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSFunctionality;