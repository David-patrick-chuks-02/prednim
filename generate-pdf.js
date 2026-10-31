const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Read the love story
const storyPath = path.join(__dirname, 'love-story.txt');
const storyText = fs.readFileSync(storyPath, 'utf-8');

// Create PDF document
const doc = new PDFDocument({
  margin: 50,
  size: 'A4',
  font: 'Helvetica',
});

// Create output path
const outputPath = path.join(__dirname, 'When-We-Meet-Again-By-David.pdf');
const stream = fs.createWriteStream(outputPath);

doc.pipe(stream);

// Split text into lines and process
const lines = storyText.split('\n');
let isChapter = false;
let isTitle = false;

// Process each line
lines.forEach((line, index) => {
  const trimmed = line.trim();

  // Skip empty decorative lines at the start
  if (index < 5) return;

  // Check if it's the main title
  if (trimmed === 'WHEN WE MEET AGAIN') {
    doc.fontSize(28).font('Helvetica-Bold').text(trimmed, { align: 'center' });
    doc.fontSize(14).font('Helvetica').text('A Love Story', { align: 'center' });
    doc.fontSize(12).font('Helvetica-Oblique').text('By David', { align: 'center' });
    doc.moveDown(2);
    return;
  }

  // Check if it's a chapter heading
  if (trimmed.startsWith('CHAPTER')) {
    doc.addPage();
    doc.fontSize(16).font('Helvetica-Bold').text(trimmed, { align: 'left' });
    doc.moveDown(1);
    return;
  }

  // Check if it's an epilogue or section break
  if (trimmed === 'EPILOGUE: FIVE YEARS LATER') {
    doc.addPage();
    doc.fontSize(16).font('Helvetica-Bold').text(trimmed, { align: 'left' });
    doc.moveDown(1);
    return;
  }

  // Skip decorative lines
  if (trimmed.includes('═════════════') || trimmed === '' || trimmed.includes('THE END') || trimmed.includes('Written by David')) {
    if (trimmed !== '') {
      doc.moveDown(0.5);
    }
    return;
  }

  // Regular paragraph text
  if (trimmed.length > 0) {
    doc.fontSize(11).font('Helvetica').text(trimmed, {
      align: 'left',
      width: 495,
      lineGap: 4,
    });
    doc.moveDown(0.5);
  }
});

// Add footer with page numbers
doc.on('pageAdded', () => {
  const pageNum = doc.bufferedPageRange().count;
  if (pageNum > 1) {
    doc.fontSize(9).font('Helvetica').text(
      `- ${pageNum} -`,
      50,
      doc.page.height - 30,
      { align: 'center' }
    );
  }
});

// Finalize PDF
doc.end();

// Handle completion
stream.on('finish', () => {
  console.log(`✓ PDF created successfully!`);
  console.log(`📖 File: When-We-Meet-Again-By-David.pdf`);
  console.log(`📍 Location: ${outputPath}`);

  // Get file size
  const stats = fs.statSync(outputPath);
  const fileSizeKB = (stats.size / 1024).toFixed(2);
  console.log(`💾 Size: ${fileSizeKB} KB`);
});

stream.on('error', (err) => {
  console.error('Error creating PDF:', err);
  process.exit(1);
});
