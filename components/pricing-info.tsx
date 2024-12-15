import { Badge } from "@/components/ui/badge"

interface PricingInfoProps {
  pricing: string;
}

export function PricingInfo({ pricing }: PricingInfoProps) {
  const getPricingColor = (pricing: string) => {
    switch (pricing.toLowerCase()) {
      case 'free':
        return 'bg-green-500 hover:bg-green-600';
      case 'paid':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'freemium':
        return 'bg-purple-500 hover:bg-purple-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="mb-4">
      <Badge className={`text-white ${getPricingColor(pricing)}`}>
        {pricing}
      </Badge>
    </div>
  );
}

