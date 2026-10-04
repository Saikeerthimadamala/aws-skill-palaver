# Sentify — AWS Serverless Sentiment Analysis on Customer Feedback

A modern, professional web application built with **React**, **Vite**, and **custom modern CSS** for college project presentation and portfolio evaluation. **Sentify** performs **AWS Serverless Sentiment Analysis using API Gateway and Lambda with custom sentiment-analysis logic** to categorize customer feedback into **Positive**, **Negative**, **Neutral**, or **Mixed** with granular confidence percentages and word-level metrics.

---

## 🚀 Live Demo & Screenshots

- **Local Development URL:** `http://localhost:5173/` (or `http://localhost:5174/`)
- **Brand Name:** Sentify
- **Architecture:** React ➔ Amazon API Gateway ➔ AWS Lambda (Custom Sentiment Logic)

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **React 18** | Reusable component-based user interface architecture |
| **Vite 6** | Ultra-fast next-generation frontend build tool |
| **JavaScript (ES6+)** | Frontend logic and state management (No TypeScript) |
| **HTML5 & CSS3** | Clean, responsive custom CSS design system (No Tailwind) |
| **Lucide React** | Sleek, modern SaaS icon set |
| **AWS API Gateway** | Managed REST API endpoint exposing `/analyze` with CORS |
| **AWS Lambda** | Serverless compute executing custom sentiment-analysis logic |

---

## ✨ Features

1. **Modern SaaS Navigation Bar**
   - Brand identity with spark icon (`Sentify.`).
   - Smooth navigation links: *Home*, *Analyze*, *History*, *Insights*, *About*.
   - AWS Cloud badge and an interactive **AWS Pipeline Blueprint** modal.
   - Fully responsive with mobile drawer menu.

2. **Engaging Hero Section**
   - High-impact headline: *"Understand Your Customers with AI"*.
   - Value proposition highlighting Amazon Comprehend's 4 sentiment types.
   - Call-to-action buttons (*Analyze Feedback* and *View Demo*).
   - Custom CSS AI glassmorphism visual showcasing live sentiment scoring with pulsing radar indicators.

3. **Core Statistics**
   - 4 feature highlights: *AWS Serverless*, *4 Sentiment Types*, *Real-Time Analysis*, and *Customer Insights*.

4. **Sentiment Analysis Workspace**
   - Large ergonomic feedback input textarea with 5,000 character counter.
   - Real-time input validation preventing empty submissions with friendly alerts.
   - Interactive loading state simulating AWS NLP processing (~750ms).
   - One-click **Clear** and **Analyze Sentiment** buttons.

5. **Sample Feedback Presets**
   - Quick one-click testing shortcuts:
     - *"Excellent Product"* (Positive)
     - *"The delivery was terrible"* (Negative)
     - *"The product is okay"* (Neutral)
     - *"Good but late delivery"* (Mixed)

6. **Interactive Sentiment Results Dashboard**
   - Dominant sentiment classification with visual emoji indicators:
     - **POSITIVE** 😊
     - **NEGATIVE** 😡
     - **NEUTRAL** 😐
     - **MIXED** 🤔
   - Statistical confidence score percentage (e.g. `98.5%`).
   - Four granular score bars with matching theme colors.
   - Collapsible **Raw Amazon Comprehend JSON Schema** viewer with one-click copy button.

7. **Visual Sentiment Breakdown Chart**
   - Pure custom animated SVG Donut Chart calculating proportional sentiment distribution arcs.
   - Center status badge with dominant sentiment and highest percentage certainty.
   - Interactive color-coded legend.

8. **Recent Analysis History**
   - Pre-loaded with required test records:
     - *"I love this product. Amazing quality!"* (POSITIVE 95.8%)
     - *"The delivery was very late."* (NEGATIVE 92.4%)
     - *"The product is okay."* (NEUTRAL 88.1%)
     - *"The product is good but delivery needs improvement."* (MIXED 84.6%)
   - Real-time session persistence using browser `localStorage`.
   - Filter records by sentiment (*All*, *Positive*, *Negative*, *Neutral*, *Mixed*).
   - "Load" action to re-populate any past feedback into the analyzer.
   - "Reset Samples" and "Clear All" options.

9. **Customer Insights & Analytics**
   - High-level metric cards: *Total Feedback*, *Positive Feedback*, *Negative Feedback*, and *Neutral Feedback*.
   - Dynamic real-time calculation based on session submissions.
   - Overall Customer Sentiment Index (CSI / CSAT score).

10. **How It Works & About Sections**
    - 3-step breakdown: `01 Enter Feedback` ➔ `02 AI Analysis` ➔ `03 View Sentiment`.
    - Visual data flow diagram: `Customer Feedback` ➔ `Amazon Comprehend` ➔ `Sentiment Result`.
    - In-depth academic explanation of Amazon Comprehend and natural language processing.

11. **Professional Footer**
    - Project branding, AWS technology attribution, navigation links, and academic disclaimer.

---

## 📁 Project Structure

```
Amazon-Comprehend-Sentiment-Analysis/
├── index.html                   # HTML template with Plus Jakarta Sans & JetBrains Mono
├── package.json                 # Project dependencies and npm scripts
├── vite.config.js               # Vite configuration
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # Application entry point
    ├── App.jsx                  # Main application state orchestration
    ├── components/
    │   ├── Navbar.jsx           # Top navigation and mobile menu
    │   ├── Hero.jsx             # Hero section with AI visual
    │   ├── Statistics.jsx       # 4 statistics metric cards
    │   ├── AnalyzeSection.jsx   # Main analysis workspace & input
    │   ├── SampleFeedback.jsx   # One-click sample test buttons
    │   ├── SentimentResult.jsx  # Overall sentiment & score dashboard
    │   ├── SentimentChart.jsx   # Animated SVG donut breakdown chart
    │   ├── InsightsSection.jsx  # Customer satisfaction & metric cards
    │   ├── HistorySection.jsx   # LocalStorage recent analysis log
    │   ├── HowItWorks.jsx       # 3-step architecture & flow diagram
    │   ├── AboutSection.jsx     # Amazon Comprehend explanation
    │   ├── AwsArchitectureModal.jsx # Future AWS integration blueprint modal
    │   └── Footer.jsx           # Clean application footer
    ├── services/
    │   └── sentimentService.js  # Modular mock inference engine + AWS gateway adapter
    ├── styles/
    │   ├── index.css            # Global CSS variables, reset & utilities
    │   ├── Navbar.css           # Navigation styling
    │   ├── Hero.css             # Hero layout and AI visual art
    │   ├── Statistics.css       # Statistics grid styling
    │   ├── Analyze.css          # Textarea workspace styling
    │   ├── Results.css          # Sentiment results and charts
    │   ├── Insights.css         # Metrics and CSAT styling
    │   ├── History.css          # Audit log cards styling
    │   ├── AboutHowItWorks.css  # Process flow and about cards
    │   └── Footer.css           # Footer styling
    └── utils/
        └── mockData.js          # Initial sample records, colors & themes
```

---

## 💻 How to Install and Run

### Prerequisites
- Node.js (version 18 or higher installed)
- npm or yarn

### Installation Steps

1. **Open your terminal or command prompt** in the project directory:
   ```bash
   cd Amazon-Comprehend-Sentiment-Analysis
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(On Windows PowerShell if scripts are restricted, run: `npm.cmd install`)*

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   *(Or on Windows PowerShell: `npm.cmd run dev`)*

4. **Open your browser:**
   Navigate to the URL displayed in the terminal:
   ```
   http://localhost:5173
   ```

5. **Build for Production (Optional):**
   ```bash
   npm run build
   ```

---

## ☁️ Live AWS Cloud Integration

The application is connected to the live **Amazon API Gateway** sentiment analysis endpoint:
`https://t01kz93tzg.execute-api.us-east-1.amazonaws.com/analyze`

### Architecture Pipeline:
```
React Frontend (Sentify)
      │
      ▼ POST JSON { "text": "..." }
Amazon API Gateway (/analyze REST Endpoint)
      │
      ▼ Trigger
AWS Lambda (Custom Sentiment Analysis Logic)
      │
      ▼ Response
Sentiment Result (Scores & Word Analytics)
```

> **Note for Academic Evaluation:** In this AWS Academy environment, sentiment analysis logic runs directly within AWS Lambda to parse feedback and compute category confidence scores, accommodating student lab permission boundaries.

### Request Payload:
```json
{
  "text": "I am very happy with the product. The quality is excellent and delivery was fast."
}
```

### Response Schema:
```json
{
  "sentiment": "POSITIVE",
  "confidence": 0.92,
  "positive": 0.92,
  "negative": 0.01,
  "neutral": 0.07,
  "mixed": 0,
  "positiveWords": 4,
  "negativeWords": 0,
  "analyzedWords": 15,
  "totalSentimentWords": 4
}
```

The frontend dynamically converts all decimal scores to percentages (e.g. `0.92` ➔ `92%`), plots them into the animated SVG Donut Chart, highlights dominant sentiments with emojis, and updates both session metrics and persistent `localStorage` audit history.

---

## 🎓 Academic Presentation Notes

- **Problem Statement:** Unstructured customer reviews are difficult and time-consuming to manually classify.
- **Solution:** Automated Natural Language Processing leveraging pre-trained Amazon Comprehend models.
- **Key Concepts Highlighted:**
  - Sentiment Polarity (Positive, Negative, Neutral, Mixed)
  - Confidence Scoring & Probability Distribution
  - Decoupled Serverless Cloud Architecture (Microservices)
  - Responsive Web Design and Client-side Persistence (`localStorage`)
