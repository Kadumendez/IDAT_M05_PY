import { GraduationCap, BookOpen, Award, Building2 } from 'lucide-react';

interface QuickSuggestionsProps {
  onSelect: (suggestion: string) => void;
}

const suggestions = [
  { icon: Award, label: 'Beca 18', query: '¿Cuáles son los requisitos para Beca 18?' },
  { icon: GraduationCap, label: 'PRONABEC', query: '¿Qué becas ofrece PRONABEC?' },
  { icon: Building2, label: 'Examen UNI', query: '¿Cómo me preparo para el examen de la UNI?' },
  { icon: BookOpen, label: 'San Marcos', query: '¿Cuándo es el examen de San Marcos?' },
];

const QuickSuggestions = ({ onSelect }: QuickSuggestionsProps) => {
  return (
    <div className="px-4 pb-4">
      <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
        Sugerencias rápidas
      </p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            onClick={() => onSelect(suggestion.query)}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-amber-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
          >
            <suggestion.icon className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
              {suggestion.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;
