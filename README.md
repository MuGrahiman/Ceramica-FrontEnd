# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# book-app-frontend



sequenceDiagram
    participant Customer
    participant Frontend
    participant Backend
    participant Stripe
    participant Database

    Customer->>Frontend: 1. Initiates checkout
    Frontend->>Backend: 2. Create PaymentIntent
    Backend->>Stripe: 3. Creates PaymentIntent
    Stripe-->>Backend: 4. Returns clientSecret
    Backend-->>Frontend: 5. Returns clientSecret
    Frontend->>Customer: 6. Shows payment form
    Customer->>Frontend: 7. Enters card details
    Frontend->>Stripe: 8. Confirms payment
    Stripe-->>Frontend: 9. Payment result
    Frontend->>Backend: 10. Creates order
    Backend->>Database: 11. Stores order
    Stripe->>Backend: 12. Webhook (payment status)
    Backend->>Database: 13. Updates order status