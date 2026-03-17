import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import path from 'path';

// Helper functions for final polish
function cleanSentence(sentence) {
    if (!sentence) return "";
    return sentence
        .replace(/^(however|but|and|so|because|therefore|meanwhile|thus)\b\s*/i, "") // remove starting connectors
        .replace(/\.\.+$/, ".") // fix double dots
        .trim();
}

function generateSummary(sentences) {
    if (!sentences || sentences.length === 0) return "";
    const first = cleanSentence(sentences[0]);
    if (sentences.length === 1) return first + ".";
    const last = cleanSentence(sentences[sentences.length - 1]);
    return `${first.split(",").slice(0, 2).join(",")}. ${last.split(",").slice(0, 2).join(",")}.`.replace(/\.\./g, '.');
}

function generateConclusion(textLower) {
    if (textLower.includes("trade-off") || textLower.includes("tradeoff") || textLower.includes("consistency")) {
        return "Efficient system design requires balancing trade-offs between performance, reliability, and scalability.";
    }
    if (textLower.includes("bias") || textLower.includes("fairness") || textLower.includes("procedural")) {
        return "Improving fairness in models requires identifying and correcting biased features systemically.";
    }
    if (textLower.includes("docker") || textLower.includes("kubernetes") || textLower.includes("container")) {
        return "Modern deployment systems rely on containerization and orchestration for scalability and efficiency.";
    }
    if (textLower.includes("security") || textLower.includes("monitoring") || textLower.includes("vulnerabil")) {
        return "Robust monitoring and proactive security protocols are foundational to long-term system stability.";
    }
    return "The system highlights key concepts and practical implementation strategies.";
}

function generateStructuredSummary(text) {
    if (!text || text.trim().length === 0) return null;
    
    // 1. Clean text
    const cleanText = text.replace(/\n/g, " ").trim();
    const textLower = cleanText.toLowerCase();

    // 2. Split into sentences
    const sentences = cleanText.match(/[^\.!\?]+[\.!\?]+/g) || [];

    // 3. Remove weak sentences (too short or starting with connectors)
    const validSentences = sentences.filter(s => {
        const words = s.split(/\s+/).filter(w => w.length > 0).length;
        return words > 8 && !/^(however|but|and|so|because|meanwhile|therefore|thus)\b/i.test(s.trim());
    });

    if (validSentences.length === 0) return null;

    // Handle short inputs explicitly to avoid repetition
    if (validSentences.length <= 3) {
        return handleShortInput(validSentences, textLower);
    }

    // 4. Build word frequency map
    const stopWords = new Set([
        "the", "is", "in", "and", "of", "to", "a", "with", "for", "on",
        "this", "that", "it", "as", "are", "was", "by", "an", "be", "at", "from", "which", "these"
    ]);

    const wordFreq = {};
    validSentences.forEach(sentence => {
        sentence.toLowerCase().split(/\W+/).forEach(word => {
            if (!stopWords.has(word) && word.length > 2) {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });
    });

    // 5. Score sentences (Position-Aware)
    const sentenceScores = validSentences.map((sentence, index) => {
        let score = 0;
        sentence.toLowerCase().split(/\W+/).forEach(word => {
            if (wordFreq[word]) score += wordFreq[word];
        });
        
        // Bias: favor introduction and conclusion
        if (index < 2) score += 5; 
        if (index > validSentences.length - 3) score += 5;
        
        return { sentence, score };
    });

    // 6. Sort by score
    sentenceScores.sort((a, b) => b.score - a.score);

    // 7. Remove similar sentences
    function isSimilar(a, b) {
        const aWords = new Set(a.toLowerCase().split(/\W+/));
        const bWords = new Set(b.toLowerCase().split(/\W+/));
        let common = 0;

        aWords.forEach(word => {
            if (bWords.has(word)) common++;
        });

        return (common / Math.min(aWords.size, bWords.size)) > 0.6;
    }

    const filteredSentences = [];
    for (let s of sentenceScores) {
        if (!filteredSentences.some(f => isSimilar(f.sentence, s.sentence))) {
            filteredSentences.push(s);
        }
    }

    // Limit sentence reuse (Tightened to Top 3 for maximum impact)
    const topSentences = filteredSentences.slice(0, Math.min(3, filteredSentences.length)).map(s => s.sentence);

    // 8. Rule-Based Insights
    const insights = [];
    if (textLower.includes("challenge") || textLower.includes("however") || textLower.includes("problem")) {
        insights.push("The system highlights key challenges and bottlenecks in the domain.");
    }
    if (textLower.includes("trade-off") || textLower.includes("consistency") || textLower.includes("tradeoff")) {
        insights.push("Trade-offs are necessary in system design decisions.");
    }
    if (textLower.includes("improve") || textLower.includes("techniques") || textLower.includes("technique")) {
        insights.push("Various engineering techniques are used to improve system performance.");
    }
    if (textLower.includes("security") || textLower.includes("monitoring")) {
        insights.push("Monitoring and security are critical for system stability.");
    }
    if (insights.length === 0) {
        insights.push("Structured analysis is applied to derive actionable methodology from the source material.");
    }

    // 9. Build structured output
    return {
        title: "Semantic Analysis Report",
        filename: "semantic_analysis.pdf",
        sections: [
            {
                heading: "Executive Summary",
                content: generateSummary(validSentences)
            },
            {
                heading: "Core Key Points",
                bullets: topSentences.map(s => cleanSentence(s))
            },
            {
                heading: "Contextual Insights",
                bullets: insights.slice(0, 3)
            },
            {
                heading: "Critical Conclusion",
                content: generateConclusion(textLower)
            }
        ],
        footer_note: "Extractive Summarization Engine — Deterministic Logic Pipeline"
    };
}

function handleShortInput(sentences, textLower) {
    const insights = [];
    if (textLower.includes("challenge") || textLower.includes("problem")) {
        insights.push("The system highlights key challenges in the domain.");
    }
    if (textLower.includes("trade-off") || textLower.includes("consistency")) {
        insights.push("Trade-offs are necessary in system design decisions.");
    }
    if (textLower.includes("improve") || textLower.includes("techniques")) {
        insights.push("Various techniques are used to optimize system output.");
    }
    if (textLower.includes("security") || textLower.includes("monitoring")) {
        insights.push("System monitoring is critical for operational stability.");
    }
    if (insights.length === 0) {
        insights.push("Targeted analysis allows for structured domain improvements.");
    }

    return {
        title: "Semantic Analysis Report",
        filename: "semantic_analysis_short.pdf",
        sections: [
            {
                heading: "Executive Summary",
                content: generateSummary(sentences)
            },
            {
                heading: "Core Key Points",
                bullets: sentences.map(s => cleanSentence(s))
            },
            {
                heading: "Contextual Insights",
                bullets: insights.slice(0, 3)
            },
            {
                heading: "Critical Conclusion",
                content: generateConclusion(textLower)
            }
        ],
        footer_note: "Extractive Summarization Engine — Adaptive Pipeline"
    };
}

async function buildPDF(content) {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    let page = pdfDoc.addPage([612, 792]);
    const { width, height } = page.getSize();
    let yPosition = height - 70;
    const margin = 50;
    const maxWidth = width - (margin * 2);
    const lineHeight = 16;
    
    const wrapText = (text, font, size, maxWidth) => {
        if (!text) return [];
        const words = text.split(' ');
        const lines = [];
        let currentLine = '';
        
        for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const textWidth = font.widthOfTextAtSize(testLine, size);
            if (textWidth > maxWidth) {
                if (currentLine) lines.push(currentLine);
                currentLine = word;
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine) lines.push(currentLine);
        return lines;
    };
    
    const checkPageBreak = (spaceNeeded) => {
        if (yPosition < spaceNeeded) {
            page = pdfDoc.addPage([612, 792]);
            yPosition = height - 70;
        }
    };

    // Title
    page.drawText(content.title, { 
        x: margin, 
        y: yPosition, 
        size: 26, 
        font: timesRomanBoldFont, 
        color: rgb(0.05, 0.1, 0.2) 
    });
    yPosition -= 50;
    
    // Sections
    for (const section of content.sections) {
        checkPageBreak(100);
        
        // Section Heading
        page.drawText(section.heading, { 
            x: margin, 
            y: yPosition, 
            size: 16, 
            font: timesRomanBoldFont, 
            color: rgb(0.1, 0.2, 0.5) 
        });
        yPosition -= 25;
        
        // Section Paragraph Content
        if (section.content) {
            const contentLines = wrapText(section.content, timesRomanFont, 11, maxWidth);
            for (const line of contentLines) {
                checkPageBreak(40);
                page.drawText(line, { x: margin, y: yPosition, size: 11, font: timesRomanFont, color: rgb(0.1, 0.1, 0.1) });
                yPosition -= lineHeight;
            }
            yPosition -= 10;
        }

        // Section Bullets
        if (section.bullets && section.bullets.length > 0) {
            for (const bullet of section.bullets) {
                const bulletLines = wrapText(bullet, timesRomanFont, 11, maxWidth - 25);
                for (let i = 0; i < bulletLines.length; i++) {
                    checkPageBreak(40);
                    const prefix = i === 0 ? "• " : "  ";
                    page.drawText(prefix + bulletLines[i], { 
                        x: margin + 15, 
                        y: yPosition, 
                        size: 11, 
                        font: timesRomanFont, 
                        color: rgb(0.2, 0.2, 0.2) 
                    });
                    yPosition -= lineHeight;
                }
                yPosition -= 5;
            }
            yPosition -= 10;
        }
        
        yPosition -= 10;
    }
    
    // Footer
    page.drawText(content.footer_note || 'Generated by Semantic Report Engine', {
        x: margin, y: 30, size: 9, font: timesRomanFont, color: rgb(0.5, 0.5, 0.5)
    });
    
    return await pdfDoc.save();
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed. Use POST.' });
    }
    
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({ error: 'Input text is required for analysis.' });
    }
    
    try {
        const analysis = generateStructuredSummary(text);
        if (!analysis) {
            return res.status(400).json({ error: 'Insufficient text quality for analysis. Please provide more content.' });
        }

        const pdfBytes = await buildPDF(analysis);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${analysis.filename}"`);
        res.setHeader('Content-Length', pdfBytes.length);
        
        return res.status(200).send(Buffer.from(pdfBytes));
    } catch (error) {
        console.error('Processing error:', error);
        return res.status(500).json({ error: 'Engine processing failed. Check internal logs.' });
    }
}
