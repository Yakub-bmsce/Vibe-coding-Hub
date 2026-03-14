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
      { id: 'python', name: 'Python', icon: '🐍', description: 'Versatile and beginner-friendly', difficulty: 'Beginner', xp: 100, roadmap: ['Syntax & Basics', 'Variables & Data Types', 'Control Flow', 'Functions', 'Lists & Dicts', 'OOP', 'File Handling', 'Modules & Packages', 'Error Handling', 'Projects'] },
      { id: 'javascript', name: 'JavaScript', icon: '⚡', description: 'Language of the web', difficulty: 'Beginner', xp: 100, roadmap: ['Syntax & Basics', 'Variables & Scope', 'Functions & Closures', 'DOM Manipulation', 'Events', 'Arrays & Objects', 'Async/Await', 'ES6+ Features', 'APIs & Fetch', 'Projects'] },
      { id: 'java', name: 'Java', icon: '☕', description: 'Enterprise-grade OOP language', difficulty: 'Intermediate', xp: 120, roadmap: ['Syntax & Setup', 'Data Types', 'OOP Concepts', 'Inheritance', 'Interfaces', 'Collections', 'Exception Handling', 'Generics', 'Multithreading', 'Projects'] },
      { id: 'c', name: 'C', icon: '🔧', description: 'Foundation of modern programming', difficulty: 'Intermediate', xp: 130, roadmap: ['Syntax & Setup', 'Variables & Types', 'Operators', 'Control Flow', 'Functions', 'Arrays & Strings', 'Pointers', 'Structs', 'File I/O', 'Projects'] },
      { id: 'cpp', name: 'C++', icon: '⚙️', description: 'Powerful system programming', difficulty: 'Advanced', xp: 150, roadmap: ['C++ Basics', 'OOP in C++', 'Templates', 'STL', 'Memory Management', 'Pointers & References', 'Operator Overloading', 'Inheritance', 'Multithreading', 'Projects'] },
      { id: 'typescript', name: 'TypeScript', icon: '📘', description: 'JavaScript with types', difficulty: 'Intermediate', xp: 110, roadmap: ['TS Setup', 'Basic Types', 'Interfaces', 'Type Aliases', 'Generics', 'Enums', 'Decorators', 'Modules', 'Advanced Types', 'Projects'] },
      { id: 'go', name: 'Go', icon: '🐹', description: 'Fast and concurrent', difficulty: 'Intermediate', xp: 120, roadmap: ['Go Setup', 'Syntax Basics', 'Functions', 'Structs', 'Interfaces', 'Goroutines', 'Channels', 'Error Handling', 'Packages', 'Projects'] },
      { id: 'rust', name: 'Rust', icon: '🦀', description: 'Memory-safe systems language', difficulty: 'Advanced', xp: 160, roadmap: ['Rust Setup', 'Ownership', 'Borrowing', 'Lifetimes', 'Structs & Enums', 'Pattern Matching', 'Traits', 'Error Handling', 'Concurrency', 'Projects'] },
      { id: 'kotlin', name: 'Kotlin', icon: '🎯', description: 'Modern Android development', difficulty: 'Intermediate', xp: 115, roadmap: ['Kotlin Basics', 'Variables & Types', 'Functions', 'Classes & Objects', 'Null Safety', 'Coroutines', 'Collections', 'Extension Functions', 'Android Basics', 'Projects'] },
      { id: 'swift', name: 'Swift', icon: '🍎', description: 'iOS app development', difficulty: 'Intermediate', xp: 115, roadmap: ['Swift Basics', 'Variables & Types', 'Optionals', 'Functions', 'Classes & Structs', 'Protocols', 'Error Handling', 'SwiftUI Basics', 'Networking', 'Projects'] },
      { id: 'php', name: 'PHP', icon: '🐘', description: 'Server-side web scripting', difficulty: 'Beginner', xp: 90, roadmap: ['PHP Basics', 'Variables & Types', 'Control Flow', 'Functions', 'Arrays', 'Forms & Input', 'MySQL Integration', 'Sessions & Cookies', 'OOP in PHP', 'Projects'] },
      { id: 'ruby', name: 'Ruby', icon: '💎', description: 'Elegant and productive', difficulty: 'Beginner', xp: 95, roadmap: ['Ruby Basics', 'Variables & Types', 'Methods', 'Arrays & Hashes', 'OOP', 'Blocks & Procs', 'Modules', 'File I/O', 'Ruby on Rails Intro', 'Projects'] },
      { id: 'r', name: 'R', icon: '📊', description: 'Statistical computing', difficulty: 'Intermediate', xp: 110, roadmap: ['R Setup', 'Data Types', 'Vectors & Lists', 'Data Frames', 'Control Flow', 'Functions', 'Data Visualization', 'Statistical Analysis', 'Packages', 'Projects'] },
      { id: 'dart', name: 'Dart', icon: '🎯', description: 'Flutter app development', difficulty: 'Beginner', xp: 100, roadmap: ['Dart Basics', 'Variables & Types', 'Functions', 'OOP', 'Async Programming', 'Collections', 'Error Handling', 'Flutter Intro', 'Widgets', 'Projects'] },
      { id: 'scala', name: 'Scala', icon: '🔺', description: 'Functional JVM language', difficulty: 'Advanced', xp: 140, roadmap: ['Scala Setup', 'Basics & Types', 'Functions', 'Collections', 'Pattern Matching', 'Case Classes', 'Traits', 'Futures', 'Akka Basics', 'Projects'] }
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
      { id: 'html', name: 'HTML', icon: '📄', description: 'Structure of web pages', difficulty: 'Beginner', xp: 50, roadmap: ['HTML Basics', 'Tags & Elements', 'Forms', 'Tables', 'Semantic HTML', 'Accessibility', 'HTML5 APIs', 'Media Elements', 'SEO Basics', 'Projects'] },
      { id: 'css', name: 'CSS', icon: '🎨', description: 'Styling and layouts', difficulty: 'Beginner', xp: 60, roadmap: ['CSS Basics', 'Selectors', 'Box Model', 'Flexbox', 'CSS Grid', 'Animations', 'Responsive Design', 'Variables', 'Preprocessors', 'Projects'] },
      { id: 'react', name: 'React', icon: '⚛️', description: 'UI component library', difficulty: 'Intermediate', xp: 130, roadmap: ['JSX Basics', 'Components', 'Props & State', 'Hooks', 'useEffect', 'Context API', 'React Router', 'Redux', 'Performance', 'Projects'] },
      { id: 'nextjs', name: 'Next.js', icon: '▲', description: 'React framework', difficulty: 'Intermediate', xp: 140, roadmap: ['Next.js Setup', 'Pages & Routing', 'SSR & SSG', 'API Routes', 'Data Fetching', 'Image Optimization', 'Middleware', 'Auth', 'Deployment', 'Projects'] },
      { id: 'vue', name: 'Vue', icon: '💚', description: 'Progressive framework', difficulty: 'Intermediate', xp: 120, roadmap: ['Vue Basics', 'Directives', 'Components', 'Props & Events', 'Vuex', 'Vue Router', 'Composition API', 'Lifecycle Hooks', 'Testing', 'Projects'] },
      { id: 'angular', name: 'Angular', icon: '🅰️', description: 'Full-featured framework', difficulty: 'Advanced', xp: 150, roadmap: ['Angular Setup', 'Components', 'Modules', 'Services', 'Dependency Injection', 'RxJS', 'Forms', 'HTTP Client', 'Testing', 'Projects'] },
      { id: 'nodejs', name: 'Node.js', icon: '🟢', description: 'JavaScript runtime', difficulty: 'Intermediate', xp: 120, roadmap: ['Node Basics', 'Modules', 'File System', 'HTTP Module', 'NPM', 'Express Setup', 'REST APIs', 'Authentication', 'Databases', 'Projects'] },
      { id: 'express', name: 'Express', icon: '🚂', description: 'Node.js web framework', difficulty: 'Intermediate', xp: 110, roadmap: ['Express Setup', 'Routing', 'Middleware', 'Request & Response', 'Error Handling', 'Template Engines', 'REST APIs', 'Authentication', 'Deployment', 'Projects'] },
      { id: 'tailwind', name: 'Tailwind CSS', icon: '🌊', description: 'Utility-first CSS', difficulty: 'Beginner', xp: 80, roadmap: ['Tailwind Setup', 'Utility Classes', 'Responsive Design', 'Flexbox & Grid', 'Typography', 'Colors', 'Dark Mode', 'Custom Config', 'Plugins', 'Projects'] },
      { id: 'rest-api', name: 'REST APIs', icon: '🔌', description: 'Web service architecture', difficulty: 'Intermediate', xp: 100, roadmap: ['HTTP Methods', 'Endpoints', 'Status Codes', 'Request/Response', 'Authentication', 'JSON', 'CRUD Operations', 'Versioning', 'Documentation', 'Projects'] }
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
      { id: 'arrays', name: 'Arrays', icon: '📊', description: 'Linear data collection', difficulty: 'Beginner', xp: 80, roadmap: ['Array Basics', '1D Arrays', '2D Arrays', 'Traversal', 'Searching', 'Sorting', 'Sliding Window', 'Two Pointers', 'Prefix Sum', 'Problems'] },
      { id: 'linked-lists', name: 'Linked Lists', icon: '🔗', description: 'Dynamic data structure', difficulty: 'Beginner', xp: 90, roadmap: ['Node Concept', 'Singly Linked List', 'Doubly Linked List', 'Circular List', 'Insertion', 'Deletion', 'Reversal', 'Cycle Detection', 'Merge Lists', 'Problems'] },
      { id: 'stacks', name: 'Stacks', icon: '📚', description: 'LIFO data structure', difficulty: 'Beginner', xp: 85, roadmap: ['Stack Concept', 'Push & Pop', 'Array Stack', 'Linked List Stack', 'Balanced Brackets', 'Infix to Postfix', 'Min Stack', 'Monotonic Stack', 'Applications', 'Problems'] },
      { id: 'queues', name: 'Queues', icon: '🎫', description: 'FIFO data structure', difficulty: 'Beginner', xp: 85, roadmap: ['Queue Concept', 'Enqueue & Dequeue', 'Circular Queue', 'Deque', 'Priority Queue', 'BFS with Queue', 'Sliding Window Max', 'Applications', 'Problems'] },
      { id: 'trees', name: 'Trees', icon: '🌳', description: 'Hierarchical structure', difficulty: 'Intermediate', xp: 120, roadmap: ['Tree Basics', 'Binary Tree', 'BST', 'Tree Traversals', 'Height & Depth', 'AVL Trees', 'Segment Tree', 'Trie', 'Heap', 'Problems'] },
      { id: 'graphs', name: 'Graphs', icon: '🕸️', description: 'Network data structure', difficulty: 'Advanced', xp: 150, roadmap: ['Graph Basics', 'Adjacency Matrix', 'Adjacency List', 'BFS', 'DFS', 'Shortest Path', 'Dijkstra', 'Topological Sort', 'MST', 'Problems'] },
      { id: 'sorting', name: 'Sorting Algorithms', icon: '🔢', description: 'Organize data efficiently', difficulty: 'Intermediate', xp: 110, roadmap: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Counting Sort', 'Radix Sort', 'Complexity Analysis', 'Problems'] },
      { id: 'searching', name: 'Searching Algorithms', icon: '🔍', description: 'Find data quickly', difficulty: 'Intermediate', xp: 100, roadmap: ['Linear Search', 'Binary Search', 'Search in Rotated Array', 'Ternary Search', 'Exponential Search', 'Interpolation Search', 'Search in 2D', 'Applications', 'Problems'] },
      { id: 'dynamic-programming', name: 'Dynamic Programming', icon: '🎯', description: 'Optimization technique', difficulty: 'Advanced', xp: 160, roadmap: ['DP Basics', 'Memoization', 'Tabulation', 'Fibonacci', 'Knapsack', 'LCS', 'LIS', 'Matrix Chain', 'DP on Trees', 'Problems'] },
      { id: 'recursion', name: 'Recursion', icon: '🔄', description: 'Self-referential functions', difficulty: 'Intermediate', xp: 115, roadmap: ['Recursion Basics', 'Base Case', 'Recursive Tree', 'Backtracking', 'Permutations', 'Subsets', 'N-Queens', 'Sudoku Solver', 'Divide & Conquer', 'Problems'] }
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
      { id: 'sql', name: 'SQL', icon: '📊', description: 'Structured query language', difficulty: 'Beginner', xp: 100, roadmap: ['SQL Basics', 'SELECT Queries', 'WHERE Clause', 'JOINs', 'GROUP BY', 'Subqueries', 'Indexes', 'Transactions', 'Stored Procedures', 'Projects'] },
      { id: 'mysql', name: 'MySQL', icon: '🐬', description: 'Popular relational DB', difficulty: 'Beginner', xp: 110, roadmap: ['MySQL Setup', 'CRUD Operations', 'Data Types', 'Constraints', 'Joins', 'Views', 'Stored Procedures', 'Triggers', 'Optimization', 'Projects'] },
      { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', description: 'Advanced relational DB', difficulty: 'Intermediate', xp: 120, roadmap: ['PostgreSQL Setup', 'CRUD', 'Advanced Queries', 'JSON Support', 'Full Text Search', 'Partitioning', 'Replication', 'Performance Tuning', 'Extensions', 'Projects'] },
      { id: 'mongodb', name: 'MongoDB', icon: '🍃', description: 'NoSQL document database', difficulty: 'Intermediate', xp: 115, roadmap: ['MongoDB Basics', 'Documents & Collections', 'CRUD', 'Queries', 'Aggregation', 'Indexes', 'Schema Design', 'Replication', 'Sharding', 'Projects'] },
      { id: 'redis', name: 'Redis', icon: '🔴', description: 'In-memory data store', difficulty: 'Intermediate', xp: 110, roadmap: ['Redis Basics', 'Data Types', 'Strings & Hashes', 'Lists & Sets', 'Sorted Sets', 'Pub/Sub', 'Caching', 'Persistence', 'Clustering', 'Projects'] },
      { id: 'firebase', name: 'Firebase', icon: '🔥', description: 'Real-time database', difficulty: 'Beginner', xp: 95, roadmap: ['Firebase Setup', 'Realtime DB', 'Firestore', 'Authentication', 'Storage', 'Cloud Functions', 'Hosting', 'Analytics', 'Security Rules', 'Projects'] }
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
      { id: 'ml-basics', name: 'ML Basics', icon: '📚', description: 'Introduction to ML', difficulty: 'Beginner', xp: 100, roadmap: ['What is ML?', 'Types of ML', 'Data Preprocessing', 'Feature Engineering', 'Model Training', 'Evaluation Metrics', 'Overfitting', 'Cross Validation', 'Model Selection', 'Projects'] },
      { id: 'supervised-learning', name: 'Supervised Learning', icon: '👨‍🏫', description: 'Learn from labeled data', difficulty: 'Intermediate', xp: 130, roadmap: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'KNN', 'Naive Bayes', 'Gradient Boosting', 'Evaluation', 'Projects'] },
      { id: 'unsupervised-learning', name: 'Unsupervised Learning', icon: '🔍', description: 'Find patterns in data', difficulty: 'Intermediate', xp: 130, roadmap: ['Clustering Basics', 'K-Means', 'DBSCAN', 'Hierarchical Clustering', 'PCA', 'Dimensionality Reduction', 'Autoencoders', 'Anomaly Detection', 'Applications', 'Projects'] },
      { id: 'neural-networks', name: 'Neural Networks', icon: '🧠', description: 'Deep learning foundations', difficulty: 'Advanced', xp: 160, roadmap: ['Perceptron', 'Activation Functions', 'Backpropagation', 'CNN', 'RNN', 'LSTM', 'Transformers', 'Transfer Learning', 'GANs', 'Projects'] },
      { id: 'tensorflow', name: 'TensorFlow', icon: '🔶', description: 'ML framework', difficulty: 'Advanced', xp: 150, roadmap: ['TF Setup', 'Tensors', 'Keras API', 'Model Building', 'Training', 'Evaluation', 'Saving Models', 'TF Lite', 'TF Serving', 'Projects'] },
      { id: 'pytorch', name: 'PyTorch', icon: '🔥', description: 'Deep learning library', difficulty: 'Advanced', xp: 150, roadmap: ['PyTorch Setup', 'Tensors', 'Autograd', 'Neural Networks', 'Training Loop', 'DataLoader', 'Transfer Learning', 'Custom Datasets', 'Deployment', 'Projects'] }
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
      { id: 'tcp-ip', name: 'TCP/IP', icon: '📡', description: 'Internet protocol suite', difficulty: 'Intermediate', xp: 120, roadmap: ['IP Addressing', 'Subnetting', 'TCP vs UDP', 'Three-Way Handshake', 'Routing', 'NAT', 'DHCP', 'ICMP', 'Troubleshooting', 'Projects'] },
      { id: 'http-https', name: 'HTTP/HTTPS', icon: '🔒', description: 'Web protocols', difficulty: 'Beginner', xp: 90, roadmap: ['HTTP Basics', 'Request Methods', 'Status Codes', 'Headers', 'Cookies', 'Sessions', 'HTTPS & SSL', 'HTTP/2', 'REST vs GraphQL', 'Projects'] },
      { id: 'dns', name: 'DNS', icon: '🗺️', description: 'Domain name system', difficulty: 'Beginner', xp: 85, roadmap: ['DNS Basics', 'Domain Names', 'DNS Records', 'A & CNAME Records', 'MX Records', 'DNS Resolution', 'TTL', 'DNS Security', 'Custom DNS', 'Projects'] },
      { id: 'osi-model', name: 'OSI Model', icon: '📊', description: 'Network layer model', difficulty: 'Intermediate', xp: 110, roadmap: ['OSI Overview', 'Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer', 'Session Layer', 'Presentation Layer', 'Application Layer', 'TCP/IP vs OSI', 'Projects'] }
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
      { id: 'processes', name: 'Processes', icon: '⚙️', description: 'Program execution', difficulty: 'Intermediate', xp: 120, roadmap: ['Process Basics', 'Process States', 'PCB', 'Process Creation', 'Scheduling', 'Context Switching', 'IPC', 'Signals', 'Zombie Processes', 'Projects'] },
      { id: 'threads', name: 'Threads', icon: '🧵', description: 'Concurrent execution', difficulty: 'Intermediate', xp: 115, roadmap: ['Thread Basics', 'User vs Kernel Threads', 'Thread Creation', 'Synchronization', 'Mutex', 'Semaphores', 'Deadlocks', 'Thread Pools', 'Race Conditions', 'Projects'] },
      { id: 'memory-management', name: 'Memory Management', icon: '💾', description: 'RAM allocation', difficulty: 'Advanced', xp: 140, roadmap: ['Memory Basics', 'Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement', 'Thrashing', 'Memory Allocation', 'Garbage Collection', 'Cache Memory', 'Projects'] },
      { id: 'file-systems', name: 'File Systems', icon: '📁', description: 'Data organization', difficulty: 'Intermediate', xp: 110, roadmap: ['File System Basics', 'File Types', 'Directory Structure', 'Inodes', 'FAT', 'NTFS', 'ext4', 'File Permissions', 'Mounting', 'Projects'] }
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
      { id: 'encryption', name: 'Encryption', icon: '🔒', description: 'Secure data transmission', difficulty: 'Intermediate', xp: 130, roadmap: ['Encryption Basics', 'Symmetric Encryption', 'Asymmetric Encryption', 'AES', 'RSA', 'Hashing', 'Digital Signatures', 'PKI', 'TLS/SSL', 'Projects'] },
      { id: 'authentication', name: 'Authentication', icon: '🔑', description: 'Verify identity', difficulty: 'Beginner', xp: 100, roadmap: ['Auth Basics', 'Passwords & Hashing', 'Sessions & Cookies', 'JWT', 'OAuth 2.0', 'MFA', 'SSO', 'Biometrics', 'Zero Trust', 'Projects'] },
      { id: 'penetration-testing', name: 'Penetration Testing', icon: '🎯', description: 'Ethical hacking', difficulty: 'Advanced', xp: 160, roadmap: ['Pen Test Basics', 'Reconnaissance', 'Scanning', 'Exploitation', 'Post Exploitation', 'SQL Injection', 'XSS', 'CSRF', 'Reporting', 'Projects'] },
      { id: 'network-security', name: 'Network Security', icon: '🛡️', description: 'Protect networks', difficulty: 'Intermediate', xp: 125, roadmap: ['Network Security Basics', 'Firewalls', 'IDS/IPS', 'VPN', 'DMZ', 'Network Monitoring', 'DDoS Protection', 'Zero Trust Network', 'Security Auditing', 'Projects'] }
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
      { id: 'android', name: 'Android', icon: '🤖', description: 'Android app development', difficulty: 'Intermediate', xp: 130, roadmap: ['Android Basics', 'Activities & Intents', 'Layouts & Views', 'RecyclerView', 'Fragments', 'ViewModel', 'Room DB', 'Retrofit', 'Jetpack Compose', 'Projects'] },
      { id: 'ios', name: 'iOS', icon: '🍎', description: 'iOS app development', difficulty: 'Intermediate', xp: 130, roadmap: ['Swift Basics', 'UIKit', 'View Controllers', 'Auto Layout', 'Navigation', 'TableView', 'Core Data', 'Networking', 'SwiftUI', 'Projects'] },
      { id: 'flutter', name: 'Flutter', icon: '🦋', description: 'Cross-platform apps', difficulty: 'Intermediate', xp: 125, roadmap: ['Flutter Setup', 'Dart Basics', 'Widgets', 'Layouts', 'State Management', 'Navigation', 'HTTP Requests', 'Local Storage', 'Publishing', 'Projects'] },
      { id: 'react-native', name: 'React Native', icon: '⚛️', description: 'React for mobile', difficulty: 'Intermediate', xp: 125, roadmap: ['RN Setup', 'Components', 'StyleSheet', 'Navigation', 'State Management', 'Native Modules', 'APIs', 'Animations', 'Publishing', 'Projects'] }
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
      { id: 'docker', name: 'Docker', icon: '🐳', description: 'Containerization platform', difficulty: 'Intermediate', xp: 120, roadmap: ['Docker Basics', 'Images & Containers', 'Dockerfile', 'Docker Compose', 'Volumes', 'Networking', 'Registry', 'Multi-stage Builds', 'Security', 'Projects'] },
      { id: 'kubernetes', name: 'Kubernetes', icon: '☸️', description: 'Container orchestration', difficulty: 'Advanced', xp: 150, roadmap: ['K8s Basics', 'Pods', 'Deployments', 'Services', 'ConfigMaps', 'Secrets', 'Ingress', 'Helm', 'Monitoring', 'Projects'] },
      { id: 'aws', name: 'AWS', icon: '☁️', description: 'Amazon cloud services', difficulty: 'Intermediate', xp: 140, roadmap: ['AWS Basics', 'EC2', 'S3', 'RDS', 'Lambda', 'IAM', 'VPC', 'CloudFront', 'Route 53', 'Projects'] },
      { id: 'ci-cd', name: 'CI/CD', icon: '🔄', description: 'Continuous integration', difficulty: 'Intermediate', xp: 115, roadmap: ['CI/CD Basics', 'Git Workflows', 'GitHub Actions', 'Jenkins', 'Testing Automation', 'Build Pipelines', 'Deployment Strategies', 'Monitoring', 'Rollbacks', 'Projects'] },
      { id: 'git', name: 'Git', icon: '📦', description: 'Version control', difficulty: 'Beginner', xp: 90, roadmap: ['Git Basics', 'Commits', 'Branches', 'Merging', 'Rebasing', 'Remote Repos', 'Pull Requests', 'Git Flow', 'Conflict Resolution', 'Projects'] }
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
