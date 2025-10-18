/* eslint-disable @cspell/spellchecker */
import { transformNameToInitials } from '../src/utils/utils';

describe('transformNameToInitials', () => {
  it('returns initials for two words (first letter of each)', () => {
    expect(transformNameToInitials('Leo Tolstoy')).toBe('LT');
    expect(transformNameToInitials('Howard Phillip Lovecraft')).toBe('HP');
    expect(transformNameToInitials('Soren Kierkegaard')).toBe('SK');
    expect(transformNameToInitials('Marquis de Sade')).toBe('MD');
    expect(transformNameToInitials('123 John Doe')).toBe('1J');
  });

  it('returns first two letters for single word', () => {
    expect(transformNameToInitials('Dostoievsky')).toBe('DO');
    expect(transformNameToInitials('Allan-Poe')).toBe('AL');
    expect(transformNameToInitials('Baudelaire')).toBe('BA');
  });

  it('trims and handles extra spaces', () => {
    expect(transformNameToInitials(' John   Doe ')).toBe('JD');
    expect(transformNameToInitials('   Alice   ')).toBe('AL');
    expect(transformNameToInitials('   ')).toBe('');
    expect(transformNameToInitials('   Jean   Luc   Picard   ')).toBe('JL');
  });

  it('returns empty string for empty input', () => {
    expect(transformNameToInitials('')).toBe('');
    expect(transformNameToInitials('   ')).toBe('');
    expect(transformNameToInitials(null as unknown as string)).toBe('');
    expect(transformNameToInitials(undefined as unknown as string)).toBe('');
  });

  it('handles names with accents and unicode', () => {
    expect(transformNameToInitials('Élodie Dubois')).toBe('ÉD');
    expect(transformNameToInitials('Łukasz Żebrowski')).toBe('ŁŻ');
    expect(transformNameToInitials('Søren Kierkegaard')).toBe('SK');
  });
});
