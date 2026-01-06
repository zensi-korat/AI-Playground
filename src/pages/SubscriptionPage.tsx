import { SubscriptionCarousel } from '@/components/SubscriptionCarousel'

export default function SubscriptionPage() {
  const handleCtaClick = (cardId: string, billingCycle: 'month' | 'year') => {
    console.log(`CTA clicked for ${cardId} with ${billingCycle} billing`)
    // Add your CTA handling logic here
  }

  return <SubscriptionCarousel onCtaClick={handleCtaClick} />
}
