import { useState } from 'react'
import './App.css'
//import { Configuration, OpenAIApi } from 'openai'

const OKE = ""
function App() {
  const [requirement, setRequirement] = useState("");
  const [stories, setStories] = useState("");

  async function callOpenAIAPI() {
    console.log("Calling the OpenAI API");
    const openaiSystem = "You are a technical product manager and solution architect. You write detailed technical user stories for given product requirements.\n\nThe Platform used for the product is AWS cloud. Following are the AWS services that can be used in the product:\n- Arbitration-Layer (proprietary channel routing engine for push to outbound channels, REST APIs for inbound channels)\n- T3 (proprietary data-lake, similar to AWS Athena)\n- T3-Feature-Mart (proprietary customer  model input data and metadata management)\n- Job-Server (proprietary platform for data processing and model inference, similar to AWS EMR)\n- Analytical-Cluster (proprietary data science work-bench, similar to AWS SageMaker)\n- Digi (proprietary mobile app and web app for customers)\n- API-Gateway\n- Data-Loader (for loading data from T3 to MariaDB)\n- CyberArk (for managing secrets)\n- Confluence Kafka (as real time event source)\n- MariaDB (as application database)\n- ReactJS (for UI)\n- AWS S3\n- AWS SageMaker (for AI model training and inference)\n- AWS EMR (for AI model training and inference)\n- AWS Lambda\n\nMention the users as 'Business user', 'System Developer' and other users if relevant e.g. 'Data Scientist', 'Analyst', 'Compliance Officer', 'Site Reliability Engineer'\n\nWrite detailed technical user stories in a JSON array with title, user, description and dependencies for each story.";
    const openaiUser1 = "Business Requirements:\nA self-service marketing rule-engine for business users to develop targeted marketing rules using AI model recommendations and customer data, including product-propensities, demographics, behavior, service usage, and transaction history. The platform ensures minimal spam and delivers messages via inbound and outbound channels. AI models provide product recommendations, predict propensities, optimize relevance, and align with revenue goals, while determining the best contact method, channels, timing, and content. Data is sourced from T3 for historical customer information and from Confluence Kafka for real-time customer events.";
    const openaiAssistant1 = '[{"title":"Marketing rules for targeted messages","user":"Business user","description":"As a business user, I want to create marketing rules based on AI model recommendations and customer data to deliver targeted messages via inbound and outbound channels. The rules should allow me to filter customers based on product-propensities, demographics, behavior, recent usage of services, and transaction history. The rules should also comply with regulatory requirements and prevent spamming customers. The system should provide a user-friendly interface to create, edit, and delete rules.","dependencies":["List of events to be available in the system.","Examples of complex conditions to be supported in rules. e.g. timeout between start and end events, event sequence.","List of spamming prevention rules."]},{"title":"Arbitration between inbound and outbound channels","user":"Business user","description":"As a business user, I want to create rules to arbitrate across all inbound and outbound channels. Inbound channels should include mobile apps, website and support calls. Outbound channels should include push-notes, email and SMS. The rules should allow me to specify the priority of channels and the conditions under which a channel should be used. The system should integrate with Arbitration-Layer and provide options to setup routing to one or multiple channels of Arbitration-Layer. Rules should be able to use a mix of AI model recommended touch points/channels, product/offer information and customer data to determine the best channel to contact a customer.","dependencies":["List of all inbound and outbound channels to support.","Types and examples of criteria to be supported"]},{"title":"Train AI models and monitor model performance over time","user":"Data Scientist","description":"As a data scientist, I want to train AI models to provide product recommendations, product propensities and content personalization. The system should provide a way to make training data available to Analytical-Cluster or AWS SageMaker to train the models. The system should also provide a way to update the models with new data and retrain them periodically.","dependencies":["Training data in T3-Feature-Mart should include customer demographics, behavior, service usage logs including Adobe/Google Analytics and customer transaction history.","Training data should be accessible in Analytical-Cluster or AWS SageMaker for training the models.","List of Model monitoring metrics. Definition of each metric.","Threshold values for each model monitoring metric, to raise alerts."]},{"title":"Integrate AI models into the rule engine system","user":"System Developer","description":"As a system developer, I want to integrate AI models into the rule engine system to predict product-propensity, maximizing relevance of products to customers and bank\'s revenue expectations. The AI models should predict the best way to contact a customer, determining the optimal channels, timing, and content. The system should provide REST APIs to access the real-time AI models in rule engine. The system should also provide batch scoring option on Job-Server or AWS EMR, where scores across all customers need to be calculated at the same time.","dependencies":["List of AI models. Inputs and outputs of each AI model","List of APIs. Inputs and outputs of each API","List of batch scoring jobs. Inputs and outputs of each job"]},{"title":"Measure campaign effectiveness using control groups","user":"Business user","description":"As a business user, I want to measure the effectiveness of campaigns using control groups. The system should provide a way to create control groups, assign them to campaigns and compare the results with the treatment groups. The system should generate reports with metrics such as conversion rate, revenue generated, and customer satisfaction.","dependencies":["List of metrics to be used for measuring campaign effectiveness.","Treatment group evaluation criteria for stratified sampling.","Types and examples of campaigns to be supported."]},{"title":"Handle high volumes and build fault-tolerant and resilient system","user":"System Developer","description":"As a system developer, I want to handle high volume and velocity of events and actions without compromising performance or reliability. The event handling should use scalable platforms like AWS Lambda and AWS SQS to process events asynchronously and scale up or down based on the load. The system should also use caching and load balancing for APIs to improve performance and reduce latency.","dependencies":["Maximum expected volume of events and actions.","Expected expect historical data to be loaded."]},{"title":"Secure and compliant system","user":"Compliance Officer","description":"As a compliance officer, I want to ensure that the system is secure and compliant with the bank\'s policies and regulations. The system should use CyberArk or AWS KMS to store keys to encrypt data at rest and in transit. The system should also use an APM like Splunk or AWS CloudTrail to monitor and audit system activity. The system should be regularly tested for vulnerabilities and compliance with the bank\'s policies and regulations.","dependencies":["List of compliance tests to be performed."]},{"title":"System monitoring dashboard","user":"Site Reliability Engineer","description":"As a site reliability engineer, I want to ensure that the system health is monitored and displayed on a live dashboard. There should be configurable thresholds for system metrics, to raise alarms and send notifications relevant SRE and development teams.""dependencies":["List of system metrics to be monitored.","List of alarms to be raised.","List of notifications to be sent."]}]';
    const openaiUser2 = "Business Requirements:\n" + requirement;
    const APIBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        {"role": "system", "content": openaiSystem},
        {"role": "user", "content": openaiUser1},
        {"role": "assistant", "content": openaiAssistant1},
        {"role": "user", "content": openaiUser2},
      ],
      "temperature": 0.5,
      "max_tokens": 2048
    };
    await fetch("https://api.openai.com/v1/chat/completions", {
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
      setStories(data.choices[0].message.content.trim());

    });
  }
  return (
    <div className="App">
      <div>
        <textarea
          onChange={(e) => setRequirement(e.target.value)}
          value="An interface for relationship managers to get personalized conversation suggestions based on customer profiles, recent interactions, and usage of products and services. Marketing users should be able to define customer segment-based templates for product offers. The system must comply with regulatory requirements, including configurable frequency caps for conversations. AI models predicting product-propensity should be integrated, with iterative monthly upgrades prioritizing the most relevant products for customers based on revenue expectations. Relationship managers must have the ability to provide feedback on system suggestions, allowing for model improvements. Data engineers should be able to integrate the system with any customer data in the data lake seamlessly."
          cols={100}
          rows={20}
        />
      </div>
      <div>
        <button onClick={callOpenAIAPI}>Generate User Stories</button>
        {stories !== "" ?
          <div>User Stories JSON:<br/>{stories}</div>  
          :
          null
        }
      </div>
    </div>
  )
}

export default App
