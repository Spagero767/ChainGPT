# ChainGPT

ChainGPT is a Next.js application that provides an on-chain generative AI experience. Users can submit prompts to a decentralized network and receive AI-generated responses, with each interaction recorded as a transaction on the blockchain.

## Features

- **On-Chain Interactions**: Every prompt and response is logged as a blockchain transaction.
- **AI-Powered Responses**: Utilizes generative AI to provide intelligent and creative answers to user prompts.
- **Decentralized Tool Selection**: The AI can dynamically choose from a set of external tools to enhance its responses, such as fetching the current date or searching the web.
- **Modern UI**: Built with Next.js, React, and shadcn/ui for a clean and responsive user experience.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/) (with App Router)
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/) for components
- **Generative AI**:
  - [Genkit](https://firebase.google.com/docs/genkit) for defining and running AI flows.
- **Blockchain (Simulated)**:
  - The current version simulates on-chain transactions for demonstration purposes.

## Getting Started

To get started with developing this application:

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start by editing `src/app/page.tsx`. The page auto-updates as you edit the file.

## AI Flows

The AI logic is handled by Genkit flows defined in the `src/ai/flows/` directory.

- `generate-response-from-prompt.ts`: A simple flow that takes a prompt and returns an AI-generated response.
- `decentralized-tool-selection.ts`: A more advanced flow that demonstrates how the AI can use tools to access external information.
