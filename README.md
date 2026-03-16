# 📄 Semantic Report Engine

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![PDFLib](https://img.shields.io/badge/PDFLib-FF6B6B?style=for-the-badge&logo=adobe&logoColor=white)

> **A high-performance bridge between Node.js and Python for generating structured, programmatic research reports.**

## 🎯 The Problem
Manual document formatting is a bottleneck. Whether it's study notes or research briefs, the time spent on layout, typography, and structure often outweighs the content gathering itself. This project solves that by automating the "Document Architecture" entirely.

## 🤔 Why I built this
As a final-year CS student, I was tired of "AI wrappers" that just sent a prompt to GPT-4 and charged $20/month. I wanted to build something that felt like **engineering**.

I built this engine to explore how we can use deterministic logic (Python) to drive programmatic drawing (Node.js). It’s zero-cost, runs instantly, and doesn't rely on any external black-box APIs. For me, it was a challenge in bridge architecture—making two different runtimes talk to each other to produce a single, pixel-perfect document.

## ✨ Key Features
- **Inter-Runtime Bridge**: Executes Python logic for structural analysis and Node.js for high-fidelity PDF rendering.
- **Deterministic Content Logic**: No expensive API calls. Uses a heuristic template engine to map topics into professional document trees.
- **Programmatic Layout**: Avoids the "bloat" of HTML-to-PDF converters. Every line, margin, and font-weight is drawn directly via buffer operations.
- **Responsive Web UI**: A minimalist "Command Bar" interface designed for maximum speed.

## 🛠️ Tech Stack
- **Node.js**: API orchestration and PDF buffer streaming.
- **Python 3.x**: Data structuring and thematic logic.
- **pdf-lib**: Low-level document generation.
- **Vanilla JS/CSS**: Premium, framework-free landing page.
- **Vercel**: Serverless deployment.

## � Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/semantic-report-engine.git
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```

### Running Locally
To start the development environment:
```bash
npm run local
```
*Access the dashboard at `http://localhost:3000`*

## 🧠 What I learned
- **Memory Management**: Streaming PDF buffers directly to the browser instead of saving them to disk taught me a lot about efficient serverless I/O.
- **Runtime Bridging**: I optimized the interaction between Node and Python to ensure low-latency document generation.
- **UI/UX Consistency**: Building a professional tool required a "no-fluff" design approach—focusing on speed and typography over complex animations.

## 🔮 Future Improvements
- [ ] **Custom Style Sheets**: Allow users to choose different "skins" for their reports (Modern, Academic, Retro).
- [ ] **Table Support**: Programmatically drawing tables in `pdf-lib` without a grid system.
- [ ] **Multi-language logic**: Expanding the template engine to support Japanese and Spanish structure.

---
_Built with 💻 and ☕ by a CS student fascinated by system architecture._