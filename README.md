**Frontend HNGi14 - Stage 2: Invoice Management App**

This is a fully responsive, full-stack (client-side persisted) Invoice Management Application built for Stage 2 of the HNG Internship. It allows users to create, read, update, and delete invoices, filter by status, and toggle between dark and light themes, matching a strict Figma design.

**Setup Instructions**
To run this project locally on your machine, follow these steps:

Clone the repository:

git clone [Insert your repo link here]
Navigate into the project directory:

cd [Insert your folder name]
Install the dependencies:

npm install
Start the development server:

npm run dev
Open your browser and navigate to the localhost port provided in your terminal (usually http://localhost:5173).

**Architecture Explanation**
This application is built as a Single Page Application (SPA) using React and TypeScript.

**State Management:** I utilized the React Context API (AppContext) to act as the global "brain" for the application. This allows any component to access the invoices array, theme state, and drawer controls without prop-drilling.

**Data Persistence:** The global state is synchronized with browser localStorage. Every time an invoice is added, updated, or deleted, the Context automatically updates LocalStorage, ensuring zero data loss on page refresh.

**Form Engine:** I implemented react-hook-form along with useFieldArray. This was crucial for handling the massive form object, managing complex validation rules (like required fields and positive numbers), and seamlessly handling the dynamic "Item List" where users can add or remove rows on the fly.

**Styling:** The app uses pure CSS. I leveraged CSS Variables (:root) to manage the global color palette and seamlessly toggle between Light and Dark mode. CSS Grid and Flexbox were used extensively to create a fluid, responsive layout that adapts from mobile to desktop without horizontal scrolling.

**Accessibility Notes**
Accessibility was prioritized throughout the development process:

[x] Semantic HTML: Used proper landmark tags like <header>, <main>, <button>, and <label> to ensure screen readers can accurately interpret the DOM structure.

[x] Keyboard Navigation: All interactive elements (buttons, inputs, links) are fully keyboard navigable with visible focus/hover states.

[x] Modal Accessibility: The "Confirm Deletion" modal traps focus and includes a dedicated useEffect listener to close when the user presses the Escape key, adhering to strict accessibility standards.

[x] Contrast: The custom Dark and Light modes were built to ensure text passes WCAG color contrast ratios against background elements.

**Improvements Beyond Requirements**
*Live Math Calculations:* The dynamic invoice form automatically calculates line-item totals and the grand total in real-time as the user types, before the form is even submitted.

*Auto-Calculated Due Dates:* Instead of making the user manually pick a due date, the system automatically calculates the exact paymentDue date by adding the selected "Payment Terms" (e.g., Net 30) to the invoice creation date.

*Smooth UI Animations:* Implemented bezier-curve CSS transitions for the Form Drawer so it smoothly slides out from beneath the navigation bar, mimicking native application behavior.