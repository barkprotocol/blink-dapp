'use client'

import { useState, useRef, useCallback } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { createQR, encodeURL, TransactionRequestURLFields } from '@solana/pay'
import { PublicKey } from '@solana/web3.js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, QrCode, RefreshCw } from 'lucide-react'

export default function SolanaQRGenerator() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { publicKey } = useWallet()
  const qrRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const generateQR = useCallback(async () => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to generate a QR code.",
        variant: "destructive",
      })
      return
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number for the amount.",
        variant: "destructive",
      })
      return
    }

    if (!recipient || !PublicKey.isOnCurve(new PublicKey(recipient))) {
      toast({
        title: "Invalid recipient address",
        description: "Please enter a valid Solana address for the recipient.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const recipientPublicKey = new PublicKey(recipient)
      const amountInLamports = Number(amount) * 1e9 // Convert SOL to lamports

      const urlParams: TransactionRequestURLFields = {
        recipient: recipientPublicKey.toBase58(),
        amount: amountInLamports,
        label: 'BARK BLINK Payment',
        message: 'Thanks for your payment!',
        memo: 'BARK BLINK Transaction',
      }

      const url = encodeURL(urlParams)
      const qr = createQR(url, 512, 'transparent')

      if (qrRef.current) {
        qrRef.current.innerHTML = ''
        qr.append(qrRef.current)
      }

      toast({
        title: "QR Code Generated",
        description: "Your Solana Pay QR code has been generated successfully.",
      })
    } catch (error) {
      console.error('Error generating QR code:', error)
      toast({
        title: "QR Code Generation Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [amount, recipient, publicKey, toast])

  return (
    <Card className="w-full max-w-md mx-auto bg-card text-card-foreground">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold">
          <QrCode className="mr-2 h-6 w-6 text-[#D0BFB4]" />
          Solana Pay QR Generator
        </CardTitle>
        <CardDescription className="text-muted-foreground">Generate a QR code for Solana Pay transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">Amount (SOL)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount in SOL"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              aria-label="Amount in SOL"
              min="0"
              step="0.000000001"
              className="bg-background border-input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-sm font-medium">Recipient Address</Label>
            <Input
              id="recipient"
              type="text"
              placeholder="Enter recipient's Solana address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              disabled={isLoading}
              aria-label="Recipient's Solana address"
              className="bg-background border-input"
            />
          </div>
          <Button 
            onClick={generateQR} 
            disabled={isLoading} 
            className="w-full bg-[#D0BFB4] text-white hover:bg-[#D0BFB4]/90 transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate QR Code
              </>
            )}
          </Button>
          <div 
            ref={qrRef} 
            className="mt-4 flex justify-center" 
            aria-live="polite" 
            aria-atomic="true"
          ></div>
        </div>
      </CardContent>
    </Card>
  )
}