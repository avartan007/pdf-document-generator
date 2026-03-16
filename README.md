# 📄 PDF Report Generator

[![Deployed on Vercel](https://vercelbadge.vercel.app/api/pdf-report-generator-badge)](https://vercel.com)

> **Generate structured AI-powered research reports instantly**

## 🤔 Why I built this
I needed a way to quickly generate structured, clean documents on different topics for my research and study notes. Instead of constantly copying and pasting from ChatGPT and manually formatting documents in Google Docs, I built this tool to automatically assemble unique, well-structured PDF reports with a single click.

## ✨ Features
- **Unique per generation**: Randomized facts, transitions, and phrasing ensure no two reports are identical.
- **Clean Formatting**: Programmatic layout calculation with professional margins and typography.
- **Instant Download**: Direct-to-browser PDF buffer streams.
- **Topic-Aware**: Intelligent slugs and content variation based on your query.

## 🚀 How it works
1. 💡 Enter any research topic or domain.
2. ⚙️ The Node.js API endpoint receives the request.
3. 🐍 A Python content engine programmatically builds a unique content JSON tree.
4. 📄 `pdf-lib` constructs the final PDF buffer in memory and streams it to your browser.

## 🛠️ Tech Stack
- **JavaScript / Node.js**: API and serverless functions
- **Python**: Modular content generation engine
- **pdf-lib**: Document structure and text layout
- **HTML/CSS**: Bespoke, zero-dependency inline design
- **Vercel**: Serverless edge deployment

## 💻 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pdf-report-generator.git
   cd pdf-report-generator
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Vercel CLI (if not already installed)**
   ```bash
   npm i -g vercel
   ```

4. **Run locally using Vercel Dev server**
   ```bash
   npm run local
   ```
   *The app will be running at `http://localhost:3000`*

## 🧠 What I learned
Building this project taught me how to effectively link multiple language runtimes (Node.js invoking Python) in a serverless environment. I gained deep experience with **programmatic PDF generation**, text-wrapping algorithms without high-level abstractions, and configuring **Vercel** routing patterns for seamless monolith-style deployments. 

---
_Designed and built as a utility tool for modern students and researchers._