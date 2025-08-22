import {
  Target,
  Blocks,
  Minimize2,
  BrainCircuit,
  Workflow,
  BotMessageSquare,
  Award,
  Network,
  type LucideIcon,
} from 'lucide-react';

export type SubTopic = {
  id: string;
  title: string;
  resources?: { title: string; url: string }[];
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  subTopics: SubTopic[];
};

const playlistBaseUrl = 'https://www.youtube.com/watch?v=';
const playlistId = 'PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU';

export const topics: Topic[] = [
  {
    id: 'supervised',
    title: 'Supervised Learning',
    description: 'Foundation of predictive modeling.',
    icon: Target,
    subTopics: [
      { id: 'supervised-0', title: 'Linear & Logistic Regression', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-1', title: 'Regularization: Ridge, Lasso, Elastic Net', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-2', title: 'Naive Bayes (Gaussian, Multinomial, Bernoulli)', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-3', title: 'k-Nearest Neighbors (k-NN)', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-4', title: 'Tree-Based & Ensemble Methods', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-5', title: 'Support Vector Machines (SVM)', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-6', title: 'Data Preprocessing & Feature Engineering', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-7', title: 'Model Evaluation & Validation', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-8', title: 'Model Optimization (Hyperparameter Tuning)', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
      { id: 'supervised-9', title: 'Model Interpretability (SHAP, LIME)', resources: [{ title: 'Watch Video', url: `https://youtu.be/Lb0JzFtTmBs?si=3ECZ1BhzZDFTFVZi` }] },
    ],
  },
  {
    id: 'unsupervised',
    title: 'Unsupervised Learning',
    description: 'Discover hidden patterns in data.',
    icon: Blocks,
    subTopics: [
      { id: 'unsupervised-0', title: 'Clustering: KMeans, DBSCAN', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-1', title: 'Gaussian Mixture Models (GMM)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-2', title: 'Association Rule Learning (Apriori)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-3', title: 'Anomaly Detection (Isolation Forest)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-4', title: 'Dimensionality Reduction: PCA, t-SNE', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-5', title: 'Distance & Similarity Measures', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-6', title: 'Evaluation of Clustering (Silhouette Score)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
      { id: 'unsupervised-7', title: 'Matrix Factorization Methods (SVD, NMF)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/Aa4MACKaDC0?si=1JXpVJNx9eBhMwTg' }] },
    ],
  },
  {
    id: 'dimensionality',
    title: 'Dimensionality Reduction',
    description: 'Handle high-dimensional data.',
    icon: Minimize2,
    subTopics: [
      { id: 'dimensionality-0', title: 'Principal Component Analysis (PCA)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-1', title: 'Singular Value Decomposition (SVD)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-2', title: 'Linear Discriminant Analysis (LDA)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-3', title: 'Independent Component Analysis (ICA)', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-4', title: 'Kernel PCA & Autoencoders', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-5', title: 'Manifold Learning: t-SNE, UMAP', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
      { id: 'dimensionality-7', title: 'Evaluation: Explained Variance Ratio', resources: [{ title: 'Watch Video', url: 'https://youtu.be/H99JRtDDnvk?si=MAY0tfO09NyhfDv6' }] },
    ],
  },
  {
    id: 'deeplearning',
    title: 'Deep Neural Networks',
    description: 'The core of modern AI.',
    icon: BrainCircuit,
    subTopics: [
        { id: 'deep-0', title: 'Basics: Perceptron, MLP, Backpropagation', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-1', title: 'Activation Functions: ReLU, Softmax, etc.', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-2', title: 'Weight Initialization: Xavier, He', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-3', title: 'Convolutional Neural Networks (CNNs)', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-4', title: 'Recurrent Neural Networks (RNN, LSTM, GRU)', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-5', title: 'Transformers & Attention Mechanisms', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-6', title: 'Advanced Architectures: ResNet, DenseNet', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-7', title: 'Optimization: Adam, LR Scheduling', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-8', title: 'Regularization: Dropout, BatchNorm', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
        { id: 'deep-9', title: 'Loss Functions: Cross-Entropy, MSE', resources: [{ title: 'Watch Video', url: `https://youtu.be/d2kxUVwWWwU?si=Ibyl6lflikBMW_TC` }] },
    ],
  },
  {
    id: 'sequential',
    title: 'Sequential Learning',
    description: 'Model time and order-dependent data.',
    icon: Workflow,
    subTopics: [
      { id: 'sequential-0', title: 'RNN, LSTM, GRU, Bidirectional RNNs', resources: [{ title: 'Lecture', url: `https://youtu.be/hoH0bBIzF98?si=8l4jzzZT881Gxwer` }] },
      { id: 'sequential-1', title: 'Attention & Transformers (BERT, GPT)', resources: [{ title: 'Lecture', url: `https://youtu.be/hoH0bBIzF98?si=8l4jzzZT881Gxwer` }] },
      { id: 'sequential-2', title: 'Sequence-to-Sequence Models', resources: [{ title: 'Lecture', url: `https://youtu.be/hoH0bBIzF98?si=8l4jzzZT881Gxwer` }] },
      { id: 'sequential-3', title: 'Time-series Forecasting: ARIMA, Prophet', resources: [{ title: 'Lecture', url: `https://youtu.be/hoH0bBIzF98?si=8l4jzzZT881Gxwer` }] },
      { id: 'sequential-4', title: 'Evaluation Metrics: Perplexity, BLEU/ROUGE', resources: [{ title: 'Lecture', url: `https://youtu.be/hoH0bBIzF98?si=8l4jzzZT881Gxwer` }] },
    ],
  },
  {
    id: 'generative',
    title: 'Generative AI & LLMs',
    description: 'Create new data and work with large models.',
    icon: BotMessageSquare,
    subTopics: [
      { id: 'generative-0', title: 'VAEs & GANs', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-1', title: 'Diffusion Models (Stable Diffusion)', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-2', title: 'Transformers (GPT, T5, LLaMA)', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-3', title: 'Fine-tuning & Prompt Engineering', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-4', title: 'Parameter-efficient Fine-tuning (PEFT)', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-5', title: 'RLHF & Instruction Tuning', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-6', title: 'Text Preprocessing & Embeddings', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-7', 'title': 'Multimodal Models (CLIP, DALL-E)', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
      { id: 'generative-8', title: 'Ethics & Bias in Generative Models', resources: [{ title: 'Lecture', url: `https://youtu.be/4qysCv3LitU?si=3wR3eBacxRHyx0XV` }] },
    ],
  },
  {
    id: 'reinforcement',
    title: 'Reinforcement Learning',
    description: 'Learning through interaction and rewards.',
    icon: Award,
    subTopics: [
      { id: 'reinforcement-0', title: 'Markov Decision Processes (MDP)', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-1', title: 'Exploration vs. Exploitation', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-2', title: 'Value-Based Methods: Q-Learning, SARSA', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-3', title: 'Deep Q-Networks (DQN)', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-4', title: 'Policy Gradient Methods: REINFORCE, PPO', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-5', title: 'Model-Based RL: Dyna-Q', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
      { id: 'reinforcement-6', title: 'Reward Shaping & Curriculum Learning', resources: [{ title: 'Lecture', url: `https://youtu.be/fJPIgGLOtI8?si=gHUHqaa2t_HL8_zx` }] },
    ],
  },
  {
    id: 'causal',
    title: 'Causal Inference',
    description: 'Understand cause-effect beyond correlation.',
    icon: Network,
    subTopics: [
      { id: 'causal-0', title: 'Causal Graphs (DAGs) & Confounders', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-1', title: 'Potential Outcomes Framework', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-2', title: 'Instrumental Variables & Do-calculus', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-3', title: 'Causal Discovery Methods (PC, LiNGAM)', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-4', title: 'Propensity Score Matching (PSM)', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-5', title: 'Difference-in-Differences (DiD)', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-6', title: 'Synthetic Control Methods', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
      { id: 'causal-7', title: 'Applications: A/B testing, policy decisions', resources: [{ title: 'Lecture', url: `https://youtu.be/gRkUhg9Wb-I?si=qlGrIbBrKf9jvPoJ` }] },
    ],
  },
];
