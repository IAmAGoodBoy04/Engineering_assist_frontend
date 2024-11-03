const URL = "https://engineering-assist-lh3f.onrender.com";
// const URL = "http://localhost:8080";

const userId=sessionStorage.getItem('userId');
const token=sessionStorage.getItem('token');
const email=decodeURIComponent(sessionStorage.getItem('email'));
const username = decodeURIComponent(sessionStorage.getItem('username'));
const flask_url = "https://vikas2900-engineering-assist.hf.space";
const textbook=sessionStorage.getItem('topic');

document.getElementById('settings_button').addEventListener('click', function() {
    window.location.href = './settings.html';
});
document.getElementById('home_button').addEventListener('click', function() {
    window.location.href = './homepage.html';
});
document.querySelector('.logout').addEventListener('click', function() {
    clearCookies();
    window.location.href = './index.html';
});

function clearCookies() {
    const cookies = document.cookie.split(";");
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('fetchedUrl');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
}

let chatid = null;

document.addEventListener("DOMContentLoaded",async ()=>{
    document.getElementById('headtitle').textContent=`${textbook}`;
    document.querySelector('.user_info .username').textContent = username;
    await fetchChats();
    document.getElementById('newchat_button').addEventListener('click', async function() {
        const newChatName = prompt('Enter the name for the new chat:');
        if (newChatName) {
            const payload = {
                name: newChatName,
                owner: userId,
                topic: textbook
            };

            try {
                const response = await fetch(`${URL}/chats/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    const newChat = await response.json();
                    appendChat(newChat); // Append the new chat to the list
                    alert('New chat created successfully.');
                } else {
                    const errorData = await response.json();
                    alert(errorData.message || 'Failed to create new chat. Please try again.');
                }
            } catch (error) {
                console.error('Error creating new chat:', error);
                alert('An error occurred. Please try again.');
            }
        }
    });
    document.querySelector('.submit-button').addEventListener('click', async () => {
        const textarea = document.querySelector('.query-input');
        const messageContent = textarea.value.trim();
        if (!messageContent || !chatid) {
            return;
        }
    
        try {
            const response = await fetch(`${URL}/chats/${chatid}/messages`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: messageContent })
                
            });
    
            if (response.ok) {
                const responseData = await response.json();
                const messageSpace = document.querySelector('.message_space');
    
                const userTemplate = document.getElementById('user_message');
                const userClone = userTemplate.content.cloneNode(true);
                const userMessageText = userClone.querySelector('p');
                userMessageText.innerHTML = messageContent;
                messageSpace.appendChild(userClone);
    
                const aiTemplate = document.getElementById('ai_message');
                const aiClone = aiTemplate.content.cloneNode(true);
                const aiMessageText = aiClone.querySelector('p');
                aiMessageText.innerHTML = responseData.message;
                messageSpace.appendChild(aiClone);
    
                textarea.value = '';
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

})


async function fetchChats() {
    try {
        const response = await fetch(`${URL}/chats?userId=${userId}&topic=${textbook}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const chats = await response.json(); // Assuming you have a container for chat entries

            chats.forEach(chat => {
                appendChat(chat);
            });
        } else {
            console.error('Failed to fetch chats');
        }
    } catch (error) {
        console.error('Error fetching chats:', error);
    }
}

function appendChat(chat) {
    const chatContainer = document.querySelector('.sidecont .chats'); // Assuming you have a container for chat entries

    const template = document.getElementById('chat_entry');
    const clone = template.content.cloneNode(true);
    const chatDiv = clone.querySelector('.chat_ent');
    const chatTitle = clone.querySelector('h3');

    chatDiv.id = `a${chat._id}`;
    chatTitle.textContent = chat.name;
    chatDiv.addEventListener('click',async () => await fetchMessages(chat._id));

    chatContainer.appendChild(clone);
}

async function fetchMessages(chatId) {
    chatid=chatId;
    try {
        const response = await fetch(`${URL}/chats/${chatId}/messages`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const messages = await response.json();
            const messageSpace = document.querySelector('.message_space');
            messageSpace.innerHTML = '';
            if(messages.length==0){
                return;
            }
            messages.forEach(message => {
                const templateId = message.user === 'assistant' ? 'ai_message' : 'user_message';
                const template = document.getElementById(templateId);
                const clone = template.content.cloneNode(true);
                const messageText = clone.querySelector('p');


                messageText.innerHTML = message.message;

                messageSpace.appendChild(clone);
            });
        } else {
            console.error('Failed to fetch messages');
        }
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}