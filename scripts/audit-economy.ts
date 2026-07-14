import { PACK_TIERS, QUICKSELL_VALUES, type PackRarity } from '../src/data/gameEconomy';

// Exact expected liquidation value of the best rarity in a pick-one-of-three
// pack. Keeping the check deterministic makes future balance changes reviewable.
const rarities: PackRarity[] = ['bronze', 'silver', 'gold', 'legendary', 'holo'];

let failed = false;

for (const tier of PACK_TIERS) {
  const totalWeight = rarities.reduce((sum, rarity) => sum + tier.weights[rarity], 0);
  let cumulative = 0;
  let priorBestCdf = 0;
  let expectedRecovery = 0;

  for (const rarity of rarities) {
    cumulative += tier.weights[rarity] / totalWeight;
    const bestCdf = cumulative ** 3;
    expectedRecovery += (bestCdf - priorBestCdf) * QUICKSELL_VALUES[rarity];
    priorBestCdf = bestCdf;
  }

  const recoveryRate = expectedRecovery / tier.cost;
  console.log(`${tier.name}: ${expectedRecovery.toFixed(0)} expected coins back (${(recoveryRate * 100).toFixed(0)}%)`);
  if (recoveryRate < 0.35) {
    console.error(`${tier.name} falls below the 35% recovery floor.`);
    failed = true;
  }
}

if (failed) process.exit(1);
