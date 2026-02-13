# Catalyst UI Kit Documentation

## Table of Contents
1. [Getting Started](#getting-started)
2. [Layouts](#layouts)
   - [Sidebar Layout](#sidebar-layout)
   - [Stacked Layout](#stacked-layout)
   - [Auth Layout](#auth-layout)
3. [Components](#components)
   - [Alert](#alert)
   - [Avatar](#avatar)
   - [Badge](#badge)
   - [Button](#button)
   - [Checkbox](#checkbox)
   - [Combobox](#combobox)
   - [Description List](#description-list)
   - [Dialog](#dialog)
   - [Divider](#divider)
   - [Dropdown](#dropdown)
   - [Fieldset](#fieldset)
   - [Heading](#heading)
   - [Input](#input)
   - [Link](#link)
   - [Listbox](#listbox)
   - [Navbar](#navbar)
   - [Pagination](#pagination)
   - [Radio](#radio)
   - [Select](#select)
   - [Sidebar](#sidebar)
   - [Switch](#switch)
   - [Table](#table)
   - [Text](#text)
   - [Textarea](#textarea)

## Getting Started

Catalyst is a starter kit for building your own component systems with React and Tailwind CSS, designed and developed by the Tailwind CSS team. It's a collection of beautiful, production-ready UI components that you can integrate into your projects and customize as needed.

### Before You Start

- Ensure you have a Tailwind CSS project set up
- Catalyst is built with React and can be used with frameworks like Next.js, Remix, Inertia, or any other React project
- Catalyst relies on Tailwind's default theme configuration, including the default spacing scale, color palette, and shadow scale

### Adding Catalyst to Your Project

1. **Download Catalyst**: Obtain the latest version from your Tailwind Plus account
2. **Extract Files**: Unzip `catalyst-ui-kit.zip` and copy the component files from either the `javascript` or `typescript` folders into your project's component directory

### Installing Dependencies

Install the necessary dependencies used by Catalyst components:

```bash
npm install @headlessui/react motion clsx
```

Ensure you're using the latest version of Tailwind CSS:

```bash
npm install tailwindcss@latest
```

### Client-side Router Integration

Update the `Link` component in Catalyst to use the link component provided by your framework or routing library. For example, with Next.js:

```jsx
import * as Headless from '@headlessui/react'
import NextLink from 'next/link'
import { forwardRef } from 'react'

export const Link = forwardRef(function Link(props, ref) {
  return (
    <Headless.DataInteractive>
      <NextLink {...props} ref={ref} />
    </Headless.DataInteractive>
  )
})
```

### Optional: Setup Inter Font Family

Catalyst is designed using the Inter font to ensure consistent appearance across browsers and operating systems. Refer to your framework's documentation for instructions on integrating the Inter font.

## Layouts

### Sidebar Layout

The Sidebar Layout provides a navigation sidebar alongside the main content area, with responsive behavior for mobile devices.

**Props:**
- `navbar` - React element for the navbar content
- `sidebar` - React element for the sidebar content
- `children` - Main content area

**Example Usage:**

```jsx
import { SidebarLayout } from '@/components/catalyst-ui/sidebar-layout'
import { Navbar } from '@/components/catalyst-ui/navbar'
import { Sidebar } from '@/components/catalyst-ui/sidebar'

function Example() {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarItem href="/dashboard">Dashboard</NavbarItem>
          <NavbarItem href="/settings">Settings</NavbarItem>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarSection>
              <h1>My App</h1>
            </SidebarSection>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/dashboard">Dashboard</SidebarItem>
              <SidebarItem href="/projects">Projects</SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {/* Main content */}
      <div>Your main content goes here</div>
    </SidebarLayout>
  )
}
```

### Stacked Layout

The Stacked Layout features a top navigation bar with the main content stacked below.

**Props:**
- `navbar` - React element for the navbar content
- `sidebar` - React element for the mobile sidebar content
- `children` - Main content area

**Example Usage:**

```jsx
import { StackedLayout } from '@/components/catalyst-ui/stacked-layout'

function Example() {
  return (
    <StackedLayout 
      navbar={
        <Navbar>
          <NavbarItem href="/">Home</NavbarItem>
          <NavbarItem href="/about">About</NavbarItem>
        </Navbar>
      }
    >
      {/* Main content */}
      <div>Your main content goes here</div>
    </StackedLayout>
  )
}
```

### Auth Layout

The Auth Layout centers content, typically used for authentication pages like login and registration forms.

**Props:**
- `children` - The authentication form or content

**Example Usage:**

```jsx
import { AuthLayout } from '@/components/catalyst-ui/auth-layout'

function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold">Sign In</h1>
        {/* Your login form */}
      </div>
    </AuthLayout>
  )
}
```

## Components

### Alert

The Alert component displays important messages to users in a modal dialog format.

**Components:**
- `Alert` - Main alert container
- `AlertTitle` - Alert title component
- `AlertDescription` - Alert description component  
- `AlertBody` - Alert body content
- `AlertActions` - Alert action buttons container

**Props:**
- `size` - Alert size: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'` (default: `'md'`)
- `open` - Whether the alert is open
- `onClose` - Function to call when closing the alert

**Example Usage:**

```jsx
import { Alert, AlertTitle, AlertDescription, AlertActions } from '@/components/catalyst-ui/alert'
import { Button } from '@/components/catalyst-ui/button'
import { useState } from 'react'

function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Alert</Button>
      <Alert open={isOpen} onClose={setIsOpen} size="md">
        <AlertTitle>Delete Account</AlertTitle>
        <AlertDescription>
          Are you sure you want to delete your account? This action cannot be undone.
        </AlertDescription>
        <AlertActions>
          <Button color="red" onClick={() => setIsOpen(false)}>Delete</Button>
          <Button plain onClick={() => setIsOpen(false)}>Cancel</Button>
        </AlertActions>
      </Alert>
    </>
  )
}
```

### Avatar

The Avatar component displays user profile images or initials.

**Components:**
- `Avatar` - Main avatar component
- `AvatarButton` - Clickable avatar variant

**Props:**
- `src` - Image source URL
- `square` - Whether to display as square instead of circle (default: `false`)
- `initials` - Initials to display when no image is provided
- `alt` - Alt text for the image

**Example Usage:**

```jsx
import { Avatar, AvatarButton } from '@/components/catalyst-ui/avatar'

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Basic avatar with image */}
      <Avatar src="/path-to-image.jpg" alt="John Doe" className="size-10" />
      
      {/* Avatar with initials */}
      <Avatar initials="JD" className="size-10" />
      
      {/* Square avatar */}
      <Avatar src="/path-to-image.jpg" square className="size-10" />
      
      {/* Clickable avatar */}
      <AvatarButton href="/profile" src="/path-to-image.jpg" alt="Profile" className="size-10" />
    </div>
  )
}
```

### Badge

The Badge component displays small status indicators or counts.

**Components:**
- `Badge` - Main badge component
- `BadgeButton` - Clickable badge variant

**Props:**
- `color` - Badge color: `'red' | 'orange' | 'amber' | 'yellow' | 'lime' | 'green' | 'emerald' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'zinc'` (default: `'zinc'`)

**Example Usage:**

```jsx
import { Badge, BadgeButton } from '@/components/catalyst-ui/badge'

function Example() {
  return (
    <div className="flex items-center gap-2">
      <Badge>New</Badge>
      <Badge color="red">Urgent</Badge>
      <Badge color="green">Active</Badge>
      <BadgeButton href="/notifications" color="blue">3</BadgeButton>
    </div>
  )
}
```

### Button

The Button component triggers actions or events.

**Props:**
- `color` - Button color variant
- `outline` - Whether to use outline style (default: `false`)
- `plain` - Whether to use plain style (default: `false`)
- `href` - URL to navigate to (renders as Link)

**Available Colors:**
- `'dark/zinc'` (default)
- `'light'`
- `'dark/white'` 
- `'dark'`
- `'white'`
- `'zinc'`
- `'indigo'`
- `'cyan'`
- `'red'`
- `'orange'`
- `'amber'`
- `'yellow'`
- `'lime'`
- `'green'`
- `'emerald'`
- `'teal'`
- `'sky'`
- `'blue'`
- `'violet'`
- `'purple'`
- `'fuchsia'`
- `'pink'`
- `'rose'`

**Example Usage:**

```jsx
import { Button } from '@/components/catalyst-ui/button'

function Example() {
  return (
    <div className="flex items-center gap-4">
      {/* Default button */}
      <Button onClick={() => alert('Clicked!')}>Default</Button>
      
      {/* Colored buttons */}
      <Button color="blue">Primary</Button>
      <Button color="red">Danger</Button>
      
      {/* Button variants */}
      <Button outline>Outline</Button>
      <Button plain>Plain</Button>
      
      {/* Link button */}
      <Button href="/dashboard">Go to Dashboard</Button>
    </div>
  )
}
```

### Checkbox

The Checkbox component allows users to select one or more options.

**Components:**
- `Checkbox` - Main checkbox component
- `CheckboxGroup` - Container for multiple checkboxes
- `CheckboxField` - Field wrapper with label support

**Props:**
- `color` - Checkbox color (same options as Button)
- `name` - Form field name
- `value` - Checkbox value

**Example Usage:**

```jsx
import { Checkbox, CheckboxGroup, CheckboxField } from '@/components/catalyst-ui/checkbox'
import { Label } from '@/components/catalyst-ui/fieldset'

function Example() {
  return (
    <CheckboxGroup>
      <CheckboxField>
        <Checkbox name="terms" color="blue" />
        <Label>I agree to the terms and conditions</Label>
      </CheckboxField>
      
      <CheckboxField>
        <Checkbox name="newsletter" />
        <Label>Subscribe to newsletter</Label>
      </CheckboxField>
    </CheckboxGroup>
  )
}
```

### Combobox

The Combobox component provides an autocomplete input with a dropdown list.

**Components:**
- `Combobox` - Main combobox component
- `ComboboxOption` - Individual option component
- `ComboboxLabel` - Option label component
- `ComboboxDescription` - Option description component

**Props:**
- `options` - Array of options
- `displayValue` - Function to extract display value from option
- `filter` - Custom filter function
- `anchor` - Dropdown anchor position (default: `'bottom'`)
- `placeholder` - Input placeholder text
- `autoFocus` - Whether to auto-focus the input
- `aria-label` - Accessibility label

**Example Usage:**

```jsx
import { Combobox, ComboboxOption, ComboboxLabel } from '@/components/catalyst-ui/combobox'
import { useState } from 'react'

function Example() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const people = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]

  return (
    <Combobox
      value={selectedPerson}
      onChange={setSelectedPerson}
      options={people}
      displayValue={(person) => person?.name}
      placeholder="Search people..."
    >
      {(person) => (
        <ComboboxOption key={person.id} value={person}>
          <ComboboxLabel>{person.name}</ComboboxLabel>
        </ComboboxOption>
      )}
    </Combobox>
  )
}
```

### Description List

The Description List component displays a list of terms with corresponding descriptions.

**Components:**
- `DescriptionList` - Main container
- `DescriptionTerm` - Term component
- `DescriptionDetails` - Details component

**Example Usage:**

```jsx
import { DescriptionList, DescriptionTerm, DescriptionDetails } from '@/components/catalyst-ui/description-list'

function Example() {
  return (
    <DescriptionList>
      <DescriptionTerm>Name</DescriptionTerm>
      <DescriptionDetails>John Doe</DescriptionDetails>
      
      <DescriptionTerm>Email</DescriptionTerm>
      <DescriptionDetails>john@example.com</DescriptionDetails>
      
      <DescriptionTerm>Role</DescriptionTerm>
      <DescriptionDetails>Administrator</DescriptionDetails>
    </DescriptionList>
  )
}
```

### Dialog

The Dialog component displays modal dialogs for user interactions.

**Components:**
- `Dialog` - Main dialog container
- `DialogTitle` - Dialog title component
- `DialogDescription` - Dialog description component
- `DialogBody` - Dialog body content
- `DialogActions` - Dialog action buttons container

**Props:**
- `size` - Dialog size: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'` (default: `'lg'`)
- `open` - Whether the dialog is open
- `onClose` - Function to call when closing the dialog

**Example Usage:**

```jsx
import { Dialog, DialogTitle, DialogDescription, DialogBody, DialogActions } from '@/components/catalyst-ui/dialog'
import { Button } from '@/components/catalyst-ui/button'
import { useState } from 'react'

function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog open={isOpen} onClose={setIsOpen} size="lg">
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Enter the details for your new project below.
        </DialogDescription>
        <DialogBody>
          {/* Dialog content */}
          <p>Dialog body content goes here.</p>
        </DialogBody>
        <DialogActions>
          <Button color="blue" onClick={() => setIsOpen(false)}>Create</Button>
          <Button plain onClick={() => setIsOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
```

### Divider

The Divider component separates content sections with a horizontal line.

**Props:**
- `soft` - Whether to use a softer color (default: `false`)

**Example Usage:**

```jsx
import { Divider } from '@/components/catalyst-ui/divider'

function Example() {
  return (
    <div>
      <p>Content above the divider.</p>
      <Divider />
      <p>Content below the divider.</p>
      
      {/* Soft divider */}
      <Divider soft />
      <p>Content below the soft divider.</p>
    </div>
  )
}
```

### Dropdown

The Dropdown component displays a list of actions or options when triggered.

**Components:**
- `Dropdown` - Main dropdown container
- `DropdownButton` - Trigger button
- `DropdownMenu` - Menu container
- `DropdownItem` - Individual menu item
- `DropdownHeader` - Menu header
- `DropdownSection` - Menu section
- `DropdownHeading` - Section heading
- `DropdownDivider` - Menu divider
- `DropdownLabel` - Item label
- `DropdownDescription` - Item description
- `DropdownShortcut` - Keyboard shortcut display

**Props:**
- `anchor` - Menu anchor position (default: `'bottom'`)

**Example Usage:**

```jsx
import { 
  Dropdown, 
  DropdownButton, 
  DropdownMenu, 
  DropdownItem,
  DropdownDivider,
  DropdownLabel,
  DropdownShortcut
} from '@/components/catalyst-ui/dropdown'
import { Button } from '@/components/catalyst-ui/button'

function Example() {
  return (
    <Dropdown>
      <DropdownButton as={Button}>Options</DropdownButton>
      <DropdownMenu>
        <DropdownItem onClick={() => alert('Edit clicked')}>
          <DropdownLabel>Edit</DropdownLabel>
          <DropdownShortcut keys="⌘E" />
        </DropdownItem>
        <DropdownItem onClick={() => alert('Duplicate clicked')}>
          <DropdownLabel>Duplicate</DropdownLabel>
          <DropdownShortcut keys="⌘D" />
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem href="/archive">
          <DropdownLabel>Archive</DropdownLabel>
        </DropdownItem>
        <DropdownItem onClick={() => alert('Delete clicked')}>
          <DropdownLabel>Delete</DropdownLabel>
          <DropdownShortcut keys="⌘⌫" />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
```

### Fieldset

The Fieldset component groups related form elements together.

**Components:**
- `Fieldset` - Main fieldset container
- `Legend` - Fieldset legend/title
- `FieldGroup` - Group of fields
- `Field` - Individual field wrapper
- `Label` - Field label
- `Description` - Field description
- `ErrorMessage` - Field error message

**Example Usage:**

```jsx
import { 
  Fieldset, 
  Legend, 
  FieldGroup, 
  Field, 
  Label, 
  Description, 
  ErrorMessage 
} from '@/components/catalyst-ui/fieldset'
import { Input } from '@/components/catalyst-ui/input'

function Example() {
  return (
    <Fieldset>
      <Legend>Personal Information</Legend>
      <FieldGroup>
        <Field>
          <Label>First Name</Label>
          <Input type="text" placeholder="Enter your first name" />
          <Description>This will be displayed on your profile.</Description>
        </Field>
        
        <Field>
          <Label>Email</Label>
          <Input type="email" placeholder="Enter your email" />
          <ErrorMessage>Please enter a valid email address.</ErrorMessage>
        </Field>
      </FieldGroup>
    </Fieldset>
  )
}
```

### Heading

The Heading component displays section headings with appropriate typography.

**Components:**
- `Heading` - Main heading component
- `Subheading` - Subheading component

**Props:**
- `level` - Heading level: `1 | 2 | 3 | 4 | 5 | 6` (default: `1` for Heading, `2` for Subheading)

**Example Usage:**

```jsx
import { Heading, Subheading } from '@/components/catalyst-ui/heading'

function Example() {
  return (
    <div>
      <Heading level={1}>Main Page Title</Heading>
      <Subheading level={2}>Section Subtitle</Subheading>
      <Heading level={3}>Subsection Title</Heading>
    </div>
  )
}
```

### Input

The Input component accepts user input in various formats.

**Components:**
- `Input` - Main input component
- `InputGroup` - Input with icons or other elements

**Props:**
- `type` - Input type (text, email, password, etc.)
- All standard HTML input attributes

**Example Usage:**

```jsx
import { Input, InputGroup } from '@/components/catalyst-ui/input'

function Example() {
  return (
    <div className="space-y-4">
      {/* Basic input */}
      <Input type="text" placeholder="Enter your name" />
      
      {/* Email input */}
      <Input type="email" placeholder="Enter your email" />
      
      {/* Password input */}
      <Input type="password" placeholder="Enter your password" />
      
      {/* Input with icon */}
      <InputGroup>
        <svg data-slot="icon" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <Input type="text" placeholder="Search users..." />
      </InputGroup>
    </div>
  )
}
```

### Link

The Link component provides navigation between pages.

**Props:**
- `href` - URL to navigate to
- All standard anchor attributes

**Example Usage:**

```jsx
import { Link } from '@/components/catalyst-ui/link'

function Example() {
  return (
    <div>
      <Link href="/dashboard">Go to Dashboard</Link>
      <Link href="/profile">View Profile</Link>
    </div>
  )
}
```

### Listbox

The Listbox component displays a list of selectable items.

**Components:**
- `Listbox` - Main listbox container
- `ListboxOption` - Individual option
- `ListboxLabel` - Option label
- `ListboxDescription` - Option description

**Props:**
- `placeholder` - Placeholder text when no option is selected
- `autoFocus` - Whether to auto-focus the listbox
- `aria-label` - Accessibility label

**Example Usage:**

```jsx
import { Listbox, ListboxOption, ListboxLabel, ListboxDescription } from '@/components/catalyst-ui/listbox'
import { useState } from 'react'

function Example() {
  const [selectedPerson, setSelectedPerson] = useState(null)
  const people = [
    { id: 1, name: 'John Doe', role: 'Admin' },
    { id: 2, name: 'Jane Smith', role: 'User' },
  ]

  return (
    <Listbox value={selectedPerson} onChange={setSelectedPerson} placeholder="Select a person...">
      {people.map((person) => (
        <ListboxOption key={person.id} value={person}>
          <ListboxLabel>{person.name}</ListboxLabel>
          <ListboxDescription>{person.role}</ListboxDescription>
        </ListboxOption>
      ))}
    </Listbox>
  )
}
```

### Navbar

The Navbar component provides horizontal navigation.

**Components:**
- `Navbar` - Main navbar container
- `NavbarItem` - Individual navigation item
- `NavbarLabel` - Item label
- `NavbarDivider` - Visual divider
- `NavbarSection` - Grouped navigation items
- `NavbarSpacer` - Flexible spacer

**Props for NavbarItem:**
- `current` - Whether the item represents the current page
- `href` - URL to navigate to

**Example Usage:**

```jsx
import { 
  Navbar, 
  NavbarItem, 
  NavbarLabel, 
  NavbarDivider, 
  NavbarSection, 
  NavbarSpacer 
} from '@/components/catalyst-ui/navbar'

function Example() {
  return (
    <Navbar>
      <NavbarSection>
        <NavbarItem href="/dashboard" current>
          <NavbarLabel>Dashboard</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/projects">
          <NavbarLabel>Projects</NavbarLabel>
        </NavbarItem>
        <NavbarItem href="/team">
          <NavbarLabel>Team</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
      
      <NavbarSpacer />
      
      <NavbarSection>
        <NavbarItem href="/profile">
          <NavbarLabel>Profile</NavbarLabel>
        </NavbarItem>
      </NavbarSection>
    </Navbar>
  )
}
```

### Pagination

The Pagination component provides navigation through paginated content.

**Components:**
- `Pagination` - Main pagination container
- `PaginationPrevious` - Previous page button
- `PaginationNext` - Next page button
- `PaginationList` - Page number list
- `PaginationPage` - Individual page button
- `PaginationGap` - Ellipsis gap indicator

**Props:**
- `aria-label` - Accessibility label (default: `'Page navigation'`)

**Example Usage:**

```jsx
import { 
  Pagination, 
  PaginationPrevious, 
  PaginationNext, 
  PaginationList, 
  PaginationPage, 
  PaginationGap 
} from '@/components/catalyst-ui/pagination'

function Example() {
  const currentPage = 3
  const totalPages = 10

  return (
    <Pagination aria-label="Product list pagination">
      <PaginationPrevious href={currentPage > 1 ? `/page/${currentPage - 1}` : null} />
      
      <PaginationList>
        <PaginationPage href="/page/1" current={currentPage === 1}>1</PaginationPage>
        <PaginationPage href="/page/2" current={currentPage === 2}>2</PaginationPage>
        <PaginationPage href="/page/3" current={currentPage === 3}>3</PaginationPage>
        <PaginationGap />
        <PaginationPage href="/page/10" current={currentPage === 10}>10</PaginationPage>
      </PaginationList>
      
      <PaginationNext href={currentPage < totalPages ? `/page/${currentPage + 1}` : null} />
    </Pagination>
  )
}
```

### Radio

The Radio component allows users to select one option from a set.

**Components:**
- `Radio` - Main radio button component
- `RadioGroup` - Container for radio buttons
- `RadioField` - Field wrapper with label support

**Props:**
- `color` - Radio button color (same options as Button)
- `name` - Form field name (should be same for grouped radios)
- `value` - Radio button value

**Example Usage:**

```jsx
import { Radio, RadioGroup, RadioField } from '@/components/catalyst-ui/radio'
import { Label } from '@/components/catalyst-ui/fieldset'

function Example() {
  return (
    <RadioGroup>
      <RadioField>
        <Radio name="plan" value="starter" color="blue" />
        <Label>Starter Plan - $9/month</Label>
      </RadioField>
      
      <RadioField>
        <Radio name="plan" value="professional" color="blue" />
        <Label>Professional Plan - $29/month</Label>
      </RadioField>
      
      <RadioField>
        <Radio name="plan" value="enterprise" color="blue" />
        <Label>Enterprise Plan - $99/month</Label>
      </RadioField>
    </RadioGroup>
  )
}
```

### Select

The Select component provides a dropdown for selecting options.

**Props:**
- `multiple` - Whether to allow multiple selections
- All standard HTML select attributes

**Example Usage:**

```jsx
import { Select } from '@/components/catalyst-ui/select'

function Example() {
  return (
    <div className="space-y-4">
      {/* Single select */}
      <Select>
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      
      {/* Multiple select */}
      <Select multiple>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </div>
  )
}
```

### Sidebar

The Sidebar component provides vertical navigation for applications.

**Components:**
- `Sidebar` - Main sidebar container
- `SidebarHeader` - Sidebar header section
- `SidebarBody` - Main sidebar content
- `SidebarFooter` - Sidebar footer section
- `SidebarSection` - Grouped sidebar items
- `SidebarItem` - Individual navigation item
- `SidebarLabel` - Item label
- `SidebarDivider` - Visual divider
- `SidebarSpacer` - Flexible spacer
- `SidebarHeading` - Section heading

**Props for SidebarItem:**
- `current` - Whether the item represents the current page
- `href` - URL to navigate to

**Example Usage:**

```jsx
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarBody, 
  SidebarFooter,
  SidebarSection, 
  SidebarItem, 
  SidebarLabel,
  SidebarHeading,
  SidebarDivider 
} from '@/components/catalyst-ui/sidebar'

function Example() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarSection>
          <h1 className="text-lg font-semibold">My App</h1>
        </SidebarSection>
      </SidebarHeader>
      
      <SidebarBody>
        <SidebarSection>
          <SidebarItem href="/dashboard" current>
            <SidebarLabel>Dashboard</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/projects">
            <SidebarLabel>Projects</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/team">
            <SidebarLabel>Team</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
        
        <SidebarDivider />
        
        <SidebarSection>
          <SidebarHeading>Settings</SidebarHeading>
          <SidebarItem href="/settings/account">
            <SidebarLabel>Account</SidebarLabel>
          </SidebarItem>
          <SidebarItem href="/settings/billing">
            <SidebarLabel>Billing</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarBody>
      
      <SidebarFooter>
        <SidebarSection>
          <SidebarItem href="/logout">
            <SidebarLabel>Sign Out</SidebarLabel>
          </SidebarItem>
        </SidebarSection>
      </SidebarFooter>
    </Sidebar>
  )
}
```

### Switch

The Switch component provides a toggle control for boolean values.

**Components:**
- `Switch` - Main switch component
- `SwitchGroup` - Container for multiple switches
- `SwitchField` - Field wrapper with label support

**Props:**
- `color` - Switch color (same options as Button)
- `checked` - Whether the switch is checked
- `onChange` - Function called when switch state changes

**Example Usage:**

```jsx
import { Switch, SwitchGroup, SwitchField } from '@/components/catalyst-ui/switch'
import { Label, Description } from '@/components/catalyst-ui/fieldset'
import { useState } from 'react'

function Example() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [darkModeEnabled, setDarkModeEnabled] = useState(true)

  return (
    <SwitchGroup>
      <SwitchField>
        <Label>Email Notifications</Label>
        <Description>Receive email notifications for important updates.</Description>
        <Switch 
          color="blue"
          checked={notificationsEnabled} 
          onChange={setNotificationsEnabled} 
        />
      </SwitchField>
      
      <SwitchField>
        <Label>Dark Mode</Label>
        <Description>Use dark theme across the application.</Description>
        <Switch 
          color="purple"
          checked={darkModeEnabled} 
          onChange={setDarkModeEnabled} 
        />
      </SwitchField>
    </SwitchGroup>
  )
}
```

### Table

The Table component displays tabular data with various styling options.

**Components:**
- `Table` - Main table container
- `TableHead` - Table header section
- `TableBody` - Table body section
- `TableRow` - Table row
- `TableHeader` - Header cell
- `TableCell` - Data cell

**Props for Table:**
- `bleed` - Whether the table should bleed to container edges
- `dense` - Whether to use dense spacing
- `grid` - Whether to show grid lines
- `striped` - Whether to use striped rows

**Props for TableRow:**
- `href` - URL to navigate to when row is clicked
- `target` - Link target attribute
- `title` - Accessibility title

**Example Usage:**

```jsx
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeader, 
  TableCell 
} from '@/components/catalyst-ui/table'

function Example() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  ]

  return (
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Email</TableHeader>
          <TableHeader>Role</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} href={`/users/${user.id}`}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### Text

The Text component provides consistent text styling throughout the application.

**Components:**
- `Text` - Main text component
- `TextLink` - Styled link component
- `Strong` - Strong/bold text component
- `Code` - Inline code component

**Example Usage:**

```jsx
import { Text, TextLink, Strong, Code } from '@/components/catalyst-ui/text'

function Example() {
  return (
    <div className="space-y-4">
      <Text>
        This is a regular text paragraph. You can use <Strong>strong text</Strong> to 
        emphasize important parts and <Code>inline code</Code> for technical terms.
      </Text>
      
      <Text>
        You can also include <TextLink href="/learn-more">links</TextLink> within 
        your text content.
      </Text>
    </div>
  )
}
```

### Textarea

The Textarea component allows users to enter multi-line text input.

**Props:**
- `resizable` - Whether the textarea is resizable (default: `true`)
- All standard HTML textarea attributes

**Example Usage:**

```jsx
import { Textarea } from '@/components/catalyst-ui/textarea'

function Example() {
  return (
    <div className="space-y-4">
      {/* Basic textarea */}
      <Textarea 
        placeholder="Enter your message..." 
        rows={4}
      />
      
      {/* Non-resizable textarea */}
      <Textarea 
        placeholder="Enter your bio..." 
        rows={6}
        resizable={false}
      />
    </div>
  )
}
```

## Styling and Customization

Catalyst components are built with Tailwind CSS and can be customized using:

1. **Custom CSS Classes**: Pass additional classes through the `className` prop
2. **Tailwind Variants**: Use Tailwind's utility classes to modify appearance
3. **Color Themes**: Many components support color props for consistent theming
4. **Component Composition**: Combine components to create complex UI patterns

## Accessibility

Catalyst components are built with accessibility in mind:

- Semantic HTML elements and ARIA attributes
- Keyboard navigation support
- Screen reader compatibility
- Focus management for interactive elements
- Proper color contrast ratios

## Framework Integration

Catalyst is designed to work with popular React frameworks:

- **Next.js**: Update the Link component to use `next/link`
- **Remix**: Update the Link component to use `@remix-run/react`
- **React Router**: Update the Link component to use `react-router-dom`

Refer to your framework's documentation for specific integration details.

