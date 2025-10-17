import { transformNameToInitials } from '../src/utils/utils';

describe('transformNameToInitials', () => {
  it('returns initials for two words (first letter of each)', () => {
    expect(transformNameToInitials('John Doe')).toBe('JD');
    expect(transformNameToInitials('Alice Bob Carol')).toBe('AB');
    expect(transformNameToInitials('Mary-Jane Watson')).toBe('MW');
    expect(transformNameToInitials('Jean-Luc Picard')).toBe('JP');
    expect(transformNameToInitials('John O\'Connor')).toBe('JO');
    expect(transformNameToInitials('Anna-Maria de Souza')).toBe('AD');
    expect(transformNameToInitials('123 John Doe')).toBe('1J');
  });

  it('returns first two letters for single word', () => {
    expect(transformNameToInitials('John')).toBe('JO');
    expect(transformNameToInitials('alice')).toBe('AL');
    expect(transformNameToInitials('Élodie')).toBe('ÉL');
    expect(transformNameToInitials('Élodie-Marie')).toBe('ÉL');
    expect(transformNameToInitials('Łukasz')).toBe('ŁU');
    expect(transformNameToInitials('Søren')).toBe('SØ');
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
