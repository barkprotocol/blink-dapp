import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Send, Layers, Sparkles, Gift, ShoppingBag, Shield, Code, ArrowRight, Repeat } from 'lucide-react'
import { motion } from 'framer-motion'

interface BlinkCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  link: string;
}

const BlinkCard: React.FC<BlinkCardProps> = ({ title, description, icon, action, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-full"
  >
    <Card className="bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 flex flex-col h-full border border-gray-200">
      <CardHeader className="p-4">
        <div className="flex items-center space-x-2">
          {icon}
          <CardTitle className="font-inter text-lg font-semibold text-gray-900">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="font-poppins font-light text-sm text-gray-700">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={link} passHref>
          <Button 
            className="w-full text-sm bg-sand-400 text-white hover:bg-sand-500 transition-colors duration-300 rounded-full py-2 px-4 flex items-center justify-center"
          >
            {action}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  </motion.div>
)

export const Blinks: React.FC = () => {
  const blinks: BlinkCardProps[] = [
    { 
      title: "Create Blinks", 
      description: "Instantly mint and customize Solana Blinks, representing unique digital assets or memorable moments on the blockchain.", 
      icon: <Zap className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Start Creating",
      link: "/blinks/create"
    },
    { 
      title: "Send Blinks",
      description: "Seamlessly transfer your Blinks to friends, family, or fellow collectors on the Solana network.", 
      icon: <Send className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Send Now",
      link: "/blinks/send" 
    },
    { 
      title: "Track Blinks", 
      description: "Keep a close eye on your growing Blink collection and transaction history in real-time.", 
      icon: <Layers className="h-5 w-5 text-[#D0BFB4]" />,
      action: "View Collection",
      link: "/blinks/track"
    },
    { 
      title: "Customize Blinks", 
      description: "Make your Blinks truly unique by adding custom attributes, metadata, and visual elements.", 
      icon: <Sparkles className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Customize",
      link: "/blinks/customize"
    },
    { 
      title: "Gift Blinks", 
      description: "Surprise loved ones with special Blinks as thoughtful, digital gifts. Create lasting memories.", 
      icon: <Gift className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Send a Gift",
      link: "/blinks/gift"
    },
    { 
      title: "Blink Commerce", 
      description: "Bridge the digital and physical worlds by creating and selling merchandise tied to unique Blinks.", 
      icon: <ShoppingBag className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Open Shop",
      link: "/blinks/commerce"
    },
    { 
      title: "Security", 
      description: "Enhance the security of your Blinks with advanced encryption and multi-signature protection.", 
      icon: <Shield className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Secure Blinks",
      link: "/blinks/security"
    },
    {
      title: "BARK Blink API & SDK",
      description: "Integrate BARK Blinks into your own applications with our comprehensive API and SDK.",
      icon: <Code className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Explore Docs",
      link: "/blinks/api"
    },
    {
      title: "Swap NFTs",
      description: "Exchange your Blinks with other users, creating a vibrant marketplace for digital assets.",
      icon: <Repeat className="h-5 w-5 text-[#D0BFB4]" />,
      action: "Start Swapping",
      link: "/blinks/swap"
    }
  ]

  return (
    <section id="blinks" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-inter text-4xl sm:text-5xl font-bold mb-2 text-center text-gray-900">Blinks As A Service</h2>
        <h3 className="font-poppins text-xl sm:text-2xl font-medium mb-4 text-center text-gray-500">Unleash the Power of Digital Moments</h3>
        <p className="font-poppins text-base sm:text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          Discover the innovative features of BARK Blinks. Create, customize, and share unique digital assets on the Solana blockchain, opening up a world of possibilities for collectors and creators alike.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blinks.map((blink, index) => (
            <BlinkCard key={index} {...blink} />
          ))}
        </div>
      </div>
    </section>
  )
}