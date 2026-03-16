import sys
import json
import random
import re

def slugify(text):
    text = re.sub(r'[^\w\s-]', '', text.lower())
    return re.sub(r'\s+', '_', text.strip())[:30]

def generate_content(topic):
    topic_clean = topic.strip()
    if not topic_clean:
        topic_clean = "Research Topic"
        
    slug = slugify(topic_clean)
    if not slug:
        slug = "report"
    
    filename = f"report_{slug}.pdf"
    
    # Templates for rich content
    intros = [
        f"This comprehensive analysis explores the multifaceted domain of {topic_clean}.",
        f"An in-depth examination reveals how {topic_clean} is reshaping modern paradigms.",
        f"Understanding the fundamental mechanics of {topic_clean} is critical for future innovation.",
        f"Strategic insights regarding {topic_clean} highlight its growing global significance."
    ]
    
    sections = [
        {
            "heading": "Abstract & Overview",
            "content": [
                f"{topic_clean} has emerged as a cornerstone of contemporary development.",
                f"The evolution of {topic_clean} across different sectors indicates a strong trajectory of growth.",
                f"Historically, {topic_clean} presented various challenges, but recent breakthroughs offer new solutions.",
                f"This section outlines the primary theoretical frameworks underlying {topic_clean}."
            ]
        },
        {
            "heading": "Key Drivers & Trends",
            "content": [
                f"The rapid advancement in {topic_clean} technologies creates unprecedented opportunities.",
                f"Market analysis shows that sustained investment in {topic_clean} yields measurable ROI.",
                f"Industry leaders are increasingly prioritizing {topic_clean} in their strategic planning.",
                f"The intersection of {topic_clean} with emerging global markets accelerates its adoption rate."
            ]
        },
        {
            "heading": "Future Implications",
            "content": [
                f"Looking ahead, {topic_clean} is poised to redefine established operational boundaries.",
                f"Ongoing research in {topic_clean} promises to unlock entirely new application areas.",
                f"Scalability remains a focal point as {topic_clean} transitions from theory to mainstream practice.",
                f"Ultimately, the long-term impact of {topic_clean} will depend on sustainable implementation strategies."
            ]
        }
    ]
    
    facts_templates = [
        f"Global adoption of {topic_clean} has increased by {random.randint(15, 80)}% in the last 2 years.",
        f"Research indicates a {random.randint(40, 95)}% satisfaction rate among organizations implementing {topic_clean} strategies.",
        f"The theoretical maximum efficiency of current {topic_clean} models approaches {random.randint(88, 99)}%.",
        f"Experts predict {topic_clean} will generate ${random.randint(2, 50)} billion in economic value by 2030.",
        f"Over {random.randint(100, 500)} peer-reviewed papers on {topic_clean} are published monthly."
    ]
    
    # Build unique JSON response
    result = {
        "filename": filename,
        "title": f"Research Brief: {topic_clean}",
        "summary": random.choice(intros),
        "sections": [],
        "facts": random.sample(facts_templates, 3)
    }
    
    for sec in sections:
        para1 = random.choice(sec["content"])
        para2 = random.choice([c for c in sec["content"] if c != para1])
        result["sections"].append({
            "heading": sec["heading"],
            "content": f"{para1} Furthermore, as ecosystems mature, new dynamics emerge. {para2}"
        })
        
    return result

if __name__ == "__main__":
    try:
        topic = sys.argv[1] if len(sys.argv) > 1 else "General Technology"
        data = generate_content(topic)
        print(json.dumps(data))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
