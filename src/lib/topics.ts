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

export const topics: Topic[] = [
  {
    id: 'supervised',
    title: 'Supervised Learning',
    description: 'Foundation of predictive modeling.',
    icon: Target,
    subTopics: [
      { id: 'supervised-0', title: 'Linear & Logistic Regression' },
      { id: 'supervised-1', title: 'Regularization: Ridge, Lasso, Elastic Net' },
      { id: 'supervised-2', title: 'Naive Bayes (Gaussian, Multinomial, Bernoulli)' },
      { id: 'supervised-3', title: 'k-Nearest Neighbors (k-NN)' },
      { id: 'supervised-4', title: 'Tree-Based & Ensemble Methods' },
      { id: 'supervised-5', title: 'Support Vector Machines (SVM)' },
      { id: 'supervised-6', title: 'Data Preprocessing & Feature Engineering' },
      { id: 'supervised-7', title: 'Model Evaluation & Validation' },
      { id: 'supervised-8', title: 'Model Optimization (Hyperparameter Tuning)' },
      { id: 'supervised-9', title: 'Model Interpretability (SHAP, LIME)' },
    ],
  },
  {
    id: 'unsupervised',
    title: 'Unsupervised Learning',
    description: 'Discover hidden patterns in data.',
    icon: Blocks,
    subTopics: [
      { id: 'unsupervised-0', title: 'Clustering: KMeans, DBSCAN' },
      { id: 'unsupervised-1', title: 'Gaussian Mixture Models (GMM)' },
      { id: 'unsupervised-2', title: 'Association Rule Learning (Apriori)' },
      { id: 'unsupervised-3', title: 'Anomaly Detection (Isolation Forest)' },
      { id: 'unsupervised-4', title: 'Dimensionality Reduction: PCA, t-SNE' },
      { id: 'unsupervised-5', title: 'Distance & Similarity Measures' },
      { id: 'unsupervised-6', title: 'Evaluation of Clustering (Silhouette Score)' },
      { id: 'unsupervised-7', title: 'Matrix Factorization Methods (SVD, NMF)' },
    ],
  },
  {
    id: 'dimensionality',
    title: 'Dimensionality Reduction',
    description: 'Handle high-dimensional data.',
    icon: Minimize2,
    subTopics: [
      { id: 'dimensionality-0', title: 'Principal Component Analysis (PCA)' },
      { id: 'dimensionality-1', title: 'Singular Value Decomposition (SVD)' },
      { id: 'dimensionality-2', title: 'Linear Discriminant Analysis (LDA)' },
      { id: 'dimensionality-3', title: 'Independent Component Analysis (ICA)' },
      { id: 'dimensionality-4', title: 'Kernel PCA & Autoencoders' },
      { id: 'dimensionality-5', title: 'Manifold Learning: t-SNE, UMAP' },
      { id: 'dimensionality-6', title: 'Feature Selection vs. Extraction' },
      { id: 'dimensionality-7', title: 'Evaluation: Explained Variance Ratio' },
    ],
  },
  {
    id: 'deeplearning',
    title: 'Deep Neural Networks',
    description: 'The core of modern AI.',
    icon: BrainCircuit,
    subTopics: [
        { id: 'deep-0', title: 'Basics: Perceptron, MLP, Backpropagation' },
        { id: 'deep-1', title: 'Activation Functions: ReLU, Softmax, etc.' },
        { id: 'deep-2', title: 'Weight Initialization: Xavier, He' },
        { id: 'deep-3', title: 'Convolutional Neural Networks (CNNs)' },
        { id: 'deep-4', title: 'Recurrent Neural Networks (RNN, LSTM, GRU)' },
        { id: 'deep-5', title: 'Transformers & Attention Mechanisms' },
        { id: 'deep-6', title: 'Advanced Architectures: ResNet, DenseNet' },
        { id: 'deep-7', title: 'Optimization: Adam, LR Scheduling' },
        { id: 'deep-8', title: 'Regularization: Dropout, BatchNorm' },
        { id: 'deep-9', title: 'Loss Functions: Cross-Entropy, MSE' },
    ],
  },
  {
    id: 'sequential',
    title: 'Sequential Learning',
    description: 'Model time and order-dependent data.',
    icon: Workflow,
    subTopics: [
      { id: 'sequential-0', title: 'RNN, LSTM, GRU, Bidirectional RNNs' },
      { id: 'sequential-1', title: 'Attention & Transformers (BERT, GPT)' },
      { id: 'sequential-2', title: 'Sequence-to-Sequence Models' },
      { id: 'sequential-3', title: 'Time-series Forecasting: ARIMA, Prophet' },
      { id: 'sequential-4', title: 'Evaluation Metrics: Perplexity, BLEU/ROUGE' },
    ],
  },
  {
    id: 'generative',
    title: 'Generative AI & LLMs',
    description: 'Create new data and work with large models.',
    icon: BotMessageSquare,
    subTopics: [
      { id: 'generative-0', title: 'VAEs & GANs' },
      { id: 'generative-1', title: 'Diffusion Models (Stable Diffusion)' },
      { id: 'generative-2', title: 'Transformers (GPT, T5, LLaMA)' },
      { id: 'generative-3', title: 'Fine-tuning & Prompt Engineering' },
      { id: 'generative-4', title: 'Parameter-efficient Fine-tuning (PEFT)' },
      { id: 'generative-5', title: 'RLHF & Instruction Tuning' },
      { id: 'generative-6', title: 'Text Preprocessing & Embeddings' },
      { id: 'generative-7', title: 'Multimodal Models (CLIP, DALL-E)' },
      { id: 'generative-8', title: 'Ethics & Bias in Generative Models' },
    ],
  },
  {
    id: 'reinforcement',
    title: 'Reinforcement Learning',
    description: 'Learning through interaction and rewards.',
    icon: Award,
    subTopics: [
      { id: 'reinforcement-0', title: 'Markov Decision Processes (MDP)' },
      { id: 'reinforcement-1', title: 'Exploration vs. Exploitation' },
      { id: 'reinforcement-2', title: 'Value-Based Methods: Q-Learning, SARSA' },
      { id: 'reinforcement-3', title: 'Deep Q-Networks (DQN)' },
      { id: 'reinforcement-4', title: 'Policy Gradient Methods: REINFORCE, PPO' },
      { id: 'reinforcement-5', title: 'Model-Based RL: Dyna-Q' },
      { id: 'reinforcement-6', title: 'Reward Shaping & Curriculum Learning' },
    ],
  },
  {
    id: 'causal',
    title: 'Causal Inference',
    description: 'Understand cause-effect beyond correlation.',
    icon: Network,
    subTopics: [
      { id: 'causal-0', title: 'Causal Graphs (DAGs) & Confounders' },
      { id: 'causal-1', title: 'Potential Outcomes Framework' },
      { id: 'causal-2', title: 'Instrumental Variables & Do-calculus' },
      { id: 'causal-3', title: 'Causal Discovery Methods (PC, LiNGAM)' },
      { id: 'causal-4', title: 'Propensity Score Matching (PSM)' },
      { id: 'causal-5', title: 'Difference-in-Differences (DiD)' },
      { id: 'causal-6', title: 'Synthetic Control Methods' },
      { id: 'causal-7', title: 'Applications: A/B testing, policy decisions' },
    ],
  },
];
