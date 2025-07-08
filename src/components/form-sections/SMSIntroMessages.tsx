import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Plus, Minus } from 'lucide-react';
import { FormData } from '@/pages/Index';

interface SMSIntroMessagesProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const SMSIntroMessages = ({ formData, updateFormData }: SMSIntroMessagesProps) => {
  const addIntroMessage = () => {
    const currentMessages = formData.smsIntroMessages || [];
    if (currentMessages.length < 4) {
      updateFormData({
        smsIntroMessages: [...currentMessages, '']
      });
    }
  };

  const removeIntroMessage = (index: number) => {
    const currentMessages = formData.smsIntroMessages || [];
    updateFormData({
      smsIntroMessages: currentMessages.filter((_, i) => i !== index)
    });
  };

  const updateIntroMessage = (index: number, value: string) => {
    const currentMessages = formData.smsIntroMessages || [];
    const updatedMessages = [...currentMessages];
    updatedMessages[index] = value;
    updateFormData({
      smsIntroMessages: updatedMessages
    });
  };

  const introMessages = formData.smsIntroMessages || [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          SMS Intro Messages
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          Provide intro message variations for A/B testing (up to 4 messages). These will be used to split test different approaches.
        </p>

        <div className="space-y-6">
          <div className="space-y-4">
            {introMessages.map((message, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-bright-white font-manrope font-medium">
                    Intro Message {index + 1}
                  </Label>
                  {introMessages.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeIntroMessage(index)}
                      className="bg-charcoal-black border-purple-grape text-soft-lavender hover:bg-deep-violet hover:border-neon-aqua"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <Textarea
                  value={message}
                  onChange={(e) => updateIntroMessage(index, e.target.value)}
                  placeholder={index === 0 ? 
                    "Hi (name) this is Karina with RevSquared AI. I see that you just submitted your information on our ad about (x). What has you looking at AI?" :
                    "Enter another intro message variation..."
                  }
                  className="bg-charcoal-black/60 border-purple-grape text-bright-white placeholder:text-soft-lavender font-manrope"
                  rows={4}
                />
              </div>
            ))}

            {introMessages.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-purple-grape rounded-lg">
                <p className="text-soft-lavender font-manrope mb-4">
                  No intro messages added yet. Click the button below to add your first message.
                </p>
              </div>
            )}

            {introMessages.length < 4 && (
              <Button
                type="button"
                variant="outline"
                onClick={addIntroMessage}
                className="w-full bg-charcoal-black border-2 border-neon-aqua text-neon-aqua hover:bg-neon-aqua hover:text-charcoal-black font-manrope font-medium transition-all duration-300"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Intro Message ({introMessages.length}/4)
              </Button>
            )}
          </div>

          <div className="bg-deep-violet/20 border border-neon-aqua/30 rounded-lg p-4">
            <h4 className="text-neon-aqua font-audiowide font-medium mb-2 text-sm">Examples:</h4>
            <div className="space-y-3 text-xs text-soft-lavender font-manrope">
              <div>
                <strong className="text-bright-white">Form Follow-up:</strong> "Hi (name) this is Karina with RevSquared AI. I see that you just submitted your information on our ad about (x). What has you looking at AI?"
              </div>
              <div>
                <strong className="text-bright-white">Lead List:</strong> "Hi (contact name), you mentioned in the past that you were looking to secure capital for your business. We have some new programs available with 0% interest terms. Would you still be able to use the capital?"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SMSIntroMessages;