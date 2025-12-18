import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const VARIABLES_JSON_PATH = path.join(__dirname, '../all-variables.json');
const INDEX_CSS_PATH = path.join(__dirname, '../index.css');

function toKebabCase(str) {
  let s = str;
  
  // Special handling for spacing to keep it short and clean
  if (s.startsWith('spacing')) {
      // Strip property details in parens, e.g. spacing10(40px) -> spacing10
      const parenIndex = s.indexOf('(');
      if (parenIndex > -1) {
          s = s.substring(0, parenIndex);
      }
      // Handle special dot if present
      s = s.replace('․', '.'); 
  }

  // Generic conversion from camelCase
  s = s.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
       .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2');
       
  s = s.toLowerCase();

  // Replace special chars (parens, dots, etc) with hyphens
  s = s.replace(/[\(\)\.․,]/g, '-');
  
  // Collapse multiple hyphens
  s = s.replace(/-+/g, '-');
  
  // Trim leading/trailing hyphens
  s = s.replace(/^-|-$/g, '');
  
  return s;
}

function processCollection(collection) {
    const vars = [];
    if (!collection) return vars;

    const processTokens = (tokens) => {
        if (!tokens) return;
        tokens.forEach(token => {
             vars.push(`  --${toKebabCase(token.name)}: ${token.value};`);
        });
    };

    if (collection.color) processTokens(collection.color);
    if (collection.number) processTokens(collection.number);
    if (collection.string) processTokens(collection.string);
    // Add boolean if needed, though usually not CSS variables
    
    return vars;
}

function main() {
  try {
    const jsonContent = fs.readFileSync(VARIABLES_JSON_PATH, 'utf8');
    const data = JSON.parse(jsonContent);

    let rootVars = [];
    let lightVars = [];
    let darkVars = [];

    data.forEach(group => {
        if (group.mode === 'style') {
            rootVars = [...rootVars, ...processCollection(group)];
        } else if (group.mode === 'lightmode') {
            lightVars = [...lightVars, ...processCollection(group)];
        } else if (group.mode === 'darkmode') {
            darkVars = [...darkVars, ...processCollection(group)];
        }
    });

    const cssContent = fs.readFileSync(INDEX_CSS_PATH, 'utf8');

    // Construct new blocks
    const rootBlock = `:root {\n${rootVars.join('\n')}\n${lightVars.join('\n')}\n}`;
    const darkBlock = `.dark {\n${darkVars.join('\n')}\n}`;
    
    let newCss = cssContent;
    
    // Replace :root
    if (newCss.includes(':root {')) {
        newCss = newCss.replace(/:root\s*{[^}]*}/s, rootBlock);
    } else {
        newCss += '\n' + rootBlock;
    }

    // Replace or Append .dark
    if (newCss.includes('.dark {')) {
        newCss = newCss.replace(/\.dark\s*{[^}]*}/s, darkBlock);
    } else {
        newCss += '\n\n' + darkBlock;
    }
    
    fs.writeFileSync(INDEX_CSS_PATH, newCss);
    console.log('Successfully synced CSS variables to src/index.css');

  } catch (error) {
    console.error('Error syncing tokens:', error);
    process.exit(1);
  }
}

main();
