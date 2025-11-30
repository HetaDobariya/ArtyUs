# Contributing to ArtyUs

Thank you for considering contributing to ArtyUs! We welcome contributions from the community.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

### Expected Behavior

- Be respectful and considerate
- Welcome newcomers and help them get started
- Accept constructive criticism gracefully
- Focus on what's best for the community

## 🚀 Getting Started

### Prerequisites

Before contributing, make sure you have:

1. Node.js (v18+) installed
2. MySQL (v8+) installed
3. Git configured
4. A code editor (VS Code recommended)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ArtyUs.git
   cd ArtyUs
   ```

3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/ArtyUs.git
   ```

4. **Install dependencies**:
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

5. **Set up environment variables** (see README.md)

6. **Set up the database**:
   ```bash
   mysql -u your_username -p artyus < backend/artyus_dump.sql
   ```

## 💡 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:

- **Clear title**: Describe the bug concisely
- **Description**: Detailed explanation of the issue
- **Steps to reproduce**: Step-by-step instructions
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Environment**: OS, browser, Node version, etc.

### Suggesting Features

For feature requests, create an issue with:

- **Clear title**: Describe the feature
- **Use case**: Why this feature is needed
- **Proposed solution**: How you envision it working
- **Alternatives**: Other solutions you've considered

### Code Contributions

1. Check existing issues or create a new one
2. Comment on the issue to let others know you're working on it
3. Follow the development workflow below

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch naming conventions**:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `style/` - Code style changes

### 2. Make Your Changes

- Write clean, readable code
- Follow the coding standards below
- Test your changes thoroughly
- Update documentation if needed

### 3. Test Your Changes

#### Backend Testing
```bash
cd backend
npm start
# Verify API endpoints work correctly
```

#### Frontend Testing
```bash
cd frontend
npm run dev
# Test UI changes in browser
# Check responsive design
# Verify no console errors
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "type: brief description"
```

See [Commit Guidelines](#commit-guidelines) below.

### 5. Keep Your Branch Updated

```bash
git fetch upstream
git rebase upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Create a Pull Request

Go to GitHub and create a pull request from your branch to the main repository.

## 📝 Coding Standards

### JavaScript/TypeScript

- Use ES6+ features
- Use `const` and `let`, avoid `var`
- Use arrow functions for callbacks
- Use async/await over promises when possible
- Add JSDoc comments for functions

**Example**:
```typescript
/**
 * Fetches product details from the API
 * @param {string} productId - The ID of the product
 * @returns {Promise<Product>} Product object
 */
const getProduct = async (productId: string): Promise<Product> => {
  const response = await fetch(`/api/product/${productId}`);
  return response.json();
};
```

### React/Next.js

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components small and focused
- Use meaningful component names
- Extract reusable logic into custom hooks

**Example**:
```typescript
interface ProductCardProps {
  product: Product;
  onSelect: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div onClick={() => onSelect(product.id)}>
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
};
```

### Backend

- Follow MVC pattern (Model-View-Controller)
- Keep routes thin, logic in controllers
- Use middleware for authentication
- Handle errors properly
- Validate input data

**Example**:
```javascript
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ 
        success: false, 
        message: "Product ID is required" 
      });
    }
    
    const product = await getProductById(id);
    
    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server error" 
    });
  }
};
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use consistent spacing and colors
- Ensure accessibility (ARIA labels, contrast ratios)

### File Naming

- Use camelCase for variables and functions
- Use PascalCase for components and classes
- Use kebab-case for file names (except React components)
- React components: `ComponentName.tsx`
- Utilities: `utility-name.ts`

## 📝 Commit Guidelines

### Commit Message Format

```
type: subject

body (optional)

footer (optional)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat: add product search functionality

fix: resolve authentication token expiration issue

docs: update API documentation for product endpoints

refactor: simplify user authentication logic

style: format code with prettier
```

### Best Practices

- Keep commits atomic (one logical change per commit)
- Write descriptive commit messages
- Reference issue numbers when applicable: `fix: resolve #123`
- Avoid commits like "fix", "update", or "changes"

## 🔍 Pull Request Process

### Before Submitting

- ✅ Code follows the style guidelines
- ✅ No console errors or warnings
- ✅ Tested on multiple browsers (if frontend)
- ✅ Documentation updated (if needed)
- ✅ No merge conflicts with main branch

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Changes Made
- Change 1
- Change 2
- Change 3

## Screenshots (if applicable)
Add screenshots here

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Commented complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added (if applicable)
```

### Review Process

1. Automated checks will run (linting, tests)
2. Maintainers will review your code
3. Address any requested changes
4. Once approved, your PR will be merged

### After Your PR is Merged

1. Delete your branch
2. Pull the latest changes:
   ```bash
   git checkout main
   git pull upstream main
   ```
3. Celebrate! 🎉

## 🐛 Debugging Tips

### Backend Issues

- Check MySQL connection in `backend/src/config/db.js`
- Verify environment variables in `.env`
- Check server logs for errors
- Use Postman to test API endpoints
- Verify JWT token is being sent correctly

### Frontend Issues

- Check browser console for errors
- Verify API URL in environment variables
- Use React DevTools for component debugging
- Check network tab for failed requests
- Clear browser cache if needed

## 📚 Additional Resources

### Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Tools

- [VS Code](https://code.visualstudio.com/) - Code editor
- [Postman](https://www.postman.com/) - API testing
- [MySQL Workbench](https://www.mysql.com/products/workbench/) - Database management
- [React DevTools](https://react.dev/learn/react-developer-tools) - React debugging

## 🤔 Questions?

If you have questions:

1. Check existing issues and documentation
2. Ask in the issue you're working on
3. Create a new discussion issue
4. Reach out to maintainers

## 🙏 Thank You!

Your contributions make ArtyUs better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🚀**


