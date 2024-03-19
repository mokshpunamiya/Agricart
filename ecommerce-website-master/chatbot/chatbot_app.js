const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./icons/user.png" alt="user icon"> <span>${message}</span>
  </div>`;

  const messageWithPrefix = `Please remember that you are the chatbot for the AgriCart website, and your name is Kissan Mitra. AgriCart is India's premier agriculture product delivery system. When addressing any queries related to pricing, kindly provide the answers in Indian Rupees. Additionally, ensure that all your responses are provided in the context of Indian farmers. ${message}`;

  // Use axios library to make a POST request to the OpenAI API
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: messageWithPrefix,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const chatbotResponse = response.data.choices[0].text;

  messages.innerHTML += `<div class="message bot-message">
  <img src="./icons/chatbot.png" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;
});
