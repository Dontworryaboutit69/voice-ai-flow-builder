import { Checkbox } from '@/components/ui/checkbox';
import { FormData } from '@/pages/Index';

interface ServiceSelectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

const ServiceSelection = ({ formData, updateFormData }: ServiceSelectionProps) => {
  const handleServiceChange = (service: string, checked: boolean) => {
    const currentServices = formData.purchasedServices || [];
    if (checked) {
      updateFormData({
        purchasedServices: [...currentServices, service]
      });
    } else {
      updateFormData({
        purchasedServices: currentServices.filter(s => s !== service)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-audiowide text-neon-aqua mb-4 neon-text">
          What did you purchase?
        </h3>
        <p className="text-soft-lavender mb-6 font-manrope">
          Please select all services you purchased (check all that apply):
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
            <Checkbox
              id="sms-ai"
              checked={formData.purchasedServices?.includes('SMS AI') || false}
              onCheckedChange={(checked) => handleServiceChange('SMS AI', checked as boolean)}
              className="border-neon-aqua data-[state=checked]:bg-neon-aqua data-[state=checked]:text-charcoal-black"
            />
            <label htmlFor="sms-ai" className="text-bright-white font-manrope font-medium cursor-pointer">
              SMS AI
            </label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
            <Checkbox
              id="inbound-voice"
              checked={formData.purchasedServices?.includes('Inbound Voice AI') || false}
              onCheckedChange={(checked) => handleServiceChange('Inbound Voice AI', checked as boolean)}
              className="border-neon-aqua data-[state=checked]:bg-neon-aqua data-[state=checked]:text-charcoal-black"
            />
            <label htmlFor="inbound-voice" className="text-bright-white font-manrope font-medium cursor-pointer">
              Inbound Voice AI
            </label>
          </div>

          <div className="flex items-center space-x-3 p-4 rounded-lg border border-purple-grape bg-charcoal-black/40">
            <Checkbox
              id="outbound-voice"
              checked={formData.purchasedServices?.includes('Outbound Voice AI') || false}
              onCheckedChange={(checked) => handleServiceChange('Outbound Voice AI', checked as boolean)}
              className="border-neon-aqua data-[state=checked]:bg-neon-aqua data-[state=checked]:text-charcoal-black"
            />
            <label htmlFor="outbound-voice" className="text-bright-white font-manrope font-medium cursor-pointer">
              Outbound Voice AI
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;