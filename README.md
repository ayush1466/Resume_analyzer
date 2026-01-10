# AI Resume Analyzer

A modern, AI-powered resume analyzer built with React, Vite, and Tailwind CSS. Get instant feedback on your resume, improve your ATS score, and stand out from the competition.

## 🚀 Features

- **AI-Powered Analysis** - Intelligent feedback using advanced AI models
- **ATS Optimization** - Ensure your resume passes Applicant Tracking Systems
- **Instant Results** - Get actionable improvements in seconds
- **Dark Theme** - Modern, eye-friendly dark mode interface
- **Keyword Matching** - Compare your resume against job descriptions
- **Detailed Feedback** - Comprehensive analysis with strengths, weaknesses, and suggestions

## 📁 Project Structure

```
resume_analyzer/
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnalysisResult.jsx
│   │   ├── AnalyzeButton.jsx
│   │   ├── ATSScore.jsx
│   │   ├── JobDescription.jsx
│   │   └── UploadResume.jsx
│   ├── mock/
│   │   └── analysisData.js
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd resume_analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Dependencies

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library

## 🔧 Configuration

### Backend Integration

To connect to your backend API, update the `analyzeResume` function in `src/mock/analysisData.js`:

```javascript
export const analyzeResume = async (file, jobDescription) => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('jobDescription', jobDescription);
  
  const response = await fetch('http://localhost:5000/api/analyze', {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Analysis failed');
  }
  
  return await response.json();
};
```

### Proxy Configuration

The Vite config includes a proxy for API calls. Update `vite.config.js` if needed:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

## 🎨 Customization

### Colors

Update Tailwind colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    }
  }
}
```

### Components

All components are located in `src/components/` and can be customized independently.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist/` folder contains the production-ready files.

3. Deploy to your favorite hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Backend Integration

This frontend is designed to work with a backend API. Recommended backend options:

- **Node.js + Express** with OpenAI API
- **Python + FastAPI** with OpenAI API (Recommended)

Expected API endpoint structure:
```
POST /api/analyze
Content-Type: multipart/form-data

{
  resume: File (PDF),
  jobDescription: String (optional)
}

Response:
{
  atsScore: Number,
  strengths: Array<String>,
  improvements: Array<String>,
  missingKeywords: Array<String>,
  suggestions: Array<String>
}
```

## 💡 Tips

- Ensure your backend API is running before testing the analysis feature
- The mock data in `src/mock/analysisData.js` can be used for testing
- Check the browser console for any errors during development

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using React, Vite, and Tailwind CSS