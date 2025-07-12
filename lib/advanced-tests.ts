export interface TestLevel {
  id: string;
  name: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  minWPM: number;
  maxWPM: number;
}

export interface TestType {
  id: string;
  name: string;
  description: string;
  category: "speed" | "accuracy" | "endurance" | "specialized";
}

export const TEST_LEVELS: TestLevel[] = [
  {
    id: "beginner",
    name: "Beginner",
    description: "Basic typing with common words and simple sentences",
    difficulty: "beginner",
    minWPM: 0,
    maxWPM: 30,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    description: "Moderate complexity with varied vocabulary",
    difficulty: "intermediate",
    minWPM: 30,
    maxWPM: 60,
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "Complex sentences with technical and academic vocabulary",
    difficulty: "advanced",
    minWPM: 60,
    maxWPM: 100,
  },
  {
    id: "expert",
    name: "Expert",
    description: "Professional-level content with specialized terminology",
    difficulty: "expert",
    minWPM: 100,
    maxWPM: 200,
  },
];

export const TEST_TYPES: TestType[] = [
  {
    id: "speed",
    name: "Speed Test",
    description: "Focus on typing speed with accuracy requirements",
    category: "speed",
  },
  {
    id: "accuracy",
    name: "Accuracy Test",
    description: "Emphasize precision over speed",
    category: "accuracy",
  },
  {
    id: "endurance",
    name: "Endurance Test",
    description: "Longer texts to test sustained typing ability",
    category: "endurance",
  },
  {
    id: "programming",
    name: "Programming",
    description: "Code snippets and technical content",
    category: "specialized",
  },
  {
    id: "numbers",
    name: "Numbers & Symbols",
    description: "Focus on numeric and special character typing",
    category: "specialized",
  },
  {
    id: "punctuation",
    name: "Punctuation",
    description: "Emphasis on proper punctuation and formatting",
    category: "specialized",
  },
  {
    id: "paragraph",
    name: "Paragraph",
    description: "Type a full paragraph of natural text.",
    category: "specialized",
  },
];

// Test content organized by level and type
export const ADVANCED_TEST_CONTENT = {
  beginner: {
    speed: [
      "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet at least once.",
      "Pack my box with five dozen liquor jugs. This pangram is commonly used to test typing skills.",
      "How vexingly quick daft zebras jump! Another pangram that uses all letters of the alphabet.",
      "The five boxing wizards jump quickly. This is a popular pangram for typing practice.",
      "Sphinx of black quartz, judge my vow. A short but effective pangram for beginners.",
    ],
    accuracy: [
      "Accuracy is more important than speed when learning to type. Take your time and focus on hitting the right keys.",
      "Practice makes perfect. The more you practice typing accurately, the better you will become over time.",
      "Slow and steady wins the race. It's better to type slowly and correctly than quickly with many errors.",
      "Every keystroke matters. Pay attention to each character you type and strive for perfection.",
      "Building good habits early will help you become a proficient typist in the long run.",
    ],
    endurance: [
      "This is a longer text designed to test your endurance and ability to maintain focus over an extended period. Typing for longer periods helps build stamina and consistency. The goal is to maintain good form and accuracy throughout the entire session. Remember to take breaks when needed and stay comfortable while typing. Consistent practice is the key to improvement.",
      "Learning to type efficiently is a valuable skill that can benefit you in many areas of life. Whether you're writing emails, creating documents, or coding, good typing skills can save you time and reduce frustration. Start with the basics and gradually increase your speed and accuracy. Don't get discouraged if you make mistakes - everyone does when learning. Focus on improvement rather than perfection.",
    ],
    programming: [
      "function hello() { console.log('Hello, world!'); }",
      "if (condition) { return true; } else { return false; }",
      "const array = [1, 2, 3, 4, 5];",
      "let sum = 0; for (let i = 0; i < array.length; i++) { sum += array[i]; }",
    ],
    numbers: [
      "123 456 789 012 345 678 901 234 567 890",
      "1.23 + 4.56 = 5.79",
      "Phone: (555) 123-4567",
      "Date: 12/25/2023",
    ],
    punctuation: [
      "Hello, how are you today? I hope you're doing well!",
      'She said, "I love typing practice."',
      "The meeting is at 3:00 PM; don't be late!",
      "Items: apples, oranges, and bananas.",
    ],
    paragraph: [
      "Typing is a valuable skill that helps you communicate quickly and efficiently. Practicing every day will help you improve your speed and accuracy. Remember to keep your hands relaxed and your eyes on the screen.",
      "The sun rises in the east and sets in the west. Every morning, birds sing and people start their day with new hopes and dreams.",
    ],
  },
  intermediate: {
    speed: [
      "The Internet is a global system of interconnected computer networks that use the standard Internet protocol suite to link devices worldwide. It is a network of networks that consists of private, public, academic, business, and government networks of local to global scope.",
      "Artificial intelligence is the simulation of human intelligence in machines that are programmed to think and learn like humans. These machines can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
      "Climate change refers to significant, long-term changes in the global climate. The average surface temperature of Earth has increased over the last century, and this warming trend is expected to continue. Human activities, particularly the burning of fossil fuels, have contributed to this change.",
    ],
    accuracy: [
      "Precision in typing is crucial for professional communication. Every character, space, and punctuation mark contributes to the clarity and professionalism of your written work. Developing muscle memory for accurate typing requires consistent practice and attention to detail.",
      "The ability to type without looking at the keyboard is a valuable skill that can significantly improve your productivity. Touch typing allows you to focus on your thoughts and ideas rather than the mechanics of typing. This skill becomes increasingly important in today's digital world.",
    ],
    endurance: [
      "Professional typing requires the ability to maintain consistent speed and accuracy over extended periods. This endurance test will challenge your ability to stay focused and maintain good form throughout a longer typing session. Remember to maintain proper posture and take short breaks if needed.",
      "The development of typing skills is a gradual process that requires patience and persistence. As you practice, you'll notice improvements in both speed and accuracy. These improvements come from building muscle memory and developing efficient finger movements.",
    ],
    programming: [
      "function calculateSum(numbers) { return numbers.reduce((sum, num) => sum + num, 0); }",
      "class Calculator { constructor() { this.result = 0; } add(x) { this.result += x; return this; } }",
      "const filtered = array.filter(item => item > 5).map(item => item * 2);",
      "try { const response = await fetch(url); const data = await response.json(); } catch (error) { console.error(error); }",
    ],
    numbers: [
      "Account: 1234-5678-9012-3456, Balance: $1,234.56",
      "Coordinates: 40.7128° N, 74.0060° W",
      "Temperature: 72.5°F, Humidity: 45.2%",
      'Dimensions: 12.5" × 8.75" × 2.25"',
    ],
    punctuation: [
      'The professor asked, "Have you completed your assignment?" I replied, "Yes, I finished it yesterday."',
      "We need to consider three factors: cost, time, and quality; however, we can't compromise on safety.",
      "The meeting will be held on Monday, January 15th, 2024, at 2:30 PM in Conference Room A.",
      'She exclaimed, "What an amazing performance!" and then added, "I\'ve never seen anything like it."',
    ],
    paragraph: [
      "The internet has revolutionized the way we access information and communicate with others. With just a few keystrokes, you can connect with people around the world, learn new skills, and stay informed about current events.",
      "Learning to type quickly and accurately can open up many opportunities in both education and the workplace. It allows you to express your ideas more efficiently and keep up with the demands of modern technology.",
    ],
  },
  advanced: {
    speed: [
      "Quantum computing represents a paradigm shift in computational power, utilizing quantum mechanical phenomena such as superposition and entanglement to process information. Unlike classical computers that use bits representing either 0 or 1, quantum computers use quantum bits or qubits that can exist in multiple states simultaneously.",
      "Machine learning algorithms have revolutionized the field of artificial intelligence by enabling computers to learn patterns and make predictions from data without being explicitly programmed. These algorithms can identify complex relationships in large datasets and adapt their behavior based on new information.",
      "The blockchain technology underlying cryptocurrencies like Bitcoin provides a decentralized, transparent, and immutable ledger for recording transactions. Each block in the chain contains a cryptographic hash of the previous block, creating a secure and tamper-resistant system.",
    ],
    accuracy: [
      "Advanced typing proficiency requires not only speed and accuracy but also the ability to handle complex technical terminology, foreign words, and specialized formatting. Professional typists must maintain consistent quality while adapting to various content types and formatting requirements.",
      "The transition from intermediate to advanced typing involves developing the ability to type complex technical documents, academic papers, and professional correspondence with minimal errors. This level of proficiency requires extensive practice and attention to detail.",
    ],
    endurance: [
      "Professional typists and writers often work on lengthy documents that require sustained concentration and consistent performance. This endurance test simulates real-world typing scenarios where maintaining quality over extended periods is essential for productivity and professional success.",
      "Advanced typing skills enable professionals to handle complex documents, technical specifications, and detailed reports efficiently. The ability to maintain accuracy and speed throughout lengthy typing sessions is crucial for meeting deadlines and maintaining professional standards.",
    ],
    programming: [
      "const debounce = (func, wait) => { let timeout; return function executedFunction(...args) { const later = () => { clearTimeout(timeout); func(...args); }; clearTimeout(timeout); timeout = setTimeout(later, wait); }; };",
      "class BinarySearchTree { constructor() { this.root = null; } insert(value) { const newNode = new Node(value); if (!this.root) { this.root = newNode; return; } this.insertNode(this.root, newNode); } }",
      "const memoize = (fn) => { const cache = new Map(); return (...args) => { const key = JSON.stringify(args); if (cache.has(key)) return cache.get(key); const result = fn.apply(this, args); cache.set(key, result); return result; }; };",
    ],
    numbers: [
      "IP Address: 192.168.1.100, Port: 8080, MAC: 00:1B:44:11:3A:B7",
      "Coordinates: 40° 42' 51\" N, 74° 0' 21\" W, Elevation: 33 ft",
      "Scientific Notation: 6.022 × 10²³, π ≈ 3.14159, e ≈ 2.71828",
      "Financial: $1,234,567.89, ROI: 15.7%, CAGR: 8.3%",
    ],
    punctuation: [
      'The researcher stated, "Our findings indicate a significant correlation (p < 0.001) between variables A and B." However, she cautioned, "Correlation doesn\'t imply causation."',
      "The document outlined three main objectives: (1) increase efficiency by 25%; (2) reduce costs by 15%; and (3) improve customer satisfaction scores. Each objective had specific metrics and timelines.",
      'According to the manual: "Install the software in the following order: first, the base package; second, the updates; and finally, the plugins. Failure to follow this sequence may result in system instability."',
    ],
    paragraph: [
      "Technological advancements in the twenty-first century have dramatically altered the landscape of communication, commerce, and education. The proliferation of smartphones and high-speed internet has enabled instant access to information and global collaboration.",
      "Effective communication is not only about conveying information but also about understanding the nuances of language, tone, and context. Mastering these skills is essential for success in both personal and professional settings.",
    ],
  },
  expert: {
    speed: [
      "The implementation of neural network architectures in deep learning systems requires sophisticated understanding of mathematical concepts including linear algebra, calculus, and probability theory. These systems process vast amounts of data through multiple layers of interconnected nodes, each performing complex mathematical transformations.",
      "Cryptographic protocols ensure secure communication in digital systems through the use of mathematical algorithms that provide confidentiality, integrity, and authenticity. Modern cryptography relies on computational complexity assumptions and mathematical problems that are believed to be difficult to solve.",
      "The development of autonomous vehicles involves the integration of multiple advanced technologies including computer vision, sensor fusion, machine learning algorithms, and real-time decision-making systems. These vehicles must process environmental data from various sensors and make split-second decisions.",
    ],
    accuracy: [
      "Expert-level typing proficiency encompasses the ability to handle highly technical documentation, legal contracts, medical records, and other specialized content with absolute precision. These professionals must maintain perfect accuracy while working with complex terminology and strict formatting requirements.",
      "The highest level of typing expertise involves the ability to transcribe complex technical discussions, academic presentations, and professional meetings with minimal errors. This requires not only exceptional typing skills but also strong listening comprehension and subject matter knowledge.",
    ],
    endurance: [
      "Professional transcriptionists and technical writers often work on extensive documents that require sustained concentration over many hours. This expert-level endurance test simulates the demanding conditions faced by professionals who must maintain exceptional accuracy and speed throughout lengthy work sessions.",
      "Expert typists must demonstrate the ability to handle marathon typing sessions while maintaining perfect accuracy and consistent speed. This level of endurance is essential for professionals working in fields such as court reporting, medical transcription, and technical documentation.",
    ],
    programming: [
      "const curry = (fn) => { const arity = fn.length; return function curried(...args) { if (args.length >= arity) return fn.apply(this, args); return (...moreArgs) => curried.apply(this, args.concat(moreArgs)); }; };",
      "class RedBlackTree extends BinarySearchTree { insert(value) { const newNode = super.insert(value); this.fixViolations(newNode); } fixViolations(node) { while (node !== this.root && node.color === 'red') { if (node.parent.color === 'red') { this.rebalance(node); } } } }",
      "const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))); const pipe = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)));",
    ],
    numbers: [
      "Network: 10.0.0.0/8, Gateway: 10.0.0.1, DNS: 8.8.8.8, 8.8.4.4",
      "Astronomical: RA: 18h 36m 56.3s, Dec: +38° 47' 01\", Magnitude: 2.1",
      "Mathematical: ∫₀^∞ e^(-x²) dx = √π/2, ∑(n=1 to ∞) 1/n² = π²/6",
      "Engineering: σ = F/A, E = mc², F = G(m₁m₂)/r²",
    ],
    punctuation: [
      'The legal document stipulated: "Party A shall deliver the goods to Party B at the specified location (as defined in Section 3.2) within thirty (30) days of the effective date; failure to comply shall result in penalties as outlined in Article 7."',
      'The academic paper concluded: "Our research demonstrates a statistically significant relationship (p < 0.001, 95% CI: 0.45-0.67) between the variables under investigation. However, we acknowledge several limitations: (1) sample size constraints; (2) potential selection bias; and (3) measurement error."',
      'The technical specification stated: "The system must support concurrent users (minimum: 1,000; target: 10,000) while maintaining response times below 200ms for 95% of requests. Performance degradation beyond these thresholds constitutes a critical failure condition."',
    ],
    paragraph: [
      "In the realm of scientific research, the ability to synthesize complex information and articulate findings with clarity is paramount. Researchers must not only conduct rigorous experiments but also communicate their results to both specialized and general audiences.",
      "The evolution of artificial intelligence and machine learning has introduced unprecedented challenges and opportunities. Professionals in this field must continuously adapt to new methodologies and ethical considerations while striving for innovation.",
    ],
  },
};

// Helper function to get random test content
export const getRandomTestContent = (
  level: string,
  type: string,
  length: "short" | "medium" | "long" = "medium"
): string => {
  const content =
    ADVANCED_TEST_CONTENT[level as keyof typeof ADVANCED_TEST_CONTENT]?.[
      type as keyof typeof ADVANCED_TEST_CONTENT.beginner
    ];

  if (!content || content.length === 0) {
    return "The quick brown fox jumps over the lazy dog.";
  }

  const randomIndex = Math.floor(Math.random() * content.length);
  let selectedContent = content[randomIndex];

  // Adjust length based on preference
  if (length === "short" && selectedContent.length > 200) {
    selectedContent = selectedContent.substring(0, 200) + "...";
  } else if (length === "long" && selectedContent.length < 500) {
    // For long content, we might want to combine multiple sentences
    const additionalContent = content[(randomIndex + 1) % content.length];
    selectedContent = selectedContent + " " + additionalContent;
  }

  return selectedContent;
};

// Helper function to get recommended test duration based on level and type
export const getRecommendedDuration = (level: string, type: string): number => {
  const baseDurations = {
    beginner: {
      speed: 30,
      accuracy: 45,
      endurance: 60,
      programming: 30,
      numbers: 30,
      punctuation: 30,
    },
    intermediate: {
      speed: 45,
      accuracy: 60,
      endurance: 90,
      programming: 45,
      numbers: 45,
      punctuation: 45,
    },
    advanced: {
      speed: 60,
      accuracy: 90,
      endurance: 120,
      programming: 60,
      numbers: 60,
      punctuation: 60,
    },
    expert: {
      speed: 90,
      accuracy: 120,
      endurance: 180,
      programming: 90,
      numbers: 90,
      punctuation: 90,
    },
  };

  return (
    baseDurations[level as keyof typeof baseDurations]?.[
      type as keyof typeof baseDurations.beginner
    ] || 60
  );
};
