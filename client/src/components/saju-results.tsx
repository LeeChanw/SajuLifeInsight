import { Card, CardContent } from "@/components/ui/card";
import { FourPillars, SajuAnalysis } from "@shared/schema";
import { User, Briefcase, Coins, Heart, HeartHandshake, TrendingUp, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";

interface SajuResultsProps {
  fourPillars: FourPillars;
  analysis: SajuAnalysis;
}

export default function SajuResults({ fourPillars, analysis }: SajuResultsProps) {
  return (
    <section className="space-y-8">
      {/* Four Pillars Display */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 text-center flex items-center justify-center">
            <svg className="text-gold-500 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            사주 명식 (四柱命式)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center bg-gradient-to-b from-gold-400/10 to-gold-500/20 rounded-lg p-4 border border-gold-400/30">
              <p className="text-xs text-gray-500 mb-1">년주</p>
              <div className="font-bold text-primary text-2xl">{fourPillars.year.heavenly}</div>
              <div className="font-bold text-primary text-2xl">{fourPillars.year.earthly}</div>
              <p className="text-xs text-gray-500 mt-1">{fourPillars.year.korean}</p>
            </div>
            <div className="text-center bg-gradient-to-b from-gold-400/10 to-gold-500/20 rounded-lg p-4 border border-gold-400/30">
              <p className="text-xs text-gray-500 mb-1">월주</p>
              <div className="font-bold text-primary text-2xl">{fourPillars.month.heavenly}</div>
              <div className="font-bold text-primary text-2xl">{fourPillars.month.earthly}</div>
              <p className="text-xs text-gray-500 mt-1">{fourPillars.month.korean}</p>
            </div>
            <div className="text-center bg-gradient-to-b from-gold-400/10 to-gold-500/20 rounded-lg p-4 border border-gold-400/30">
              <p className="text-xs text-gray-500 mb-1">일주</p>
              <div className="font-bold text-primary text-2xl">{fourPillars.day.heavenly}</div>
              <div className="font-bold text-primary text-2xl">{fourPillars.day.earthly}</div>
              <p className="text-xs text-gray-500 mt-1">{fourPillars.day.korean}</p>
            </div>
            <div className="text-center bg-gradient-to-b from-gold-400/10 to-gold-500/20 rounded-lg p-4 border border-gold-400/30">
              <p className="text-xs text-gray-500 mb-1">시주</p>
              <div className="font-bold text-primary text-2xl">{fourPillars.time.heavenly}</div>
              <div className="font-bold text-primary text-2xl">{fourPillars.time.earthly}</div>
              <p className="text-xs text-gray-500 mt-1">{fourPillars.time.korean}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personality Analysis */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <User className="text-gold-500 mr-2" />
            성격 분석
          </h3>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              {analysis.personality.main}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {analysis.personality.traits}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Career Fortune */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <Briefcase className="text-gold-500 mr-2" />
            직업운
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">적합한 직업 분야</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {analysis.career.suitableFields.map((field, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    {field}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">직업운 전망</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {analysis.career.prospects}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wealth Fortune */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <Coins className="text-gold-500 mr-2" />
            재물운
          </h3>
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">재물운 특징</h4>
              <p className="text-sm text-green-700">
                {analysis.wealth.characteristics}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">주의사항</h4>
                <p className="text-sm text-gray-700">
                  {analysis.wealth.cautions}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">유리한 시기</h4>
                <p className="text-sm text-gray-700">
                  {analysis.wealth.favorablePeriod}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Fortune */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <HeartHandshake className="text-gold-500 mr-2" />
            건강운
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">주의할 부위</h4>
              <div className="space-y-2 text-sm text-gray-700">
                {analysis.health.careAreas.map((area, index) => (
                  <div key={index} className="flex items-center p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
                    {area}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">건강 관리법</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {analysis.health.management}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Love Fortune */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <Heart className="text-gold-500 mr-2" />
            애정운
          </h3>
          <div className="space-y-4">
            <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 mb-2">애정운 특징</h4>
              <p className="text-sm text-pink-700">
                {analysis.love.characteristics}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">이상적인 상대</h4>
                <p className="text-sm text-gray-700">
                  {analysis.love.idealPartner}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">결혼 적령기</h4>
                <p className="text-sm text-gray-700">
                  {analysis.love.marriageAge}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Life Flow */}
      <Card className="rounded-2xl shadow-lg border border-gold-400/30">
        <CardContent className="p-6 md:p-8">
          <h3 className="text-xl font-semibold text-primary mb-6 flex items-center">
            <TrendingUp className="text-gold-500 mr-2" />
            인생 전반의 운세 흐름
          </h3>
          <div className="space-y-6">
            {/* Age Periods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">20-30대</h4>
                <p className="text-xs text-blue-700 whitespace-pre-line">
                  {analysis.lifeFlow.twenties}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">40-50대</h4>
                <p className="text-xs text-green-700 whitespace-pre-line">
                  {analysis.lifeFlow.forties}
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-purple-800 mb-2">60대 이후</h4>
                <p className="text-xs text-purple-700 whitespace-pre-line">
                  {analysis.lifeFlow.sixties}
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">전체적인 운세 요약</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {analysis.lifeFlow.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-primary to-primary/90 rounded-2xl shadow-lg p-6 md:p-8 text-white">
        <h3 className="text-xl font-semibold mb-6 text-center flex items-center justify-center">
          <Lightbulb className="text-gold-400 mr-2" />
          운세 개선을 위한 조언
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3 text-gold-400">길한 방향</h4>
            <p className="text-sm opacity-90">
              {analysis.recommendations.directions}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold-400">길한 색상</h4>
            <p className="text-sm opacity-90">
              {analysis.recommendations.colors}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold-400">추천 직업</h4>
            <p className="text-sm opacity-90">
              {analysis.recommendations.careers}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-gold-400">주의사항</h4>
            <p className="text-sm opacity-90">
              {analysis.recommendations.cautions}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
