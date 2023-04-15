import { useState } from 'react'
import './App.css'

const OKE = ""
function App() {
  const [requirement, setRequirement] = useState("");
  const [stories, setStories] = useState("");

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    const APIBody = {
      "model": "text-davinci-003",
      "prompt": "User stories for requirement: " + requirement,
      "temperature": 0.5,
      "max_tokens": 1000
    }

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + atob(OKE, "base64")
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setStories(data.choices[0].text.trim());
    });
  }
  return (
    <div className="App">
      <div>
        <textarea
          onChange={(e) => setRequirement(e.target.value)}
          value="marketing rule engine to create campaigns for customer segments"
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>Generate User Stories</button>
        {stories !== "" ?
          <h3>User Stories: {stories}</h3>  
          :
          null
        }
      </div>
    </div>
  )
}

export default App
