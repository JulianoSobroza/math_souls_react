import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Eraser, Send, Camera, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../App';

type QuestionViewProps = {
  question: Question;
  onBack: () => void;
  onComplete: (xpGained: number, timeSpent: number) => void;
};

type SubmissionResult = {
  correct: boolean;
  hasManuscript: boolean;
  manuscriptValid: boolean;
  xpGained: number;
  feedback?: string;
};

export function QuestionView({ question, onBack, onComplete }: QuestionViewProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [startTime] = useState(Date.now());
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (showCanvas && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = '#ffffff';
        context.lineWidth = 2;
        contextRef.current = context;
      }
    }
  }, [showCanvas]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let x, y;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHasDrawn(false);
  };

  const captureCanvas = async (): Promise<string> => {
    if (!canvasRef.current) return '';
    return canvasRef.current.toDataURL('image/png');
  };

  // Simula análise da IA (Google Vision API)
  const analyzeManuscript = async (imageData: string): Promise<{ valid: boolean; feedback: string }> => {
    // Em produção, isso faria uma chamada para a API do Google Vision
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock: 70% de chance de ser considerado válido se tiver desenho
    const valid = Math.random() > 0.3;
    
    if (valid) {
      return {
        valid: true,
        feedback: 'Resolução manuscrita validada! Os passos estão claros e organizados.'
      };
    } else {
      return {
        valid: false,
        feedback: 'Cálculo ilegível ou incompleto. Bônus de manuscrito anulado, mas você ganhou os 30% base.'
      };
    }
  };

  const handleSubmit = async () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === question.correctAnswer;
    let xpGained = 0;
    let manuscriptValid = false;
    let feedback = '';

    if (hasDrawn) {
      // Com manuscrito
      const imageData = await captureCanvas();
      const analysis = await analyzeManuscript(imageData);
      manuscriptValid = analysis.valid;
      feedback = analysis.feedback;

      if (correct) {
        xpGained = manuscriptValid ? question.xp : Math.floor(question.xp * 0.3);
      } else {
        xpGained = 0;
      }
    } else {
      // Sem manuscrito
      if (correct) {
        xpGained = Math.floor(question.xp * 0.3);
        feedback = 'Resposta correta! Envie sua resolução manuscrita para ganhar 100% do XP.';
      } else {
        xpGained = 0;
        feedback = 'Resposta incorreta. Não há penalidade, tente novamente!';
      }
    }

    setResult({
      correct,
      hasManuscript: hasDrawn,
      manuscriptValid,
      xpGained,
      feedback
    });
  };

  const handleContinue = () => {
    if (!result) return;
    const timeSpent = Math.floor((Date.now() - startTime) / 60000); // em minutos
    onComplete(result.xpGained, Math.max(1, timeSpent));
  };

  if (result) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-slate-800 rounded-xl p-8 text-center">
          {result.correct ? (
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          )}
          
          <h2 className="text-slate-200 mb-2">
            {result.correct ? 'Resposta Correta!' : 'Resposta Incorreta'}
          </h2>
          
          <div className="text-4xl text-blue-400 mb-4">
            +{result.xpGained} XP
          </div>
          
          {result.feedback && (
            <p className="text-slate-400 mb-6">{result.feedback}</p>
          )}
          
          {result.hasManuscript && !result.manuscriptValid && (
            <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-400 p-3 rounded-lg mb-4">
              <AlertCircle className="w-5 h-5 inline mr-2" />
              Manuscrito não validado
            </div>
          )}
          
          <button
            onClick={handleContinue}
            className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-slate-200">{question.name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-blue-400">+{question.xp} XP</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{question.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Questão */}
      <div className="bg-slate-800 rounded-xl p-6 mb-6">
        <p className="text-slate-300 mb-4">{question.description}</p>
        {question.image && (
          <img src={question.image} alt="Questão" className="rounded-lg mb-4" />
        )}
      </div>

      {/* Alternativas */}
      <div className="space-y-3 mb-6">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(index)}
            className={`w-full p-4 rounded-lg text-left transition-all ${
              selectedAnswer === index
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                selectedAnswer === index
                  ? 'border-white bg-white text-blue-600'
                  : 'border-slate-600'
              }`}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Canvas Toggle */}
      <button
        onClick={() => setShowCanvas(!showCanvas)}
        className="w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-lg mb-4 transition-colors flex items-center justify-center gap-2"
      >
        <Camera className="w-5 h-5" />
        {showCanvas ? 'Esconder Lousa' : 'Abrir Lousa (Ganhe 100% do XP)'}
      </button>

      {/* Canvas */}
      {showCanvas && (
        <div className="bg-slate-800 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-slate-400">Resolva aqui</span>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <Eraser className="w-4 h-4" />
              Limpar
            </button>
          </div>
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-96 bg-slate-900 rounded-lg cursor-crosshair touch-none"
          />
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className={`w-full py-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
          selectedAnswer === null
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-500 text-white'
        }`}
      >
        <Send className="w-5 h-5" />
        Enviar Resposta
      </button>

      {!hasDrawn && (
        <div className="text-center text-slate-500 mt-3">
          Sem manuscrito = apenas 30% do XP
        </div>
      )}
    </div>
  );
}
