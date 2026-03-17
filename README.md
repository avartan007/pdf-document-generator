# 📄 Semantic Extraction Engine V3

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![UI](https://img.shields.io/badge/UI-Dark_Minimalist-3B82F6?style=for-the-badge)

> **A high-performance deterministic document processing system for real-world Research Extraction and Synthesis.**

## 🎯 The Problem
Generative AI often "hallucinates" or produces generic filler text that isn't grounded in the source data. This project solves that by using a **Real Extractive Summarization Pipeline**—analyzing provided text to identify, rank, and extract the most critical information without any generative noise.

## 🤔 Why I built this: Logic over Generation
As a final-year CS student applying for System Engineer roles, I wanted to showcase **Algorithmic Processing over Prompting**.

Instead of a "GPT-wrapper" that essentially copy-pastes AI text, I built a pipeline that:
1. **Sentence Scoring**: Splits input text and ranks every sentence based on **Keyword Frequency** (TF analysis).
2. **Noise Reduction**: Filters out "Stop Words" (the, is, and) to identify the true semantic core of the document.
3. **Deterministic Mapping**: Selects the top-ranked sentences and maps them into a professional hierarchy (Summary → Key Points → Insights).
4. **Programmatic Drawing**: Renders the resulting structure directly into a high-fidelity PDF using `pdf-lib`.

## ✨ Key Features
- **Extractive Analysis**: Every word in the output comes directly from your input. Zero hallucinations.
- **TF-Based Ranking**: Sentences are scored based on the mathematical frequency of the most important concepts.
- **Premium Dark UI**: A professional research console with a large-scale text processor.
- **Zero API Dependency**: 100% deterministic logic running on the local runtime. Zero cost. Zero latency.

## 🛠️ Tech Stack
- **Node.js**: Sentence scoring logic and API orchestration.
- **Python**: Utility for cleaning and preprocessing (available for extended analysis).
- **pdf-lib**: Low-level document generation.
- **Vanilla JS/CSS**: High-performance, framework-free frontend.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+

### Installation & Run
1. `git clone https://github.com/your-username/semantic-extraction-engine.git`
2. `npm install`
3. `npm run local`
*Access the console at `http://localhost:3000`*

## 🧠 System Design Lessons
- **Extractive Summarization**: Gained deep experience in heuristic-based text processing and sentence ranking algorithms.
- **Deterministic Pipelines**: Learned that for professional tools, *predictability* is often more valuable than *generativity*.
- **Runtime Optimization**: Bypassing external APIs enabled a sub-100ms processing loop for complex research papers.

---
_Built with 💻 and ☕ by a CS student focused on deterministic systems and logic-driven automation._