# Hypercode

`Hypercode` is a npm package for Node.js that allows you to consume the [Hyper APIs](https://docs.gethyper.ai) easily in your JavaScript or TypeScript projects with complete **type-safety**. `Hypercode` handles the complexity of context management and response formatting, allowing you to focus on creating dynamic and intelligent features that enhance the user experience. It is a friendly npm package that makes it easy to get live, structured LLM responses with custom contexts in useful formats like integers, booleans, strings, dates, and lots more.

Create a free account today on [Hyper](https://app.gethyper.ai) to start building your own custom contexts, integrating them into your applications, generating API keys, and using them in your projects with `Hypercode`!

Find the npm package [here](https://www.npmjs.com/package/hypercode)

[![npm version](https://badge.fury.io/js/hypercode.svg)](https://www.npmjs.com/package/hypercode)

**There are 3 main components to Hypercode:**

- Context Management (get information about the created contexts, more methods are coming soon) - [Learn More](#context-management)
- Response Formatting (get a response in a specific format or data type) - [Learn More](#response-formatting---types-in-hypercode)
- Embeddings Search (perform nuanced searches across integrated third-party data sources and internal documents) - [Learn More](#embeddings-search)

**Here's a quick example of how you can use Hypercode to get a boolean response:**

```javascript
const { data: isEarthFlat } = await hyper.types.boolean('Is the earth flat?');

console.log(isEarthFlat); // false
```

You can also pass the information along with your queries in the form of `context`. Context represents bundles of live data with relevance to the query, ensuring the LLM is given all the information necessary to produce an accurate response. You can build context objects in the [Hyper app](https://app.gethyper.ai), then use them in Hypercode:

```javascript
const { data: productLaunchDate } = await hyper.types.datetime(
  'When is the product launch?',
  {
    contextId: 'product-roadmap-context-id',
  },
);

console.log(productLaunchDate); // "2024-07-31T0:00:00Z"
```

> **_NOTE:_** A context object is a collection of resources made up of files, web pages, and data from integrations like Google Drive, Slack, and GitHub. When you link a resource to a Context in Hyper, we generate embeddings that stay automatically synced with changes to your data.

The combination of structure and context in Hypercode is a powerful tool for adding sophisticated natural language understanding to your apps. Instead of complex setups, you can simply write async code that directly leverages AI insights for real-time decision-making and content creation:

```javascript
async function prepareEmailCampaign() {
  const todayIsHoliday = await hyper.types.boolean('Is today a holiday?', {
    contextId: 'company-holidays-context-id',
  });

  const emailSubject = await hyper.types.string(
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

Start by installing the Hypercode package through your preferred package manager:

#### Using npm

```bash
npm i hypercode
```

or

```bash
npm install --save hypercode
```

#### Using Yarn

```bash
yarn add hypercode
```

#### Using pnpm

```bash
pnpm add hypercode
```

### Step 2: Set your Hyper API Key

> **_NOTE:_** You need to generate an API key from the [API Key Settings](https://app.gethyper.ai/settings/api-keys) page in the Hyper app.

In your `.env` file, set your Hyper API Key:

```bash
HYPER_API_KEY="your_api_key_here"
```

Make sure to replace `your_api_key_here` with your actual Hyper API key obtained from the Hyper app.

### Step 3: Import Hypercode into Your Project

Import Hypercode in your JavaScript or TypeScript file to start using it:

```javascript
import { Hyper } from 'hypercode';
import dotenv from 'dotenv';

dotenv.config();

const hyper = new Hyper(process.env.HYPER_API_KEY);

// Use the `hyper` object to make different function calls
```

### Step 4: Start Querying

Now you're ready to start querying language models with your own custom contexts created with Hypercode!

## Examples

**You can find different example codes in the [examples](https://github.com/gethyperai/hypercode/tree/main/examples) folder.**

## Context Management

Hypercode allows you to programmatically manage your contexts that are created inside the [Hyper App](https://app.gethyper.ai). You can get information about the created contexts, and more methods are coming soon. More information about contexts can be found [here](https://docs.gethyper.ai/context).

**Here's a quick example of how you can use Hypercode to list down all the contexts:**

```javascript
const { data: contexts, error } = await hyper.contexts.list();

console.log(contexts); // [{ id: 'context-id-1', name: 'Context 1', created_at: '2023-10-28T04:28:13.971776+00:00' }, { id: 'context-id-2', name: 'Context 2', created_at: '2023-11-02T22:18:44.978052+00:00' }]
```

## Response Formatting - Types in Hypercode

Hypercode provides a variety of structured query types, allowing you to seamlessly integrate LLM responses into your applications. You can utilize context with `contextId` when you need the model to consider specific background information for generating a response. More information about `types` can be found [here](https://docs.gethyper.ai/types) Here's a breakdown of the types and how they can be used:

- **string**: Get a simple string answer.

  ```javascript
  const { data: color, error } = await hyper.types.string(
    "What's the color of the sky?",
  );

  console.log(color); // "blue"
  ```

You can pass the `contextId` as an optional parameter to all the `types` methods. The `contextId` is the id of the context that you want to use for the query. Here's one example with the `integer` method:

- **integer**: Get an integer answer.

  ```javascript
  const { data: numberOfPatentsFiled, error } = await hyper.types.integer(
    'How many patents has the company filed since its inception?',
    { contextId: 'company-history-context-id' },
  );

  console.log(numberOfPatentsFiled); // 50
  ```

- **float**: Get a floating-point number answer.

  ```javascript
  const { data: averageRevenueGrowth, error } = await hyper.types.float(
    "What has been the company's average revenue growth rate over the last five years?",
    { contextId: 'financial-report-context-id' },
  );

  console.log(averageRevenueGrowth); // 4.7
  ```

- **boolean**: Get a true or false answer.

  ```javascript
  const { data: canCatsSeeInTheDark, error } = await hyper.types.boolean(
    'Can cats see in the dark?',
  );

  console.log(canCatsSeeInTheDark); // true
  ```

- **datetime**: Get a date and time as the answer.

  ```javascript
  const { data: moonLandingDate, error } = await hyper.types.datetime(
    'What is the date of the Apollo 11 moon landing?',
  );

  console.log(moonLandingDate); // "1969-07-20T20:17:00Z"
  ```

**You can also get the result as an array of the above types. Here are the methods for that:**

- `stringArray`, `integerArray`, `floatArray`, `booleanArray`, `datetimeArray` methods: Get an array of the respective type as the answer.

  ```javascript
  // Get an array of strings as the answer
  const { data } = await hyper.types.stringArray('List all department names', {
    contextId: 'company-structure-context-id',
  });

  console.log(data); // ['Human Resources', 'Finance', 'Research and Development', 'Sales', 'Customer Support']

  // Get an array of integers as the answer
  const { data } = await hyper.types.integerArray(
    'What is the headcount for each department?',
    { contextId: 'company-structure-context-id' },
  );

  // Get an array of floats as the answer
  const { data } = await hyper.types.floatArray(
    'What were the customer satisfaction ratings from the last survey?',
    { contextId: 'customer-reviews-context-id' },
  );

  // Get an array of booleans as the answer
  const { data } = await hyper.types.booleanArray(
    'Are services meeting performance targets?',
    { contextId: 'performance-reviews-context-id' },
  );

  // Get an array of datetimes as the answer
  const { data } = await hyper.types.datetimeArray(
    'What are the upcoming project deadlines?',
    { contextId: 'project-management-context-id' },
  );
  ```

## Embeddings Search

Utilize our Embeddings Search API to perform nuanced searches across integrated third-party data sources and internal documents. Leverage the `contextId` to scope searches to specific business contexts for enhanced relevance. More information about `search` can be found [here](https://docs.gethyper.ai/search).

```javascript
const { data, error } = await hyper.search.execute('quarterly sales report', {
  contextId: 'company-sales-reports-context-id',
});

console.log(data);
```

## Wrapping Up

With Hypercode, integrating live, structured responses in specific `types` from language models into your application has never been easier. By handling the complexity of managing the `contexts` and response formatting, Hypercode empowers you to focus on creating dynamic and intelligent features that enhance the user experience. With the powerful `search` feature, developers can perform nuanced searchs across integrated third-party data sources and internal documents to get the most relevant results from the context.

Remember, the examples provided are just a starting point. The potential uses of Hypercode are limited only by your imagination and the needs of your application. Whether you're building smart assistants, data analysis tools, content generators, or any other AI-driven application, Hypercode is designed to streamline your workflow and bring the power of LLMs to your fingertips.

Create a free account on [Hyper](https://app.gethyper.ai) to start building your own custom contexts and integrating them into your applications today!

## Bugs and Features

See the [issues](https://github.com/gethyperai/hypercode/issues) for a list of proposed features and known issues. Feel free to raise new issues.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/gethyperai/hypercode/blob/main/LICENSE) for more information. © [Hyper AI Inc.](https://gethyper.ai)
