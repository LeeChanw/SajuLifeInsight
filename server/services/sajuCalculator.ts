import { FourPillars, SajuAnalysis, SajuInput } from "@shared/schema";
import { LunarCalendar } from "./lunarCalendar";

export class SajuCalculator {
  private static heavenlyStems = [
    { chinese: '甲', korean: '갑', element: 'wood' },
    { chinese: '乙', korean: '을', element: 'wood' },
    { chinese: '丙', korean: '병', element: 'fire' },
    { chinese: '丁', korean: '정', element: 'fire' },
    { chinese: '戊', korean: '무', element: 'earth' },
    { chinese: '己', korean: '기', element: 'earth' },
    { chinese: '庚', korean: '경', element: 'metal' },
    { chinese: '辛', korean: '신', element: 'metal' },
    { chinese: '壬', korean: '임', element: 'water' },
    { chinese: '癸', korean: '계', element: 'water' }
  ];

  private static earthlyBranches = [
    { chinese: '子', korean: '자', animal: '쥐' },
    { chinese: '丑', korean: '축', animal: '소' },
    { chinese: '寅', korean: '인', animal: '호랑이' },
    { chinese: '卯', korean: '묘', animal: '토끼' },
    { chinese: '辰', korean: '진', animal: '용' },
    { chinese: '巳', korean: '사', animal: '뱀' },
    { chinese: '午', korean: '오', animal: '말' },
    { chinese: '未', korean: '미', animal: '양' },
    { chinese: '申', korean: '신', animal: '원숭이' },
    { chinese: '酉', korean: '유', animal: '닭' },
    { chinese: '戌', korean: '술', animal: '개' },
    { chinese: '亥', korean: '해', animal: '돼지' }
  ];

  static calculateFourPillars(input: SajuInput): FourPillars {
    let { birthYear, birthMonth, birthDay, birthHour } = input;

    // Convert lunar to solar if needed
    if (input.calendarType === 'lunar') {
      const converted = LunarCalendar.lunarToSolar(birthYear, birthMonth, birthDay);
      birthYear = converted.year;
      birthMonth = converted.month;
      birthDay = converted.day;
    }

    // Calculate year pillar
    const yearStemIndex = (birthYear - 4) % 10;
    const yearBranchIndex = (birthYear - 4) % 12;
    
    // Calculate month pillar (based on year stem and month)
    const monthStemIndex = ((yearStemIndex * 2) + birthMonth) % 10;
    const monthBranchIndex = (birthMonth + 1) % 12;

    // Calculate day pillar (complex calculation based on date)
    const baseDate = new Date(1900, 0, 1);
    const currentDate = new Date(birthYear, birthMonth - 1, birthDay);
    const daysDiff = Math.floor((currentDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
    const dayStemIndex = (daysDiff + 4) % 10;
    const dayBranchIndex = (daysDiff + 4) % 12;

    // Calculate time pillar (based on day stem and hour)
    const timeStemIndex = (dayStemIndex * 2 + Math.floor(birthHour / 2)) % 10;
    const timeBranchIndex = Math.floor(birthHour / 2) % 12;

    return {
      year: {
        heavenly: this.heavenlyStems[yearStemIndex].chinese,
        earthly: this.earthlyBranches[yearBranchIndex].chinese,
        korean: this.heavenlyStems[yearStemIndex].korean + this.earthlyBranches[yearBranchIndex].korean
      },
      month: {
        heavenly: this.heavenlyStems[monthStemIndex].chinese,
        earthly: this.earthlyBranches[monthBranchIndex].chinese,
        korean: this.heavenlyStems[monthStemIndex].korean + this.earthlyBranches[monthBranchIndex].korean
      },
      day: {
        heavenly: this.heavenlyStems[dayStemIndex].chinese,
        earthly: this.earthlyBranches[dayBranchIndex].chinese,
        korean: this.heavenlyStems[dayStemIndex].korean + this.earthlyBranches[dayBranchIndex].korean
      },
      time: {
        heavenly: this.heavenlyStems[timeStemIndex].chinese,
        earthly: this.earthlyBranches[timeBranchIndex].chinese,
        korean: this.heavenlyStems[timeStemIndex].korean + this.earthlyBranches[timeBranchIndex].korean
      }
    };
  }

  static generateAnalysis(fourPillars: FourPillars, input: SajuInput): SajuAnalysis {
    const dayElement = this.getElementFromStem(fourPillars.day.heavenly);
    const timeElement = this.getElementFromStem(fourPillars.time.heavenly);
    const yearBranch = fourPillars.year.earthly;
    
    // Generate personality analysis based on day pillar (main life element)
    const personalityMap = {
      wood: {
        main: "당신은 성장과 발전을 추구하는 진취적인 성격의 소유자입니다. 목(木)의 기운을 가진 당신은 끊임없이 새로운 것을 배우고 발전하려는 의지가 강하며, 주변 사람들에게 희망과 활력을 전달하는 능력이 뛰어납니다.",
        traits: "창의적이고 유연한 사고를 가지고 있으며, 협력을 통해 더 큰 성과를 이루는 능력이 있습니다. 다만 때로는 우유부단하거나 변덕스러운 면이 있어 일관성을 유지하는 것이 중요합니다."
      },
      fire: {
        main: "당신은 타고난 리더십과 강한 의지력을 지닌 분입니다. 화(火)의 기운을 가지고 있어 밝고 활발한 성격을 보이며, 주변 사람들에게 따뜻한 에너지를 전달하는 능력이 뛰어납니다.",
        traits: "다소 급한 성격이 있지만 정의감이 강하고 불의를 보면 참지 못하는 성향이 있습니다. 창의력이 풍부하고 새로운 일에 도전하는 것을 좋아하나, 끝까지 해내는 지구력을 기르는 것이 중요합니다."
      },
      earth: {
        main: "당신은 안정감과 신뢰감을 주는 든든한 성격의 소유자입니다. 토(土)의 기운을 가진 당신은 현실적이고 실용적인 사고를 하며, 주변 사람들의 든든한 버팀목 역할을 합니다.",
        traits: "성실하고 책임감이 강하여 맡은 일은 끝까지 해내는 능력이 있습니다. 다만 때로는 고집이 세거나 변화를 받아들이는 데 시간이 걸릴 수 있어 유연성을 기르는 것이 도움이 됩니다."
      },
      metal: {
        main: "당신은 명확하고 정확한 판단력을 가진 분석적인 성격의 소유자입니다. 금(金)의 기운을 가진 당신은 원칙을 중시하고 체계적으로 일을 처리하는 능력이 뛰어납니다.",
        traits: "집중력이 뛰어나고 전문성을 추구하는 경향이 있어 한 분야에서 깊이 있는 성취를 이룰 수 있습니다. 다만 때로는 완벽주의 성향이 강해 스트레스를 받을 수 있으니 적당한 타협도 필요합니다."
      },
      water: {
        main: "당신은 지혜롭고 적응력이 뛰어난 유연한 성격의 소유자입니다. 수(水)의 기운을 가진 당신은 상황에 따라 자연스럽게 변화하며, 깊이 있는 사고력으로 문제를 해결하는 능력이 있습니다.",
        traits: "직관력이 뛰어나고 타인의 마음을 잘 이해하는 공감 능력이 있습니다. 다만 때로는 우울하거나 소극적인 면이 있을 수 있어 자신감을 기르고 적극적으로 행동하는 것이 중요합니다."
      }
    };

    const personality = personalityMap[dayElement] || personalityMap.fire;

    return {
      personality,
      career: {
        suitableFields: this.getCareerFields(dayElement),
        prospects: "30대 중반부터 본격적인 성공 운이 시작됩니다. 특히 사람들과 소통하고 영향력을 발휘할 수 있는 분야에서 큰 성취를 이룰 수 있습니다. 창업보다는 조직 내에서의 성공 가능성이 높습니다."
      },
      wealth: {
        characteristics: "꾸준한 노력을 통해 안정적인 재물을 축적하는 타입입니다. 갑작스런 대박보다는 성실한 근로 소득과 현명한 투자를 통해 부를 쌓아가게 됩니다.",
        cautions: "충동적인 투자나 무리한 사업 확장은 금물입니다. 안전한 투자처를 선택하고 전문가의 조언을 구하는 것이 좋습니다.",
        favorablePeriod: "40대부터 재물운이 본격적으로 상승하며, 특히 50대에 가장 안정적인 재정 상태를 유지할 수 있습니다."
      },
      health: {
        careAreas: this.getHealthCareAreas(dayElement),
        management: this.getHealthManagement(dayElement)
      },
      love: {
        characteristics: "진실하고 깊이 있는 사랑을 추구하는 타입입니다. 겉모습보다는 내면의 아름다움을 중시하며, 한 번 사랑하면 오래도록 변치 않는 마음을 가집니다.",
        idealPartner: "지적이고 안정적인 성격의 상대와 잘 맞습니다. 서로의 꿈을 응원해주고 함께 성장할 수 있는 파트너가 이상적입니다.",
        marriageAge: "28-32세 사이에 좋은 인연을 만날 가능성이 높으며, 늦어도 35세 이전에 결혼하는 것이 운세상 유리합니다."
      },
      lifeFlow: {
        twenties: "기반 구축 시기\n학습과 경험 축적의 시간",
        forties: "전성기\n사회적 성공과 안정",
        sixties: "성숙과 지혜\n여유로운 노후 생활",
        summary: "전반적으로 안정적이고 상승하는 운세를 가지고 계십니다. 젊은 시절의 노력이 중년 이후 큰 결실을 맺게 되며, 특히 인간관계에서 많은 도움을 받게 됩니다. 성실함과 꾸준함을 바탕으로 점진적으로 발전하는 인생 패턴을 보입니다."
      },
      recommendations: {
        directions: this.getLuckyDirections(dayElement),
        colors: this.getLuckyColors(dayElement),
        careers: this.getRecommendedCareers(dayElement),
        cautions: "성급한 결정보다는 신중한 판단을 하시기 바랍니다. 특히 중요한 결정은 충분히 상의하고 계획을 세운 후 진행하는 것이 좋습니다."
      }
    };
  }

  private static getElementFromStem(stem: string): 'wood' | 'fire' | 'earth' | 'metal' | 'water' {
    const elementMap: Record<string, 'wood' | 'fire' | 'earth' | 'metal' | 'water'> = {
      '甲': 'wood', '乙': 'wood',
      '丙': 'fire', '丁': 'fire',
      '戊': 'earth', '己': 'earth',
      '庚': 'metal', '辛': 'metal',
      '壬': 'water', '癸': 'water'
    };
    return elementMap[stem] || 'fire';
  }

  private static getCareerFields(element: string): string[] {
    const fieldMap: Record<string, string[]> = {
      wood: ['교육, 강의 분야', '창작, 예술 분야', '환경, 농업 분야', '상담, 치료 분야'],
      fire: ['교육, 강의 분야', '창작, 예술 분야', '미디어, 방송 분야', '서비스업, 상담 분야'],
      earth: ['부동산, 건설 분야', '금융, 보험 분야', '농업, 유통 분야', '의료, 보건 분야'],
      metal: ['기술, 엔지니어링 분야', '금융, 회계 분야', '법률, 행정 분야', '의료, 정밀 분야'],
      water: ['학술, 연구 분야', '여행, 운송 분야', '통신, IT 분야', '문화, 예술 분야']
    };
    return fieldMap[element] || fieldMap.fire;
  }

  private static getHealthCareAreas(element: string): string[] {
    const healthMap: Record<string, string[]> = {
      wood: ['간, 담낭 관리 필요', '눈, 시력 관리 주의'],
      fire: ['심장, 순환기계 관리 필요', '스트레스성 소화기 장애 주의'],
      earth: ['위장, 소화기계 관리 필요', '비장, 췌장 건강 주의'],
      metal: ['폐, 호흡기계 관리 필요', '피부, 코 건강 주의'],
      water: ['신장, 방광 관리 필요', '생식기, 골반 건강 주의']
    };
    return healthMap[element] || healthMap.fire;
  }

  private static getHealthManagement(element: string): string {
    const managementMap: Record<string, string> = {
      wood: '규칙적인 운동과 충분한 수면이 중요합니다. 스트레스 관리를 위해 자연과 가까운 환경에서 시간을 보내는 것이 도움이 됩니다.',
      fire: '규칙적인 운동과 충분한 수면이 특히 중요합니다. 화가 많은 체질이므로 마음의 평정을 유지하고 스트레스 관리에 신경 써야 합니다. 40대 이후 정기 건강검진을 받는 것이 좋습니다.',
      earth: '규칙적인 식사와 균형 잡힌 영양섭취가 중요합니다. 소화에 좋은 음식을 선택하고 과식은 피하는 것이 좋습니다.',
      metal: '깨끗한 공기와 충분한 수분 섭취가 중요합니다. 건조한 환경을 피하고 호흡기 건강에 특별히 신경 써야 합니다.',
      water: '충분한 수분 섭취와 따뜻하게 몸을 보온하는 것이 중요합니다. 차가운 음식은 피하고 적당한 운동으로 기운을 북돋우는 것이 좋습니다.'
    };
    return managementMap[element] || managementMap.fire;
  }

  private static getLuckyDirections(element: string): string {
    const directionMap: Record<string, string> = {
      wood: '동쪽, 남동쪽 방향이 길합니다. 이사나 사업장 선택 시 참고하세요.',
      fire: '남쪽, 동쪽 방향이 길합니다. 이사나 사업장 선택 시 참고하세요.',
      earth: '남서쪽, 중앙 방향이 길합니다. 이사나 사업장 선택 시 참고하세요.',
      metal: '서쪽, 북서쪽 방향이 길합니다. 이사나 사업장 선택 시 참고하세요.',
      water: '북쪽, 북동쪽 방향이 길합니다. 이사나 사업장 선택 시 참고하세요.'
    };
    return directionMap[element] || directionMap.fire;
  }

  private static getLuckyColors(element: string): string {
    const colorMap: Record<string, string> = {
      wood: '초록색, 청색 계열이 운세에 도움이 됩니다.',
      fire: '빨간색, 주황색 계열이 운세에 도움이 됩니다.',
      earth: '노란색, 갈색 계열이 운세에 도움이 됩니다.',
      metal: '흰색, 은색 계열이 운세에 도움이 됩니다.',
      water: '검은색, 남색 계열이 운세에 도움이 됩니다.'
    };
    return colorMap[element] || colorMap.fire;
  }

  private static getRecommendedCareers(element: string): string {
    const careerMap: Record<string, string> = {
      wood: '교육, 상담, 환경 분야에서 두각을 나타낼 수 있습니다.',
      fire: '교육, 상담, 창작 분야에서 두각을 나타낼 수 있습니다.',
      earth: '부동산, 금융, 유통 분야에서 두각을 나타낼 수 있습니다.',
      metal: '기술, 금융, 법률 분야에서 두각을 나타낼 수 있습니다.',
      water: '학술, 연구, IT 분야에서 두각을 나타낼 수 있습니다.'
    };
    return careerMap[element] || careerMap.fire;
  }
}
