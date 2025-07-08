import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormData } from '@/pages/Index';

interface SMSKnowledgeProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const SMSKnowledge = ({ formData, updateFormData }: SMSKnowledgeProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          SMS AI Knowledge Base
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          Provide information to help your SMS AI handle common questions and objections.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="sms-faqs" className="text-bright-white font-manrope font-medium mb-3 block">
              FAQ's for Common Objections and Questions
            </Label>
            <Textarea
              id="sms-faqs"
              value={formData.smsFAQs || ''}
              onChange={(e) => updateFormData({ smsFAQs: e.target.value })}
              placeholder="Provide common questions/objections and how the AI should respond..."
              className="bg-charcoal-black/60 border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope"
              rows={10}
            />
          </div>

          <div className="bg-deep-violet/20 border border-neon-aqua/30 rounded-lg p-4">
            <h4 className="text-neon-aqua font-audiowide font-medium mb-3 text-sm">FAQ Example Format:</h4>
            <div className="space-y-2 text-xs text-soft-lavender font-manrope">
              <div>
                <strong className="text-bright-white">Q: "I'm not interested"</strong><br />
                <strong className="text-neon-aqua">A:</strong> "I understand you might not be interested right now, but this opportunity has helped hundreds of businesses like yours. What specifically about your current situation makes you feel this wouldn't be a good fit?"
              </div>
              <div className="mt-3">
                <strong className="text-bright-white">Q: "How much does it cost?"</strong><br />
                <strong className="text-neon-aqua">A:</strong> "That's a great question! The investment varies based on your specific needs. Before we discuss pricing, can you tell me more about what you're hoping to achieve?"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSKnowledge;