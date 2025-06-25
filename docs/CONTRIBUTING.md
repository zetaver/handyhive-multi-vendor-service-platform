# Contributing to KaamKonnect

Thank you for your interest in contributing to KaamKonnect! This document provides guidelines and information for contributors.

## Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

### Our Pledge
We are committed to making participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards
Examples of behavior that contributes to creating a positive environment include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB
- Git
- Code editor (VS Code recommended)

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/kaamkonnect.git
   cd kaamkonnect
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original-owner/kaamkonnect.git
   ```
4. Install dependencies:
   ```bash
   npm install
   cd server && npm install
   ```
5. Set up environment variables (see [Installation Guide](./INSTALLATION.md))
6. Start development servers:
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

## Development Workflow

### Branch Naming Convention
- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format
Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): add password reset functionality
fix(booking): resolve date validation issue
docs(api): update authentication endpoints
```

### Development Process
1. Create a new branch from `main`:
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards

3. Test your changes thoroughly

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat(component): add new feature"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Prefer functional components with hooks

**Example:**
```typescript
/**
 * Calculates the distance between two coordinates
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  // Implementation
}
```

### React Components
- Use functional components with hooks
- Implement proper prop types with TypeScript interfaces
- Follow the single responsibility principle
- Use meaningful component names

**Example:**
```typescript
interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
  className?: string;
}

export function ServiceCard({ service, onBook, className }: ServiceCardProps) {
  const handleBooking = () => {
    onBook(service.id);
  };

  return (
    <div className={`service-card ${className}`}>
      {/* Component content */}
    </div>
  );
}
```

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use consistent spacing (8px grid system)
- Implement proper color contrast ratios

### Backend Code
- Use Express.js best practices
- Implement proper error handling
- Use middleware for common functionality
- Follow RESTful API conventions

**Example:**
```javascript
// Controller example
export const createService = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    
    // Validation
    if (!title || !description || !price) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Business logic
    const service = new Service({
      title,
      description,
      price,
      provider: req.user.id
    });

    await service.save();

    res.status(201).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error'
    });
  }
};
```

## Testing Guidelines

### Frontend Testing
- Write unit tests for utility functions
- Test React components with React Testing Library
- Use Jest for test runner
- Aim for 80%+ code coverage

**Example:**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ServiceCard } from './ServiceCard';

describe('ServiceCard', () => {
  const mockService = {
    id: '1',
    title: 'Test Service',
    price: 100
  };

  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} onBook={jest.fn()} />);
    
    expect(screen.getByText('Test Service')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
  });

  it('calls onBook when book button is clicked', () => {
    const mockOnBook = jest.fn();
    render(<ServiceCard service={mockService} onBook={mockOnBook} />);
    
    fireEvent.click(screen.getByText('Book Now'));
    expect(mockOnBook).toHaveBeenCalledWith('1');
  });
});
```

### Backend Testing
- Write unit tests for controllers and middleware
- Test API endpoints with supertest
- Mock external dependencies
- Test error scenarios

**Example:**
```javascript
import request from 'supertest';
import app from '../app';

describe('POST /api/services', () => {
  it('should create a new service', async () => {
    const serviceData = {
      title: 'Test Service',
      description: 'Test description',
      price: 100
    };

    const response = await request(app)
      .post('/api/services')
      .set('Authorization', `Bearer ${validToken}`)
      .send(serviceData)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Service');
  });
});
```

### Running Tests
```bash
# Frontend tests
npm test

# Backend tests
cd server && npm test

# Coverage report
npm run test:coverage
```

## Pull Request Process

### Before Submitting
- [ ] Code follows the style guidelines
- [ ] Self-review of the code completed
- [ ] Tests added/updated and passing
- [ ] Documentation updated if needed
- [ ] No merge conflicts with main branch

### PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
```

### Review Process
1. Automated checks must pass (CI/CD)
2. At least one code review required
3. All conversations must be resolved
4. Branch must be up to date with main

## Issue Reporting

### Bug Reports
Use the bug report template:

```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
- OS: [e.g. iOS]
- Browser [e.g. chrome, safari]
- Version [e.g. 22]

**Additional context**
Any other context about the problem.
```

### Feature Requests
Use the feature request template:

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context or screenshots about the feature request.
```

## Development Tools

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Tailwind CSS IntelliSense
- ESLint
- Prettier
- GitLens
- Thunder Client

### Useful Commands
```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Build project
npm run build

# Start development server
npm run dev
```

## Community

### Communication Channels
- GitHub Issues - Bug reports and feature requests
- GitHub Discussions - General questions and discussions
- Discord - Real-time chat and support

### Getting Help
1. Check existing issues and documentation
2. Search GitHub discussions
3. Ask in Discord community
4. Create a new issue if needed

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Annual contributor appreciation posts

## License

By contributing to KaamKonnect, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to KaamKonnect! 🙏**