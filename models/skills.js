Skills = new Meteor.Collection('skills');

Skills.allow({
    insert: function (userId, stat) {
        return false; // no cowboy inserts -- use createGame method
    },
    update: function (userId, stat, fields, modifier) {
        return false;
    },
    remove: function (userId, stat) {
        return false;
    }
});

if (Meteor.isServer) {
    Meteor.startup(function() {
        var stats;

        if (Skills.find().count() > 0) {
            return;
        }

        stats = [
            { name: 'Will', shade: 'B', stat: true, exponent: 3 },
            { name: 'Perception', shade: 'B', stat: true, exponent: 3 },
            { name: 'Agility', shade: 'B', stat: true, exponent: 3 },
            { name: 'Speed', shade: 'B', stat: true, exponent: 3 },
            { name: 'Power', shade: 'B', stat: true, exponent: 3 },
            { name: 'Forte', shade: 'B', stat: true, exponent: 3 },
            { name: 'Abbey-wise', roots: 'Pe' },
            { name: 'Accounting', roots: 'Pe' },
            { name: 'Acting', roots: 'Pe' },
            { name: 'Administration', roots: 'Pe' },
            { name: 'Ages of the Etharch', roots: 'Wi,Pe', magic: true },
            { name: 'Alchemy', roots: 'Pe' },
            { name: 'Almanac', roots: 'Pe' },
            { name: 'Althing-wise', roots: 'Pe' },
            { name: 'Ambition-wise', roots: 'Pe' },
            { name: 'Amercement', roots: 'Pe' },
            { name: 'Anatomy', roots: 'Pe' },
            { name: 'Ancient Languages', roots: 'Pe' },
            { name: 'Animal Husbandry', roots: 'Wi' },
            { name: 'Antiphon Union Training', roots: 'Wi', training: true },
            { name: 'Apothecary', roots: 'Pe' },
            { name: 'Appraisal', roots: 'Pe' },
            { name: 'Archcraft', roots: 'Wi,Ag', magic: true },
            { name: 'Architect', roots: 'Pe' },
            { name: 'Armorer', roots: 'Pe,Ag' },
            { name: 'Armor Training', roots: 'Po,Sp', training: true },
            { name: 'Army-wise', roots: 'Pe' },
            { name: 'Arson', roots: 'Pe,Ag' },
            { name: 'Artificer-wise', roots: 'Pe' },
            { name: 'Artillerist', roots: 'Pe' },
            { name: 'Artillery Hand', roots: 'Pe,Ag' },
            { name: 'Astrology', roots: 'Pe' },
            { name: 'Atilliator', roots: 'Pe,Ag' },
            { name: 'Aura Reading', roots: 'Wi,Pe' },
            { name: 'Axe', roots: 'Po,Ag' },
            { name: 'Back Alley-wise', roots: 'Pe' },
            { name: 'Bad End-wise', roots: 'Pe' },
            { name: 'Baking', roots: 'Pe,Ag' },
            { name: 'Ballad of History', roots: 'Pe', magic: true },
            { name: 'Bannerman-wise', roots: 'Pe' },
            { name: 'Banner-wise', roots: 'Pe' },
            { name: 'Bastions of Hatred', roots: 'Hatred', magic: true },
            { name: 'Bat-wise', roots: 'Pe' },
            { name: 'Beast of Burden-wise', roots: 'Pe' },
            { name: 'Beer Appraisal', roots: 'Wi,Pe' },
            { name: 'Beer-wise', roots: 'Pe' },
            { name: 'Begging', roots: 'Wi' },
            { name: 'Bird Husbandry', roots: 'Wi' },
            { name: 'Black Legion-wise', roots: 'Pe' },
            { name: 'Black Metal Artifice', roots: 'Wi,Ag', magic: true },
            { name: 'Blacksmith', roots: 'Ag,Po' },
            { name: 'Bloodletting', roots: 'Pe' },
            { name: 'Boatwright', roots: 'Pe,Ag' },
            { name: 'Boss-wise', roots: 'Pe' },
            { name: 'Bow', roots: 'Ag' },
            { name: 'Bowcraft', roots: 'Wi,Ag', magic: true },
            { name: 'Bowyer', roots: 'Pe,Ag' },
            { name: 'Boxing (Martial Arts)', roots: 'Po,Ag' },
            { name: 'Brawling', roots: 'Po' },
            { name: 'Brazen Horn of Despair', roots: 'Hatred', magic: true },
            { name: 'Brewer', roots: 'Pe' },
            { name: 'Bribe-wise', roots: 'Pe' },
            { name: 'Brutal Intimidation', roots: 'Hatred', magic: true },
            { name: 'Burden of the Crown-wise', roots: 'Pe' },
            { name: 'Bureaucracy', roots: 'Wi' },
            { name: 'Butchery', roots: 'Pe,Ag' },
            { name: 'Cadence-wise', roots: 'Pe' },
            { name: 'Calligraphy', roots: 'Pe,Ag' },
            { name: 'Call of the Wild', roots: 'Pe,Ag', magic: true },
            { name: 'Campaign-wise', roots: 'Pe' },
            { name: 'Cargo-wise', roots: 'Pe' },
            { name: 'Carpentry', roots: 'Pe,Ag'},
            { name: 'Cartography', roots: 'Pe,Ag'},
            { name: 'Cartwright', roots: 'Pe,Ag'},
            { name: 'Carving', roots: 'Pe,Ag'},
            { name: 'Cave-In-wise', roots: 'Pe' },
            { name: 'Cave-wise', roots: 'Pe' },
            { name: 'Champion-wise', roots: 'Pe' },
            { name: 'Chandler', roots: 'Pe,Ag'},
            { name: 'Chattel-wise', roots: 'Pe' },
            { name: 'Cheating-wise', roots: 'Pe' },
            { name: 'Child-Reading', roots: 'Wi' },
            { name: 'Chronology of Kings', roots: 'Pe' },
            { name: 'Church Law', roots: 'Pe' },
            { name: 'Citadel-wise', roots: 'Pe' },
            { name: 'City-wise', roots: 'Pe' },
            { name: 'Clan History', roots: 'Pe' },
            { name: 'Climbing', roots: 'Sp' },
            { name: 'Cloth Dyeing', roots: 'Pe,Ag'},
            { name: 'Coarse Persuasion', roots: 'Wi', magic: true },
            { name: 'Cobbler', roots: 'Pe,Ag'},
            { name: 'Code of Citadels', roots: 'Wi,Pe' },
            { name: 'Command', roots: 'Wi' },
            { name: 'Composition', roots: 'Wi,Pe' },
            { name: 'Conspicuous', roots: 'Wi' },
            { name: 'Contract-wise', roots: 'Pe' },
            { name: 'Cooking', roots: 'Pe' },
            { name: 'Cooper', roots: 'Pe,Ag' },
            { name: 'Coppersmith', roots: 'Pe,Ag' },
            { name: 'Counterfeiting', roots: 'Pe,Ag' },
            { name: 'Countryside-wise', roots: 'Pe' },
            { name: 'Crop-wise', roots: 'Pe' },
            { name: 'Crossbow', roots: 'Ag' },
            { name: 'Crowd-wise', roots: 'Pe' },
            { name: 'Cryptography', roots: 'Pe' },
            { name: 'Cudgel', roots: 'Ag' },
            { name: 'Daily Bread-wise', roots: 'Pe' },
            { name: 'Dance', roots: 'Sp' },
            { name: 'Darkened Streets-wise', roots: 'Pe' },
            { name: 'Darkness-wise', roots: 'Pe' },
            { name: 'Demonology', roots: 'Pe' },
            { name: 'Dignity of the Wilderlands', roots: 'Wi,Pe', magic: true },
            { name: 'Disguise', roots: 'Pe,Ag' },
            { name: 'Ditch Digging', roots: 'Po' },
            { name: 'Doctrine of Night\'s Blood', roots: 'Wi,Pe' },
            { name: 'Doctrine', roots: 'Pe' },
            { name: 'Drama-wise', roots: 'Pe' },
            { name: 'Drinking', roots: 'Fo' },
            { name: 'Driving', roots: 'Wi,Ag' },
            { name: 'Drum Maker', roots: 'Pe,Ag' },
            { name: 'Drunkard-wise', roots: 'Pe' },
            { name: 'Drunking', roots: 'Wi,Fo', magic: true },
            { name: 'Dwarf-wise', roots: 'Pe' },
            { name: 'Dwarven Art-wise', roots: 'Pe' },
            { name: 'Dwarven Heroes-wise', roots: 'Pe' },
            { name: 'Dwarven Rune Script', roots: 'Pe' },
            { name: 'Dye Manufacture', roots: 'Pe,Ag' },
            { name: 'Earth-wise', roots: 'Pe' },
            { name: 'Elf-wise', roots: 'Pe' },
            { name: 'Elven Artifact-wise', roots: 'Pe' },
            { name: 'Elven Art-wise', roots: 'Pe' },
            { name: 'Elven Blade-wise', roots: 'Pe' },
            { name: 'Elven Citadel-wise', roots: 'Pe' },
            { name: 'Elven Ranger-wise', roots: 'Pe' },
            { name: 'Elven Script', roots: 'Pe' },
            { name: 'Embroidery', roots: 'Pe,Ag' },
            { name: 'Empyrealia', roots: 'Pe' },
            { name: 'Enchanting', roots: 'Pe' },
            { name: 'Engineering', roots: 'Pe' },
            { name: 'Engraving', roots: 'Ag' },
            { name: 'Estate Management', roots: 'Pe' },
            { name: 'Estate-wise', roots: 'Pe' },
            { name: 'Etching', roots: 'Ag' },
            { name: 'Etharch-wise', roots: 'Pe' },
            { name: 'Etiquette', roots: 'Wi,Pe' },
            { name: 'Everybody\'s Innocent-wise', roots: 'Pe' },
            { name: 'Excavation', roots: 'Pe,Po', magic: true },
            { name: 'Extortion', roots: 'Wi' },
            { name: 'Faith-wise', roots: 'Pe' },
            { name: 'Falconry', roots: 'Wi,Pe' },
            { name: 'Falsehood', roots: 'Wi' },
            { name: 'Family Secret-wise', roots: 'Pe' },
            { name: 'Family-wise', roots: 'Pe' },
            { name: 'Farming', roots: 'Pe' },
            { name: 'Fealty-wise', roots: 'Pe' },
            { name: 'Fence Building', roots: 'Pe' },
            { name: 'Field Dressing', roots: 'Pe' },
            { name: 'Fire and Steel-wise', roots: 'Pe' },
            { name: 'Firearms', roots: 'Pe,Ag' },
            { name: 'Firebuilding', roots: 'Pe' },
            { name: 'Fishing', roots: 'Pe,Ag' },
            { name: 'Fletcher', roots: 'Pe,Ag' },
            { name: 'Flock-wise', roots: 'Pe' },
            { name: 'Folklore', roots: 'Pe' },
            { name: 'Foraging', roots: 'Pe' },
            { name: 'Foreign Languages', roots: 'Pe' },
            { name: 'Forest-wise', roots: 'Pe' },
            { name: 'Forge Artifice', roots: 'Wi,Pe', magic: true },
            { name: 'Forgery', roots: 'Pe,Ag' },
            { name: 'Formation Fighting', roots: 'Wi', training: true },
            { name: 'Fortifications', roots: 'Pe' },
            { name: 'Gambling', roots: 'Wi,Pe' },
            { name: 'Games of Chance', roots: 'Pe' },
            { name: 'Gas Pocket-wise', roots: 'Pe' },
            { name: 'Gem Artifice', roots: 'Wi,Ag', magic: true },
            { name: 'Gemcraft', roots: 'Wi,Ag', magic: true },
            { name: 'Genius-wise', roots: 'Pe' },
            { name: 'Gossip-wise', roots: 'Pe' },
            { name: 'Grain Appraisal', roots: 'Pe' },
            { name: 'Grain Song', roots: 'Pe', magic: true },
            { name: 'Grain-wise', roots: 'Pe' },
            { name: 'Graybeard-wise', roots: 'Pe' },
            { name: 'Great and Black-wise', roots: 'Pe' },
            { name: 'Great Masters-wise', roots: 'Pe' },
            { name: 'Great Wolf Husbandry', roots: 'Wi' },
            { name: 'Grift-wise', roots: 'Pe' },
            { name: 'Guilder-wise', roots: 'Pe' },
            { name: 'Haggling', roots: 'Wi' },
            { name: 'Hallmaster', roots: 'Wi,Pe' },
            { name: 'Hammer', roots: 'Ag' },
            { name: 'Handwriting-wise', roots: 'Pe' },
            { name: 'Hatchet-wise', roots: 'Pe' },
            { name: 'Hauling', roots: 'Wi,Po' },
            { name: 'Heraldry', roots: 'Pe' },
            { name: 'Herbalism', roots: 'Pe' },
            { name: 'Hills-wise', roots: 'Pe' },
            { name: 'History', roots: 'Pe' },
            { name: 'Hold-wise', roots: 'Pe' },
            { name: 'Hoof-wise', roots: 'Pe' },
            { name: 'Host-wise', roots: 'Pe' },
            { name: 'Hunting', roots: 'Pe,Ag' },
            { name: 'Humn of Scales and Fins', roots: 'Pe,Ag', magic: true },
            { name: 'Hypocritical Bastards-wise', roots: 'Pe' },
            { name: 'Illuminations', roots: 'Ag' },
            { name: 'Imperfecxtions-wise', roots: 'Pe' },
            { name: 'Inconspicuous', roots: 'Wi' },
            { name: 'Infection-wise', roots: 'Pe' },
            { name: 'Insect Husbandry', roots: 'Wi' },
            { name: 'Instruction', roots: 'Wi' },
            { name: 'Interrogation', roots: 'Wi' },
            { name: 'Intimidation', roots: 'Wi' },
            { name: 'Intrigue-wise', roots: 'Pe' },
            { name: 'Jargon', roots: 'Pe' },
            { name: 'Javelin', roots: 'Ag' },
            { name: 'Jewelcraft', roots: 'Wi,Ag', magic: true },
            { name: 'Jeweler', roots: 'Pe,Ag' },
            { name: 'Khirurgy', roots: 'Pe,Ag' },
            { name: 'Kingdom-wise', roots: 'Pe' },
            { name: 'Knives', roots: 'Ag' },
            { name: 'Knots', roots: 'Pe,Ag' },
            { name: 'Lance', roots: 'Ag,Po' },
            { name: 'Lapidary', roots: 'Pe' },
            { name: 'Latrine-wise', roots: 'Pe' },
            { name: 'Lazy Bastard-wise', roots: 'Pe' },
            { name: 'Leathercraft', roots: 'Wi,Ag', magic: true },
            { name: 'Ledger-wise', roots: 'Pe' },
            { name: 'Leverage-wise', roots: 'Pe' },
            { name: 'Links', roots: 'Wi,Fo' },
            { name: 'Lithography', roots: 'Pe,Ag', magic: true },
            { name: 'Lock Pick', roots: 'Pe,Ag' },
            { name: 'Locksmith', roots: 'Pe,Ag' },
            { name: 'Logistics', roots: 'Pe' },
            { name: 'Lost Treasures-wise', roots: 'Pe' },
            { name: 'Lyric of Law', roots: 'Pe', magic: true },
            { name: 'Mace', roots: 'Po,Ag' },
            { name: 'Maker\'s Mark-wise', roots: 'Pe' },
            { name: "Man-wise", roots: 'Pe' },
            { name: "Martial Arts", roots: 'Po,Ag' },
            { name: "Mason", roots: 'Pe,Ag' },
            { name: "Meditation", roots: 'Wi' },
            { name: "Mending", roots: 'Pe,Ag' },
            { name: "Mercenary Company-wise", roots: 'Pe' },
            { name: "Metal-wise", roots: 'Pe' },
            { name: "Midwifery", roots: 'Wi,Pe' },
            { name: "Miller", roots: 'Pe' },
            { name: "Mill-wise", roots: 'Pe' },
            { name: "Mimicry", roots: 'Pe' },
            { name: "Mining", roots: 'Pe' },
            { name: "Monk-wise", roots: 'Pe' },
            { name: "Mounted Combat Training", roots: 'Wi,Po', training: true },
            { name: "Mouth of Hell-wise", roots: 'Pe' },
            { name: "Mule-wise", roots: 'Pe' },
            { name: "Munitions", roots: 'Pe,Ag' },
            { name: "Musical Instrument", roots: 'Wi,Ag' },
            { name: "Musical Composition", roots: 'Wi,Pe' },
            { name: "Mystery Meat-wise", roots: 'Pe' },
            { name: "Name Ritual", roots: 'Wi,Pe' },
            { name: "Navigation", roots: 'Pe' },
            { name: "Nogger", roots: 'Wi,Pe', magic: true },
            { name: "Oath-wise", roots: 'Pe' },
            { name: "Obligation-wise", roots: 'Pe' },
            { name: "Obscure Text-wise", roots: 'Pe' },
            { name: "Observation", roots: 'Pe' },
            { name: "Oratory", roots: 'Wi' },
            { name: "Orc-wise", roots: 'Pe' },
            { name: "Ore-wise", roots: 'Pe' },
            { name: "Orienteering", roots: 'Pe' },
            { name: "Paean of Deeds", roots: 'Wi', magic: true },
            { name: "Painting", roots: 'Wi,Ag' },
            { name: "Pattern-wise", roots: 'Pe' },
            { name: "Personal Effects-wise", roots: 'Pe' },
            { name: "Persuasion", roots: 'Wi' },
            { name: "Philosophy", roots: 'Wi,Pe' },
            { name: "Pilgrimage-wise", roots: 'Pe' },
            { name: "Pilot", roots: 'Pe,Po' },
            { name: "Playwright", roots: 'Wi,Pe' },
            { name: "Plumbing", roots: 'Pe' },
            { name: "Poetry", roots: 'Wi' },
            { name: "Poisonous Platitudes", roots: 'Hatred', magic: true },
            { name: "Poisons", roots: 'Pe' },
            { name: "Poison-wise", roots: 'Pe' },
            { name: "Polearm", roots: 'Po,Ag' },
            { name: "Potter", roots: 'Pe,Ag' },
            { name: "Prospecting", roots: 'Pe' },
            { name: "Protector-wise", roots: 'Pe' },
            { name: "Purple Song", roots: 'Pe,Ag', magic: true },
            { name: "Ratiquette", roots: 'Wi' },
            { name: "Read", roots: 'Pe' },
            { name: "Reason of Old Stone", roots: 'Wi' },
            { name: "Religious Diatribe", roots: 'Wi' },
            { name: "Reputation-wise", roots: 'Pe' },
            { name: "Research", roots: 'Pe' },
            { name: "Rhetoric", roots: 'Pe' },
            { name: "Rhyme of the Gatherer", roots: 'Pe', magic: true },
            { name: "Rhyme of the Mariner", roots: 'Ag,Sp', magic: true },
            { name: "Rhyme of the Pathfinder", roots: 'Pe', magic: true },
            { name: "Rhythm of the City-wise", roots: 'Pe' },
            { name: "Riddle of Steel", roots: 'Wi,Ag' },
            { name: "Ridiculous Request-wise", roots: 'Pe' },
            { name: "Riding", roots: 'Wi' },
            { name: "Rigging", roots: 'Ag,Sp' },
            { name: "Rituals of Blood", roots: 'Wi', magic: true },
            { name: "Rituals of Night", roots: 'Pe', magic: true },
            { name: "Rituals-wise", roots: 'Pe' },
            { name: "Ritual", roots: 'Wi,Pe' },
            { name: "Road-wise", roots: 'Pe' },
            { name: "Rope Chant", roots: 'Pe', magic: true },
            { name: "Round of Harvest", roots: 'Pe', magic: true },
            { name: "Royal Secret-wise", roots: 'Pe' },
            { name: "Rude Carpentry", roots: 'Pe,Ag' },
            { name: "Rule of Law", roots: 'Pe' },
            { name: "Rumor-wise", roots: 'Pe' },
            { name: "Rune Casting", roots: 'Wi,Pe', magic: true },
            { name: "Saddlery", roots: 'Pe,Ag' },
            { name: "Saint-wise", roots: 'Pe' },
            { name: "Scavenging", roots: 'Pe' },
            { name: "Sculpture", roots: 'Wi,Ag' },
            { name: "Scutwork-wise", roots: 'Pe' },
            { name: "Seamanship", roots: 'Pe' },
            { name: "Seduction", roots: 'Wi' },
            { name: "Servant-wise", roots: 'Pe' },
            { name: "Sewing", roots: 'Ag' },
            { name: "Shield Training", roots: 'Ag', training: true },
            { name: "Ship Management", roots: 'Pe' },
            { name: "Ship-wise", roots: 'Pe' },
            { name: "Shipwright", roots: 'Pe' },
            { name: "Shortcut-wise", roots: 'Pe' },
            { name: "Shrewd Appraisal", roots: 'Pe', magic: true },
            { name: "Siege Engineer", roots: 'Pe' },
            { name: "Signaling", roots: 'Pe' },
            { name: "Silent Fury", roots: 'Wi', magic: true },
            { name: "Silver Trumpet", roots: 'Wi' },
            { name: "Sing", roots: 'Wi' },
            { name: "Skirmish Tactics Training", roots: 'Wi,Pe', training: true },
            { name: "Slave Deck-wise", roots: 'Pe' },
            { name: "Sleight of Hand", roots: 'Ag' },
            { name: "Slip of Currents", roots: 'Pe', magic: true },
            { name: "Smithcraft", roots: 'Wi,Ag', magic: true },
            { name: "Soldiering", roots: 'Wi,Pe' },
            { name: "Song of Feasting", roots: 'Pe,Ag', magic: true },
            { name: "Song of Flocks and Herds", roots: 'Wi', magic: true },
            { name: "Song of Form", roots: 'Wi', magic: true },
            { name: "Song of Lordship", roots: 'Wi', magic: true },
            { name: "Song of Paths and Ways", roots: 'Pe', magic: true },
            { name: "Song of Soothing", roots: 'Wi,Pe', magic: true },
            { name: "Song of the Eldar", roots: 'Pe' },
            { name: "Soothing Platitudes", roots: 'Wi' },
            { name: "Soot-wise", roots: 'Pe' },
            { name: "Sorcery", roots: 'Pe', magic: true },
            { name: "Spear", roots: 'Ag' },
            { name: "Spearcraft", roots: 'Wi,Ag', magic: true },
            { name: "Stealthy", roots: 'Sp' },
            { name: "Stentorious Debate", roots: 'Wi', magic: true },
            { name: "Stone Artifice", roots: 'Wi,Po', magic: true },
            { name: "Stonecraft", roots: 'Wi,Ag', magic: true },
            { name: "Strategy Games", roots: 'Wi,Pe' },
            { name: "Streetwise", roots: 'Pe' },
            { name: "Structural Weakness-wise", roots: 'Pe' },
            { name: "Stuff-wise", roots: 'Pe' },
            { name: "Suasion", roots: 'Pe' },
            { name: "Suicidal Bravery-wise", roots: 'Pe' },
            { name: "Summoning", roots: 'Pe' },
            { name: "Supplier-wise", roots: 'Pe' },
            { name: "Supply-wise", roots: 'Pe' },
            { name: "Surgery", roots: 'Pe,Ag' },
            { name: "Survival", roots: 'Wi,Pe' },
            { name: "Sword", roots: 'Ag' },
            { name: "Symbology", roots: 'Pe' },
            { name: "Tactics", roots: 'Wi,Pe' },
            { name: "Tall Grass-wise", roots: 'Pe' },
            { name: "Tanner", roots: 'Ag,Fo' },
            { name: "Taskmaster-wise", roots: 'Pe' },
            { name: "Tavern Tales-wise", roots: 'Pe' },
            { name: "Taxidermy", roots: 'Pe' },
            { name: "Terroir-wise", roots: 'Pe' },
            { name: "Theatrics", roots: 'Wi,Pe' },
            { name: "Threading Chant", roots: 'Pe,Ag', magic: true },
            { name: "Throwing", roots: 'Ag' },
            { name: "Torture", roots: 'Wi,Pe' },
            { name: "Tracking", roots: 'Pe' },
            { name: "Tragic End-wise", roots: 'Pe' },
            { name: "Trails-wise", roots: 'Pe' },
            { name: "Trapper", roots: 'Pe,Ag' },
            { name: "Tree Cutting", roots: 'Pe,Po' },
            { name: "Tree Pulling", roots: 'Hatred', magic: true },
            { name: "Troll Etiquette", roots: 'Wi,Pe' },
            { name: "Troll-wise", roots: 'Pe' },
            { name: "Tune-wise", roots: 'Pe' },
            { name: "Tunnel-wise", roots: 'Pe' },
            { name: "Two-Fisted Fighting Training", roots: 'Ag', training: true },
            { name: "Ugly Truth", roots: 'Pe' },
            { name: "Vein-wise", roots: 'Pe' },
            { name: "Vile Poisoner", roots: 'Pe,Ag', magic: true },
            { name: "Village Secret-wise", roots: 'Pe' },
            { name: "Vine-wise", roots: 'Pe' },
            { name: "Vintage-wise", roots: 'Pe' },
            { name: "Vintner", roots: 'Wi,Pe' },
            { name: "Visage-wise", roots: 'Pe' },
            { name: "Voice of THunder", roots: 'Wi,Fo', magic: true },
            { name: "Wagon-wise", roots: 'Pe' },
            { name: "Waiting Tables", roots: 'Wi' },
            { name: "War Art", roots: 'Wi,Ag', magic: true },
            { name: "War Engineer", roots: 'Wi,Pe', magic: true },
            { name: "Weaponsmith", roots: 'Pe,Ag' },
            { name: "Weaving", roots: 'Pe,Ag' },
            { name: "Weaving Way", roots: 'Wi,Ag', magic: true },
            { name: "Web-wise", roots: 'Pe' },
            { name: "Well-wise", roots: 'Pe' },
            { name: "Whip-wise", roots: 'Pe' },
            { name: "Whispered Secrets-wise", roots: 'Pe' },
            { name: "White Metal Artifice", roots: 'Wi,Ag', magic: true },
            { name: "Whitesmith", roots: 'Pe,Ag' },
            { name: "Windage-wise", roots: 'Pe' },
            { name: "Wine Tasting", roots: 'Pe' },
            { name: "Wolf-wise", roots: 'Pe' },
            { name: "Woodcraft", roots: 'Wi,Ag', magic: true },
            { name: "Wood-wise", roots: 'Pe' },
            { name: "Write", roots: 'Pe,Ag' }
        ];

        _.each(stats, function(stat) {
            if (_.isString(stat.roots)) {
                stat.roots = stat.roots.split(',');
            }
            stat.magic = !!stat.magic;
            stat.training = !!stat.training;
            stat.stat = !!stat.stat;

            Skills.insert(stat);
        });
    });
}
