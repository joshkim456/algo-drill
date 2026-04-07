/**
 * Format the "Copy for Claude" prompt per spec Section 5.4.
 */
export function formatCopyForClaude(
  questionPrompt: string,
  userCode: string,
  modelAnswer: string,
): string {
  return `I'm revising for COMP0005 Algorithms at UCL. Analyse my answer vs the model answer.

Question: ${questionPrompt}

My answer:
${userCode}

Model answer:
${modelAnswer}

Tell me: (1) Is my answer correct? (2) What's wrong/missing?
(3) Would this get full marks in the exam? (4) Key differences.
Keep it concise.`
}
