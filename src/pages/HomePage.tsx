// src/pages/HomePage.tsx (updated)
import { useNavigate } from 'react-router-dom';

export default function HomePage() {  // No more props!
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center">
      <h1 className="text-4xl font-bold text-primary">Bullshit Detector</h1>
      <p className="text-lg text-muted-foreground max-w-md">
        Detect spin, jargon, and nonsense in real time.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/analyzer')}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
        >
          Start Analyzing
        </button>
        <button
          onClick={() => navigate('/sentiment')}
          className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition"
        >
          View Sentiment
        </button>
      </div>
    </div>
  );
}