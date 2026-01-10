// Mock data for testing - Replace with actual API calls

export const mockAnalysisData = {
  atsScore: 75,
  strengths: [
    'Clear and concise professional summary with measurable achievements',
    'Well-structured work experience section with bullet points',
    'Quantified achievements with specific metrics and percentages',
    'Strong use of action verbs and industry-specific terminology'
  ],
  improvements: [
    'Add more relevant technical skills specific to the target role',
    'Include industry certifications and professional training courses',
    'Optimize section headers for better ATS parsing compatibility',
    'Expand on leadership roles and team collaboration experiences'
  ],
  missingKeywords: [
    'Project Management',
    'Agile Methodology',
    'Stakeholder Communication',
    'Data Analysis',
    'Cross-functional Teams'
  ],
  suggestions: [
    'Use consistent action verbs at the beginning of each bullet point',
    'Add a dedicated technical skills section with relevant technologies',
    'Include links to your professional portfolio, GitHub, or LinkedIn',
    'Ensure contact information is complete and up-to-date',
    'Consider adding a brief section on certifications or awards'
  ]
};

// Function to simulate API call
export const analyzeResume = async (file, jobDescription) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // TODO: Replace with actual API call
  // const formData = new FormData();
  // formData.append('resume', file);
  // formData.append('jobDescription', jobDescription);
  // 
  // const response = await fetch('http://localhost:5000/api/analyze', {
  //   method: 'POST',
  //   body: formData
  // });
  // 
  // if (!response.ok) {
  //   throw new Error('Analysis failed');
  // }
  // 
  // return await response.json();
  
  return mockAnalysisData;
};