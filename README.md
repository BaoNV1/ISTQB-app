# ISTQB App

ISTQB App is a local-friendly study project for learning ISTQB CTFL concepts through a simple web page.

## What this project includes

- A bilingual study page with English and Vietnamese content
- Chapter summaries, glossaries, and mind maps
- Flashcards, quizzes, mock exam practice, and progress tracking
- A one-page summary and a 2.5-month study plan

## Main files

- `istqb-quest-v4.html` – the main study page
- `doc/` – study materials, summaries, and planning files
- `doc/chapter1` to `doc/chapter6` – chapter-specific glossary and mind map files
- `doc/one_page_summary.html` – quick revision summary

## How to open it

Option 1: Open the HTML file directly in a browser
- Double-click `istqb-quest-v4.html`

Option 2: Serve it locally (recommended for markdown preview)
1. Open a terminal in the project folder
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open this address in your browser:
   ```text
   http://127.0.0.1:8000/istqb-quest-v4.html
   ```

## How to use it

- Start with Chapter 1 and follow the study path in order
- Open the glossary and mind map for each chapter
- Use flashcards and quizzes to review key concepts
- Track your progress as you finish chapters

## Notes

- The markdown preview works best when the page is served from a local web server
- You can switch between English and Vietnamese using the language toggle

## License

This project is intended for educational purposes only.
