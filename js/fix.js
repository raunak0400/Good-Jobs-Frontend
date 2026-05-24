const fs = require('fs');
let c = fs.readFileSync('main.js', 'utf8');

c = c.replace(
  'fileNameEl.textContent = ${file.name} (${(file.size/1024).toFixed(0)} KB);',
  () => 'fileNameEl.textContent = `${file.name} (${(file.size/1024).toFixed(0)} KB)`;'
);

c = c.replace(
  'fileSize: ${(file.size/1024).toFixed(0)} KB,',
  () => 'fileSize: `${(file.size/1024).toFixed(0)} KB`,'
);

c = c.replace(
  'submitBtn.innerHTML = <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right:6px"><polyline points="20 6 9 17 4 12"/></svg> Submit Application;',
  () => 'submitBtn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" style="margin-right:6px"><polyline points="20 6 9 17 4 12"/></svg> Submit Application`;'
);

fs.writeFileSync('main.js', c);
console.log('Fixed main.js syntax correctly');
