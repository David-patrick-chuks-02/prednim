#!/usr/bin/env python3
"""
Regenerate all PDFs with proper formatting:
- Bold, large (20pt), centered chapter titles
- Justified body text
- Better spacing and structure
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Image as RLImage
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from pathlib import Path
import os
import json

# Book metadata
BOOKS = [
    {"slug": "an-agreement-made-of-silence", "title": "An Agreement Made of Silence", "pages": 428},
    {"slug": "the-doors-between-yesterday", "title": "The Doors Between Yesterday", "pages": 714},
    {"slug": "the-fortune-behind-her-name", "title": "The Fortune Behind Her Name", "pages": 714},
    {"slug": "the-glasshouse-of-secrets", "title": "The Glasshouse of Secrets", "pages": 714},
    {"slug": "the-opal-hour-of-secrets", "title": "The Opal Hour of Secrets", "pages": 714},
    {"slug": "the-vow-beneath-the-silver-rain", "title": "The Vow Beneath the Silver Rain", "pages": 714},
    {"slug": "three-beautiful-kinds-of-deception", "title": "Three Beautiful Kinds of Deception", "pages": 714},
    {"slug": "when-midnight-remembers", "title": "When Midnight Remembers", "pages": 428},
    {"slug": "when-the-silence-turns-to-gold", "title": "When the Silence Turns to Gold", "pages": 714},
    {"slug": "where-the-night-keeps-secrets", "title": "Where the Night Keeps Secrets", "pages": 714},
    {"slug": "the-cartographer-of-borrowed-rain", "title": "The Cartographer of Borrowed Rain", "pages": 714},
    {"slug": "a-museum-for-unfinished-goodbyes", "title": "A Museum for Unfinished Goodbyes", "pages": 714},
    {"slug": "the-orchard-beneath-the-clocktower", "title": "The Orchard Beneath the Clocktower", "pages": 714},
    {"slug": "the-map-of-things-we-buried", "title": "The Map of Things We Buried", "pages": 714},
    {"slug": "a-thousand-windows-facing-north", "title": "A Thousand Windows Facing North", "pages": 714},
    {"slug": "the-lighthouse-keeps-no-names", "title": "The Lighthouse Keeps No Names", "pages": 714},
    {"slug": "where-the-paper-moons-fall", "title": "Where the Paper Moons Fall", "pages": 714},
    {"slug": "the-botanist-of-forgotten-promises", "title": "The Botanist of Forgotten Promises", "pages": 714},
    {"slug": "a-season-of-unclaimed-stars", "title": "A Season of Unclaimed Stars", "pages": 714},
    {"slug": "the-last-garden-on-marigold-street", "title": "The Last Garden on Marigold Street", "pages": 714},
    {"slug": "a-dictionary-of-almosts", "title": "A Dictionary of Almosts", "pages": 714},
    {"slug": "the-train-that-carried-yesterday", "title": "The Train That Carried Yesterday", "pages": 714},
    {"slug": "an-atlas-of-invisible-rivers", "title": "An Atlas of Invisible Rivers", "pages": 714},
    {"slug": "the-clockmakers-blue-envelope", "title": "The Clockmaker's Blue Envelope", "pages": 714},
    {"slug": "the-color-of-unsent-letters", "title": "The Color of Unsent Letters", "pages": 714},
    {"slug": "beneath-a-sky-made-of-porcelain", "title": "Beneath a Sky Made of Porcelain", "pages": 714},
    {"slug": "the-blue-hour-at-bellweather-house", "title": "The Blue Hour at Bellweather House", "pages": 714},
    {"slug": "a-map-for-the-missing-season", "title": "A Map for the Missing Season", "pages": 714},
]

def get_chapter_title(chapter_num):
    """Generate chapter title"""
    chapter_names = [
        "The Beginning of Understanding",
        "Shadows and Light",
        "Between the Lines",
        "Whispers in the Dark",
        "A Moment of Clarity",
        "The Weight of Words",
        "Echoes of the Past",
        "Breaking Through",
        "The Space Between",
        "Turning Points",
        "Hidden Truths",
        "Falling Forward",
        "The Edge of Tomorrow",
        "Silence Speaks",
        "A New Dawn",
        "Deeper Currents",
        "The Path Ahead",
        "Questions Without Answers",
        "The Hour of Change",
        "Unraveling Threads",
        "A Different Perspective",
        "The Weight of Waiting",
        "Breaking Free",
        "Moments of Grace",
        "The Turning Tide",
        "Lost and Found",
        "The Final Reckoning",
        "Beginning Again",
        "The Heart's Truth",
        "Where Everything Converges",
        "The Long Journey Home",
    ]
    return chapter_names[chapter_num - 1] if chapter_num <= len(chapter_names) else f"Chapter {chapter_num}"

def get_chapter_content(chapter_num):
    """Generate filler content for chapters to reach page targets"""
    paragraphs = [
        "The protagonist found themselves contemplating the profound mysteries that lay before them. In the depths of their soul, questions swirled like autumn leaves caught in an endless wind. Each moment brought new understanding, each silence held its own eloquent truth.",

        "The world around them seemed to pulse with hidden meanings, waiting to be discovered by those patient enough to listen. Time moved in strange ways here, stretching and compressing according to no rhythm that mortal minds could fully comprehend.",

        "There was a certain beauty in the uncertainty, a kind of grace in not knowing what lay ahead. The future remained unwritten, full of possibility and potential. Every choice made echoed through the corridors of fate, influencing paths yet to be walked.",

        "The character reflected on what had brought them to this moment. Years of searching, of questioning, of hoping for something more meaningful than the surface world could offer. And now, standing at the threshold of revelation, they wondered if they were truly ready for what might come next.",

        "In the quiet moments, when the world slowed down and time seemed to hold its breath, there came a sense of profound connection to something larger than themselves. A feeling that they were part of something vast and intricate, woven into a tapestry of existence that stretched far beyond their understanding.",

        "The night air carried whispers of distant places, of untold stories waiting to be heard. Each star in the sky represented a different world, a different possibility, a different life that might have been lived. The vastness of it all was both terrifying and magnificent.",

        "As dawn approached, bringing with it the promise of new beginning, the protagonist realized that the journey itself had transformed them. They were no longer the person who had started out on this path. Something fundamental had shifted within, something that could never be reversed or forgotten.",

        "The lessons learned in darkness now illuminated the path forward. What had seemed impossible suddenly became clear. What had been shrouded in mystery began to reveal itself, layer by layer, truth by truth.",

        "And in that moment of understanding, everything changed. The world took on new meaning, new purpose, new possibility. The journey was far from over, but the destination had shifted. The search had transformed into discovery, questions had become answers, and the long night had finally given way to dawn.",
    ]

    # Repeat paragraphs to fill pages
    repetitions = 9
    all_paragraphs = (paragraphs * repetitions)[:repetitions * len(paragraphs)]
    return all_paragraphs

def clean_markdown(text):
    """Clean markdown formatting from text"""
    # Remove markdown headers
    lines = text.split('\n')
    cleaned = []
    for line in lines:
        # Skip empty lines that are just whitespace
        if not line.strip():
            continue
        # Remove leading # symbols (headers)
        line = line.lstrip('#').strip()
        if not line:
            continue
        # Remove bold (**text**)
        line = line.replace('**', '')
        # Remove italic (*text*)
        line = line.replace('*', '')
        # Remove underscores
        line = line.replace('_', '')
        cleaned.append(line)

    return '\n\n'.join(cleaned)

def generate_pdf_for_book(book_slug, book_title, target_pages):
    """Generate PDF for a single book"""

    # Output path
    output_dir = Path(f"/Users/mac/Documents/github/prednim/public/books/{book_slug}")
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f"{book_slug.upper().replace('-', '_')}.pdf"

    # Cover image path
    cover_path = output_dir / "cover.jpg"

    # Create PDF document
    doc = SimpleDocTemplate(str(output_file), pagesize=letter,
                           topMargin=0.75*inch,
                           bottomMargin=0.75*inch,
                           leftMargin=0.75*inch,
                           rightMargin=0.75*inch)

    # Get sample styles
    styles = getSampleStyleSheet()

    # Define custom styles
    justified_body = ParagraphStyle(
        'JustifiedBody',
        parent=styles['Normal'],
        alignment=TA_JUSTIFY,
        fontSize=11,
        leading=18,
        textColor=colors.HexColor('#1a181c'),
        spaceAfter=14,
        firstLineIndent=0.3*inch,
    )

    chapter_title_style = ParagraphStyle(
        'ChapterTitle',
        parent=styles['Heading1'],
        alignment=TA_CENTER,
        fontSize=20,
        leading=24,
        fontName='Helvetica-Bold',
        spaceAfter=0.3*inch,
        textColor=colors.HexColor('#1a181c'),
    )

    title_page_style = ParagraphStyle(
        'TitlePage',
        parent=styles['Heading1'],
        alignment=TA_CENTER,
        fontSize=32,
        leading=40,
        fontName='Helvetica-Bold',
        spaceAfter=1*inch,
        textColor=colors.HexColor('#1a181c'),
    )

    # Build story elements
    story = []

    # Page 1: Cover image
    if cover_path.exists():
        try:
            story.append(RLImage(str(cover_path), width=4*inch, height=5.3*inch))
            story.append(PageBreak())
        except Exception as e:
            print(f"  Warning: Could not add cover image: {e}")

    # Page 2: Title/Copyright page (professional layout)
    title_only_style = ParagraphStyle(
        'TitleOnly',
        parent=styles['Heading1'],
        alignment=TA_CENTER,
        fontSize=28,
        leading=34,
        fontName='Helvetica-Bold',
        spaceAfter=0,
        textColor=colors.HexColor('#1a181c'),
    )

    copyright_style = ParagraphStyle(
        'Copyright',
        parent=styles['Normal'],
        alignment=TA_CENTER,
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#666666'),
        spaceAfter=0,
    )

    story.append(Spacer(1, 2*inch))
    story.append(Paragraph(book_title, title_only_style))
    story.append(Spacer(1, 0.3*inch))
    story.append(Paragraph("Premium Edition", ParagraphStyle(
        'SubtitleSmall',
        parent=styles['Normal'],
        alignment=TA_CENTER,
        fontSize=12,
        textColor=colors.HexColor('#999999'),
        spaceAfter=0,
    )))
    story.append(Spacer(1, 2.5*inch))
    story.append(Paragraph("Published by Prednim", copyright_style))
    story.append(Paragraph("© 2026 Prednim. All rights reserved.", copyright_style))
    story.append(Paragraph("This is a premium literary edition.", copyright_style))
    story.append(PageBreak())

    # Add 31 chapters
    for chapter_num in range(1, 32):
        # Chapter title
        chapter_title = f"Chapter {chapter_num:02d} – {get_chapter_title(chapter_num)}"
        story.append(Paragraph(chapter_title, chapter_title_style))
        story.append(Spacer(1, 0.2*inch))

        # Chapter content - add as separate paragraphs
        content_paragraphs = get_chapter_content(chapter_num)
        for para_text in content_paragraphs:
            story.append(Paragraph(para_text, justified_body))

        # Page break between chapters (except after last chapter)
        if chapter_num < 31:
            story.append(PageBreak())

    # Generate PDF
    try:
        doc.build(story)
        print(f"✓ {book_title}")
        return True
    except Exception as e:
        print(f"✗ {book_title}: {e}")
        return False

def main():
    print("🔄 Regenerating all PDFs with proper formatting...")
    print("=" * 60)

    success = 0
    failed = 0

    for book in BOOKS:
        if generate_pdf_for_book(book['slug'], book['title'], book['pages']):
            success += 1
        else:
            failed += 1

    print("=" * 60)
    print(f"\n✅ Complete: {success}/{len(BOOKS)} PDFs regenerated")
    if failed > 0:
        print(f"⚠️  {failed} PDFs failed")

if __name__ == '__main__':
    main()
