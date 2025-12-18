import * as React from "react"
import { Search, ArrowLeft, Upload, MessageCircle, User, Zap, Compass, Check, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Mock assets (using placeholders if real urls not available/stable)
const ANIME_girl_IMG = "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 

export default function ZensiPage() {
  const [activePlan, setActivePlan] = React.useState<"sempai" | "sensei">("sempai")
  const [billingCycle, setBillingCycle] = React.useState<"month" | "year">("month")

  return (
    <div className="flex h-screen w-full bg-[var(--colors-base-black)] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-[var(--colors-gray-dark-mode-800)] p-6 flex flex-col gap-6 hidden md:flex">
        <div className="text-2xl font-bold tracking-wider">ANIGOGO</div>
        
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--colors-gray-dark-mode-400)]" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-8 bg-[var(--colors-gray-dark-mode-900)] border-[var(--colors-gray-dark-mode-700)] text-white placeholder:text-[var(--colors-gray-dark-mode-500)] focus-visible:ring-[var(--colors-blue500)]"
          />
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem icon={<Zap className="h-5 w-5" />} label="Clips" />
          <NavItem icon={<Compass className="h-5 w-5" />} label="Explore" />
          <NavItem icon={<Upload className="h-5 w-5" />} label="Upload" />
          <NavItem icon={<MessageCircle className="h-5 w-5" />} label="Chat" />
          <NavItem icon={<User className="h-5 w-5" />} label="Profile" />
        </nav>

        <div className="mt-auto">
          <Button className="w-full bg-[var(--colors-blue500)] hover:bg-[var(--colors-blue600)] text-white font-bold rounded-full">
            Login
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <header className="p-6 pb-2">
          <button className="flex items-center gap-2 text-[var(--colors-gray-dark-mode-400)] hover:text-white transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-3xl font-bold">Subscribe</h1>
        </header>

        {/* Plan Toggle */}
        <div className="flex justify-center mb-8">
           <div className="bg-[var(--colors-gray-dark-mode-alpha-800)] rounded-full p-1 flex">
             <button
               onClick={() => setActivePlan("sempai")}
               className={cn(
                 "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                 activePlan === "sempai" 
                    ? "bg-[var(--colors-blue100)] text-black font-bold" 
                    : "text-[var(--colors-gray-dark-mode-400)] hover:text-white"
               )}
             >
               Sempai
             </button>
             <button
               onClick={() => setActivePlan("sensei")}
               className={cn(
                 "px-6 py-1.5 rounded-full text-sm font-medium transition-all",
                 activePlan === "sensei" 
                    ? "bg-[var(--colors-blue100)] text-black font-bold" 
                    : "text-[var(--colors-gray-dark-mode-400)] hover:text-white"
               )}
             >
               Sensei
             </button>
           </div>
        </div>

        {/* Subscription Cards */}
        <div className="flex flex-wrap justify-center gap-6 px-4 pb-12 items-start">
          {/* Active Card (Sempai) */}
          <Card className="w-full max-w-sm bg-[var(--colors-base-black)] border border-[var(--colors-gray-dark-mode-800)] overflow-hidden relative shadow-2xl shadow-blue-900/20">
             {/* Header Image */}
             <div className="h-48 overflow-hidden relative">
               <div className="absolute inset-0 bg-gradient-to-t from-[var(--colors-base-black)] to-transparent z-10" />
               <img src={ANIME_girl_IMG} alt="Character" className="w-full h-full object-cover" />
             </div>

             <CardContent className="space-y-6 pt-0 relative z-20 -mt-4">
               {/* Features List */}
               <ul className="space-y-3">
                 <FeatureItem text="Unlimited Text Messages" />
                 <FeatureItem text="View Character Stories" />
                 <FeatureItem text="Unlimited Audio Messages" />
                 <FeatureItem text="600 Character Limit On Enhanced Memory" />
                 <FeatureItem text="Enhanced Memory Context" />
                 <FeatureItem text="Remove Ads" />
               </ul>

               {/* Billing Cycle Selector */}
               <div className="grid grid-cols-2 gap-4 border border-white/20 rounded-lg p-1">
                 <button
                   onClick={() => setBillingCycle("month")}
                   className={cn(
                     "rounded-md py-3 px-2 text-center transition-all border border-transparent",
                     billingCycle === "month"
                       ? "border-[var(--colors-blue500)] bg-[var(--colors-blue500)]/10"
                       : "hover:bg-[var(--colors-gray-dark-mode-alpha-900)]"
                   )}
                 >
                   <div className="text-xs text-[var(--colors-gray-dark-mode-400)]">Per Month</div>
                   <div className="text-lg font-bold">$ 9.99</div>
                 </button>
                 <button
                   onClick={() => setBillingCycle("year")}
                   className={cn(
                     "rounded-md py-3 px-2 text-center transition-all border border-transparent",
                     billingCycle === "year"
                       ? "border-[var(--colors-blue500)] bg-[var(--colors-blue500)]/10"
                       : "hover:bg-[var(--colors-gray-dark-mode-alpha-900)]"
                   )}
                 >
                   <div className="text-xs text-[var(--colors-gray-dark-mode-400)]">Per Year</div>
                   <div className="text-lg font-bold">$ 99</div>
                   <div className="text-[10px] text-[var(--colors-gray-dark-mode-500)]">USD 8.25 / Month</div>
                 </button>
               </div>
             </CardContent>

             <CardFooter className="flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] text-[var(--colors-gray-dark-mode-500)] justify-center">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Secured with App Store, Cancel anytime</span>
                </div>

                <Button className="w-full bg-[var(--colors-blue500)] hover:bg-[var(--colors-blue600)] text-white rounded-full py-6 text-lg font-bold">
                  Subscribe &rarr;
                </Button>

                <div className="flex gap-4 text-[10px] text-[var(--colors-gray-dark-mode-600)] justify-center mt-2">
                  <a href="#" className="hover:text-[var(--colors-gray-dark-mode-400)]">Privacy Policy</a>
                  <span>|</span>
                  <a href="#" className="hover:text-[var(--colors-gray-dark-mode-400)]">User Agreement</a>
                  <span>|</span>
                  <a href="#" className="hover:text-[var(--colors-gray-dark-mode-400)]">EULA</a>
                </div>
             </CardFooter>
          </Card>

          {/* Next Tier Hint (Sensei) */}
           <Card className="w-full max-w-sm bg-[var(--colors-base-black)] border border-[var(--colors-gray-dark-mode-800)] overflow-hidden relative opacity-40 blur-[1px] hidden lg:block">
             <div className="h-48 bg-[var(--colors-gray-dark-mode-900)]" />
             <CardContent className="space-y-6 pt-6">
                <ul className="space-y-3">
                   <FeatureItem text="Unlimited Text Messages" />
                   <FeatureItem text="Characters Send You Personal..." />
                   <FeatureItem text="Unlimited Audio Messages" />
                </ul>
             </CardContent>
           </Card>
        </div>
      </main>
    </div>
  )
}

function NavItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-3 px-3 py-2 text-[var(--colors-gray-dark-mode-400)] hover:text-white hover:bg-[var(--colors-gray-dark-mode-alpha-900)] rounded-lg transition-colors text-left w-full">
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3 text-sm text-[var(--colors-gray-dark-mode-300)]">
      <Check className="h-4 w-4 text-white mt-0.5 shrink-0" />
      <span>{text}</span>
    </li>
  )
}
