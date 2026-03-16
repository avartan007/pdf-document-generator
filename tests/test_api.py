import pytest
import os
import sys

# Append parent dir so we can import utils directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.content_engine import generate_content, slugify

def test_slugify():
    assert slugify("Machine Learning 2024!") == "machine_learning_2024"
    assert slugify("Very Long Title " * 5) == "very_long_title_very_long_titl"
    
def test_generate_content():
    result = generate_content("Climate Change")
    
    assert "filename" in result
    assert result["filename"].startswith("report_climate_change")
    assert result["filename"].endswith(".pdf")
    
    assert "title" in result
    assert "Climate Change" in result["title"]
    
    assert "summary" in result
    assert len(result["sections"]) > 0
    assert len(result["facts"]) == 3
    
    for section in result["sections"]:
        assert "heading" in section
        assert "content" in section
        assert len(section["content"]) > 10

def test_empty_topic():
    result = generate_content("   ")
    assert "report_" in result["filename"]
    assert "Research" in result["title"]
