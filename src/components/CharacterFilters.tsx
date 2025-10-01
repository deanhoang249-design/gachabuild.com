'use client';

import { roles, weapons } from '@/data/characters';

interface CharacterFiltersProps {
  selectedRole: string;
  selectedWeapon: string;
  onRoleChange: (role: string) => void;
  onWeaponChange: (weapon: string) => void;
}

export default function CharacterFilters({
  selectedRole,
  selectedWeapon,
  onRoleChange,
  onWeaponChange,
}: CharacterFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Role Filter */}
      <div className="flex-1">
        <label htmlFor="role-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Role
        </label>
        <select
          id="role-filter"
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="form-select"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>
      
      {/* Weapon Filter */}
      <div className="flex-1">
        <label htmlFor="weapon-filter" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Weapon
        </label>
        <select
          id="weapon-filter"
          value={selectedWeapon}
          onChange={(e) => onWeaponChange(e.target.value)}
          className="form-select"
        >
          {weapons.map((weapon) => (
            <option key={weapon} value={weapon}>
              {weapon}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
