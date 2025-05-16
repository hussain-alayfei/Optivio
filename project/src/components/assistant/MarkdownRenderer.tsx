import React from 'react';

interface MarkdownRendererProps {
  markdown: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  // Simple markdown parser
  const parseMarkdown = (content: string) => {
    let html = content;
    
    // Replace headings (# Heading)
    html = html.replace(/^# (.*$)/gm, '<h1 class="text-lg font-bold mt-3 mb-2">$1</h1>');
    html = html.replace(/^## (.*$)/gm, '<h2 class="text-base font-bold mt-2 mb-1">$1</h2>');
    html = html.replace(/^### (.*$)/gm, '<h3 class="text-sm font-bold mt-2 mb-1">$1</h3>');
    
    // Replace lists (* List item)
    html = html.replace(/^\* (.*$)/gm, '<li class="ml-4 list-disc text-sm">$1</li>');
    
    // Replace numbered lists (1. List item)
    html = html.replace(/^[0-9]+\. (.*$)/gm, '<li class="ml-4 list-decimal text-sm">$1</li>');
    
    // Wrap lists in proper tags
    let inList = false;
    const lines = html.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('<li') && !inList) {
        lines[i] = '<ul class="my-2">' + lines[i];
        inList = true;
      } else if (!lines[i].includes('<li') && inList) {
        lines[i-1] = lines[i-1] + '</ul>';
        inList = false;
      }
    }
    if (inList) {
      lines[lines.length-1] = lines[lines.length-1] + '</ul>';
    }
    html = lines.join('\n');
    
    // Replace bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace tables with properly formatted tables
    let tableMatches = html.match(/\|(.*)\|\n\|([-|]*)\|\n((\|.*\|\n)+)/g);
    if (tableMatches) {
      for (let match of tableMatches) {
        const rows = match.split('\n').filter(row => row.trim() !== '');
        
        let tableHtml = '<div class="overflow-x-auto my-3"><table class="min-w-full bg-black/20 rounded-md text-sm">';
        
        // Header
        let headerCells = rows[0].split('|').filter(cell => cell.trim() !== '');
        tableHtml += '<thead class="bg-black/30"><tr>';
        headerCells.forEach(cell => {
          tableHtml += `<th class="px-3 py-2 text-right text-xs font-medium text-white/90">${cell.trim()}</th>`;
        });
        tableHtml += '</tr></thead>';
        
        // Body
        tableHtml += '<tbody>';
        for (let i = 2; i < rows.length; i++) {
          let bodyCells = rows[i].split('|').filter(cell => cell.trim() !== '');
          tableHtml += '<tr class="border-t border-white/10">';
          bodyCells.forEach(cell => {
            tableHtml += `<td class="px-3 py-2 text-xs text-white/80">${cell.trim()}</td>`;
          });
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table></div>';
        
        html = html.replace(match, tableHtml);
      }
    }
    
    // Handle paragraphs (add space between them)
    html = html.replace(/\n\n/g, '</p><p class="my-2 text-sm leading-relaxed">');
    
    // Wrap the entire content in a paragraph if it doesn't start with a formatted element
    if (!html.startsWith('<')) {
      html = '<p class="my-2 text-sm leading-relaxed">' + html;
    }
    
    // Add a closing paragraph if needed
    if (!html.endsWith('>')) {
      html += '</p>';
    }
    
    return html;
  };
  
  return (
    <div 
      className="prose prose-invert max-w-none text-white/90"
      dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
    />
  );
};

export default MarkdownRenderer;