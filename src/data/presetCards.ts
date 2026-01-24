// Preset card data for pack opening
// Each card has name, nickname, and 3 stats

export interface PresetCard {
  id: string;
  name: string;
  nickname: string;
  stats: { label: string; value: number }[];
  rarity: 'bronze' | 'silver' | 'gold' | 'legendary' | 'holo' | 'glitch';
}

// Helper to assign rarity based on "fame" or humor level
const assignRarity = (index: number): PresetCard['rarity'] => {
  // Distribute rarities: ~40% bronze, ~30% silver, ~20% gold, ~8% legendary, ~2% holo/glitch
  if (index % 50 === 0) return 'glitch';
  if (index % 25 === 0) return 'holo';
  if (index % 5 === 0) return 'legendary';
  if (index % 3 === 0) return 'gold';
  if (index % 2 === 0) return 'silver';
  return 'bronze';
};

export const PRESET_CARDS: PresetCard[] = [
  // Ancient History & Mythology
  { id: 'julius-caesar', name: 'Julius Caesar', nickname: 'The Stabbed', stats: [{ label: 'Backstabbability', value: 99 }, { label: 'Salad Invention', value: 0 }, { label: 'Trust Issues', value: 100 }], rarity: 'legendary' },
  { id: 'cleopatra', name: 'Cleopatra', nickname: 'The Drama Queen', stats: [{ label: 'Rizz', value: 100 }, { label: 'Snake Handling', value: 10 }, { label: 'Carpet Entry', value: 99 }], rarity: 'legendary' },
  { id: 'diogenes', name: 'Diogenes', nickname: 'The Hobo Philosopher', stats: [{ label: 'Hygiene', value: 0 }, { label: 'Sass', value: 99 }, { label: 'Rent Paid', value: 0 }], rarity: 'gold' },
  { id: 'alexander-great', name: 'Alexander the Great', nickname: 'The Conqueror', stats: [{ label: 'Ego', value: 98 }, { label: 'Map Reading', value: 100 }, { label: 'Peak at 20s', value: 99 }], rarity: 'legendary' },
  { id: 'achilles', name: 'Achilles', nickname: 'The Heel Guy', stats: [{ label: 'Invincibility', value: 99 }, { label: 'Ankle Strength', value: 1 }, { label: 'Rage Quit', value: 95 }], rarity: 'gold' },
  { id: 'socrates', name: 'Socrates', nickname: 'The Annoying Questioner', stats: [{ label: '"Why?"', value: 99 }, { label: 'Popularity', value: 20 }, { label: 'Hemlock Tolerance', value: 0 }], rarity: 'gold' },
  { id: 'nero', name: 'Nero', nickname: 'The Fiddler', stats: [{ label: 'Fire Safety', value: 0 }, { label: 'Musical Talent', value: 15 }, { label: 'Mother Issues', value: 99 }], rarity: 'silver' },
  { id: 'ea-nasir', name: 'Ea-Nasir', nickname: 'The Copper Merchant', stats: [{ label: 'Customer Service', value: 0 }, { label: 'Copper Quality', value: 1 }, { label: 'Complaint Letters', value: 100 }], rarity: 'glitch' },
  { id: 'gilgamesh', name: 'Gilgamesh', nickname: 'The Original Chad', stats: [{ label: 'Bromance', value: 100 }, { label: 'Immortality', value: 0 }, { label: 'Flexing', value: 95 }], rarity: 'legendary' },
  { id: 'king-tut', name: 'King Tut', nickname: 'The Boy King', stats: [{ label: 'Cursed', value: 99 }, { label: 'Walking Ability', value: 10 }, { label: 'Bling', value: 98 }], rarity: 'gold' },
  { id: 'leonidas', name: 'Leonidas', nickname: 'The Kicker', stats: [{ label: 'Volume Control', value: 0 }, { label: 'Abs', value: 99 }, { label: 'Diplomatic Skills', value: 5 }], rarity: 'legendary' },
  { id: 'sun-tzu', name: 'Sun Tzu', nickname: 'The Art of War', stats: [{ label: 'Patience', value: 99 }, { label: 'Quoteability', value: 100 }, { label: 'Actual Fighting', value: 50 }], rarity: 'gold' },
  { id: 'hannibal-barca', name: 'Hannibal Barca', nickname: 'Elephant Rider', stats: [{ label: 'Mountain Climbing', value: 99 }, { label: 'Elephant Care', value: 40 }, { label: 'Rome Hating', value: 100 }], rarity: 'gold' },
  { id: 'medusa', name: 'Medusa', nickname: 'Stone Cold', stats: [{ label: 'Hair Care', value: 0 }, { label: 'Eye Contact', value: 100 }, { label: 'Dating Life', value: 5 }], rarity: 'holo' },
  { id: 'confucius', name: 'Confucius', nickname: 'The Wise', stats: [{ label: 'Fortune Cookie Royalties', value: 0 }, { label: 'Wisdom', value: 99 }, { label: 'Beard Length', value: 85 }], rarity: 'gold' },
  { id: 'genghis-khan', name: 'Genghis Khan', nickname: 'The Spreader', stats: [{ label: 'Child Support Owed', value: 99 }, { label: 'Carbon Footprint', value: 5 }, { label: 'Horse Miles', value: 100 }], rarity: 'legendary' },
  
  // Medieval & Renaissance
  { id: 'henry-viii', name: 'Henry VIII', nickname: 'The Wife Guy', stats: [{ label: 'Commitment', value: 10 }, { label: 'Divorce Lawyer Fees', value: 0 }, { label: 'Head Chopping', value: 95 }], rarity: 'gold' },
  { id: 'leonardo-davinci', name: 'Leonardo da Vinci', nickname: 'The Procrastinator', stats: [{ label: 'Projects Finished', value: 3 }, { label: 'Sketchbook Doodles', value: 99 }, { label: 'Mirror Writing', value: 99 }], rarity: 'legendary' },
  { id: 'michelangelo', name: 'Michelangelo', nickname: 'The Ceiling Painter', stats: [{ label: 'Back Pain', value: 99 }, { label: 'Marble Dust In Lungs', value: 80 }, { label: 'Ninja Turtle Fame', value: 100 }], rarity: 'legendary' },
  { id: 'jeanne-darc', name: 'Jeanne d\'Arc', nickname: 'The Visionary', stats: [{ label: 'Fire Resistance', value: 0 }, { label: 'Conviction', value: 100 }, { label: 'Haircut', value: 90 }], rarity: 'legendary' },
  { id: 'vlad-impaler', name: 'Vlad the Impaler', nickname: 'The Stake Holder', stats: [{ label: 'Hospitality', value: 10 }, { label: 'Vampire Rumors', value: 95 }, { label: 'Kebab Skills', value: 99 }], rarity: 'gold' },
  { id: 'shakespeare', name: 'William Shakespeare', nickname: 'The Word Smith', stats: [{ label: 'Vocabulary', value: 99 }, { label: 'Plagiarism', value: 40 }, { label: 'Dramatic Death Scenes', value: 100 }], rarity: 'legendary' },
  { id: 'columbus', name: 'Christopher Columbus', nickname: 'The Lost Tourist', stats: [{ label: 'Navigation', value: 0 }, { label: 'Confidence', value: 100 }, { label: '"India" Finding', value: 0 }], rarity: 'silver' },
  { id: 'dante', name: 'Dante Alighieri', nickname: 'The Inferno Guy', stats: [{ label: 'Simping (for Beatrice)', value: 100 }, { label: 'Heat Tolerance', value: 90 }, { label: 'Self-Insert Fanfic', value: 99 }], rarity: 'gold' },
  { id: 'copernicus', name: 'Copernicus', nickname: 'The Center of Attention', stats: [{ label: 'Solar System Knowledge', value: 95 }, { label: 'Church Approval', value: 5 }, { label: 'Dizziness', value: 50 }], rarity: 'silver' },
  { id: 'machiavelli', name: 'Machiavelli', nickname: 'The Manipulator', stats: [{ label: 'Trustworthiness', value: 0 }, { label: 'Edge Lord', value: 95 }, { label: 'Ends Justify Means', value: 100 }], rarity: 'gold' },
  
  // Legends & Folklore
  { id: 'robin-hood', name: 'Robin Hood', nickname: 'The Communist Archer', stats: [{ label: 'Accuracy', value: 99 }, { label: 'Net Worth', value: 0 }, { label: 'Tights Wearing', value: 90 }], rarity: 'gold' },
  { id: 'king-arthur', name: 'King Arthur', nickname: 'Sword Puller', stats: [{ label: 'Sword Grip', value: 99 }, { label: 'Wife Watch', value: 0 }, { label: 'Round Table Geometry', value: 100 }], rarity: 'legendary' },
  { id: 'merlin', name: 'Merlin', nickname: 'The Old Wizard', stats: [{ label: 'Beard Magic', value: 90 }, { label: 'Coherence', value: 20 }, { label: 'Aging Backwards', value: 99 }], rarity: 'holo' },
  { id: 'nostradamus', name: 'Nostradamus', nickname: 'The Vague Tweeter', stats: [{ label: 'Accuracy', value: 15 }, { label: 'Hindsight', value: 100 }, { label: 'Rhyming', value: 80 }], rarity: 'silver' },
  
  // Revolutionary Era
  { id: 'napoleon', name: 'Napoleon Bonaparte', nickname: 'The Average Height King', stats: [{ label: 'Height Insecurity', value: 99 }, { label: 'Island Vacation', value: 100 }, { label: 'Hand-in-Coat', value: 95 }], rarity: 'legendary' },
  { id: 'blackbeard', name: 'Blackbeard', nickname: 'The Pyromaniac Pirate', stats: [{ label: 'Beard Smoke', value: 99 }, { label: 'Intimidation', value: 95 }, { label: 'Retirement Plan', value: 0 }], rarity: 'gold' },
  { id: 'washington', name: 'George Washington', nickname: 'The Wooden Tooth', stats: [{ label: 'Cherry Tree Chopping', value: 99 }, { label: 'Lies Told', value: 0 }, { label: 'River Crossing', value: 85 }], rarity: 'legendary' },
  { id: 'marie-antoinette', name: 'Marie Antoinette', nickname: 'The Cake Lover', stats: [{ label: 'Budgeting', value: 0 }, { label: 'Cake Appreciation', value: 100 }, { label: 'Neck Strength', value: 10 }], rarity: 'gold' },
  { id: 'ben-franklin', name: 'Benjamin Franklin', nickname: 'The Kite Flyer', stats: [{ label: 'Electricity Bill', value: 0 }, { label: 'French Girlfriends', value: 99 }, { label: 'Bifocals', value: 100 }], rarity: 'legendary' },
  { id: 'paul-revere', name: 'Paul Revere', nickname: 'The Alarm Clock', stats: [{ label: 'Horse Riding', value: 80 }, { label: 'Shouting', value: 99 }, { label: 'British Detection', value: 90 }], rarity: 'silver' },
  { id: 'guy-fawkes', name: 'Guy Fawkes', nickname: 'The Fireworks Guy', stats: [{ label: 'Subtlety', value: 0 }, { label: 'Mask Sales', value: 100 }, { label: 'Barrel Management', value: 95 }], rarity: 'gold' },
  { id: 'simon-bolivar', name: 'Simón Bolívar', nickname: 'The Liberator', stats: [{ label: 'Countries Named After Him', value: 2 }, { label: 'Revolutions Per Minute', value: 99 }, { label: 'Horse Stamina', value: 90 }], rarity: 'gold' },
  { id: 'lewis-clark', name: 'Lewis & Clark', nickname: 'The Lost Duo', stats: [{ label: 'Direction Sense', value: 50 }, { label: 'Reliance on Sacagawea', value: 100 }, { label: 'Canoe Skills', value: 80 }], rarity: 'silver' },
  { id: 'pocahontas', name: 'Pocahontas', nickname: 'The Peacemaker', stats: [{ label: 'Disney Accuracy', value: 5 }, { label: 'Diplomacy', value: 99 }, { label: 'John Smith Tolerance', value: 20 }], rarity: 'gold' },
  { id: 'lincoln', name: 'Abraham Lincoln', nickname: 'The Hat Guy', stats: [{ label: 'Hat Height', value: 99 }, { label: 'Theater Luck', value: 0 }, { label: 'Wrestling Skill', value: 95 }], rarity: 'legendary' },
  
  // Modern Era Innovators
  { id: 'tesla', name: 'Nikola Tesla', nickname: 'The Pigeon Lover', stats: [{ label: 'Pigeon Romance', value: 100 }, { label: 'AC Current', value: 99 }, { label: 'Business Sense', value: 5 }], rarity: 'legendary' },
  { id: 'edison', name: 'Thomas Edison', nickname: 'The Idea "Borrower"', stats: [{ label: 'Patent Trolling', value: 99 }, { label: 'Originality', value: 20 }, { label: 'Lightbulb Moments', value: 80 }], rarity: 'gold' },
  { id: 'freud', name: 'Sigmund Freud', nickname: 'The Mother Lover', stats: [{ label: 'Dream Analysis', value: 90 }, { label: 'Cocaine Use', value: 99 }, { label: 'Awkward Conversations', value: 100 }], rarity: 'gold' },
  { id: 'rasputin', name: 'Rasputin', nickname: 'The Unkillable', stats: [{ label: 'Poison Immunity', value: 99 }, { label: 'Beard Hygiene', value: 10 }, { label: 'Dance Moves', value: 100 }], rarity: 'legendary' },
  { id: 'amelia-earhart', name: 'Amelia Earhart', nickname: 'Hide & Seek Champion', stats: [{ label: 'Plane Handling', value: 90 }, { label: 'Navigation', value: 50 }, { label: 'Mystery Level', value: 100 }], rarity: 'gold' },
  { id: 'einstein', name: 'Albert Einstein', nickname: 'The Tongue Guy', stats: [{ label: 'Hair Comb', value: 0 }, { label: 'Relativity', value: 99 }, { label: 'Quote Misattribution', value: 100 }], rarity: 'legendary' },
  { id: 'titanic-captain', name: 'Titanic Captain', nickname: 'The Iceberg Spotter', stats: [{ label: 'Vision', value: 10 }, { label: 'Confidence', value: 100 }, { label: 'Sinking Feeling', value: 99 }], rarity: 'silver' },
  { id: 'chaplin', name: 'Charlie Chaplin', nickname: 'The Silent Star', stats: [{ label: 'Words Spoken', value: 0 }, { label: 'Cane Twirl', value: 95 }, { label: 'Mustache Regret', value: 90 }], rarity: 'gold' },
  { id: 'houdini', name: 'Harry Houdini', nickname: 'The Escape Artist', stats: [{ label: 'Knot Untying', value: 99 }, { label: 'Punch Resistance', value: 0 }, { label: 'Breath Holding', value: 90 }], rarity: 'gold' },
  { id: 'al-capone', name: 'Al Capone', nickname: 'The Tax Evader', stats: [{ label: 'Street Smarts', value: 90 }, { label: 'Tax Compliance', value: 0 }, { label: 'Milk Expiration Dates', value: 99 }], rarity: 'gold' },
  { id: 'bonnie-clyde', name: 'Bonnie & Clyde', nickname: 'The Toxic Couple', stats: [{ label: 'Driving Speed', value: 90 }, { label: 'Bullet Holes', value: 100 }, { label: 'Conflict Resolution', value: 0 }], rarity: 'gold' },
  { id: 'karl-marx', name: 'Karl Marx', nickname: 'The Sharer', stats: [{ label: 'Beard Volume', value: 95 }, { label: 'Money', value: 0 }, { label: 'Manifesto Writing', value: 99 }], rarity: 'gold' },
  { id: 'queen-victoria', name: 'Queen Victoria', nickname: 'The Mourner', stats: [{ label: 'Wearing Black', value: 100 }, { label: 'Smiling', value: 5 }, { label: 'Descendants', value: 99 }], rarity: 'gold' },
  { id: 'van-gogh', name: 'Vincent Van Gogh', nickname: 'The Earless', stats: [{ label: 'Ear Count', value: 1 }, { label: 'Yellow Paint Usage', value: 99 }, { label: 'Mental Stability', value: 10 }], rarity: 'legendary' },
  
  // Pop Culture Icons
  { id: 'elvis', name: 'Elvis Presley', nickname: 'The King', stats: [{ label: 'Hip Shaking', value: 99 }, { label: 'Sandwich Calories', value: 99 }, { label: 'Alive Theories', value: 80 }], rarity: 'legendary' },
  { id: 'marilyn', name: 'Marilyn Monroe', nickname: 'The Icon', stats: [{ label: 'Vent Standing', value: 99 }, { label: 'Happy Birthday Singing', value: 95 }, { label: 'Photogenicity', value: 100 }], rarity: 'legendary' },
  { id: 'neil-armstrong', name: 'Neil Armstrong', nickname: 'The Moon Walker', stats: [{ label: 'Frequent Flyer Miles', value: 99 }, { label: 'Acting (conspiracies)', value: 0 }, { label: 'Step Size', value: 1 }], rarity: 'legendary' },
  { id: 'pablo-escobar', name: 'Pablo Escobar', nickname: 'The Hippo Keeper', stats: [{ label: 'Cash Rubber Bands', value: 99 }, { label: 'Hippo Management', value: 0 }, { label: 'Mustache', value: 90 }], rarity: 'gold' },
  { id: 'bob-ross', name: 'Bob Ross', nickname: 'The Tree Whisperer', stats: [{ label: 'Mistakes', value: 0 }, { label: 'Happy Accidents', value: 100 }, { label: 'Afro Puff', value: 95 }], rarity: 'legendary' },
  { id: 'steve-jobs', name: 'Steve Jobs', nickname: 'The Turtleneck', stats: [{ label: 'Turtleneck Count', value: 100 }, { label: 'Medical Advice', value: 10 }, { label: 'Font Obsession', value: 99 }], rarity: 'legendary' },
  { id: 'gordon-ramsay', name: 'Gordon Ramsay', nickname: 'The Lamb Sauce Locator', stats: [{ label: 'Rage', value: 99 }, { label: 'Panini Pressing', value: 95 }, { label: 'Finding Lamb Sauce', value: 0 }], rarity: 'gold' },
  { id: 'florida-man', name: 'Florida Man', nickname: 'The Chaotic Neutral', stats: [{ label: 'Gator Wrestling', value: 99 }, { label: 'Headlines Generated', value: 100 }, { label: 'IQ', value: 50 }], rarity: 'glitch' },
  { id: 'banksy', name: 'Banksy', nickname: 'The Anonymous', stats: [{ label: 'Visibility', value: 0 }, { label: 'Shredding Skills', value: 99 }, { label: 'Graffiti', value: 95 }], rarity: 'holo' },
  { id: 'bigfoot', name: 'Bigfoot', nickname: 'The Blurry', stats: [{ label: 'Camera Focus', value: 0 }, { label: 'Hide & Seek', value: 99 }, { label: 'Foot Size', value: 100 }], rarity: 'holo' },
  
  // Fictional & Literary
  { id: 'sherlock', name: 'Sherlock Holmes', nickname: 'The Detective', stats: [{ label: 'Social Skills', value: 10 }, { label: 'Drug Use', value: 80 }, { label: 'Deductions', value: 99 }], rarity: 'gold' },
  { id: 'dracula', name: 'Dracula', nickname: 'The Count', stats: [{ label: 'Sun Tan', value: 0 }, { label: 'Dental Plan', value: 99 }, { label: 'Bat Form', value: 90 }], rarity: 'legendary' },
  { id: 'frankenstein', name: "Frankenstein's Monster", nickname: 'The Assemblage', stats: [{ label: 'Daddy Issues', value: 100 }, { label: 'Fire Fear', value: 99 }, { label: 'Stitch Count', value: 99 }], rarity: 'gold' },
  { id: 'zorro', name: 'Zorro', nickname: 'The Fox', stats: [{ label: '"Z" Handwriting', value: 99 }, { label: 'Cape Swish', value: 90 }, { label: 'Subtlety', value: 10 }], rarity: 'silver' },
  
  // Mythical & Symbolic
  { id: 'santa', name: 'Santa Claus', nickname: 'The Breaker & Enterer', stats: [{ label: 'Speed', value: 99 }, { label: 'Cookie Consumption', value: 100 }, { label: 'Labor Laws', value: 0 }], rarity: 'legendary' },
  { id: 'tooth-fairy', name: 'The Tooth Fairy', nickname: 'The Bone Collector', stats: [{ label: 'Creepiness', value: 90 }, { label: 'Cash Dispensing', value: 20 }, { label: 'Silence', value: 99 }], rarity: 'silver' },
  { id: 'rosie-riveter', name: 'Rosie the Riveter', nickname: 'The Flexer', stats: [{ label: 'Bicep Curl', value: 99 }, { label: 'Bandana Style', value: 100 }, { label: 'Motivation', value: 95 }], rarity: 'gold' },
  { id: 'uncle-sam', name: 'Uncle Sam', nickname: 'The Recruiter', stats: [{ label: 'Finger Pointing', value: 99 }, { label: 'Hat Height', value: 95 }, { label: 'Wants You', value: 100 }], rarity: 'gold' },
  { id: 'paul-bunyan', name: 'Paul Bunyan', nickname: 'The Lumberjack', stats: [{ label: 'Ox Size', value: 100 }, { label: 'Flannel Quality', value: 99 }, { label: 'Tree Hugging', value: 0 }], rarity: 'silver' },
  { id: 'grim-reaper', name: 'The Grim Reaper', nickname: 'The Collector', stats: [{ label: 'Scythe Sharpness', value: 99 }, { label: 'Punctuality', value: 100 }, { label: 'Talkativeness', value: 5 }], rarity: 'legendary' },
  
  // Science Memes
  { id: 'schrodinger-cat', name: "Schrödinger's Cat", nickname: 'The Maybe Dead', stats: [{ label: 'Alive', value: 50 }, { label: 'Dead', value: 50 }, { label: 'Box Comfort', value: 10 }], rarity: 'glitch' },
  { id: 'pavlov-dog', name: "Pavlov's Dog", nickname: 'The Drooler', stats: [{ label: 'Bell Hearing', value: 99 }, { label: 'Saliva Production', value: 100 }, { label: 'Free Will', value: 5 }], rarity: 'silver' },
  { id: 'dolly-sheep', name: 'Dolly the Sheep', nickname: 'The Clone', stats: [{ label: 'Uniqueness', value: 0 }, { label: 'Wool Quality', value: 90 }, { label: 'Scientific Ethics', value: 20 }], rarity: 'silver' },
  { id: 'laika', name: 'Laika', nickname: 'Space Dog', stats: [{ label: 'Good Girl', value: 100 }, { label: 'Return Ticket', value: 0 }, { label: 'Orbit Count', value: 4 }], rarity: 'gold' },
  { id: 'harambe', name: 'Harambe', nickname: 'The Martyr', stats: [{ label: 'Meme Life', value: 100 }, { label: 'Child Care', value: 50 }, { label: 'Never Forget', value: 99 }], rarity: 'legendary' },
  
  // Villains & Traitors
  { id: 'brutus', name: 'Brutus', nickname: 'The Fake Friend', stats: [{ label: 'Loyalty', value: 0 }, { label: 'Knife Skills', value: 80 }, { label: 'Peer Pressure', value: 99 }], rarity: 'silver' },
  { id: 'benedict-arnold', name: 'Benedict Arnold', nickname: 'The Turncoat', stats: [{ label: 'Loyalty', value: 0 }, { label: 'Breakfast Eggs', value: 99 }, { label: 'Regret', value: 50 }], rarity: 'silver' },
  { id: 'judas', name: 'Judas', nickname: 'The Kisser', stats: [{ label: 'Silver Coins', value: 30 }, { label: 'Loyalty', value: 0 }, { label: 'Kissing', value: 99 }], rarity: 'gold' },
  
  // Objects & Concepts
  { id: 'capone-vault', name: "Capone's Vault", nickname: 'The Disappointment', stats: [{ label: 'Hype', value: 100 }, { label: 'Contents', value: 0 }, { label: 'Rivera Embarrassment', value: 99 }], rarity: 'bronze' },
  { id: 'iceberg', name: 'The Iceberg', nickname: 'Ship Sinker', stats: [{ label: 'K/D Ratio', value: 99 }, { label: 'Stealth', value: 90 }, { label: 'Cold Hearted', value: 100 }], rarity: 'gold' },
  { id: 'rock', name: 'A Rock', nickname: 'Sedimentary', stats: [{ label: 'Speed', value: 0 }, { label: 'Hardness', value: 99 }, { label: 'Paper Beating', value: 0 }], rarity: 'bronze' },
  { id: 'sliced-bread', name: 'Sliced Bread', nickname: 'The Benchmark', stats: [{ label: 'Best Thing Since', value: 99 }, { label: 'Crust', value: 50 }, { label: 'Usefulness', value: 99 }], rarity: 'bronze' },
  { id: 'y2k-bug', name: 'Y2K Bug', nickname: 'The Glitch', stats: [{ label: 'Panic Induced', value: 99 }, { label: 'Actual Damage', value: 1 }, { label: 'Digital', value: 100 }], rarity: 'glitch' },
  { id: 'trojan-horse', name: 'The Trojan Horse', nickname: 'The "Gift"', stats: [{ label: 'Woodworking', value: 90 }, { label: 'Sneak', value: 100 }, { label: 'Trustworthiness', value: 5 }], rarity: 'gold' },
  { id: 'pandora-box', name: "Pandora's Box", nickname: 'The Oopsie', stats: [{ label: 'Curiosity', value: 100 }, { label: 'Lid Security', value: 0 }, { label: 'Hope Remaining', value: 1 }], rarity: 'legendary' },
  { id: 'library-alexandria', name: 'Library of Alexandria', nickname: 'The Burnt', stats: [{ label: 'Knowledge', value: 100 }, { label: 'Fire Safety', value: 0 }, { label: 'Scrolls Lost', value: 99 }], rarity: 'legendary' },
  
  // Mythological Groups & Heroes
  { id: '300-spartans', name: 'The 300 Spartans', nickname: 'The Squad', stats: [{ label: 'Abs', value: 99 }, { label: 'Dining in Hell', value: 100 }, { label: 'Arrow Shade', value: 99 }], rarity: 'legendary' },
  { id: 'icarus', name: 'Icarus', nickname: 'The High Flyer', stats: [{ label: 'Sun Screen', value: 0 }, { label: 'Altitude', value: 99 }, { label: 'Listening to Dad', value: 0 }], rarity: 'gold' },
  { id: 'sisyphus', name: 'Sisyphus', nickname: 'The Boulder Roller', stats: [{ label: 'Gains', value: 100 }, { label: 'Progress', value: 0 }, { label: 'Persistence', value: 99 }], rarity: 'gold' },
  { id: 'midas', name: 'Midas', nickname: 'The Golden Touch', stats: [{ label: 'Net Worth', value: 99 }, { label: 'Eating Ability', value: 0 }, { label: 'Glove Wearing', value: 100 }], rarity: 'holo' },
  { id: 'atlas', name: 'Atlas', nickname: 'The Carrier', stats: [{ label: 'Back Strength', value: 100 }, { label: 'Chiropractic Bills', value: 99 }, { label: 'Shrugging', value: 0 }], rarity: 'gold' },
  
  // Abstract Concepts
  { id: 'murphy-law', name: "Murphy's Law", nickname: 'The Pessimist', stats: [{ label: 'Luck', value: 0 }, { label: 'Inevitability', value: 100 }, { label: 'Toast Butter Side', value: 99 }], rarity: 'glitch' },
  { id: 'father-time', name: 'Father Time', nickname: 'The Old Man', stats: [{ label: 'Speed', value: 50 }, { label: 'Beard', value: 99 }, { label: 'Undo Button', value: 0 }], rarity: 'legendary' },
  { id: 'godzilla', name: 'Godzilla', nickname: 'The Lizard', stats: [{ label: 'City Planning', value: 0 }, { label: 'Breath', value: 99 }, { label: 'Roar Volume', value: 100 }], rarity: 'legendary' },
  
  // Modern Celebrities (Roast Mode)
  { id: 'drake', name: 'Drake', nickname: 'The Zesty One', stats: [{ label: 'Accent Switching', value: 99 }, { label: 'Sassy IG Captions', value: 100 }, { label: 'Beef Wins', value: 0 }], rarity: 'gold' },
  { id: 'leo-dicaprio', name: 'Leonardo DiCaprio', nickname: 'The Pattern Recognizer', stats: [{ label: 'Dating Age Limit', value: 25 }, { label: 'Private Jet Usage', value: 99 }, { label: 'Club Headphones', value: 95 }], rarity: 'legendary' },
  { id: 'jlo', name: 'Jennifer Lopez', nickname: 'Jenny From The Block', stats: [{ label: 'Bronx Mentions', value: 99 }, { label: 'Bodega Orders', value: 0 }, { label: 'Documentary Cringe', value: 99 }], rarity: 'gold' },
  { id: 'jared-leto', name: 'Jared Leto', nickname: 'The Method Actor', stats: [{ label: 'Jesus Complex', value: 100 }, { label: 'Cult Leader Vibes', value: 95 }, { label: 'Good Movies', value: 3 }], rarity: 'silver' },
  { id: 'gwyneth-paltrow', name: 'Gwyneth Paltrow', nickname: 'The Wellness Guru', stats: [{ label: 'Bone Broth Diet', value: 99 }, { label: 'Ski Trial Swag', value: 100 }, { label: 'Touch with Reality', value: 0 }], rarity: 'gold' },
  { id: 'dj-khaled', name: 'DJ Khaled', nickname: 'The "Musician"', stats: [{ label: 'Shouting Own Name', value: 99 }, { label: 'Guitar Skill', value: 1 }, { label: 'Work Delegated', value: 100 }], rarity: 'silver' },
  { id: 'adam-sandler', name: 'Adam Sandler', nickname: 'The Dripless God', stats: [{ label: 'Shorts Bagginess', value: 99 }, { label: 'Vacation Movies', value: 100 }, { label: 'Pickup Basketball', value: 90 }], rarity: 'gold' },
  { id: 'tyra-banks', name: 'Tyra Banks', nickname: 'The Menace', stats: [{ label: 'Smizing', value: 99 }, { label: 'Traumatizing Teens', value: 100 }, { label: 'Made-up Words', value: 85 }], rarity: 'silver' },
  { id: 'steven-seagal', name: 'Steven Seagal', nickname: 'The Aikido Master', stats: [{ label: 'Sitting in Scenes', value: 100 }, { label: 'Hairline Marker', value: 99 }, { label: 'Bullshido', value: 100 }], rarity: 'bronze' },
  { id: 'kanye', name: 'Kanye West (Ye)', nickname: 'The Free Thinker', stats: [{ label: 'Caps Lock Usage', value: 99 }, { label: 'Titanium Teeth', value: 90 }, { label: 'Release Dates Met', value: 0 }], rarity: 'glitch' },
];

// Get random cards for pack opening
export const getRandomCards = (count: number): PresetCard[] => {
  const shuffled = [...PRESET_CARDS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Get cards by rarity (for weighted pulls)
export const getWeightedRandomCards = (count: number): PresetCard[] => {
  const cards: PresetCard[] = [];
  
  for (let i = 0; i < count; i++) {
    const roll = Math.random() * 100;
    let targetRarity: PresetCard['rarity'];
    
    // Weighted rarity: bronze 35%, silver 30%, gold 20%, legendary 10%, holo 4%, glitch 1%
    if (roll < 35) targetRarity = 'bronze';
    else if (roll < 65) targetRarity = 'silver';
    else if (roll < 85) targetRarity = 'gold';
    else if (roll < 95) targetRarity = 'legendary';
    else if (roll < 99) targetRarity = 'holo';
    else targetRarity = 'glitch';
    
    const rarityPool = PRESET_CARDS.filter(c => c.rarity === targetRarity);
    if (rarityPool.length > 0) {
      const randomIndex = Math.floor(Math.random() * rarityPool.length);
      cards.push(rarityPool[randomIndex]);
    } else {
      // Fallback to any card if pool is empty
      const randomIndex = Math.floor(Math.random() * PRESET_CARDS.length);
      cards.push(PRESET_CARDS[randomIndex]);
    }
  }
  
  return cards;
};
