const fs = require('fs');
const path = require('path');

// Read the gamma_secretase.json data
const gammaData = JSON.parse(fs.readFileSync('public/data/gamma_secretase.json', 'utf8'));

// Helper functions
function getCommonName(speciesName) {
  const nameMap = {
    'Dictyostelium': 'Slime Mold',
    'Hibiscus': 'Hibiscus',
    'Pocillopora': 'Coral',
    'Mus': 'Mouse',
    'Danio': 'Zebrafish',
    'Branchiostoma': 'Amphioxus'
  };
  return nameMap[speciesName] || speciesName;
}

function getScientificName(speciesName) {
  const nameMap = {
    'Dictyostelium': 'Dictyostelium discoideum',
    'Hibiscus': 'Hibiscus syriacus',
    'Pocillopora': 'Pocillopora damicornis',
    'Mus': 'Mus musculus',
    'Danio': 'Danio rerio',
    'Branchiostoma': 'Branchiostoma floridae'
  };
  return nameMap[speciesName] || speciesName;
}

function getSpeciesCategory(speciesName) {
  const categoryMap = {
    'Dictyostelium': 'Other',
    'Hibiscus': 'Plants',
    'Pocillopora': 'Other',
    'Mus': 'Mammals',
    'Danio': 'Fish',
    'Branchiostoma': 'Other'
  };
  return categoryMap[speciesName] || 'Other';
}

// Generate species.json
const speciesMap = new Map();
gammaData.forEach(entry => {
  const speciesName = entry.species_name;
  if (!speciesMap.has(speciesName)) {
    speciesMap.set(speciesName, {
      id: speciesName.toLowerCase(),
      common_name: getCommonName(speciesName),
      scientific_name: getScientificName(speciesName),
      category: getSpeciesCategory(speciesName),
      description: `γ-secretase complex data for ${getCommonName(speciesName)}`,
      created_at: new Date().toISOString()
    });
  }
});

const species = Array.from(speciesMap.values());
fs.writeFileSync('public/data/species.json', JSON.stringify(species, null, 2));

// Generate proteins.json
const proteins = gammaData.map(entry => ({
  id: entry.id,
  species_id: entry.species_name.toLowerCase(),
  subunit: entry.subunits === 'PEN2' ? 'PEN-2' : entry.subunits === 'APH1' ? 'APH-1' : entry.subunits,
  sequence: entry.sequence,
  description: `${entry.subunits} subunit from ${getCommonName(entry.species_name)}`,
  structure_file: entry.structure_files,
  created_at: new Date().toISOString()
}));

fs.writeFileSync('public/data/proteins.json', JSON.stringify(proteins, null, 2));

// Generate interactions.json (basic protein-protein interactions)
const interactions = [
  {
    subunit1: "PSEN1",
    subunit2: "NCT",
    interaction_type: "Direct binding",
    binding_sites: ["N-terminal domain", "Transmembrane region"],
    evolutionary_conservation: "Highly conserved",
    description: "PSEN1 forms the catalytic core and interacts with NCT for substrate recognition"
  },
  {
    subunit1: "PSEN1",
    subunit2: "APH-1",
    interaction_type: "Stabilizing interaction",
    binding_sites: ["Transmembrane helices"],
    evolutionary_conservation: "Conserved",
    description: "APH-1 stabilizes PSEN1 and is required for complex assembly"
  },
  {
    subunit1: "PSEN1",
    subunit2: "PEN-2",
    interaction_type: "Regulatory interaction",
    binding_sites: ["C-terminal region"],
    evolutionary_conservation: "Moderately conserved",
    description: "PEN-2 regulates PSEN1 activity and complex stability"
  },
  {
    subunit1: "NCT",
    subunit2: "APH-1",
    interaction_type: "Indirect interaction",
    binding_sites: ["Extracellular domain"],
    evolutionary_conservation: "Variable",
    description: "NCT and APH-1 interact indirectly through PSEN1"
  }
];

fs.writeFileSync('public/data/interactions.json', JSON.stringify(interactions, null, 2));

// Generate complex_assembly.json
const complexAssembly = [
  {
    step: 1,
    description: "PSEN1 and APH-1 form initial complex",
    subunits_involved: ["PSEN1", "APH-1"],
    intermediate_complex: "PSEN1-APH1"
  },
  {
    step: 2,
    description: "NCT associates with PSEN1-APH1 complex",
    subunits_involved: ["PSEN1", "APH-1", "NCT"],
    intermediate_complex: "PSEN1-APH1-NCT"
  },
  {
    step: 3,
    description: "PEN-2 joins to form mature γ-secretase complex",
    subunits_involved: ["PSEN1", "APH-1", "NCT", "PEN-2"],
    intermediate_complex: "γ-secretase complex"
  }
];

fs.writeFileSync('public/data/complex_assembly.json', JSON.stringify(complexAssembly, null, 2));

console.log('Generated data files:');
console.log('- species.json:', species.length, 'species');
console.log('- proteins.json:', proteins.length, 'proteins');
console.log('- interactions.json:', interactions.length, 'interactions');
console.log('- complex_assembly.json:', complexAssembly.length, 'steps');
