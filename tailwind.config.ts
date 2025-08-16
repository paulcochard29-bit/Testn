
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F4F7FA',
        panel: '#FFFFFF',
        'panel-2': '#F9FCFF',
        text: '#1E2A35',
        muted: '#5C7386',
        accent: '#1C6DD0',
        'accent-2': '#00B4D8',
      },
      boxShadow: { soft: '0 10px 30px rgba(0,0,0,.08)' },
      borderRadius: { xl: '16px' }
    }
  },
  plugins: []
}
export default config
