# Hypercode

Hypercode is a friendly npm package that makes it easy to get live, structured LLM responses in your application.

With Hypercode, you can easily query language models and receive responses in useful formats like integers, booleans, strings, and dates:

```javascript
const isEarthFlat = await hyper.boolean('Is the earth flat?');

console.log(isEarthFlat); // false
```

You can also pass information along with your queries in the form of `context`. Context represents bundles of live data with relevance to the query, ensuring the LLM his given all the information necessary to product an accurate response. You can build context objects in the <a href="https://app.gethyper.ai" target="_blank">Hyper app</a>, then use them in Hypercode:

```javascript
const productLaunchDate = await hyper.datetime('When is the product launch?', {
  contextId: 'product-roadmap-context-id',
});

console.log(productLaunchDate); // "2024-07-31T0:00:00Z"
```

> **_NOTE:_** A context object is a collection of resources made up of files, web pages, and data from integrations like Google Drive, Slack, and GitHub. When you link a resource to a Context in Hyper, we generate embeddings that stay automatically synced with changes to your data.

The combination of structure and context in Hypercode is a powerful tool for adding sophisticated natural language understanding into your apps. Instead of complex setups, you can simply write async code that directly leverages AI insights for real-time decision-making and content creation:

```javascript
async function prepareEmailCampaign() {
  const todayIsHoliday = await hyper.boolean('Is today a holiday?', {
    contextId: 'company-holidays-context-id',
  });
  const emailSubject = await hyper.string(
    todayIsHoliday
      ? 'Generate a catchy subject for a post-holiday campaign'
      : 'Generate a catchy subject for a regular workday campaign',
    {
      contextId: 'spring-promo-context-id',
    },
  );

  return {
    campaign: 'Spring Promo',
    recipientList: '/lists/spring-campaign.csv',
    emailTemplate: 'templates/spring-promo.html',
    emailSubject,
    sendDate: todayIsHoliday ? 'next business day' : 'today',
  };
}

prepareEmailCampaign().then((requestBody) => {
  // Make an HTTP request to send the email
});
```

## Getting Started

### Step 1: Install Hypercode

Start by installing the Hypercode package through npm:

```bash
npm install hypercode
```

### Step 2: Set your Hyper API Key

> **_NOTE:_** You can generate an API key from the <a href="https://app.gethyper.ai/settings/api-keys" target="_blank">API Key Settings</a> page in the Hyper app.

In your `.env` file, set your Hyper API Key:

```
HYPER_API_KEY=your_api_key_here
```

Make sure to replace `your_api_key_here` with your actual Hyper API key.

Alternatively, you can set the key yourself by calling the `hyper.init` method:

```javascript
require('dotenv').config();
const hyper = require('hypercode');

hyper.init('API_KEY_HERE');

// Continue with other function calls
```

### Step 3: Import Hypercode in Your Project

Import Hypercode in your JavaScript or TypeScript file.

```javascript
const hyper = require('hypercode');
```

### Step 4: Start Querying

Now you're ready to start querying language models with Hypercode!

## Types in Hypercode

Hypercode provides a variety of structured query types, allowing you to seamlessly integrate LLM responses into your applications. You can utilize context with `contextId` when you need the model to consider specific background information for generating a response. Here's a breakdown of the types and how they can be used:

- **boolean**: Get a true or false answer.

  ```javascript
  const canCatsSeeInTheDark = await hyper.boolean('Can cats see in the dark?');
  console.log(canCatsSeeInTheDark); // true
  ```

- **integer**: Get an integer answer.
  ```javascript
  const numberOfPatentsFiled = await hyper.integer(
    'How many patents has the company filed since its inception?',
    { contextId: 'company-history-context-id' },
  );
  console.log(numberOfPatentsFiled); // 50
  ```
- **string**: Get a simple string answer.
  ```javascript
  const color = hyper.string("What's the color of the sky?");
  console.log(color); // "blue"
  ```
- **float**: Get a floating-point number answer.

  ```javascript
  const averageRevenueGrowth = await hyper.float(
    "What has been the company's average revenue growth rate over the last five years?",
    { contextId: 'financial-report-context-id' },
  );
  console.log(averageRevenueGrowth); // 4.7
  ```

- **datetime**: Get a date and time as the answer.
  ```javascript
  const moonLandingDate = await hyper.datetime(
    'What is the date of the Apollo 11 moon landing?',
  );
  console.log(moonLandingDate); // "1969-07-20T20:17:00Z"
  ```

## Wrapping Up

With Hypercode, integrating live, structured responses from language models into your application has never been easier. By handling the complexity of context management and response formatting, Hypercode empowers you to focus on creating dynamic and intelligent features that enhance user experience.

Remember, the examples provided are just a starting point. The potential uses of Hypercode are limited only by your imagination and the needs of your application. Whether you're building smart assistants, data analysis tools, content generators, or any other AI-driven application, Hypercode is designed to streamline your workflow and bring the power of LLMs to your fingertips.
