# Contributing to TT-Tutor

Thank you for your interest in contributing to TT-Tutor! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Code Style](#code-style)
- [Commit Guidelines](#commit-guidelines)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Create a new branch** for your feature or fix
4. **Make your changes**
5. **Test your changes**
6. **Submit a pull request**

## Development Setup

### Prerequisites

- Node.js 18+
- npm, yarn, or bun
- Git

### Installation

```bash
# Clone your fork
git clone https://github.com/yourusername/tt-tutor.git
cd tt-tutor

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run test` - Run tests (placeholder)

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-new-theme`
- `fix/keyboard-layout-issue`
- `docs/update-readme`
- `refactor/improve-performance`

### File Structure

Follow the existing project structure:

- Components go in `components/`
- Utilities go in `lib/`
- Types go in `lib/types.ts`
- Constants go in `lib/constants.ts`

### Component Guidelines

- Use TypeScript for all new components
- Follow the existing component patterns
- Use Radix UI primitives for accessibility
- Implement proper keyboard navigation
- Add proper TypeScript types

## Testing

### Manual Testing

Before submitting changes, test:

- [ ] The feature works as expected
- [ ] No console errors
- [ ] Responsive design on different screen sizes
- [ ] Keyboard navigation works
- [ ] Accessibility features work
- [ ] Different themes work correctly

### Automated Testing

Run the following commands:

```bash
npm run lint
npm run type-check
npm run build
```

## Submitting Changes

### Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all tests pass**
4. **Update the README** if adding new features
5. **Create a pull request** with a clear description

### Pull Request Template

Use the provided pull request template and fill out all sections:

- Description of changes
- Type of change
- Testing information
- Checklist items

## Code Style

### TypeScript

- Use strict TypeScript settings
- Define proper interfaces and types
- Avoid `any` type
- Use meaningful variable names

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries

### CSS/Styling

- Use Tailwind CSS classes
- Follow the existing design system
- Ensure responsive design
- Maintain accessibility standards

### File Naming

- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for variables and functions

## Commit Guidelines

### Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(keyboard): add new neon theme
fix(typing): resolve accuracy calculation issue
docs(readme): update installation instructions
style(components): improve button styling
refactor(utils): optimize performance functions
test(keyboard): add unit tests for keyboard component
chore(deps): update dependencies
```

## Review Process

1. **Automated checks** must pass
2. **Code review** by maintainers
3. **Address feedback** and make requested changes
4. **Maintainer approval** required for merge

## Getting Help

- **Issues**: Use GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Documentation**: Check the README and code comments

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- GitHub contributors list

Thank you for contributing to TT-Tutor! 🎯⌨️
