export const domains = {
  'programming-languages': {
    name: 'Programming Languages',
    icon: '💻',
    description: 'Master popular programming languages',
    topics: [
      { id: 'python', name: 'Python', icon: '🐍', description: 'Versatile and beginner-friendly', difficulty: 'Beginner', xp: 100 },
      { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Language of the web', difficulty: 'Beginner', xp: 100 },
      { id: 'java', name: 'Java', icon: '☕', description: 'Enterprise-grade OOP language', difficulty: 'Intermediate', xp: 120 },
      { id: 'c', name: 'C', icon: '🔧', description: 'Foundation of modern programming', difficulty: 'Intermediate', xp: 130 },
      { id: 'cpp', name: 'C++', icon: '⚙️', description: 'Powerful system programming', difficulty: 'Advanced', xp: 150 },
      { id: 'typescript', name: 'TypeScript', icon: '📘', description: 'JavaScript with types', difficulty: 'Intermediate', xp: 110 },
      { id: 'go', name: 'Go', icon: '🐹', description: 'Fast and concurrent', difficulty: 'Intermediate', xp: 120 },
      { id: 'rust', name: 'Rust', icon: '🦀', description: 'Memory-safe systems language', difficulty: 'Advanced', xp: 160 },
      { id: 'kotlin', name: 'Kotlin', icon: '🎯', description: 'Modern Android development', difficulty: 'Intermediate', xp: 115 },
      { id: 'swift', name: 'Swift', icon: '🍎', description: 'iOS app development', difficulty: 'Intermediate', xp: 115 },
      { id: 'php', name: 'PHP', icon: '🐘', description: 'Server-side web scripting', difficulty: 'Beginner', xp: 90 },
      { id: 'ruby', name: 'Ruby', icon: '💎', description: 'Elegant and productive', difficulty: 'Beginner', xp: 95 },
      { id: 'r', name: 'R', icon: '📊', description: 'Statistical computing', difficulty: 'Intermediate', xp: 110 },
      { id: 'dart', name: 'Dart', icon: '🎯', description: 'Flutter app development', difficulty: 'Beginner', xp: 100 },
      { id: 'scala', name: 'Scala', icon: '🔺', description: 'Functional JVM language', difficulty: 'Advanced', xp: 140 }
    ]
  },
  'web-development': {
    name: 'Web Development',
    icon: '🌐',
    description: 'Build modern web applications',
    topics: [
      { id: 'html', name: 'HTML', icon: '📄', description: 'Structure of web pages', difficulty: 'Beginner', xp: 50 },
      { id: 'css', name: 'CSS', icon: '🎨', description: 'Styling and layouts', difficulty: 'Beginner', xp: 60 },
      { id: 'react', name: 'React', icon: '⚛️', description: 'UI component library', difficulty: 'Intermediate', xp: 130 },
      { id: 'nextjs', name: 'Next.js', icon: '▲', description: 'React framework', difficulty: 'Intermediate', xp: 140 },
      { id: 'vue', name: 'Vue', icon: '💚', description: 'Progressive framework', difficulty: 'Intermediate', xp: 120 },
      { id: 'angular', name: 'Angular', icon: '🅰️', description: 'Full-featured framework', difficulty: 'Advanced', xp: 150 },
      { id: 'nodejs', name: 'Node.js', icon: '🟢', description: 'JavaScript runtime', difficulty: 'Intermediate', xp: 120 },
      { id: 'express', name: 'Express', icon: '🚂', description: 'Node.js web framework', difficulty: 'Intermediate', xp: 110 },
      { id: 'tailwind', name: 'Tailwind CSS', icon: '🌊', description: 'Utility-first CSS', difficulty: 'Beginner', xp: 80 },
      { id: 'rest-api', name: 'REST APIs', icon: '🔌', description: 'Web service architecture', difficulty: 'Intermediate', xp: 100 }
    ]
  },
  'data-structures-algorithms': {
    name: 'Data Structures & Algorithms',
    icon: '🧮',
    description: 'Master problem-solving fundamentals',
    topics: [
      { id: 'arrays', name: 'Arrays', icon: '📊', description: 'Linear data collection', difficulty: 'Beginner', xp: 80 },
      { id: 'linked-lists', name: 'Linked Lists', icon: '🔗', description: 'Dynamic data structure', difficulty: 'Beginner', xp: 90 },
      { id: 'stacks', name: 'Stacks', icon: '📚', description: 'LIFO data structure', difficulty: 'Beginner', xp: 85 },
      { id: 'queues', name: 'Queues', icon: '🎫', description: 'FIFO data structure', difficulty: 'Beginner', xp: 85 },
      { id: 'trees', name: 'Trees', icon: '🌳', description: 'Hierarchical structure', difficulty: 'Intermediate', xp: 120 },
      { id: 'graphs', name: 'Graphs', icon: '🕸️', description: 'Network data structure', difficulty: 'Advanced', xp: 150 },
      { id: 'sorting', name: 'Sorting Algorithms', icon: '🔢', description: 'Organize data efficiently', difficulty: 'Intermediate', xp: 110 },
      { id: 'searching', name: 'Searching Algorithms', icon: '🔍', description: 'Find data quickly', difficulty: 'Intermediate', xp: 100 },
      { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🎯', description: 'Optimization technique', difficulty: 'Advanced', xp: 160 },
      { id: 'recursion', name: 'Recursion', icon: '🔄', description: 'Self-referential functions', difficulty: 'Intermediate', xp: 115 }
    ]
  },
  'databases': {
    name: 'Databases',
    icon: '🗄️',
    description: 'Store and manage data effectively',
    topics: [
      { id: 'sql', name: 'SQL', icon: '📊', description: 'Structured query language', difficulty: 'Beginner', xp: 100 },
      { id: 'mysql', name: 'MySQL', icon: '🐬', description: 'Popular relational DB', difficulty: 'Beginner', xp: 110 },
      { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', description: 'Advanced relational DB', difficulty: 'Intermediate', xp: 120 },
      { id: 'mongodb', name: 'MongoDB', icon: '🍃', description: 'NoSQL document database', difficulty: 'Intermediate', xp: 115 },
      { id: 'redis', name: 'Redis', icon: '🔴', description: 'In-memory data store', difficulty: 'Intermediate', xp: 110 },
      { id: 'firebase', name: 'Firebase', icon: '🔥', description: 'Real-time database', difficulty: 'Beginner', xp: 95 }
    ]
  },
  'machine-learning': {
    name: 'Machine Learning',
    icon: '🤖',
    description: 'Build intelligent systems',
    topics: [
      { id: 'ml-basics', name: 'ML Basics', icon: '📚', description: 'Introduction to ML', difficulty: 'Beginner', xp: 100 },
      { id: 'supervised-learning', name: 'Supervised Learning', icon: '👨‍🏫', description: 'Learn from labeled data', difficulty: 'Intermediate', xp: 130 },
      { id: 'unsupervised-learning', name: 'Unsupervised Learning', icon: '🔍', description: 'Find patterns in data', difficulty: 'Intermediate', xp: 130 },
      { id: 'neural-networks', name: 'Neural Networks', icon: '🧠', description: 'Deep learning foundations', difficulty: 'Advanced', xp: 160 },
      { id: 'tensorflow', name: 'TensorFlow', icon: '🔶', description: 'ML framework', difficulty: 'Advanced', xp: 150 },
      { id: 'pytorch', name: 'PyTorch', icon: '🔥', description: 'Deep learning library', difficulty: 'Advanced', xp: 150 }
    ]
  },
  'networking': {
    name: 'Networking',
    icon: '🌐',
    description: 'Understand computer networks',
    topics: [
      { id: 'tcp-ip', name: 'TCP/IP', icon: '📡', description: 'Internet protocol suite', difficulty: 'Intermediate', xp: 120 },
      { id: 'http-https', name: 'HTTP/HTTPS', icon: '🔒', description: 'Web protocols', difficulty: 'Beginner', xp: 90 },
      { id: 'dns', name: 'DNS', icon: '🗺️', description: 'Domain name system', difficulty: 'Beginner', xp: 85 },
      { id: 'osi-model', name: 'OSI Model', icon: '📊', description: 'Network layer model', difficulty: 'Intermediate', xp: 110 }
    ]
  },
  'operating-systems': {
    name: 'Operating Systems',
    icon: '💾',
    description: 'Learn OS fundamentals',
    topics: [
      { id: 'processes', name: 'Processes', icon: '⚙️', description: 'Program execution', difficulty: 'Intermediate', xp: 120 },
      { id: 'threads', name: 'Threads', icon: '🧵', description: 'Concurrent execution', difficulty: 'Intermediate', xp: 115 },
      { id: 'memory-management', name: 'Memory Management', icon: '💾', description: 'RAM allocation', difficulty: 'Advanced', xp: 140 },
      { id: 'file-systems', name: 'File Systems', icon: '📁', description: 'Data organization', difficulty: 'Intermediate', xp: 110 }
    ]
  },
  'cybersecurity': {
    name: 'Cybersecurity',
    icon: '🔐',
    description: 'Protect systems and data',
    topics: [
      { id: 'encryption', name: 'Encryption', icon: '🔒', description: 'Secure data transmission', difficulty: 'Intermediate', xp: 130 },
      { id: 'authentication', name: 'Authentication', icon: '🔑', description: 'Verify identity', difficulty: 'Beginner', xp: 100 },
      { id: 'penetration-testing', name: 'Penetration Testing', icon: '🎯', description: 'Ethical hacking', difficulty: 'Advanced', xp: 160 },
      { id: 'network-security', name: 'Network Security', icon: '🛡️', description: 'Protect networks', difficulty: 'Intermediate', xp: 125 }
    ]
  },
  'mobile-development': {
    name: 'Mobile Development',
    icon: '📱',
    description: 'Build mobile applications',
    topics: [
      { id: 'android', name: 'Android', icon: '🤖', description: 'Android app development', difficulty: 'Intermediate', xp: 130 },
      { id: 'ios', name: 'iOS', icon: '🍎', description: 'iOS app development', difficulty: 'Intermediate', xp: 130 },
      { id: 'flutter', name: 'Flutter', icon: '🦋', description: 'Cross-platform apps', difficulty: 'Intermediate', xp: 125 },
      { id: 'react-native', name: 'React Native', icon: '⚛️', description: 'React for mobile', difficulty: 'Intermediate', xp: 125 }
    ]
  },
  'devops-cloud': {
    name: 'DevOps & Cloud',
    icon: '☁️',
    description: 'Deploy and manage applications',
    topics: [
      { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containerization platform', difficulty: 'Intermediate', xp: 120 },
      { id: 'kubernetes', name: 'Kubernetes', icon: '☸️', description: 'Container orchestration', difficulty: 'Advanced', xp: 150 },
      { id: 'aws', name: 'AWS', icon: '☁️', description: 'Amazon cloud services', difficulty: 'Intermediate', xp: 140 },
      { id: 'ci-cd', name: 'CI/CD', icon: '🔄', description: 'Continuous integration', difficulty: 'Intermediate', xp: 115 },
      { id: 'git', name: 'Git', icon: '📦', description: 'Version control', difficulty: 'Beginner', xp: 90 }
    ]
  }
};

export const getAllDomains = () => {
  return Object.keys(domains).map(key => ({
    id: key,
    ...domains[key]
  }));
};

export const getDomainById = (domainId) => {
  return domains[domainId] || null;
};

export const getTopicByIds = (domainId, topicId) => {
  const domain = domains[domainId];
  if (!domain) return null;
  return domain.topics.find(t => t.id === topicId) || null;
};

export const searchDomains = (query) => {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();
  return getAllDomains().filter(domain => 
    domain.name.toLowerCase().includes(lowerQuery) ||
    domain.description.toLowerCase().includes(lowerQuery)
  );
};
