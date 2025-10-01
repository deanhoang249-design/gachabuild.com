'use client';

import { Character } from '@/data/characters';
import { tierlist, getCharactersByTier, getAllTiers } from '@/data/tierlist';
import { useLanguage } from '@/contexts/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

interface TierCardProps {
  character: Character;
}

function TierCard({ character }: TierCardProps) {
  const { t } = useLanguage();

  const getRoleTagClass = (role: string) => {
    switch (role.toLowerCase()) {
      case 'vanguard':
        return 'role-tag-vanguard';
      case 'support':
        return 'role-tag-support';
      case 'annihilator':
        return 'role-tag-annihilator';
      default:
        return 'role-tag-vanguard';
    }
  };

  const getStarRating = (rarity: string) => {
    const stars = parseInt(rarity.replace('★', ''));
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${i < stars ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <article className="character-card group" role="listitem">
      <Link href={`/characters/${character.id}`} className="block w-full h-full">
        {/* Character Image */}
        <div className="relative h-48 bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
          <Image
            src={character.image}
            alt={`${t(character.name)} character portrait`}
            width={200}
            height={200}
            className="object-contain transition-transform duration-300 group-hover:scale-105 max-w-full max-h-full"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 220px, 240px"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/characters/placeholder.svg';
            }}
          />
          
          {/* Rarity Badge */}
          {character.rarity && (
            <div className="absolute top-3 right-3 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold border border-yellow-200" aria-label={`${character.rarity} rarity`}>
              {character.rarity}
            </div>
          )}
          
          {/* Element Badge */}
          {character.element && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-full text-xs font-medium border border-gray-200" aria-label={`${character.element} element`}>
              {character.element}
            </div>
          )}
        </div>
        
        {/* Character Info */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-heading-3 text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-1">
            {t(character.name)}
          </h3>
          
          <dl className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <dt className="text-caption text-gray-500">Role:</dt>
              <dd className={`role-tag ${getRoleTagClass(character.role)}`}>
                {character.role}
              </dd>
            </div>
            
            <div className="flex items-center justify-between">
              <dt className="text-caption text-gray-500">Weapon:</dt>
              <dd className="text-caption font-medium text-gray-700">
                {character.weapon}
              </dd>
            </div>
          </dl>

          {/* Star Rating */}
          {character.rarity && (
            <div className="flex items-center justify-center mb-4" aria-label={`${character.rarity} star rating`}>
              {getStarRating(character.rarity)}
            </div>
          )}
          
          {/* View Details Button */}
          <div className="btn-primary w-full text-center" role="button" aria-label={`View details for ${t(character.name)}`}>
            View Details
          </div>
        </div>
      </Link>
    </article>
  );
}

interface TierRowProps {
  tier: keyof typeof tierlist;
  characters: Character[];
}

function TierRow({ tier, characters }: TierRowProps) {
  const getTierTagClass = (tier: string) => {
    switch (tier) {
      case 'EX':
        return 'tier-tag-ex';
      case 'S':
        return 'tier-tag-s';
      case 'A':
        return 'tier-tag-a';
      case 'B':
        return 'tier-tag-b';
      case 'C':
        return 'tier-tag-c';
      case 'D':
        return 'tier-tag-d';
      case 'E':
        return 'tier-tag-e';
      default:
        return 'tier-tag-d';
    }
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case 'EX':
        return 'Exceptional';
      case 'S':
        return 'Superior';
      case 'A':
        return 'Advanced';
      case 'B':
        return 'Balanced';
      case 'C':
        return 'Competent';
      case 'D':
        return 'Decent';
      case 'E':
        return 'Entry Level';
      default:
        return 'Unknown';
    }
  };

  return (
    <article className="section-spacing" aria-labelledby={`tier-${tier}-heading`}>
      {/* Tier Header */}
      <header className="professional-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`tier-tag ${getTierTagClass(tier)}`} aria-label={`${tier} tier`}>
              {tier}
            </div>
            <div className="text-body text-gray-600">
              {characters.length} character{characters.length !== 1 ? 's' : ''}
            </div>
          </div>
          <div className="text-caption text-gray-500">
            {getTierDescription(tier)} Tier
          </div>
        </div>
        <h3 id={`tier-${tier}-heading`} className="sr-only">
          {tier} Tier Characters - {getTierDescription(tier)}
        </h3>
      </header>

      {/* Character Cards */}
      <div className="character-grid" role="list" aria-label={`${tier} tier characters`}>
        {characters.map((character) => (
          <TierCard key={character.id} character={character} />
        ))}
      </div>
    </article>
  );
}

export default function TierList() {
  const tiers = getAllTiers();

  return (
    <main id="tierlist" className="py-8">
      {/* Header */}
      <header className="section-spacing">
        <h1 className="text-heading-1">Duet Night Abyss Character Tier List</h1>
        <p className="text-body text-gray-600 max-w-3xl">
          Discover the most powerful characters in Duet Night Abyss, ranked by their effectiveness in combat. 
          Find the best DNA characters for your team with our comprehensive tier list guide.
        </p>
      </header>

      {/* Assumptions Section */}
      <section className="section-spacing" aria-labelledby="assumptions-heading">
        <article className="professional-card p-8">
          <h2 id="assumptions-heading" className="text-heading-2 mb-6">Tier List Assumptions</h2>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-heading-3 text-blue-600 mb-3">5★ Assumptions</h3>
              <p className="text-body text-gray-700">
                All 5-star characters are evaluated at their base rarity with level 1 constellation, 
                level 10/10/10 skills, and standard equipment. Team composition considers optimal 
                synergy and role effectiveness in various combat scenarios.
              </p>
            </section>
            
            <section>
              <h3 className="text-heading-3 text-purple-600 mb-3">4★ Assumptions</h3>
              <p className="text-body text-gray-700">
                All 4-star characters are evaluated at constellation 1, level 10/10/10 skills, 
                and standard equipment. Performance is assessed based on their utility and 
                effectiveness in their respective roles.
              </p>
            </section>
            
            <section>
              <h3 className="text-heading-3 text-green-600 mb-3">3★ and Below Assumptions</h3>
              <p className="text-body text-gray-700">
                Lower rarity characters are evaluated at maximum constellation, level 10/10/10 skills, 
                and standard equipment. Their value is assessed based on accessibility and 
                effectiveness relative to higher rarity alternatives.
              </p>
            </section>
          </div>
          
          <footer className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-caption text-gray-500">
              *Characters in the same tier are listed in descending rarity, and aside from this are in no particular order.
            </p>
          </footer>
        </article>
      </section>

      {/* Search and Filter Bar */}
      <section className="section-spacing-sm" aria-labelledby="filters-heading">
        <div className="professional-card p-6">
          <h2 id="filters-heading" className="sr-only">Search and Filter Options</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <label htmlFor="character-search" className="sr-only">Search characters</label>
              <input
                id="character-search"
                type="text"
                placeholder="Search by name, role, rarity..."
                className="form-input pl-12"
                aria-describedby="search-help"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div id="search-help" className="sr-only">Search for characters by name, role, or rarity</div>
            </div>
            
            {/* Role Filter Dropdown */}
            <div className="relative min-w-[140px]">
              <label htmlFor="role-filter" className="sr-only">Filter by role</label>
              <select id="role-filter" className="form-select" aria-label="Filter by character role">
                <option value="">All Roles</option>
                <option value="vanguard">Vanguard</option>
                <option value="support">Support</option>
                <option value="annihilator">Annihilator</option>
              </select>
            </div>
            
            {/* Tier Filter Dropdown */}
            <div className="relative min-w-[120px]">
              <label htmlFor="tier-filter" className="sr-only">Filter by tier</label>
              <select id="tier-filter" className="form-select" aria-label="Filter by character tier">
                <option value="">All Tiers</option>
                <option value="EX">EX Tier</option>
                <option value="S">S Tier</option>
                <option value="A">A Tier</option>
                <option value="B">B Tier</option>
                <option value="C">C Tier</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Rows */}
      <section className="space-y-8" aria-labelledby="tier-list-heading">
        <h2 id="tier-list-heading" className="sr-only">Character Tier Rankings</h2>
        {tiers.map((tier) => {
          const characters = getCharactersByTier(tier);
          return (
            <TierRow key={tier} tier={tier} characters={characters} />
          );
        })}
      </section>
    </main>
  );
}
