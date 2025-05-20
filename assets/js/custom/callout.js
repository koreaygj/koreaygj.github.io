// GitHub 블로그용 Obsidian 스타일 콜아웃 변환 스크립트
document.addEventListener('DOMContentLoaded', function() {
  convertBlockquotesToCallouts();
});

function convertBlockquotesToCallouts() {
  // GitHub 블로그에서는 일반 blockquote 요소를 대상으로 함
  const blockquotes = document.querySelectorAll('blockquote');
  
  // Obsidian 스타일 콜아웃 유형 및 아이콘 정의
  const CALLOUT_TYPES = {
    'note': {
      title: '🗒️ 참고',
      class: 'markdown-callout-note'
    },
    'tip': {
      title: '💬 팁',
      class: 'markdown-callout-tip'
    },
    'important': {
      title: '📌 중요',
      class: 'markdown-callout-important'
    },
    'warning': {
      title: '🟠 주의',
      class: 'markdown-callout-warning'
    },
    'caution': {
      title: '🚫 경고',
      class: 'markdown-callout-caution'
    }
  };
  
  blockquotes.forEach(blockquote => {
    // 첫 번째 단락 텍스트 확인
    const firstParagraph = blockquote.querySelector('p:first-child');
    if (!firstParagraph) return;
    
    const text = firstParagraph.innerHTML;
    
    // Obsidian 콜아웃 구문 확인 (예: "[!NOTE] 내용")
    const calloutRegex = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)/i;
    const match = text.match(calloutRegex);
    
    if (match) {
      const type = match[1].toLowerCase();
      const content = match[2];
      
      if (CALLOUT_TYPES[type]) {
        // 블록쿼트를 콜아웃 스타일로 변환
        blockquote.classList.add('markdown-callout', CALLOUT_TYPES[type].class);
        
        // 제목 요소 생성
        const titleElement = document.createElement('div');
        titleElement.classList.add('callout-title');
        titleElement.innerHTML = CALLOUT_TYPES[type].title;
        
        // 내용 요소 생성
        const contentElement = document.createElement('div');
        contentElement.classList.add('callout-content');
        
        // 첫 문장을 제외한 모든 요소를 내용으로 이동
        if (content) {
          firstParagraph.innerHTML = content;
          contentElement.appendChild(firstParagraph);
        } else {
          // 첫 문장이 제목만 있는 경우 제거
          firstParagraph.remove();
        }
        
        // 남은 모든 요소를 내용으로 이동
        while (blockquote.firstChild) {
          contentElement.appendChild(blockquote.firstChild);
        }
        
        // 제목과 내용을 블록쿼트에 추가
        blockquote.appendChild(titleElement);
        blockquote.appendChild(contentElement);
      }
    }
  });
}