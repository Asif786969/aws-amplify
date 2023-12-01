import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host:true,
    port:5173,
    proxy:{
      '/alarms':'https://l9enkvivp3.execute-api.us-east-1.amazonaws.com/testing',
      '/refresh':'https://khfdw071s5.execute-api.us-east-1.amazonaws.com/testing',
      '/allstocks':'https://khfdw071s5.execute-api.us-east-1.amazonaws.com/testing',
      '/highbuy':'https://l9enkvivp3.execute-api.us-east-1.amazonaws.com/testing',
      '/crossrsi':'https://l9enkvivp3.execute-api.us-east-1.amazonaws.com/testing',
      '/allrsi':'https://l9enkvivp3.execute-api.us-east-1.amazonaws.com/testing',
      '/allha':'https://l9enkvivp3.execute-api.us-east-1.amazonaws.com/testing',     

      
    }
  }
})
