// Security & Cryptographic Mathematics Utilities
// All logic runs strictly client-side using the Web Cryptography API.

// Curated list of clean, memorable English words for Diceware passphrase generation
export const WORDLIST: string[] = [
  "anchor", "apple", "arrow", "badge", "bamboo", "banner", "beacon", "breeze", "bridge", "cabin",
  "cactus", "canyon", "castle", "cedar", "cipher", "circuit", "cliff", "cloud", "clover", "comet",
  "copper", "coral", "crane", "crater", "creek", "crystal", "delta", "desert", "dolphin", "dragon",
  "dune", "eagle", "echo", "ember", "falcon", "fathom", "feather", "fennel", "field", "fir",
  "flame", "flint", "forest", "fossil", "fox", "frost", "galaxy", "garnet", "glacier", "glade",
  "granite", "grove", "harbor", "haven", "hawk", "hazard", "hazel", "helix", "heron", "horizon",
  "hound", "icicle", "island", "jasper", "javelin", "jungle", "kelp", "lagoon", "lantern", "lark",
  "lava", "leaf", "ledge", "leopard", "lightning", "lily", "lime", "lion", "lizard", "lotus",
  "lunar", "lynx", "magnet", "maple", "marble", "meadow", "meteor", "mist", "monarch", "moss",
  "mountain", "nebula", "nest", "nickel", "oak", "oasis", "ocean", "onyx", "opal", "orbit",
  "orchid", "otter", "owl", "palace", "panther", "pebble", "pelican", "phoenix", "pine", "pinnacle",
  "planet", "plateau", "polar", "prism", "pulse", "pyramid", "quartz", "quiver", "radar", "radiant",
  "rapids", "raven", "reef", "ridge", "ripple", "river", "robin", "rocket", "ruby", "sable",
  "sail", "salmon", "sanctuary", "sapphire", "scale", "scarlet", "scenic", "shadow", "shell", "shield",
  "sierra", "signal", "silver", "slate", "solar", "sparrow", "sphere", "spice", "spire", "spring",
  "spruce", "star", "stone", "summit", "surge", "swallow", "swift", "talon", "temple", "thistle",
  "thunder", "tide", "tiger", "timber", "titan", "topaz", "torrent", "tower", "trail", "tundra",
  "valley", "vector", "velvet", "vessel", "vigor", "vine", "violet", "viper", "volcano", "vortex",
  "voyage", "walnut", "wave", "willow", "wind", "winter", "wolf", "zenith", "zephyr", "zinc",
  "abacus", "acid", "acorn", "acre", "actor", "admiral", "agenda", "albatross", "alchemy", "alert",
  "algebra", "almond", "aloe", "alpha", "alpine", "amber", "amethyst", "amulet", "ancient", "angel",
  "animal", "anvil", "apex", "apron", "aqua", "archer", "arctic", "arena", "armor", "arrowhead",
  "aspect", "astral", "atlas", "atom", "audio", "aura", "aurora", "autumn", "avatar", "aviation",
  "axis", "azure", "baboon", "ballad", "ballet", "balsam", "baron", "barrel", "barrier", "basalt",
  "basin", "basket", "battery", "bayou", "bazaar", "beaver", "beetle", "bell", "berry", "bicycle",
  "biology", "birch", "bison", "blade", "blanket", "blast", "blizzard", "bloom", "blossom", "bluebird",
  "blueprint", "boar", "bobcat", "boulder", "boundary", "brave", "breach", "bronze", "brook", "bucket",
  "buffalo", "bugle", "bullet", "bundle", "buoy", "burrow", "butter", "butterfly", "cable", "calico",
  "camel", "camera", "camp", "candle", "canoe", "canvas", "captain", "caravan", "cardinal", "cargo",
  "carpet", "cascade", "catkin", "cavern", "celestial", "centaur", "chalet", "champion", "channel", "chapel",
  "charcoal", "chariot", "cheetah", "cherry", "chestnut", "chimney", "chisel", "chrome", "chronicle", "cider",
  "cinnamon", "citadel", "citrus", "clam", "clarion", "clay", "clipper", "cloak", "clock", "cloth",
  "cobalt", "cobra", "coconut", "codex", "coffee", "colt", "column", "compass", "condor", "conifer",
  "console", "constellation", "contour", "copperhead", "corral", "cosmos", "cotton", "cougar", "cove", "cradle",
  "crane", "crescent", "crest", "cricket", "crimson", "crocus", "crow", "crucible", "crypto", "cucumber",
  "current", "cyclone", "cypress", "dagger", "dahlia", "damson", "dance", "dandelion", "daylight", "deep",
  "deer", "delight", "derby", "dewdrop", "dial", "diamond", "diorama", "diplomat", "dirk", "diver",
  "dogwood", "domino", "dormouse", "dove", "downpour", "dragonfly", "drift", "droplet", "drum", "dryad",
  "duck", "dynamo", "earth", "easel", "eclipse", "effigy", "egret", "elder", "element", "elephant",
  "elk", "elm", "elysium", "emerald", "emperor", "empire", "enclave", "engine", "enigma", "epoch",
  "equator", "equinox", "ermine", "escalade", "estate", "estuary", "eternal", "ether", "evergreen", "exile",
  "explorer", "express", "fabric", "fairway", "faith", "fang", "farmer", "faun", "felicity", "fern",
  "ferret", "ferry", "festival", "filament", "finch", "finder", "firefly", "firework", "firth", "fisher",
  "fissure", "fjord", "flash", "flight", "flood", "flora", "flounder", "flute", "flux", "flyer",
  "focus", "foil", "foliage", "foothill", "forge", "formula", "fortress", "fortune", "fountain", "foxglove",
  "fragment", "freedom", "frequency", "freshen", "friction", "frigate", "frontier", "fungus", "furnace", "gadget",
  "gale", "gallery", "gamut", "garden", "garland", "garlic", "gateway", "gauntlet", "gazelle", "gear",
  "gem", "generator", "genesis", "gentian", "geology", "geyser", "ghost", "gibbon", "ginger", "giraffe",
  "glen", "glider", "glimmer", "glint", "globe", "gloria", "glow", "glypt", "gnome", "goblet",
  "gold", "goldfinch", "gondola", "gopher", "gorilla", "gradient", "grain", "gravity", "grebe", "green",
  "grid", "griffin", "grotto", "ground", "gull", "gully", "habitat", "hammer", "hammock", "hamster",
  "hare", "harmony", "harp", "harvest", "haven", "headland", "heart", "hearth", "heather", "hedge",
  "helm", "hemlock", "herald", "heritage", "hermit", "hero", "hickory", "highway", "hill", "hinterland",
  "hobbit", "holly", "homestead", "honey", "hood", "horizon", "horn", "hornet", "horology", "horse",
  "horseshoe", "host", "hourglass", "hummingbird", "hurricane", "hyacinth", "hydra", "hyperion", "iceberg", "icon",
  "iguana", "illusion", "impact", "imperial", "indigo", "infinity", "ingress", "inlet", "insight", "inspire",
  "instinct", "intrepid", "iris", "iron", "ironclad", "ivory", "jackal", "jaguar", "jamboree", "jasmine",
  "jay", "jewel", "jigsaw", "journey", "jubilee", "judgment", "jupiter", "juror", "kalmia", "kangaroo",
  "keel", "keeper", "kestrel", "kettle", "key", "keynote", "keystone", "kinetic", "kingfisher", "kite",
  "kitten", "kiwi", "knight", "knoll", "koala", "krypton", "labyrinth", "ladder", "lake", "lamp",
  "lancet", "landing", "landmark", "lapis", "laptop", "larch", "latitude", "laurel", "legend", "legion",
  "lemur", "lens", "leopard", "level", "lever", "liberty", "lichen", "life", "lighthouse", "limb",
  "limestone", "lineage", "linnet", "liquid", "lithium", "llama", "locket", "locust", "lodge", "logbook",
  "logic", "loom", "lore", "lucent", "lullaby", "lumber", "luminous", "luster", "lyre", "machine",
  "maelstrom", "magenta", "magpie", "mahogany", "maize", "majesty", "mammoth", "mandala", "mandrake", "mangrove",
  "mantis", "mantle", "manuscript", "mariner", "maritime", "mark", "marmot", "marsh", "marten", "mason",
  "mast", "matrix", "mayfly", "maze", "mechanism", "medal", "melody", "mercury", "meridian", "mermaid",
  "mesa", "mesh", "messenger", "metal", "meteorite", "mica", "micron", "milestone", "mineral", "minotaur",
  "miracle", "mirage", "mirror", "missive", "moccasin", "molecule", "moment", "monastery", "mongoose", "monolith",
  "monsoon", "moonbeam", "moonstone", "moor", "moose", "morning", "mortar", "mosaic", "mosque", "moth",
  "motif", "motto", "mount", "mulberry", "murmur", "muscle", "museum", "music", "musket", "mustang",
  "myriad", "myrtle", "mystery", "myth", "narwhal", "nautilus", "navigator", "nectar", "nemesis", "neon",
  "neptune", "nerve", "network", "neutron", "nexus", "nightingale", "nitrogen", "nomad", "nocturne", "normandy",
  "north", "notch", "nova", "novel", "nuclei", "nugget", "numeric", "nuthatch", "nylon", "nymph"
];

// Common weak passwords & dictionary terms to immediately flag
export const COMMON_WEAK_PASSWORDS = new Set([
  "123456", "password", "123456789", "12345", "12345678", "qwerty", "1234567",
  "111111", "123123", "1234567890", "welcome", "login", "admin", "password1",
  "abc123", "password123", "master", "sunshine", "princess", "iloveyou",
  "football", "monkey", "charlie", "donald", "shadow", "superman", "starwars",
  "trustno1", "letmein", "secret", "pass1234", "dragon", "baseball", "passcode",
  "qwerty123", "computer", "orange", "hunter2", "testing", "root", "default"
]);

// Character sets
export const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  ambiguous: "il1Lo0O|"
};

// Cryptographically secure integer in [0, max - 1]
export function getSecureRandomInt(max: number): number {
  if (typeof window === "undefined" || !window.crypto || !window.crypto.getRandomValues) {
    return Math.floor(Math.random() * max);
  }
  const range = max;
  const maxUint32 = 0xffffffff;
  const limit = maxUint32 - (maxUint32 % range);
  const buffer = new Uint32Array(1);

  while (true) {
    window.crypto.getRandomValues(buffer);
    if (buffer[0] < limit) {
      return buffer[0] % range;
    }
  }
}

// Generate Random Password using Web Crypto API
export interface PasswordGeneratorOptions {
  length: number;
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  excludeAmbiguous: boolean;
  noConsecutiveDuplicates: boolean;
}

export function generateRandomPassword(options: PasswordGeneratorOptions): string {
  let lower = CHAR_SETS.lowercase;
  let upper = CHAR_SETS.uppercase;
  let nums = CHAR_SETS.numbers;
  let syms = CHAR_SETS.symbols;

  if (options.excludeAmbiguous) {
    const ambRegex = /[il1Lo0O|]/g;
    lower = lower.replace(ambRegex, "");
    upper = upper.replace(ambRegex, "");
    nums = nums.replace(ambRegex, "");
    syms = syms.replace(ambRegex, "");
  }

  const poolCategories: string[] = [];
  if (options.useLowercase && lower.length > 0) poolCategories.push(lower);
  if (options.useUppercase && upper.length > 0) poolCategories.push(upper);
  if (options.useNumbers && nums.length > 0) poolCategories.push(nums);
  if (options.useSymbols && syms.length > 0) poolCategories.push(syms);

  if (poolCategories.length === 0) {
    poolCategories.push(lower);
  }

  const fullPool = poolCategories.join("");
  const passwordChars: string[] = [];

  // Guarantee at least one character from each selected category
  for (const cat of poolCategories) {
    const chosen = cat[getSecureRandomInt(cat.length)];
    passwordChars.push(chosen);
  }

  // Fill the remainder
  while (passwordChars.length < options.length) {
    const nextChar = fullPool[getSecureRandomInt(fullPool.length)];
    if (options.noConsecutiveDuplicates && passwordChars.length > 0) {
      if (passwordChars[passwordChars.length - 1] === nextChar) {
        continue;
      }
    }
    passwordChars.push(nextChar);
  }

  // Fisher-Yates shuffle with cryptographic random values
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = passwordChars[i];
    passwordChars[i] = passwordChars[j];
    passwordChars[j] = temp;
  }

  return passwordChars.join("");
}

// Generate Diceware Passphrase
export interface PassphraseOptions {
  wordCount: number;
  separator: string;
  capitalization: "lowercase" | "title" | "uppercase";
  includeNumber: boolean;
  numberPosition: "end" | "start" | "between";
  includeSymbol: boolean;
}

export function generatePassphrase(options: PassphraseOptions): string {
  const words: string[] = [];
  const listLen = WORDLIST.length;

  for (let i = 0; i < options.wordCount; i++) {
    let word = WORDLIST[getSecureRandomInt(listLen)];
    if (options.capitalization === "title") {
      word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    } else if (options.capitalization === "uppercase") {
      word = word.toUpperCase();
    } else {
      word = word.toLowerCase();
    }
    words.push(word);
  }

  let result = words.join(options.separator);

  if (options.includeNumber) {
    const num = getSecureRandomInt(100).toString().padStart(2, "0");
    if (options.numberPosition === "start") {
      result = `${num}${options.separator}${result}`;
    } else if (options.numberPosition === "end") {
      result = `${result}${options.separator}${num}`;
    } else {
      // between
      const mid = Math.floor(words.length / 2);
      words.splice(mid, 0, num);
      result = words.join(options.separator);
    }
  }

  if (options.includeSymbol) {
    const symbolList = "!@#$%&*?";
    const sym = symbolList[getSecureRandomInt(symbolList.length)];
    result = `${result}${sym}`;
  }

  return result;
}

// Password Strength Evaluation
export interface PasswordAnalysis {
  entropyBits: number;
  poolSize: number;
  length: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
  isCommonBreached: boolean;
  hasSequentialLetters: boolean;
  hasSequentialNumbers: boolean;
  hasRepeatedChars: boolean;
  score: number; // 0 to 100
  tier: "Very Weak" | "Weak" | "Moderate" | "Strong" | "Maximum Security";
  crackTimes: {
    onlineThrottled: string; // 100/sec (rate-limited login)
    onlineFast: string; // 10,000/sec (unthrottled endpoint)
    offlineGpuRig: string; // 100 Billion/sec (hashcat 8x RTX 4090 on NTLM/MD5)
    nationState: string; // 100 Trillion/sec (supercomputer cluster)
  };
  warnings: string[];
  suggestions: string[];
}

export function formatTimeSpan(seconds: number): string {
  if (seconds < 0.001) return "Instant (< 1 ms)";
  if (seconds < 1) return `${(seconds * 1000).toFixed(0)} ms`;
  if (seconds < 60) return `${Math.max(1, Math.round(seconds))} seconds`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.round(minutes)} minutes`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.round(hours)} hours`;
  const days = hours / 24;
  if (days < 30) return `${Math.round(days)} days`;
  const months = days / 30.4;
  if (months < 12) return `${Math.round(months)} months`;
  const years = days / 365.25;
  if (years < 1000) return `${Math.round(years)} years`;
  if (years < 1000000) return `${(years / 1000).toFixed(1)} thousand years`;
  if (years < 1000000000) return `${(years / 1000000).toFixed(1)} million years`;
  if (years < 1000000000000) return `${(years / 1000000000).toFixed(1)} billion years`;
  return `${(years / 1000000000000).toFixed(1)} trillion years`;
}

export function evaluatePassword(password: string): PasswordAnalysis {
  if (!password) {
    return {
      entropyBits: 0,
      poolSize: 0,
      length: 0,
      hasLowercase: false,
      hasUppercase: false,
      hasNumbers: false,
      hasSymbols: false,
      isCommonBreached: false,
      hasSequentialLetters: false,
      hasSequentialNumbers: false,
      hasRepeatedChars: false,
      score: 0,
      tier: "Very Weak",
      crackTimes: {
        onlineThrottled: "Instant",
        onlineFast: "Instant",
        offlineGpuRig: "Instant",
        nationState: "Instant"
      },
      warnings: ["Password is empty"],
      suggestions: ["Type a password to test its strength and calculate brute-force resistance."]
    };
  }

  const length = password.length;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  let poolSize = 0;
  if (hasLowercase) poolSize += 26;
  if (hasUppercase) poolSize += 26;
  if (hasNumbers) poolSize += 10;
  if (hasSymbols) poolSize += 33;
  if (poolSize === 0) poolSize = 26;

  // Shannon Entropy: E = L * log2(poolSize)
  let entropyBits = Math.round(length * Math.log2(poolSize));

  const lowerPwd = password.toLowerCase();
  const isCommonBreached = COMMON_WEAK_PASSWORDS.has(lowerPwd);

  // Check sequential sequences
  const sequentialNumbers = /(012|123|234|345|456|567|678|789|890|987|876|765|654|543|432|321)/;
  const sequentialLetters = /(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|qwe|wer|ert|rty|tyu|yui|uio|iop|asdf)/;
  const hasSequentialNumbers = sequentialNumbers.test(lowerPwd);
  const hasSequentialLetters = sequentialLetters.test(lowerPwd);

  // Check repeated characters: e.g. "aaaa" or "1111"
  const hasRepeatedChars = /(.)\1{2,}/.test(password);

  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (isCommonBreached) {
    warnings.push("This password appears in known data breach dumps and can be cracked instantaneously by dictionary attacks.");
    entropyBits = Math.min(entropyBits, 12);
  }

  if (length < 8) {
    warnings.push("Extremely short length. Modern brute-force systems crack under 8 characters in seconds.");
    suggestions.push("Increase length to at least 14-16 characters.");
  } else if (length < 12) {
    warnings.push("Moderate length. 8-11 characters is vulnerable to distributed offline GPU attacks.");
    suggestions.push("Aim for 14 or more characters to withstand GPU cracking rigs.");
  }

  if (hasSequentialNumbers || hasSequentialLetters) {
    warnings.push("Contains predictable keyboard or alphanumeric sequences.");
    suggestions.push("Avoid adjacent keyboard sequences like '123' or 'qwerty'.");
    entropyBits = Math.max(0, entropyBits - 10);
  }

  if (hasRepeatedChars) {
    warnings.push("Contains repeated characters (e.g. 3 or more in a row).");
    entropyBits = Math.max(0, entropyBits - 8);
  }

  if (!hasUppercase) suggestions.push("Add uppercase letters (A-Z).");
  if (!hasNumbers) suggestions.push("Include numeric digits (0-9).");
  if (!hasSymbols) suggestions.push("Include symbols (!@#$%^&*).");

  // Calculate combinations (search space) = 2^entropyBits
  // Crack times:
  // 1. Online rate limited: 100/sec
  // 2. Online fast: 10,000/sec
  // 3. Offline GPU rig: 10^11 / sec
  // 4. Nation-state farm: 10^14 / sec
  // Average search space to guess password is 2^(entropyBits - 1)
  const effectiveEntropy = Math.max(1, entropyBits);
  const log2Guesses = effectiveEntropy - 1;

  // seconds = 2^(log2Guesses) / rate
  // log2(seconds) = log2Guesses - log2(rate)
  const calcSeconds = (rate: number): number => {
    const log2Rate = Math.log2(rate);
    const log2Time = log2Guesses - log2Rate;
    if (log2Time > 120) return 1e36;
    if (log2Time < -20) return 0;
    return Math.pow(2, log2Time);
  };

  const onlineThrottledSec = calcSeconds(100);
  const onlineFastSec = calcSeconds(10_000);
  const offlineGpuSec = calcSeconds(100_000_000_000); // 100 Billion / sec
  const nationStateSec = calcSeconds(100_000_000_000_000); // 100 Trillion / sec

  // Score calculation (0 to 100)
  let score = Math.min(100, Math.round((entropyBits / 85) * 100));
  if (length < 8) score = Math.min(score, 25);
  if (isCommonBreached) score = 5;

  let tier: PasswordAnalysis["tier"] = "Very Weak";
  if (score >= 80) tier = "Maximum Security";
  else if (score >= 60) tier = "Strong";
  else if (score >= 40) tier = "Moderate";
  else if (score >= 20) tier = "Weak";

  if (suggestions.length === 0 && warnings.length === 0) {
    suggestions.push("Excellent entropy and character distribution. Store safely in an encrypted password manager.");
  }

  return {
    entropyBits,
    poolSize,
    length,
    hasLowercase,
    hasUppercase,
    hasNumbers,
    hasSymbols,
    isCommonBreached,
    hasSequentialLetters,
    hasSequentialNumbers,
    hasRepeatedChars,
    score,
    tier,
    crackTimes: {
      onlineThrottled: formatTimeSpan(onlineThrottledSec),
      onlineFast: formatTimeSpan(onlineFastSec),
      offlineGpuRig: formatTimeSpan(offlineGpuSec),
      nationState: formatTimeSpan(nationStateSec)
    },
    warnings,
    suggestions
  };
}
