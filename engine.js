// lib/engine.js
// Simple rule engine to chain interpretations between oddu toyale and oddu de ire/osogbo
function normKey(s='') {
  return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}
export function buildInterpretation({ odduToyale, odduOutcome, outcomeKind, outcomeType, orisha }) {
  // inputs:
  // odduToyale: string (e.g., "Okana Tonti Ogunda")
  // odduOutcome: string (e.g., "Okana Tonti Iroso")
  // outcomeKind: "ire" | "osogbo"
  // outcomeType: string (e.g., "ire ariku", "osogbo ofo", etc.)
  // orisha: string (e.g., "Obatalá")
  //
  // Data sources are stored in /data/oddus.js
  const { ODDUS, ORISHA_ROLES, SOLUTION_TEMPLATES } = require('../data/oddus');
const { EXTRA_TEMPLATES } = require('../data/solution_templates_extra');

  const base = ODDUS[odduToyale] || {};
  const out = ODDUS[odduOutcome] || {};

  const refranesToyale = (base.refranes || []).slice(0, 3); // pick top-3 for brevity
  const refranesOutcome = (out.refranes || []).slice(0, 3);

  // Orisha role within odduToyale
  const orishaRole = ((ORISHA_ROLES[odduToyale] || {})[orisha]) || "defensor y modulador del destino";

  // Fallback when orisha has no explicit role in Toyale's patakíes:
  let usedOrishaRole = orishaRole;
  if (!ORISHA_ROLES[odduToyale] || !ORISHA_ROLES[odduToyale][orisha]) {
    const fallRefran = (refranesToyale[0] || 'La cabeza lleva al cuerpo');
    usedOrishaRole = `agente práctico: aplica “${fallRefran}” junto a ${orisha} (ofrenda/acción simbólica y disciplina cotidiana).`;
  }


  // Choose a solution template based on kind+type
  const mergedTemplates = { ...SOLUTION_TEMPLATES, ...EXTRA_TEMPLATES };
  const solKey = `${normKey(outcomeKind)}:${normKey(outcomeType)}`;
  const solutionTemplate = mergedTemplates[solKey] || mergedTemplates[normKey(outcomeKind)] || "Actuar con prudencia, reparar daños y fortalecer la cabeza (ori).";

  // Compose
  const interpretation = [
    `En ${odduToyale}, ${orisha} actúa como ${usedOrishaRole}.`,
    refranesToyale.length ? `Claves del oddu Toyale: ${refranesToyale.join(' · ')}.` : null,
    `El resultado es ${outcomeKind.toUpperCase()} (${outcomeType}).`,
    refranesOutcome.length ? `Indicios del oddu de ${outcomeKind}: ${refranesOutcome.join(' · ')}.` : null,
    `En respuesta, se sugiere: ${solutionTemplate}`
  ].filter(Boolean).join(' ');

  return {
    interpretation,
    refs: {
      odduToyale,
      odduOutcome,
      outcomeKind,
      outcomeType,
      orisha
    }
  };
}