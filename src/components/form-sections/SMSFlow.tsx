import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FormData } from '@/pages/Index';

interface SMSFlowProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const SMSFlow = ({ formData, updateFormData }: SMSFlowProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          SMS Qualification Flow
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          Provide a detailed breakdown of the qualification flow with example conversations.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="sms-qualification-flow" className="text-bright-white font-manrope font-medium mb-3 block">
              Qualification Flow Breakdown
            </Label>
            <Textarea
              id="sms-qualification-flow"
              value={formData.smsQualificationFlow || ''}
              onChange={(e) => updateFormData({ smsQualificationFlow: e.target.value })}
              placeholder="Describe the step-by-step qualification flow..."
              className="bg-charcoal-black/60 border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope"
              rows={12}
            />
          </div>

          <div className="bg-deep-violet/20 border border-neon-aqua/30 rounded-lg p-4">
            <h4 className="text-neon-aqua font-audiowide font-medium mb-3 text-sm">Example Format:</h4>
            <div className="space-y-2 text-xs text-soft-lavender font-manrope whitespace-pre-line">
{`Intro message sent.

C: Yes, I still need capital

AI: Great, how much capital do you need and how quickly do you need it?

C: 100k and ASAP

AI: Ok, we can help with that. How long have you been in business?

C: 6 years

AI: Ok, and what would you say is your average monthly revenue?

C: 100k

AI: Great, looks like we can help you secure the funding you need. What is a good email for you so that I can send you a quick application and I will get you connected with our team.

C: email address

AI: Schedule appointment`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSFlow;