document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('.terminalText .content');
    const words = content.textContent.split(' ');
    content.textContent = ''; 
    const commandoStart = ">> " 
    const textarea = document.getElementById('messageInput');
    textarea.style.display = "none"
    

    let i = 0;
    function typeWord() {
        if (i < words.length) {
            content.textContent += (i > 0 ? ' ' : '') + words[i];
            i++;
            setTimeout(typeWord, 100); 
            
        } else {
            setTimeout(() => {
                textarea.style.display = "block";
                placeCursorAfterInitialChars();
            }, 500);
        }
        
    }

    function CMD() {
        if (textarea.value.startsWith(commandoStart)) {
            return;
        } else {
            textarea.value = commandoStart;
        }
    }
    textarea.addEventListener('input', function() {
        CMD();
    });

    function placeCursorAfterInitialChars() {
        textarea.focus();
        if (textarea.value.length < 4)
        {
            textarea.setSelectionRange(3, 3);
        } else{
            textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        }
        
    }
    placeCursorAfterInitialChars()

    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            placeCursorAfterInitialChars()
        }
    });

    document.addEventListener('click', function(event) {
        placeCursorAfterInitialChars()
    });

    typeWord();

    function isInputDisplayed() {
        const displayStyle = window.getComputedStyle(textarea).display;
        return displayStyle === 'block';
    }
    
    document.addEventListener('keydown', function (event) {
        if (isInputDisplayed()) {
            if (event.key === 'Enter') {
                event.preventDefault();
                placeCursorAfterInitialChars()
                
            }
        }
    });
});
