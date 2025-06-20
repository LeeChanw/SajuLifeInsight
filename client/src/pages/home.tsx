import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { SajuInput, FourPillars, SajuAnalysis } from "@shared/schema";
import SajuForm from "@/components/saju-form";
import SajuResults from "@/components/saju-results";
import { Loader2 } from "lucide-react";

interface AnalysisResponse {
  id: number;
  fourPillars: FourPillars;
  analysis: SajuAnalysis;
}

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (data: SajuInput) => {
      const response = await apiRequest("POST", "/api/saju/analyze", data);
      return response.json() as Promise<AnalysisResponse>;
    },
    onSuccess: (result) => {
      setAnalysisResult(result);
      // Smooth scroll to results
      setTimeout(() => {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
          resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 100);
      toast({
        title: "분석 완료",
        description: "사주 분석이 성공적으로 완료되었습니다.",
      });
    },
    onError: (error) => {
      console.error("Analysis error:", error);
      toast({
        title: "분석 오류",
        description: "사주 분석 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmit = (data: SajuInput) => {
    analyzeMutation.mutate(data);
  };

  return (
    <div className="bg-traditional-cream min-h-screen">
      {/* Header */}
      <header className="bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center">
              <svg className="text-gold-500 mr-3 h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              운명의 네 기둥
            </h1>
            <p className="text-primary-50 text-sm md:text-base opacity-90">20년 경력 명리학 전문가의 정통 사주 분석</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Intro Section */}
        <section className="text-center mb-12">
          <Card className="rounded-2xl shadow-md border border-gold-400/20">
            <CardContent className="p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-primary mb-4">전통 명리학으로 읽는 당신의 운명</h2>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                정확한 생년월일시와 성별을 입력하시면, 전통 명리학 이론에 따라<br />
                성격, 직업운, 재물운, 건강운, 애정운, 인생 전반의 흐름을 상세히 분석해드립니다.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Input Form */}
        <SajuForm onSubmit={handleFormSubmit} isLoading={analyzeMutation.isPending} />

        {/* Loading State */}
        {analyzeMutation.isPending && (
          <section className="mb-12">
            <Card className="rounded-2xl shadow-lg border border-gold-400/30">
              <CardContent className="p-8 text-center">
                <Loader2 className="animate-spin inline-block w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-primary mb-2">사주를 분석하고 있습니다</h3>
                <p className="text-gray-600 text-sm">전통 명리학 이론에 따라 정밀하게 분석 중입니다...</p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Results Section */}
        {analysisResult && (
          <div id="results-section">
            <SajuResults 
              fourPillars={analysisResult.fourPillars} 
              analysis={analysisResult.analysis} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80 mb-2">© 2024 운명의 네 기둥 - 전통 명리학 전문 상담</p>
          <p className="text-xs opacity-60">
            * 이 결과는 전통 명리학 이론에 기반한 참고 자료입니다. 개인의 노력과 선택이 운명을 만들어갑니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
