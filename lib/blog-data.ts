// Blog & Cybersecurity Educational Guides Data
// Written with authentic, technically rigorous, human-sounding cybersecurity knowledge.

export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
  };
  category: "Password Security" | "Authentication" | "Threat Analysis";
  tags: string[];
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-hackers-crack-weak-passwords",
    title: "How Hackers Crack Weak Passwords: Inside Modern Brute-Force & Hash Cracking",
    subtitle: "From wordlists to 100-billion-hash-per-second GPU rigs: what actually happens when your credentials are breached.",
    excerpt: "Most people imagine hackers typing away in a dark room guessing passwords one by one. In reality, modern credential attacks are industrial-scale mathematical operations. Here is how they actually work.",
    publishedAt: "March 2026",
    readTime: "7 min read",
    author: {
      name: "SecurityTools Research Team",
      role: "Application Security & Cryptography"
    },
    category: "Threat Analysis",
    tags: ["Brute Force", "Hashcat", "GPU Cracking", "Credential Stuffing", "Cryptography"],
    content: `
### The Illusion of Manual Guessing

A persistent pop-culture myth depicts a hacker sitting in a terminal window, guessing three times before getting locked out. While online authentication endpoints do enforce rate-limiting and account lockouts, attackers almost never try to breach accounts this way.

Instead, the vast majority of password cracking occurs **offline** following a data breach. When a company's database is compromised, attackers don't obtain plain-text passwords—they dump the password database containing millions of cryptographic hashes. Once an attacker has this hash dump locally, they can test hundreds of billions of combinations every second with zero network latency, zero rate limits, and zero fear of account lockouts.

---

### Phase 1: The Modern GPU Cracking Rig

To understand why simple passwords fail instantly, you need to understand the hardware. Modern GPUs (like custom rigs of 8x Nvidia RTX 4090s) are massively parallel compute engines. While a central processing unit (CPU) excels at sequential logic, a GPU possesses thousands of cores optimized for executing identical mathematical operations concurrently.

Here is what modern offline cracking throughput looks like against legacy fast hashes like **MD5** or **NTLM**:

- **A single RTX 4090**: ~160 billion MD5 guesses per second.
- **An 8x GPU cluster**: Over **1.2 trillion** NTLM/MD5 calculations every single second.
- **Cost**: A dedicated 8-GPU rig costs under $15,000, or can be rented anonymously in cloud compute clusters for a few dollars an hour.

Under this compute density, every 8-character password consisting solely of lowercase letters ($26^8 \\approx 208$ billion combinations) is exhausted in **less than two-tenths of a second**.

---

### Phase 2: How Attackers Target Real-World Hashes

Attackers do not start with pure brute-force; that is inefficient. Instead, they operate through a tiered attack methodology:

#### 1. Dictionary & Breach Compilations (SecLists & RockYou)
Attackers maintain databases of billions of previously leaked passwords (such as *RockYou2024*, collections of hundreds of millions of real human passwords). The cracking tool computes the hash for every word on the list and compares it against the dumped database in seconds.

#### 2. Mangling Rules & Leetspeak
Humans are notoriously predictable when instructed to add complexity. We capitalize the first letter, append a year or an exclamation point to the end, or substitute vowels with symbols:
- \`password\` $\\rightarrow$ \`Password123!\`
- \`monkey\` $\\rightarrow$ \`M0nk3y!\`
- \`summer\` $\\rightarrow$ \`Summer2025\`

Modern cracking frameworks like **Hashcat** and **John the Ripper** employ rule engines. A single rule file can take a 10-million word dictionary and automatically test 50,000 permutations of each word: prefixing, suffixing, substituting \`a\` with \`@\`, \`e\` with \`3\`, \`i\` with \`1\`, and appending all 4-digit years from 1950 through 2030.

#### 3. Mask & Hybrid Attacks
If an attacker knows an enterprise enforces "at least one capital, one number, and one symbol", they constrain their brute-force mask:
\`?u?l?l?l?l?l?l?d?s\` (1 Upper, 6 Lower, 1 Digit, 1 Symbol).
This shrinks the mathematical keyspace from $95^9$ down to a tiny fraction that can be completely exhausted in hours.

---

### Phase 3: Fast Hashes vs. Slow Adaptive Functions

Why can some passwords be cracked in seconds while others take millennia? The answer lies in the hashing algorithm selected by the application developer:

1. **Fast Hashes (Vulnerable for Passwords)**: MD5, SHA-1, SHA-256. These algorithms were designed for file integrity and speed. Fast is good for verifying a 4GB download; fast is lethal for password storage.
2. **Key Derivation Functions (Slow & Secure)**: **bcrypt**, **scrypt**, and **Argon2id**. 
   - These algorithms incorporate configurable *work factors* (computational rounds) and *memory hardness*.
   - **Argon2id**, the winner of the Password Hashing Competition, forces the cracking machine to allocate substantial RAM for every single guess. A GPU cannot parallelize millions of operations when each guess requires 64MB of dedicated RAM.

---

### How to Protect Yourself: The 2026 Baseline

1. **Length Beats Arbitrary Complexity**: A 16-character random alphanumeric password has roughly 95 bits of entropy. A 4-word Diceware passphrase has roughly 65-75 bits of entropy and is practically uncrackable by offline GPU rigs.
2. **Never Reuse Passwords**: In **credential stuffing** attacks, automated botnets take email/password pairs breached at one minor forum and test them against thousands of high-value targets (Google, PayPal, banking portals).
3. **Use a Zero-Knowledge Password Manager**: Humans are physically incapable of generating and memorizing 150 unique, cryptographically random 20-character strings. Let a password manager handle generation and storage.
4. **Mandate Multi-Factor Authentication**: Even if an attacker breaks your offline hash, high-quality MFA prevents them from authenticating to your actual account.
`
  },
  {
    slug: "2fa-explained-simply",
    title: "2FA Explained Simply: SMS vs. Authenticator Apps vs. Hardware Keys",
    subtitle: "Why not all Two-Factor Authentication is created equal, and how to choose the right balance of security and convenience.",
    excerpt: "You have probably been prompted to turn on 'Two-Factor Authentication' everywhere from your bank to your email. But what actually happens under the hood, and why is SMS authentication increasingly dangerous?",
    publishedAt: "March 2026",
    readTime: "6 min read",
    author: {
      name: "SecurityTools Research Team",
      role: "Application Security & Cryptography"
    },
    category: "Authentication",
    tags: ["2FA", "MFA", "TOTP", "YubiKey", "FIDO2", "SIM Swapping"],
    content: `
### What Is Two-Factor Authentication (2FA)?

Authentication boils down to proving who you are using evidence from three fundamental categories:

1. **Something You Know**: A password, PIN, passphrase, or answer to a secret question.
2. **Something You Have**: A physical smartphone, a hardware security key, or an authenticator device.
3. **Something You Are**: Biometrics like a fingerprint, facial geometry, or iris scan.

**Two-Factor Authentication (2FA)** simply means you must successfully present proof from **at least two different categories** before gaining access. If an attacker steals your password (something you know), they are completely blocked without your physical device (something you have).

However, the specific method used for that second factor drastically changes your actual security posture.

---

### Tier 1: SMS & Voice Verification (Better than Nothing, but Vulnerable)

When you log in, the service texts a 6-digit verification code to your mobile phone number.

#### The Problem:
SMS was designed in the 1980s as a telecom carrier protocol with zero built-in cryptographic security. It suffers from two critical vulnerabilities:

1. **SIM Swapping**: An attacker calls your cellular carrier (or bribes an insider) impersonating you and requests that your phone number be ported to a new SIM card under their control. Once ported, all your incoming verification SMS texts route straight to the attacker's handset.
2. **SS7 Signaling Interception**: State-sponsored attackers and sophisticated syndicates can intercept SMS traffic across the global telecom routing backbone (SS7) without physical access to your device.

**Verdict**: Use SMS only if the service offers no alternatives. Never rely on SMS 2FA for primary email, financial accounts, or cryptocurrency wallets.

---

### Tier 2: Authenticator Apps (TOTP - The Recommended Standard)

Apps like Google Authenticator, Aegis, 2FAS, Bitwarden, or 1Password implement an open standard called **Time-Based One-Time Password (RFC 6238)**.

#### How It Works:
1. When you enable 2FA, the server generates a cryptographically secure random string called a **Shared Secret** (encoded in a QR code).
2. Your phone scans the QR code and saves that secret locally.
3. Both the server and your phone look at the current Unix timestamp (bucketed into 30-second intervals).
4. Both sides run an identical HMAC-SHA1 mathematical function combining the shared secret with the current time window, outputting the exact same 6-digit code.

#### Why It Is Secure:
- **Zero Cellular Dependency**: Works entirely in Airplane Mode or offline without cellular reception.
- **Immune to SIM Swapping**: The code is generated strictly in your device's local memory from the shared secret. An attacker who steals your phone number still has zero access.

**Vulnerability**: TOTP is still vulnerable to **real-time reverse proxy phishing** (e.g., tools like Evilginx). If an attacker lures you to a fake phishing login page and you enter your 6-digit code, their automated proxy submits that live code to the real server within the 30-second window.

---

### Tier 3: Hardware Security Keys & FIDO2 / WebAuthn (Phishing-Resistant)

Physical USB-C / NFC security keys (such as YubiKeys or Nitrokeys) and modern platform passkeys represent the gold standard in digital authentication.

#### How It Works:
Hardware keys utilize public-key asymmetric cryptography:
1. During registration, the physical key generates a unique cryptographic keypair dedicated strictly to that website's exact domain name (e.g., \`accounts.google.com\`).
2. The private key remains locked inside a tamper-resistant secure enclave on the physical hardware and can never be extracted.
3. When you log in, your browser challenges the key. You physically touch the gold contact pad to prove human presence, and the key signs the challenge.

#### Why It Is 100% Phishing-Resistant:
The browser itself signs the request with the cryptographic origin (the exact domain). Even if you are tricked into visiting a near-identical phishing replica like \`accounts-g00gle.com\`, your browser detects the domain mismatch and your key will simply refuse to sign the authentication request.

---

### Essential 2FA Checklist for 2026

- [ ] **Migrate away from SMS** on your primary email, banking, and password manager.
- [ ] **Save your Recovery / Backup Codes**: When enabling 2FA, services give you single-use emergency backup codes. Print them out or store them in a secure, offline fireproof safe.
- [ ] **Use an Open, Exportable Authenticator**: Avoid lock-in by using authenticators with encrypted export options (e.g., Aegis on Android, 2FAS, or your secure password manager).
- [ ] **Protect Your Email Above All Else**: Your primary email is the master key to your digital identity because it can reset passwords for every other account. Protect it with hardware keys or strong TOTP immediately.
`
  },
  {
    slug: "passwords-vs-passphrases-vs-passkeys",
    title: "Passwords vs. Passphrases vs. Passkeys: The Future of Digital Identity",
    subtitle: "Why 4 random dictionary words beat complex symbols, and how cryptographic passkeys are gradually killing the password.",
    excerpt: "For three decades, we have been told to create 8-character passwords with uppercase, numbers, and symbols that even humans cannot remember. It turns out the mathematics favored passphrases all along.",
    publishedAt: "March 2026",
    readTime: "8 min read",
    author: {
      name: "SecurityTools Research Team",
      role: "Application Security & Cryptography"
    },
    category: "Password Security",
    tags: ["Passphrases", "Diceware", "Passkeys", "WebAuthn", "NIST Guidelines"],
    content: `
### The Great Password Blunder

In 2003, the National Institute of Standards and Technology (NIST) published Special Publication 800-63, advising organizations to require arbitrary character complexity: at least one capital letter, one number, one symbol, and frequent 90-day expiration cycles.

The author of that original document, Bill Burr, publicly apologized years later. The rule resulted in a human usability disaster: users simply picked predictable words, capitalized the first letter, substituted \`o\` with \`0\`, and appended \`!1\` at the end (\`P@ssw0rd!1\`), incrementing the number every 90 days.

In 2017, NIST completely reversed its official guidance in **NIST SP 800-63B**:
- **Eliminate arbitrary composition rules.**
- **Eliminate forced 90-day rotation** (which only degrades password entropy).
- **Prioritize raw length and check against breach databases.**

---

### Enter the Passphrase: Why Correct Horse Battery Staple Works

In 2011, XKCD webcomic #936 famously illustrated the mathematical difference between:
- \`Tr0ub4dor&3\` (hard for humans to remember, trivial for computers to crack)
- \`correct horse battery staple\` (trivial for humans to remember, computationally impossible to crack)

#### The Mathematics of Diceware
When you pick 4 or 5 truly random words from a standardized wordlist of 7,776 words (like the Electronic Frontier Foundation's Diceware list):

- Number of possible combinations for 1 word: $7,776 = 2^{12.92}$ (approx 13 bits of entropy).
- 4 random words: $7,776^4 \\approx 3.65 \\times 10^{15}$ combinations (approx 52 bits of entropy).
- 5 random words: $7,776^5 \\approx 2.84 \\times 10^{19}$ combinations (**approx 65 bits of entropy**).
- 6 random words: **approx 77.5 bits of entropy**.

To crack a 5-word Diceware passphrase offline, an attacker attempting 100 billion guesses every second would need on average **4,500 years** of continuous compute time. Yet you can easily visualize a "copper canyon beacon wolf" and remember it for life.

---

### The Evolution: Passkeys & WebAuthn

While passphrases are the ideal master password for your vault or full-disk encryption, the tech industry is transitioning toward **Passkeys**.

Built upon the W3C WebAuthn standard and FIDO Alliance specifications, passkeys replace shared secrets entirely with **asymmetric public-key cryptography**:

1. **No Shared Secret to Leak**: The website only stores your public key. If the company's database is hacked, there is no password hash or secret to steal.
2. **Device-Bound or Synced**: Passkeys can be stored in your hardware device's Secure Enclave (Apple iCloud Keychain, Google Password Manager, 1Password, Bitwarden).
3. **Phishing-Proof by Design**: Because passkeys are cryptographically bound to the exact origin domain, a phishing site cannot harvest your credentials.

---

### Summary: When to Use What

| Authentication Type | Ideal Use Case | Security Level | Memorability |
| :--- | :--- | :--- | :--- |
| **Passphrase (Diceware)** | Master Password for Password Manager, Device Encryption | ⭐⭐⭐⭐⭐ (Very High) | Extremely Memorable |
| **Random Password (16-32 Chars)** | Individual website accounts stored inside your vault | ⭐⭐⭐⭐⭐ (Maximum) | Stored in vault (no need to memorize) |
| **Passkey (FIDO2 / WebAuthn)** | Daily web logins (Google, GitHub, banking where supported) | ⭐⭐⭐⭐⭐ (Phishing-Proof) | Zero memorization (Biometric / Key) |
| **Simple Password (\`Password123!\`)** | **Never use anywhere** | ❌ Fatal Vulnerability | Poor |
`
  }
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
