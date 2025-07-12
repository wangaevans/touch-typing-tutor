# TT Tutor: Interactive Typing Tutor

A modern, interactive typing tutor built with Next.js, React, and TypeScript. Master your typing skills with TT Tutor's beautiful virtual keyboard, multiple themes, and comprehensive statistics tracking.

![TT Tutor Logo](public/tt-tutor-logo.svg)

## ✨ Features

- **TT Tutor Virtual Keyboard**: Interactive keyboard with finger placement guidance
- **Multiple Themes**: 50+ beautiful keyboard themes including neon, retro, gradient, and more
- **Practice & Test Modes**: Choose between TT Tutor's practice mode for learning and test mode for assessment
- **Real-time Statistics**: Track WPM, accuracy, and typing progress with TT Tutor's analytics
- **Finger Color Coding**: Visual guidance for proper finger placement
- **Responsive Design**: TT Tutor works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Git

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/evans/tt-tutor.git
   cd tt-tutor
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Live Demo

🌐 **Try TT Tutor online**: [TT Tutor Demo](https://tt-tutor.vercel.app) _(Coming soon)_

## 🎯 Usage

### TT Tutor Practice Mode

- Start typing to begin practice with TT Tutor
- The virtual keyboard highlights the correct finger for each key
- Real-time feedback on accuracy and speed
- No time pressure - focus on accuracy

### TT Tutor Test Mode

- Timed typing tests with predefined text passages
- Final statistics including WPM and accuracy
- Multiple test texts available

### Customization

- Choose from 50+ keyboard themes in TT Tutor
- Toggle between light and dark modes
- Adjust settings in the TT Tutor settings modal

## 🛠️ Technologies Used

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks
- **Build Tool**: Turbopack (via Next.js)
- **Package Manager**: npm/yarn/bun

## 📁 Project Structure

```
tt-tutor/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── keyboard/          # Keyboard-related components
│   ├── modes/             # Practice and test mode components
│   ├── settings/          # Settings components
│   ├── stats/             # Statistics components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility functions and constants
│   ├── constants.ts       # App constants
│   ├── keyboard-themes.ts # Keyboard theme definitions
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility functions
└── public/                # Static assets
    ├── favicon.ico        # Browser favicon
    └── img/               # Images and assets
```

## 🎨 Available Themes

TT Tutor includes 50+ keyboard themes:

- **Classic**: Default, Minimal, Retro
- **Neon**: Neon Pink, Neon Blue, Neon Green, Neon Purple, Neon Orange
- **Gradients**: Sunset, Aurora, Galaxy, Plasma, Fire, Ice
- **Materials**: Glass, Carbon, Gold, Silver, Copper, Marble, Wood
- **Nature**: Forest, Ocean, Desert, Arctic, Space
- **Gems**: Diamond, Ruby, Sapphire, Emerald, Amethyst
- **And many more...**

## 🧪 Testing & Development

```bash
# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🚀 Deployment

This project uses GitHub Actions for automated deployment:

- **CI/CD Pipeline**: Automated testing and deployment on every push
- **Preview Deployments**: Automatic preview builds for pull requests
- **Production Deployment**: Automatic deployment to production on main branch merge
- **Security Scanning**: Weekly security audits and dependency checks

### Deployment Platforms

- **Vercel**: Primary hosting platform
- **GitHub Pages**: Alternative deployment option
- **Docker**: Containerized deployment support (coming soon)

### Environment Variables

Required for deployment:

- `VERCEL_TOKEN`: Vercel API token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID
- `SNYK_TOKEN`: Snyk security token (optional)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed information.

### Quick Start for Contributors

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run checks locally**
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
5. **Commit your changes** (using conventional commits)
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use conventional commit messages
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers
- Follow the existing code style
- Use Radix UI for accessibility

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by classic typing tutors
- Built with modern web technologies
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Keyboard themes inspired by modern design trends

## 📊 Project Status

- ✅ **CI/CD**: Automated testing and deployment
- ✅ **TypeScript**: Full type safety
- ✅ **Accessibility**: WCAG compliant
- ✅ **Responsive**: Mobile-first design
- 🔄 **Testing**: Test framework setup in progress
- 🔄 **Documentation**: Comprehensive guides

## 🌟 Support the Project

If you find this project helpful, please consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting** bugs or issues
- 💡 **Suggesting** new features
- 🤝 **Contributing** code or documentation

---

**Happy Typing!** 🎯⌨️
