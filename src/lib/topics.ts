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

const machineLearningPlaylist = 'https://youtube.com/playlist?list=PLoROMvodv4rMiGQp3WXShtMGgzqpfVfbU';

export const topics: Topic[] = [
  {
    id: 'supervised',
    title: 'Supervised Learning',
    description: 'Foundation of predictive modeling.',
    icon: Target,
    subTopics: [
      { id: 'supervised-0', title: 'Linear & Logistic Regression', resources: [{ title: 'Lecture 1', url: machineLearningPlaylist }, { title: 'Lecture 2', url: machineLearningPlaylist }] },
      { id: 'supervised-1', title: 'Regularization: Ridge, Lasso, Elastic Net', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-2', title: 'Naive Bayes (Gaussian, Multinomial, Bernoulli)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-3', title: 'k-Nearest Neighbors (k-NN)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-4', title: 'Tree-Based & Ensemble Methods', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-5', title: 'Support Vector Machines (SVM)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-6', title: 'Data Preprocessing & Feature Engineering', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-7', title: 'Model Evaluation & Validation', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-8', title: 'Model Optimization (Hyperparameter Tuning)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'supervised-9', title: 'Model Interpretability (SHAP, LIME)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'unsupervised',
    title: 'Unsupervised Learning',
    description: 'Discover hidden patterns in data.',
    icon: Blocks,
    subTopics: [
      { id: 'unsupervised-0', title: 'Clustering: KMeans, DBSCAN', resources: [{ title: 'Lecture 1', url: machineLearningPlaylist }, { title: 'Lecture 2', url: machineLearningPlaylist }] },
      { id: 'unsupervised-1', title: 'Gaussian Mixture Models (GMM)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-2', title: 'Association Rule Learning (Apriori)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-3', title: 'Anomaly Detection (Isolation Forest)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-4', title: 'Dimensionality Reduction: PCA, t-SNE', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-5', title: 'Distance & Similarity Measures', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-6', title: 'Evaluation of Clustering (Silhouette Score)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'unsupervised-7', title: 'Matrix Factorization Methods (SVD, NMF)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'dimensionality',
    title: 'Dimensionality Reduction',
    description: 'Handle high-dimensional data.',
    icon: Minimize2,
    subTopics: [
      { id: 'dimensionality-0', title: 'Principal Component Analysis (PCA)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-1', title: 'Singular Value Decomposition (SVD)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-2', title: 'Linear Discriminant Analysis (LDA)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-3', title: 'Independent Component Analysis (ICA)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-4', title: 'Kernel PCA & Autoencoders', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-5', title: 'Manifold Learning: t-SNE, UMAP', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-6', title: 'Feature Selection vs. Extraction', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'dimensionality-7', title: 'Evaluation: Explained Variance Ratio', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'deeplearning',
    title: 'Deep Neural Networks',
    description: 'The core of modern AI.',
    icon: BrainCircuit,
    subTopics: [
        { id: 'deep-0', title: 'Basics: Perceptron, MLP, Backpropagation', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-1', title: 'Activation Functions: ReLU, Softmax, etc.', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-2', title: 'Weight Initialization: Xavier, He', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-3', title: 'Convolutional Neural Networks (CNNs)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-4', title: 'Recurrent Neural Networks (RNN, LSTM, GRU)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-5', title: 'Transformers & Attention Mechanisms', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-6', title: 'Advanced Architectures: ResNet, DenseNet', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-7', title: 'Optimization: Adam, LR Scheduling', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-8', title: 'Regularization: Dropout, BatchNorm', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
        { id: 'deep-9', title: 'Loss Functions: Cross-Entropy, MSE', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'sequential',
    title: 'Sequential Learning',
    description: 'Model time and order-dependent data.',
    icon: Workflow,
    subTopics: [
      { id: 'sequential-0', title: 'RNN, LSTM, GRU, Bidirectional RNNs', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'sequential-1', title: 'Attention & Transformers (BERT, GPT)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'sequential-2', title: 'Sequence-to-Sequence Models', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'sequential-3', title: 'Time-series Forecasting: ARIMA, Prophet', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'sequential-4', title: 'Evaluation Metrics: Perplexity, BLEU/ROUGE', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'generative',
    title: 'Generative AI & LLMs',
    description: 'Create new data and work with large models.',
    icon: BotMessageSquare,
    subTopics: [
      { id: 'generative-0', title: 'VAEs & GANs', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-1', title: 'Diffusion Models (Stable Diffusion)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-2', title: 'Transformers (GPT, T5, LLaMA)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-3', title: 'Fine-tuning & Prompt Engineering', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-4', title: 'Parameter-efficient Fine-tuning (PEFT)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-5', title: 'RLHF & Instruction Tuning', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-6', title: 'Text Preprocessing & Embeddings', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-7', 'title': 'Multimodal Models (CLIP, DALL-E)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'generative-8', title: 'Ethics & Bias in Generative Models', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'reinforcement',
    title: 'Reinforcement Learning',
    description: 'Learning through interaction and rewards.',
    icon: Award,
    subTopics: [
      { id: 'reinforcement-0', title: 'Markov Decision Processes (MDP)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-1', title: 'Exploration vs. Exploitation', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-2', title: 'Value-Based Methods: Q-Learning, SARSA', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-3', title: 'Deep Q-Networks (DQN)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-4', title: 'Policy Gradient Methods: REINFORCE, PPO', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-5', title: 'Model-Based RL: Dyna-Q', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'reinforcement-6', title: 'Reward Shaping & Curriculum Learning', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
  {
    id: 'causal',
    title: 'Causal Inference',
    description: 'Understand cause-effect beyond correlation.',
    icon: Network,
    subTopics: [
      { id: 'causal-0', title: 'Causal Graphs (DAGs) & Confounders', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-1', title: 'Potential Outcomes Framework', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-2', title: 'Instrumental Variables & Do-calculus', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-3', title: 'Causal Discovery Methods (PC, LiNGAM)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-4', title: 'Propensity Score Matching (PSM)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-5', title: 'Difference-in-Differences (DiD)', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-6', title: 'Synthetic Control Methods', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
      { id: 'causal-7', title: 'Applications: A/B testing, policy decisions', resources: [{ title: 'Lecture', url: machineLearningPlaylist }] },
    ],
  },
];
