const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "YOUR_API_KEY";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";
  
  // Add user message
  messages.innerHTML += `<div class="message user-message">
  <img src="./icons/user.png" alt="user icon"> <span>${message}</span>
  </div>`;
  
  // Add loading indicator
  const loadingId = `loading-${Date.now()}`;
  messages.innerHTML += `<div id="${loadingId}" class="message bot-message loading">
    <img src="./icons/chatbot.png" alt="bot icon"> 
    <span class="loading-dots">
      <span>.</span><span>.</span><span>.</span>
    </span>
  </div>`;
  
  // Scroll to bottom
  messages.scrollTop = messages.scrollHeight;
  
  try {
    const systemMessage = "You are the chatbot for the AgriCart website, and your name is Kissan Mitra. AgriCart is India's premier agriculture product delivery system. When addressing any queries related to pricing, kindly provide the answers in Indian Rupees. Additionally, ensure that all your responses are provided in the context of Indian farmers.";
    
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-0528-qwen3-8b:free", 
        messages: [
          {
            "role": "system",
            "content": systemMessage
          },
          {
            "role": "user",
            "content": message
          }
        ],
        temperature: 0,
        max_tokens: 1000,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "agricart.com", 
          "X-Title": "AgriCart", 
        },
      }
    );
    
    // Remove loading indicator
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.remove();
    }
    
    const chatbotResponse = response.data.choices[0].message.content;
    
    // Add bot response
    messages.innerHTML += `<div class="message bot-message">
    <img src="./icons/chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
    </div>`;
    
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
    
  } catch (error) {
    // Remove loading indicator
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.remove();
    }
    
    // Add error message
    messages.innerHTML += `<div class="message bot-message error">
    <img src="./icons/chatbot.png" alt="bot icon"> <span>Sorry, I encountered an error. Please try again.</span>
    </div>`;
    
    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
    
    console.error("Error:", error);
  }
});