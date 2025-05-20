
import { createAppKit } from '@reown/appkit/react'

import { createConfig, http, WagmiProvider } from 'wagmi'
import {  bsc } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'b0fe082939f0a0e8ad75a98b4db7a22d'

// 2. Create a metadata object - optional
const metadata = {
  name: 'EGE',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit', // origin must match your domain & subdomain
  icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Set the networks
const networks = [bsc]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export const wagmiConfig = createConfig({
  chains: [bsc],
  transports: {
    [bsc.id]: http('https://services.tokenview.io/vipapi/nodeservice/bsc?apikey=W2kFupq7FkGGVYjZbbM3'),
  },
})

export function AppKitProvider({ children }:{children:any}) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
    