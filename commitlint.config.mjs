export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Enforces allowed commit types (e.g., feat, fix, docs, etc.)
    'type-enum': [
      2, // Error level: 2 = error, 1 = warning, 0 = off
      'always',
      // Always apply this rule
      [
        'feat', // New feature (major or minor changes, e.g., adding a new component)
        'fix', // Bug fix (patch changes, e.g., fixing a bug in an existing component)
        'docs', // Documentation changes (readme, comments, etc.)
        'style', // Code style changes (formatting, missing semi colons, etc.)
        'refactor', // Code refactoring (no feature or bug changes)
        'perf', // Performance improvements
        'test', // Adding or updating tests
        'chore', // Maintenance tasks (build, tooling, etc.)
        'revert', // Reverting previous commits
        'breaking', // BREAKING CHANGE (major changes that break backward compatibility)
      ],
    ],
    // Enforces that the commit subject uses sentence case
    // e.g: "fix: Correct typo"
    // NOTE: This rule is working with github actions amannn/action-semantic-pull-request plugin
    'subject-case': [2, 'always'],
    // Disables max line length for the commit body
    'body-max-line-length': [0],
    // Disables max line length for the commit footer
    'footer-max-line-length': [0],
    // Enforces a maximum header length of 100 characters
    'header-max-length': [2, 'always', 100],
  },
};
