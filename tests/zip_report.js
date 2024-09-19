const fs = require('fs');
const archiver = require('archiver');
const moment = require('moment');

const sourceFolder = 'C:/git_clones/playwright/playwright-report';
const outputFolder = 'C:/git_clones/playwright/playwright_zip';

const today = moment().format('MMMM-Do-YYYY-h-mm a');
const zipFileName = `report_${today}.zip`;

// Create a write stream for the output ZIP file
const output = fs.createWriteStream(`${outputFolder}/${zipFileName}`);

// Create a new archive
const archive = archiver('zip', {
zlib: { level: 5 }, // Set compression level (0-9)
});

// Pipe the archive data to the output file
archive.pipe(output);

// Add the contents of the source folder to the archive
archive.directory(sourceFolder, false);

// Finalize the archive and save it
archive.finalize();

output.on('close', () => {
console.log(`Archive ${zipFileName} created successfully.`);
});

output.on('error', (err) => {
console.error('Error creating archive:', err);
});