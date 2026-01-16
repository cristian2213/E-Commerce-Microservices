# Microservices E-commerce

A modern e-commerce platform built with a microservices architecture using Turborepo, Next.js, and various backend frameworks.

## Architecture Overview

The project is structured as a monorepo containing multiple microservices and frontend applications:

### Applications (`/apps`)

- **`admin`**: An administrative dashboard for managing products, orders, and viewing analytics. Built with **Next.js 15**, **Tailwind CSS**, and **Radix UI**.
- **`client`**: The customer-facing storefront. Built with **Next.js 15**, **Clerk Auth**, and **Zustand**.
- **`order-service`**: Handles order processing and management. Built with **Fastify** and uses **MongoDB** via `@repo/order-db`.
- **`payment-service`**: Manages payment processing. Built with **Hono**.
- **`product-service`**: Manages product catalog and inventory. Built with **Express** and uses **PostgreSQL** via `@repo/product-db`.

### Shared Packages (`/packages`)

- **`@repo/order-db`**: Mongoose models and database connection for the Order Service.
- **`@repo/product-db`**: Prisma schema and client for the Product Service.
- **`@repo/types`**: Shared TypeScript interfaces and types used across the monorepo.
- **`@repo/eslint-config`**: Shared ESLint configurations.
- **`@repo/typescript-config`**: Shared TypeScript configurations.

## Tech Stack

- **Monorepo Management**: [Turborepo](https://turbo.build/repo)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Frontend**: [Next.js 15](https://nextjs.org/), [React 19](https://react.dev/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend Frameworks**: [Fastify](https://www.fastify.io/), [Express](https://expressjs.com/), [Hono](https://hono.dev/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Databases**: [MongoDB](https://www.mongodb.com/) (Mongoose), [PostgreSQL](https://www.postgresql.org/) (Prisma)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 18)
- [pnpm](https://pnpm.io/installation) installed globally

### Installation

```sh
pnpm install
```

### Development

To start all applications in development mode:

```sh
pnpm dev
```

This will run:

- Client: `http://localhost:3002`
- Admin: `http://localhost:3003`
- Services: Respective ports defined in their `.env` files.

### Build

To build all apps and packages:

```sh
pnpm build
```

### Linting & Formatting

```sh
pnpm lint
pnpm format
```

### Type Checking

```sh
pnpm check-types
```

## Useful Links

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://docs.clerk.com/)
