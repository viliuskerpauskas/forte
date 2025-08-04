# Dynamic Page Titles Implementation

## Task Overview
Implement dynamic browser tab titles that change based on the current route and centralize page header content management through route configuration.

## Implementation Plan

### Requirements
- Browser tab titles should be dynamic: "[Page Title] | Forte" format
- Page headers should get title and description from route data
- Centralize content management in routes configuration
- Use zoneless Angular approach with reactive patterns
- Maintain consistency between browser titles and page headers

### Architecture Design
1. **Title Service** - Service to handle dynamic browser title updates
2. **Route Data Enhancement** - Add title and description to route configuration
3. **PageHeader Component Refactor** - Read content from route data reactively
4. **Centralized Content Management** - Single source of truth for page titles/descriptions

## Implementation Details

### Files Created
- `src/app/services/title.service.ts` - Dynamic title management service

### Files Modified
- `src/app/app.routes.ts` - Added title and description data to routes
- `src/app/shared/page-header/page-header.ts` - Refactored to use route data reactively
- `src/app/dashboard/dashboard.page.html` - Removed hardcoded title/description
- `src/app/patients/patients.page.html` - Removed hardcoded title/description
- `src/app/settings/settings.page.html` - Removed hardcoded title/description
- `src/app/layout/main-layout.ts` - Removed unnecessary TitleService injection

## Completed Implementation Status

### ✅ Completed Tasks

1. **Title Service Created**
   - Listens to Router NavigationEnd events
   - Extracts title from route data
   - Updates document.title with "[Page Title] | Forte" format
   - Self-initializing with providedIn: 'root'
   - Handles auth route to show just "Forte"

2. **Route Configuration Enhanced**
   - Added title and description data to all routes
   - Dashboard: "Darbalaukis" with description
   - Patients: "Pacientai" with description  
   - Settings: "Nustatymai" with description
   - Centralized content management in single location

3. **PageHeader Component Refactored**
   - Removed OnInit lifecycle hook for zoneless compatibility
   - Uses reactive approach with toSignal() and computed()
   - Listens to router events for route data changes
   - Proper TypeScript typing with RouteData interface
   - Automatically updates on route navigation

4. **Page Templates Cleaned**
   - Removed hardcoded title and description from all page templates
   - Simplified app-page-header usage to self-contained component
   - Maintains visual consistency across all pages

5. **Code Optimization**
   - Removed unnecessary TitleService injection from MainLayout
   - Service auto-initializes when first needed by Angular DI
   - Cleaner component dependencies

### Technical Implementation

#### Title Service Features
```typescript
// Reactive title updates based on route data
// Format: "[Page Title] | Forte" or just "Forte" for auth
```

#### Route Data Structure
```typescript
data: { 
  title: 'Page Title',
  description: 'Page description text'
}
```

#### PageHeader Reactive Pattern
```typescript
// Uses toSignal() to convert router events to signals
// Computed properties for title and description
// No lifecycle hooks - fully reactive
```

### Expected Results
- `/auth` → Browser title: "Forte"
- `/dashboard` → Browser title: "Darbalaukis | Forte", Page header: "Darbalaukis" with description
- `/patients` → Browser title: "Pacientai | Forte", Page header: "Pacientai" with description  
- `/settings` → Browser title: "Nustatymai | Forte", Page header: "Nustatymai" with description

### Technical Notes
- All components follow Angular 20 zoneless change detection approach
- Uses signals and computed properties for reactive state management
- Maintains existing PrimeNG + Tailwind CSS styling approach
- Lithuanian language used throughout UI elements
- Self-contained components with minimal dependencies
- Proper TypeScript typing for route data

### Subscription Management
- **TitleService**: No OnDestroy needed - root service lives for entire app lifecycle
- **PageHeader Component**: Uses `toSignal()` which automatically handles subscription cleanup
- **Modern Approach**: Leverages Angular 20's reactive primitives for automatic memory management
- **No Manual Unsubscribe**: Both implementations use patterns that handle cleanup automatically

### Testing Notes
- Dynamic titles update correctly on route navigation
- Page headers display correct content from route data
- No unnecessary service injections or lifecycle hooks
- Reactive updates work seamlessly in zoneless environment
- Consistent content between browser titles and page headers

## Benefits Achieved
- **Centralized Management** - All page titles and descriptions in one location
- **DRY Principle** - No duplication between browser titles and page headers
- **Maintainability** - Easy to update content from single source
- **Performance** - Reactive patterns optimized for zoneless change detection
- **Type Safety** - Proper TypeScript interfaces for route data
- **Consistency** - Unified content management across the application

## Future Enhancements
- Add more page metadata (keywords, OpenGraph tags) to route data
- Implement breadcrumb navigation using route hierarchy
- Add page-specific meta descriptions for SEO
- Consider i18n integration for multi-language support