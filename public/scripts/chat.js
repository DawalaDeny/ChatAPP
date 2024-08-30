document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('messageInput');
    const messageSound = document.getElementById('messageSound');

    function isInputDisplayed() {
        const displayStyle = window.getComputedStyle(textarea).display;
        return displayStyle === 'block';
    }

    function playMessageSound() {
        messageSound.currentTime = 0.5;
        messageSound.play();
    }
    function stopMessageSound() {
        messageSound.pause()
    }


    document.getElementById('volume').addEventListener("click", mute);

    function mute() {
        let volumeBtn = document.getElementById('volume')
        if (volumeBtn.classList.contains("active")) {
            volumeBtn.classList.remove("active")
            volumeBtn.classList.add("deactive")
            messageSound.volume = 0.0;
        } else {
            volumeBtn.classList.remove("deactive")
            volumeBtn.classList.add("active")
            messageSound.volume = 1.0;
        }
    }

    function generateHelp() {
        let help = document.createElement("p");
        help.className = "terminalText";

        let name = document.createElement("span");
        name.className = "name";
        name.innerText = "RED_QUEEN >";

        let content = document.createElement("span");
        content.className = "content";
        content.innerText = " Commands you can use: !setname, !clear, !credit, !logs, !effect.";

        help.appendChild(name);
        help.appendChild(content);

        const div = document.getElementsByClassName("terminal")[0];
        div.insertBefore(help, div.children[div.children.length - 1]);

        typeWord(content);
        removeOldMessages();
    }

    function typeWord(content) {
        let words = content.textContent.split(' ');
        content.textContent = '';
        let i = 0;


        function type() {
            if (i < words.length) {
                content.textContent += (i > 0 ? ' ' : '') + words[i];
                playMessageSound()
                i++;
                setTimeout(type, 100);
            } else {
                stopMessageSound()
            }
        }

        type();
    }
    function clearChat() {
        const div = document.getElementsByClassName("terminal")[0]
        const input = div.lastElementChild
        div.innerHTML = "";
        div.appendChild(input)
    }

    function toBeImplemented(feature) {
        let help = document.createElement("p");
        help.className = "terminalText";

        let name = document.createElement("span");
        name.className = "name";
        name.innerText = "RED_QUEEN >";

        let content = document.createElement("span");
        content.className = "content";
        content.innerText = ` Feature "${feature}" to be implemented in the future.`;

        help.appendChild(name);
        help.appendChild(content);

        const div = document.getElementsByClassName("terminal")[0];
        div.insertBefore(help, div.children[div.children.length - 1]);

        typeWord(content);
        removeOldMessages();
    }
    function generiek(message) {
        let help = document.createElement("p");
        help.className = "terminalText";

        let name = document.createElement("span");
        name.className = "name";
        name.innerText = "RED_QUEEN >";

        let content = document.createElement("span");
        content.className = "content";
        content.innerText = message;

        help.appendChild(name);
        help.appendChild(content);

        const div = document.getElementsByClassName("terminal")[0];
        div.insertBefore(help, div.children[div.children.length - 1]);

        typeWord(content);
        removeOldMessages();
    }

    function removeOldMessages() {
        const terminal = document.querySelector('.terminal');
        const bezel = document.getElementById('bezel');

        const maxTerminalHeight = bezel.clientHeight;

        while (terminal.scrollHeight > maxTerminalHeight) {
            const firstMessage = terminal.querySelector('p.terminalText');
            if (firstMessage) {
                terminal.removeChild(firstMessage);
            } else {
                break;
            }
        }
    }

    function credits() {

        let help = document.createElement("p");
        help.className = "terminalText";

        let name = document.createElement("span");
        name.className = "name";
        name.innerText = "RED_QUEEN >";

        let content = document.createElement("span");
        content.className = "content";
        content.innerHTML = " Credit: ";


        let span1 = document.createElement("span");
        span1.classList.add("content")
        span1.style.color = "yellow"

        let fa1 = document.createElement("i");
        fa1.classList.add("fa-solid")
        fa1.classList.add("fa-link")    

        let link1 = document.createElement("a");
        link1.href = "https://dev.to/ekeijl/retro-crt-terminal-screen-in-css-js-4afh"
        link1.innerText = "DESIGN"
        link1.classList.add("content")
        link1.style.color = "yellow"
        link1.style.textDecoration = "none"
        link1.style.fontSize="100%"
        link1.target="_blank"

        
        span1.appendChild(link1)
        span1.appendChild(fa1)


        let span2 = document.createElement("span");
        span2.classList.add("content")
        span2.style.color = "yellow"

        let fa2 = document.createElement("i");
        fa2.classList.add("fa-solid")
        fa2.classList.add("fa-link") 

        let link2 = document.createElement("a");
        link2.href = "https://github.com/websockets/ws?tab=readme-ov-file#server-broadcast"
        link2.innerText = " WEBSOCKET"
        link2.classList.add("content")
        link2.style.color = "yellow"
        link2.style.textDecoration = "none"
        link2.style.fontSize="100%"
        link2.target="_blank"
        
        span2.appendChild(link2)
        span2.appendChild(fa2)



        help.appendChild(name);
        help.appendChild(content);
        help.appendChild(span1);
        help.appendChild(span2);


        const div = document.getElementsByClassName("terminal")[0];
        div.insertBefore(help, div.children[div.children.length - 1]);

        typeWord(content);
        removeOldMessages();

    }


    textarea.addEventListener('keydown', function (event) {
        if (isInputDisplayed()) {
            if (event.key === 'Enter') {
                event.preventDefault();
                let chat = textarea.value.slice(3).trim();

                if (chat.startsWith("!setname") || chat.startsWith("!SETNAME")) {
                    items = chat.trim().split(" ")
                    length = chat.trim().length
                    if (items.length > 3 || length > 30 || items.length < 2) {
                        generiek(" Use the command like this !setname {yourname}, name limits: 2 words, 20 characters, example: !setname Dan Davis")
                    } else if (items.length === 3) {
                        combinedName = items[1] + "_" + items[2]
                        sendName(combinedName.toUpperCase())

                    } else {
                        combinedName = items[1]
                        sendName(combinedName.toUpperCase())
                    } 


                } else if (chat === "!help" || chat === "!HELP") {
                    generateHelp()
                } else if (chat === "!clear" || chat === "!CLEAR") {
                    clearChat()
                } else if (chat === "!credit" || chat === "!CREDIT") {
                    credits()
                }
                else if (chat === "!logs" || chat === "!LOGS") {
                    toBeImplemented("logs")
                } else if (chat === "!effect" || chat === "!EFFECT") {
                    toBeImplemented("effect")
                }
                else {
                    if (chat.trim().length > 100){
                        generiek(" Maximum of 100 characters threshold value exceeded")
                    }else{
                        sendMessage()
                    }                  
                }
                textarea.value = ">> ";
            }
        }

    });


    const ws = new WebSocket('ws://localhost:3000');

    ws.onmessage = function (event) {
        let type = JSON.parse(event.data).type;

        if (type === "updateClientCount") {
            const count = document.getElementById('count');
            count.innerText = " " + JSON.parse(event.data).count

        } else {
            let msg = JSON.parse(event.data).msg;

            let help = document.createElement("p");
            help.className = "terminalText";

            let name = document.createElement("span");
            name.className = "name";

            name.innerText = `${JSON.parse(event.data).username} > `;

            let content = document.createElement("span");
            content.className = "content";

            content.innerText = msg;

            help.appendChild(name);
            help.appendChild(content);

            const div = document.getElementsByClassName("terminal")[0];
            if (type === "error") {
                name.style.color = "red";
                const count = document.getElementById('count');
                count.innerText = " ";
                count.style.color = "red";
            }
            div.insertBefore(help, div.children[div.children.length - 1]);

            typeWord(content);
            removeOldMessages();

        }

    };

    function  sendMessage() {
        const input = document.getElementById('messageInput')

        if (input.value.slice(3).trim() !== "") {
            ws.send(JSON.stringify({ msg: input.value.slice(3).trim() }));
            input.value = '';
        }

    }

    function sendName(name) {
        ws.send(JSON.stringify({ type: 'setname', username: name }))

    }
}
)