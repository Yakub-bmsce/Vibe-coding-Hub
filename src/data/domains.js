export const domains = {
  'programming-languages': {
    name: 'Programming Languages',
    icon: '💻',
    description: 'Master popular programming languages',
    realWorld: {
      industries: ['Software Development', 'Web Services', 'Gaming', 'Finance', 'Healthcare', 'E-commerce'],
      jobRoles: [
        { title: 'Software Developer', salary: '₹5-20 LPA' },
        { title: 'Backend Engineer', salary: '₹6-25 LPA' },
        { title: 'Full Stack Developer', salary: '₹7-30 LPA' },
        { title: 'Python Developer', salary: '₹4-18 LPA' }
      ],
      tools: ['VS Code', 'Git', 'Docker', 'PyCharm', 'IntelliJ IDEA', 'Postman'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Uber', 'Flipkart', 'Swiggy'],
      projects: [
        'Build a REST API backend',
        'Create a web scraping tool',
        'Develop a CLI application'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['E-commerce', 'Media', 'Finance', 'Healthcare', 'Education', 'Startups'],
      jobRoles: [
        { title: 'Frontend Developer', salary: '₹4-18 LPA' },
        { title: 'Full Stack Developer', salary: '₹6-25 LPA' },
        { title: 'UI Engineer', salary: '₹5-20 LPA' },
        { title: 'React Developer', salary: '₹5-22 LPA' }
      ],
      tools: ['React', 'Node.js', 'Figma', 'AWS', 'MongoDB', 'Docker', 'Tailwind CSS'],
      companies: ['Swiggy', 'Zomato', 'Razorpay', 'Flipkart', 'Amazon', 'Google', 'Meta'],
      projects: [
        'Build a portfolio website',
        'Create an e-commerce store',
        'Develop a social media dashboard'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['Tech Companies', 'Finance', 'Gaming', 'AI/ML', 'System Design', 'Competitive Programming'],
      jobRoles: [
        { title: 'Software Engineer', salary: '₹8-35 LPA' },
        { title: 'Algorithm Engineer', salary: '₹10-40 LPA' },
        { title: 'Competitive Programmer', salary: '₹12-50 LPA' },
        { title: 'Problem Solver', salary: '₹7-30 LPA' }
      ],
      tools: ['LeetCode', 'HackerRank', 'Codeforces', 'VS Code', 'GDB Debugger'],
      companies: ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix', 'Adobe'],
      projects: [
        'Solve 100 LeetCode problems',
        'Build a pathfinding visualizer',
        'Create a sorting algorithm visualizer'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['Finance', 'E-commerce', 'Healthcare', 'SaaS', 'Analytics', 'Enterprise'],
      jobRoles: [
        { title: 'Database Administrator', salary: '₹5-22 LPA' },
        { title: 'Data Engineer', salary: '₹7-28 LPA' },
        { title: 'Backend Developer', salary: '₹6-25 LPA' },
        { title: 'SQL Developer', salary: '₹4-18 LPA' }
      ],
      tools: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'AWS RDS'],
      companies: ['Oracle', 'Amazon', 'Microsoft', 'IBM', 'Flipkart', 'Paytm', 'PhonePe'],
      projects: [
        'Design a database schema',
        'Build a data warehouse',
        'Create a real-time analytics dashboard'
      ],
      demand: 'Stable'
    },
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
    realWorld: {
      industries: ['AI/ML', 'Healthcare', 'Finance', 'Autonomous Vehicles', 'Robotics', 'Research'],
      jobRoles: [
        { title: 'ML Engineer', salary: '₹8-35 LPA' },
        { title: 'Data Scientist', salary: '₹10-40 LPA' },
        { title: 'AI Researcher', salary: '₹12-50 LPA' },
        { title: 'NLP Engineer', salary: '₹9-38 LPA' }
      ],
      tools: ['Python', 'TensorFlow', 'PyTorch', 'Jupyter', 'Scikit-learn', 'Keras'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Tesla', 'OpenAI', 'NVIDIA', 'Meta'],
      projects: [
        'Build an image classifier',
        'Create a chatbot',
        'Develop a recommendation system'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['Telecom', 'ISPs', 'Cloud Services', 'Cybersecurity', 'Enterprise IT', 'IoT'],
      jobRoles: [
        { title: 'Network Engineer', salary: '₹4-18 LPA' },
        { title: 'Network Administrator', salary: '₹3-15 LPA' },
        { title: 'Cloud Network Architect', salary: '₹10-35 LPA' },
        { title: 'Security Engineer', salary: '₹6-25 LPA' }
      ],
      tools: ['Wireshark', 'Cisco Packet Tracer', 'Putty', 'Nmap', 'AWS VPC'],
      companies: ['Cisco', 'Juniper', 'AWS', 'Google Cloud', 'Airtel', 'Jio', 'Vodafone'],
      projects: [
        'Set up a home network',
        'Configure a VPN',
        'Build a network monitoring tool'
      ],
      demand: 'Stable'
    },
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
    realWorld: {
      industries: ['System Software', 'Embedded Systems', 'Cloud Infrastructure', 'Gaming', 'Mobile'],
      jobRoles: [
        { title: 'Systems Engineer', salary: '₹5-22 LPA' },
        { title: 'Kernel Developer', salary: '₹8-30 LPA' },
        { title: 'DevOps Engineer', salary: '₹6-28 LPA' },
        { title: 'Embedded Systems Engineer', salary: '₹4-20 LPA' }
      ],
      tools: ['Linux', 'Windows', 'Docker', 'VMware', 'VirtualBox', 'Bash'],
      companies: ['Microsoft', 'Red Hat', 'Canonical', 'Intel', 'AMD', 'ARM'],
      projects: [
        'Build a simple shell',
        'Create a process scheduler simulator',
        'Develop a file system'
      ],
      demand: 'Stable'
    },
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
    realWorld: {
      industries: ['Finance', 'Government', 'Healthcare', 'Defense', 'E-commerce', 'Consulting'],
      jobRoles: [
        { title: 'Security Analyst', salary: '₹5-22 LPA' },
        { title: 'Ethical Hacker', salary: '₹7-30 LPA' },
        { title: 'Security Architect', salary: '₹12-45 LPA' },
        { title: 'Penetration Tester', salary: '₹6-28 LPA' }
      ],
      tools: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Wireshark', 'Nmap', 'OWASP ZAP'],
      companies: ['Palo Alto', 'CrowdStrike', 'Cisco', 'IBM', 'Deloitte', 'EY', 'PwC'],
      projects: [
        'Perform a security audit',
        'Build a password manager',
        'Create a vulnerability scanner'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['Startups', 'E-commerce', 'Social Media', 'Gaming', 'Finance', 'Healthcare'],
      jobRoles: [
        { title: 'Android Developer', salary: '₹5-22 LPA' },
        { title: 'iOS Developer', salary: '₹6-25 LPA' },
        { title: 'Flutter Developer', salary: '₹5-20 LPA' },
        { title: 'React Native Developer', salary: '₹5-22 LPA' }
      ],
      tools: ['Android Studio', 'Xcode', 'Flutter', 'React Native', 'Firebase', 'Figma'],
      companies: ['Swiggy', 'Zomato', 'PhonePe', 'Paytm', 'Dream11', 'CRED', 'Meesho'],
      projects: [
        'Build a todo app',
        'Create a food delivery app',
        'Develop a fitness tracker'
      ],
      demand: 'High'
    },
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
    realWorld: {
      industries: ['Cloud Services', 'SaaS', 'E-commerce', 'Finance', 'Startups', 'Enterprise'],
      jobRoles: [
        { title: 'DevOps Engineer', salary: '₹6-28 LPA' },
        { title: 'Cloud Architect', salary: '₹10-40 LPA' },
        { title: 'Site Reliability Engineer', salary: '₹8-35 LPA' },
        { title: 'Platform Engineer', salary: '₹7-30 LPA' }
      ],
      tools: ['Docker', 'Kubernetes', 'AWS', 'Jenkins', 'Terraform', 'Ansible', 'Git'],
      companies: ['Amazon', 'Google', 'Microsoft', 'Netflix', 'Uber', 'Airbnb', 'Razorpay'],
      projects: [
        'Deploy an app on AWS',
        'Set up CI/CD pipeline',
        'Create a Docker container'
      ],
      demand: 'High'
    },
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
