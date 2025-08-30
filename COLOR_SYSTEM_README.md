# Color System & Dark Mode Implementation

This project now includes a comprehensive color system with CSS variables and dark mode support. All colors are managed through CSS custom properties (variables) and automatically adapt to the selected theme.

## 🎨 Color System Overview

### CSS Variables Structure
All colors are defined in `src/app/globals.css` using CSS custom properties:

```css
:root {
  /* Light mode colors */
  --color-primary: #007bff;
  --color-success: #75dab4;
  --color-text-primary: #111827;
  /* ... more colors */
}

[data-theme="dark"] {
  /* Dark mode colors */
  --color-text-primary: #f9fafb;
  --color-card-bg: #1f2937;
  /* ... more colors */
}
```

### Available Color Categories

1. **Primary Colors**: Primary brand colors
2. **Secondary Colors**: Supporting brand colors  
3. **Success Colors**: Success states and actions
4. **Danger Colors**: Error states and destructive actions
5. **Warning Colors**: Warning states and caution actions
6. **Info Colors**: Informational states
7. **Neutral Colors**: Grays and basic colors
8. **Component Colors**: Specific colors for UI components
9. **Text Colors**: Text color variations
10. **Border Colors**: Border color variations
11. **Shadow Colors**: Shadow color variations

## 🌙 Dark Mode Features

### Automatic Theme Detection
- **System Preference**: Automatically detects user's system theme preference
- **Local Storage**: Remembers user's theme choice across sessions
- **Manual Toggle**: Users can manually switch between light and dark modes

### Theme Toggle Component
The theme toggle is available in the navbar and allows users to switch themes:

```tsx
import ThemeToggle from '@/components/shared/ThemeToggle';

// Use in any component
<ThemeToggle />
```

## 🚀 How to Use Colors

### Method 1: CSS Variables (Recommended)
Use CSS variables directly in your styles:

```tsx
<div style={{ 
  backgroundColor: 'var(--color-card-bg)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border-light)'
}}>
  Content
</div>
```

### Method 2: Color Utility Functions
Import and use the color utility functions:

```tsx
import { colors, colorStyles } from '@/utils/colors';

// Using color strings
<div style={{ backgroundColor: colors.cardBg, color: colors.textPrimary }}>
  Content
</div>

// Using pre-defined style objects
<div style={colorStyles.bgCard}>
  Content
</div>
```

### Method 3: CSS Classes
Use the utility classes defined in `globals.css`:

```tsx
<div className="bg-card bordercard text-primary">
  Content
</div>
```

## 📱 Component Integration

### Navbar
The navbar automatically adapts its colors based on:
- Current page (transparent on home, dark on other pages)
- Selected theme (light/dark mode)
- Scroll state

### Services Component
Updated to use the new color system with proper dark mode support.

### All Components
When creating new components, use the color system instead of hardcoded colors:

```tsx
// ❌ Don't do this
<div className="bg-white text-black border-gray-300">

// ✅ Do this instead
<div style={{ 
  backgroundColor: 'var(--color-card-bg)',
  color: 'var(--color-text-primary)',
  borderColor: 'var(--color-border-light)'
}}>

// Or use utility classes
<div className="bg-card text-primary border-light">
```

## 🔧 Adding New Colors

To add new colors to the system:

1. **Add CSS Variables** in `globals.css`:
```css
:root {
  --color-new-color: #value;
}

[data-theme="dark"] {
  --color-new-color: #dark-value;
}
```

2. **Add to Color Utils** in `src/utils/colors.ts`:
```ts
export const colors = {
  // ... existing colors
  newColor: 'var(--color-new-color)',
};
```

3. **Add Style Objects** if needed:
```ts
export const colorStyles = {
  // ... existing styles
  bgNewColor: { backgroundColor: colors.newColor },
};
```

## 🎯 Best Practices

### 1. Always Use CSS Variables
Never hardcode colors in your components. Always use the color system.

### 2. Consider Both Themes
When designing components, ensure they look good in both light and dark modes.

### 3. Use Semantic Color Names
Use colors based on their purpose, not their appearance:
- `--color-success` for success states
- `--color-danger` for error states
- `--color-text-primary` for main text

### 4. Test Both Themes
Always test your components in both light and dark modes to ensure proper contrast and readability.

### 5. Use Transitions
Add smooth transitions when colors change:
```css
transition: background-color 0.3s ease, color 0.3s ease;
```

## 🔍 Troubleshooting

### Colors Not Updating
- Ensure the `ThemeProvider` is wrapping your component
- Check that CSS variables are properly defined
- Verify the `data-theme` attribute is set on the document

### Theme Toggle Not Working
- Check that `useTheme` hook is imported from the correct path
- Ensure the component is within the `ThemeProvider`
- Verify localStorage permissions

### Inconsistent Colors
- Make sure all components use the color system
- Check for hardcoded colors that bypass the system
- Verify CSS variable names match exactly

## 📚 Examples

### Button Component
```tsx
const Button = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-all duration-300";
  
  const variantStyles = {
    primary: colorStyles.buttonPrimary,
    secondary: colorStyles.buttonSecondary,
  };
  
  return (
    <button 
      className={baseStyles}
      style={variantStyles[variant]}
      {...props}
    >
      {children}
    </button>
  );
};
```

### Card Component
```tsx
const Card = ({ children, ...props }) => {
  return (
    <div 
      className="p-6 rounded-lg border transition-all duration-300"
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderColor: 'var(--color-card-border)',
        color: 'var(--color-text-primary)',
        boxShadow: 'var(--color-shadow-light)'
      }}
      {...props}
    >
      {children}
    </div>
  );
};
```

This color system provides a consistent, maintainable, and theme-aware approach to styling throughout your application.
