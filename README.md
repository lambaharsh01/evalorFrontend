Problem setting up tailwind css 
as i was installing tailwind css but npm install -D tailwindcss@latest had to be done

also with tailwind css 4 
only @import "tailwindcss"; has to be initialized in the index.css file


<!-- SHADCN AVAILABILITIES -->
# Essential UI components
npx shadcn@latest add button input label textarea select checkbox radio-group switch
npx shadcn@latest add form card dialog sheet tabs badge separator

# Table and data display (crucial for ERP)
npx shadcn@latest add table pagination dropdown-menu command popover

# Navigation and layout
npx shadcn@latest add menubar tooltip breadcrumb

# Feedback components
npx shadcn@latest add alert toast progress skeleton

npm install sooner
<!-- SHADCN AVAILABILITIES -->



Use a professional ERP-style design. Keep the layout minimal, clean, and business-oriented. Colors should follow a corporate theme with a light background (#f6f7f9), white cards (#fff), and accents of dark corporate blue (#003366) and muted greys (#dce1e6, #f2f4f7). Typography should be modern sans-serif (Segoe UI, Inter, or Roboto). Buttons should be dark grey (#222) with subtle hover states. Avoid overly rounded corners, bright flashy colors, or playful elements. The design must look serious, trustworthy, and suitable for enterprise dashboards.



export const theme = {
  colors: {
    background: "#f6f7f9",
    card: "#ffffff",
    cardBorder: "#dce1e6",
    textPrimary: "#222",
    textSecondary: "#333",
    tableHeader: "#f2f4f7",
    tableRowHover: "#f1f6fb",
    accent: "#003366", // corporate blue
    accentDark: "#00284d",
    warning: "#c88c00",
    button: "#222",
    buttonHover: "#444",
  },
  radius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
  },
  shadow: {
    sm: "0 2px 8px rgba(0,0,0,0.08)",
  },
  font: {
    base: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },
}
