'use client';

import { useEffect } from 'react';
import { Character } from '@/data/characters';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface CharacterDetailClientProps {
  character: Character;
}

export default function CharacterDetailClient({ character }: CharacterDetailClientProps) {
  const { language, t } = useLanguage();
  // const [activeSection, setActiveSection] = useState('information');

  // Update document title and meta description when language changes
  useEffect(() => {
    const characterName = t(character.name);
    const title = language === 'vi' 
      ? `Hướng dẫn build ${characterName} trong Duet Night Abyss`
      : `How to build ${characterName} in Duet Night Abyss`;
    
    const description = language === 'vi'
      ? `Cách build, kỹ năng và đội hình mạnh nhất cho ${characterName} trong DNA.`
      : `Best build, skills, and team guide for ${characterName} in DNA.`;

    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update language attribute
    document.documentElement.lang = language;
  }, [language, character, t]);

  const sections = [
    { 
      id: 'information', 
      label: { en: 'Information', vi: 'Thông tin' }
    },
    { 
      id: 'description', 
      label: { en: 'Description', vi: 'Mô tả' }
    },
    { 
      id: 'abilities', 
      label: { en: 'Abilities', vi: 'Khả năng' }
    },
    { 
      id: 'build', 
      label: { en: 'Build Guide', vi: 'Hướng dẫn Build' }
    },
    { 
      id: 'synergy', 
      label: { en: 'Team Synergy', vi: 'Hiệu Ứng Đội' }
    },
    { 
      id: 'pros-cons', 
      label: { en: 'Pros & Cons', vi: 'Ưu & Nhược Điểm' }
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link href="/characters" className="text-gray-600 hover:text-gray-900 transition-colors">
                Characters
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">{t(character.name)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
          </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <article className="space-y-8">

              {/* Character Introduction */}
              <div className="professional-card p-6">
                <p className="text-gray-700 text-lg">
                  <strong className="text-gray-900">{t(character.name)}</strong> is a character in <em>Duet Night Abyss</em>.
                </p>
              </div>

              {/* Contents Navigation */}
              <div className="professional-card">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {language === 'vi' ? 'Nội dung' : 'Contents'}
                    <button className="ml-2 text-sm text-blue-600 hover:text-blue-500">
                      [{language === 'vi' ? 'ẩn' : 'hide'}]
                    </button>
                  </h2>
                </div>
                <div className="p-4">
                  <ol className="space-y-1 text-gray-600">
                    {sections.map((section, index) => (
                      <li key={section.id} className="flex items-center">
                        <span className="text-gray-400 mr-2">{index + 1}.</span>
                    <button
                      onClick={() => scrollToSection(section.id)}
                          className="text-blue-600 hover:text-blue-500 hover:underline"
                    >
                      {t(section.label)}
                    </button>
                      </li>
                    ))}
                  </ol>
            </div>
          </div>

              {/* Information Section */}
              <section id="information" className="scroll-mt-8">
                <div className="professional-card">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      {language === 'vi' ? 'Thông tin' : 'Information'}
                      <button className="ml-2 p-1 text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                  </h2>
                      </div>
                  <div className="p-4">
                    <p className="text-gray-600">
                      {language === 'vi' ? 'Thông tin chi tiết sẽ có sớm.' : 'Detailed information will be available soon.'}
                    </p>
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section id="description" className="scroll-mt-8">
                <div className="professional-card">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      {language === 'vi' ? 'Mô tả' : 'Description'}
                      <button className="ml-2 p-1 text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                  </h2>
                  </div>
                  <div className="p-4">
                  {character.overview ? (
                      <p className="text-gray-700 leading-relaxed">
                        {t(character.overview)}
                      </p>
                  ) : (
                      <p className="text-gray-500">
                        {language === 'vi' ? 'Mô tả nhân vật sẽ có sớm.' : 'Character description will be available soon.'}
                      </p>
                    )}
                    </div>
                </div>
              </section>

              {/* Abilities Section */}
              <section id="abilities" className="scroll-mt-8">
                <div className="professional-card">
                  <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      {language === 'vi' ? 'Khả năng' : 'Abilities'}
                      <button className="ml-2 p-1 text-gray-500 hover:text-gray-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                  </h2>
                  </div>
                  
                  {character.skills && character.skills.length > 0 ? (
                    <div className="p-4 space-y-6">
                      {/* Active Abilities */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {language === 'vi' ? 'Khả năng chủ động' : 'Active Abilities'}
                            </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Kỹ năng' : 'Skill'}
                                </th>
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Chi phí' : 'Cost'}
                                </th>
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Hồi chiêu' : 'Cooldown'}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {character.skills.filter(skill => skill.type === 'active').map((skill, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-3 text-gray-700">
                                    <div className="flex items-center">
                                      <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">IMG</span>
                                      </div>
                                      <span className="font-medium">{t(skill.name)}</span>
                          </div>
                                    <div className="mt-2 text-sm text-gray-600">
                            {t(skill.description)}
                          </div>
                                  </td>
                                  <td className="border border-gray-300 p-3 text-gray-700">{skill.cost || 'N/A'}</td>
                                  <td className="border border-gray-300 p-3 text-gray-700">{skill.cooldown || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Passive Abilities */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {language === 'vi' ? 'Khả năng thụ động' : 'Passive Abilities'}
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse border border-gray-300">
                            <thead>
                              <tr className="bg-gray-50">
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Kỹ năng' : 'Skill'}
                                </th>
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Chi phí' : 'Cost'}
                                </th>
                                <th className="border border-gray-300 p-3 text-left text-gray-900 font-medium">
                                  {language === 'vi' ? 'Hồi chiêu' : 'Cooldown'}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {character.skills.filter(skill => skill.type === 'passive').map((skill, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="border border-gray-300 p-3 text-gray-700">
                                    <div className="flex items-center">
                                      <div className="w-12 h-12 bg-gray-200 rounded mr-3 flex items-center justify-center">
                                        <span className="text-xs text-gray-500">IMG</span>
                                      </div>
                                      <span className="font-medium">{t(skill.name)}</span>
                                    </div>
                                    <div className="mt-2 text-sm text-gray-600">
                                      {t(skill.description)}
                                    </div>
                                  </td>
                                  <td className="border border-gray-300 p-3 text-gray-700">{skill.cost || 'N/A'}</td>
                                  <td className="border border-gray-300 p-3 text-gray-700">{skill.cooldown || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 text-center py-12">
                      <p className="text-gray-500">
                        {language === 'vi' ? 'Thông tin kỹ năng sẽ có sớm.' : 'Skills information will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Build Recommendations Section */}
              <section id="build" className="scroll-mt-8">
                <div className="professional-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'vi' ? 'Gợi Ý Build' : 'Build Recommendations'}
                  </h2>
                  
                  {character.build ? (
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {language === 'vi' ? 'Vũ Khí Đề Xuất' : 'Recommended Weapons'}
                        </h3>
                        <ul className="space-y-2">
                          {character.build.weapons.map((weapon, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                              {weapon}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {language === 'vi' ? 'Hiện Vật Đề Xuất' : 'Recommended Artifacts'}
                        </h3>
                        <ul className="space-y-2">
                          {character.build.artifacts.map((artifact, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                              {artifact}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {language === 'vi' ? 'Ưu Tiên Chỉ Số' : 'Stat Priority'}
                        </h3>
                        <ul className="space-y-2">
                          {character.build.statPriority.map((stat, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <span className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                                {index + 1}
                              </span>
                              {stat}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {language === 'vi' ? 'Gợi ý build sẽ có sớm.' : 'Build recommendations will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Team Synergy Section */}
              <section id="synergy" className="scroll-mt-8">
                <div className="professional-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'vi' ? 'Hiệu Ứng Đội & Combo' : 'Team Synergy & Combos'}
                  </h2>
                  
                  {character.synergy && character.synergy.length > 0 ? (
                    <div className="grid gap-4">
                      {character.synergy.map((synergy, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {synergy.partner}
                            </h3>
                            <Link
                              href={`/characters/${synergy.partner.toLowerCase()}`}
                              className="text-blue-600 hover:text-blue-500 text-sm transition-colors"
                            >
                              {language === 'vi' ? 'Xem Nhân Vật →' : 'View Character →'}
                            </Link>
                          </div>
                          <p className="text-gray-700 mt-2">
                            {t(synergy.reason)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        {language === 'vi' ? 'Thông tin hiệu ứng đội sẽ có sớm.' : 'Team synergy information will be available soon.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Pros & Cons Section */}
              <section id="pros-cons" className="scroll-mt-8">
                <div className="professional-card p-6 md:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {language === 'vi' ? 'Ưu & Nhược Điểm' : 'Pros & Cons'}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {language === 'vi' ? 'Điểm Mạnh' : 'Strengths'}
                      </h3>
                      {character.pros && character.pros.length > 0 ? (
                        <ul className="space-y-2">
                          {character.pros.map((pro, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {t(pro)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">
                          {language === 'vi' ? 'Chưa có điểm mạnh nào được liệt kê.' : 'No strengths listed yet.'}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {language === 'vi' ? 'Điểm Yếu' : 'Weaknesses'}
                      </h3>
                      {character.cons && character.cons.length > 0 ? (
                        <ul className="space-y-2">
                          {character.cons.map((con, index) => (
                            <li key={index} className="flex items-start text-gray-700">
                              <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                              {t(con)}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500">
                          {language === 'vi' ? 'Chưa có điểm yếu nào được liệt kê.' : 'No weaknesses listed yet.'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </article>
          </div>

          {/* Sidebar Infobox */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <aside className="professional-card overflow-hidden">
                {/* Character Name Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 text-center">
                    {t(character.name)}
                  </h2>
                </div>

                {/* Image Tabs */}
                <div className="border-b border-gray-200">
                  <div className="flex">
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border-b-2 border-blue-500">
                      {t(character.name)}
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                      {language === 'vi' ? 'Trong Game' : 'In-Game'}
                    </button>
                  </div>
                </div>

                {/* Character Image */}
                <div className="p-4">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src={character.image}
                      alt={t(character.name)}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                    <div className="absolute bottom-2 right-2">
                      <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>


                {/* Character Information */}
                <div className="border-t border-gray-200">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {language === 'vi' ? 'Thông tin' : 'Informations'}
                    </h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {character.element && (
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                          {language === 'vi' ? 'Nguyên tố' : 'Element'}
                        </h4>
                        <p className="text-sm text-gray-900">{character.element}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {language === 'vi' ? 'Vũ khí' : 'Weapons'}
                      </h4>
                      <p className="text-sm text-gray-900">{character.weapon}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {language === 'vi' ? 'Đường đua' : 'Track'}
                      </h4>
                      <div className="w-8 h-6 bg-gray-800 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">R</span>
                      </div>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
