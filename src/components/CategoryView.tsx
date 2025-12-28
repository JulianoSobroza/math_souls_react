import { ArrowLeft, BookOpen } from 'lucide-react';
import { categories, questions } from '../data/categories';
import { Question } from '../App';

type CategoryViewProps = {
  categoryId: string;
  onBack: () => void;
  onSelectQuestion: (question: Question) => void;
};

export function CategoryView({ categoryId, onBack, onSelectQuestion }: CategoryViewProps) {
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-orange-400';
      case 'expert': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      case 'expert': return 'Expert';
      default: return difficulty;
    }
  };

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
        <div>
          <div className="text-4xl mb-2">{category.icon}</div>
          <h1 className="text-slate-300">{category.name}</h1>
        </div>
      </div>

      {/* Subcategorias */}
      <div className="space-y-6">
        {category.subcategories.map((subcategory) => {
          const subcategoryQuestions = questions.filter(
            q => q.categoryId === categoryId && q.subcategoryId === subcategory.id
          );

          return (
            <div key={subcategory.id} className="bg-slate-800 rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-slate-200 mb-1">{subcategory.name}</h3>
                  <p className="text-slate-500">{subcategory.description}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <BookOpen className="w-4 h-4" />
                  <span>{subcategoryQuestions.length}</span>
                </div>
              </div>

              {/* Questões */}
              {subcategoryQuestions.length > 0 ? (
                <div className="space-y-2 mt-4">
                  {subcategoryQuestions.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => onSelectQuestion(question)}
                      className="w-full bg-slate-900 hover:bg-slate-700 p-4 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-slate-200 mb-1">{question.name}</div>
                          <div className="text-slate-500">{question.description}</div>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <div className={`${getDifficultyColor(question.difficulty)}`}>
                            {getDifficultyLabel(question.difficulty)}
                          </div>
                          <div className="text-blue-400">+{question.xp} XP</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center text-slate-500 py-4">
                  Nenhuma questão disponível ainda
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
