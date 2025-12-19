import * as React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Using the uploaded image as reference
const SEMPAI_CHARACTER = "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60"

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = React.useState<"month" | "year">("month")

  return (
    <div className="flex min-h-screen w-full bg-white text-black overflow-auto">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-12 px-4">
        {/* Subscription Card */}
        <div className="w-full max-w-md">
          <Card className="bg-white border border-gray-200 overflow-hidden shadow-sm">
            {/* Character Image */}
            <div className="h-56 overflow-hidden relative">
              <img src={SEMPAI_CHARACTER} alt="Character" className="w-full h-full object-cover" />
            </div>

            <CardContent className="space-y-6 pt-6 px-6">
              {/* Features */}
              <ul className="space-y-3">
                <FeatureItem text="Unlimited Text Messages" />
                <FeatureItem text="View Character Stories" />
                <FeatureItem text="Unlimited Audio Messages" />
                <FeatureItem text="600 Character Limit On Enhanced Memory" />
                <FeatureItem text="Enhanced Memory Context" />
                <FeatureItem text="Remove Ads" />
              </ul>

              {/* Pricing */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setBillingCycle("month")}
                  className={cn(
                    "rounded-lg py-4 px-3 text-center transition-all border-2",
                    billingCycle === "month"
                      ? "border-black bg-white"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  )}
                >
                  <div className="text-xs text-gray-600 mb-1">Per Month</div>
                  <div className="text-2xl font-black text-black">$ 9.99</div>
                </button>
                <button
                  onClick={() => setBillingCycle("year")}
                  className={cn(
                    "rounded-lg py-4 px-3 text-center transition-all border-2",
                    billingCycle === "year"
                      ? "border-black bg-white"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  )}
                >
                  <div className="text-xs text-gray-600 mb-1">Per Year</div>
                  <div className="text-2xl font-black text-black">$ 99</div>
                  <div className="text-[10px] text-gray-500 mt-1">USD 8.25 / Month</div>
                </button>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-4 px-6 pb-6">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secured with App Store, Cancel anytime</span>
              </div>

              <Button className="w-full bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg h-12 text-base font-semibold">
                Visual Studio Code →
              </Button>

              <div className="flex gap-3 text-[10px] text-gray-500 justify-center">
                <a href="#" className="hover:text-gray-700 underline">Privacy Policy</a>
                <span>|</span>
                <a href="#" className="hover:text-gray-700 underline">User Agreement</a>
                <span>|</span>
                <a href="#" className="hover:text-gray-700 underline">EULA</a>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-gray-800">
      <Check className="h-4 w-4 mt-0.5 shrink-0 text-black" />
      <span>{text}</span>
    </li>
  )
}
