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
      { id: 'supervised-0', title: 'Linear & Logistic Regression', resources: [{ title: 'Lecture 1', url: `${playlistBaseUrl}5b9Z8to_DAO&list=${playlistId}&index=1` }, { title: 'Lecture 2', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=2` }] },
      { id: 'supervised-1', title: 'Regularization: Ridge, Lasso, Elastic Net', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}I61s2hTAxH0&list=${playlistId}&index=3` }] },
      { id: 'supervised-2', title: 'Naive Bayes (Gaussian, Multinomial, Bernoulli)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}yDFY2n_dOKM&list=${playlistId}&index=4` }] },
      { id: 'supervised-3', title: 'k-Nearest Neighbors (k-NN)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}SA41tg6k4S8&list=${playlistId}&index=5` }] },
      { id: 'supervised-4', title: 'Tree-Based & Ensemble Methods', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}D912bTNc-KE&list=${playlistId}&index=6` }] },
      { id: 'supervised-5', title: 'Support Vector Machines (SVM)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}uYnK2S_c0L4&list=${playlistId}&index=7` }] },
      { id: 'supervised-6', title: 'Data Preprocessing & Feature Engineering', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}d2--j4a1aI&list=${playlistId}&index=8` }] },
      { id: 'supervised-7', title: 'Model Evaluation & Validation', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=9` }] },
      { id: 'supervised-8', title: 'Model Optimization (Hyperparameter Tuning)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=10` }] },
      { id: 'supervised-9', title: 'Model Interpretability (SHAP, LIME)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}5pQZ_4_c-M4&list=${playlistId}&index=11` }] },
    ],
  },
  {
    id: 'unsupervised',
    title: 'Unsupervised Learning',
    description: 'Discover hidden patterns in data.',
    icon: Blocks,
    subTopics: [
      { id: 'unsupervised-0', title: 'Clustering: KMeans, DBSCAN', resources: [{ title: 'Lecture 1', url: `${playlistBaseUrl}Q4__SWR8h-E&list=${playlistId}&index=12` }, { title: 'Lecture 2', url: `${playlistBaseUrl}le-b-i-1240&list=${playlistId}&index=13` }] },
      { id: 'unsupervised-1', title: 'Gaussian Mixture Models (GMM)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}3n9c2P8i5J0&list=${playlistId}&index=14` }] },
      { id: 'unsupervised-2', title: 'Association Rule Learning (Apriori)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}guVvtZ7ZClw&list=${playlistId}&index=15` }] },
      { id: 'unsupervised-3', title: 'Anomaly Detection (Isolation Forest)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}e3Fz4A5-h_o&list=${playlistId}&index=16` }] },
      { id: 'unsupervised-4', title: 'Dimensionality Reduction: PCA, t-SNE', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}g-bTe7oN_E&list=${playlistId}&index=17` }] },
      { id: 'unsupervised-5', title: 'Distance & Similarity Measures', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}j4PT2a9-C-o&list=${playlistId}&index=18` }] },
      { id: 'unsupervised-6', title: 'Evaluation of Clustering (Silhouette Score)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}mKY-K0S-M_0&list=${playlistId}&index=19` }] },
      { id: 'unsupervised-7', title: 'Matrix Factorization Methods (SVD, NMF)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}P5mlg91as1c&list=${playlistId}&index=20` }] },
    ],
  },
  {
    id: 'dimensionality',
    title: 'Dimensionality Reduction',
    description: 'Handle high-dimensional data.',
    icon: Minimize2,
    subTopics: [
      { id: 'dimensionality-0', title: 'Principal Component Analysis (PCA)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}g-bTe7oN_E&list=${playlistId}&index=21` }] },
      { id: 'dimensionality-1', title: 'Singular Value Decomposition (SVD)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}P5mlg91as1c&list=${playlistId}&index=22` }] },
      { id: 'dimensionality-2', title: 'Linear Discriminant Analysis (LDA)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}R-IjbYy3-G0&list=${playlistId}&index=23` }] },
      { id: 'dimensionality-3', title: 'Independent Component Analysis (ICA)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}1BAn1bESvX8&list=${playlistId}&index=24` }] },
      { id: 'dimensionality-4', title: 'Kernel PCA & Autoencoders', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}v-4q_68S_Go&list=${playlistId}&index=25` }] },
      { id: 'dimensionality-5', title: 'Manifold Learning: t-SNE, UMAP', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}87gvpFC_1us&list=${playlistId}&index=26` }] },
      { id: 'dimensionality-6', title: 'Feature Selection vs. Extraction', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}d2--j4a1aI&list=${playlistId}&index=27` }] },
      { id: 'dimensionality-7', title: 'Evaluation: Explained Variance Ratio', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}y7prxOVa4pA&list=${playlistId}&index=28` }] },
    ],
  },
  {
    id: 'deeplearning',
    title: 'Deep Neural Networks',
    description: 'The core of modern AI.',
    icon: BrainCircuit,
    subTopics: [
        { id: 'deep-0', title: 'Basics: Perceptron, MLP, Backpropagation', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}Ilg3gGewQ5U&list=${playlistId}&index=29` }] },
        { id: 'deep-1', title: 'Activation Functions: ReLU, Softmax, etc.', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}62A_y_IiWdI&list=${playlistId}&index=30` }] },
        { id: 'deep-2', title: 'Weight Initialization: Xavier, He', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}h3sxV82I9f4&list=${playlistId}&index=31` }] },
        { id: 'deep-3', title: 'Convolutional Neural Networks (CNNs)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zfiSAzpy9x4&list=${playlistId}&index=32` }] },
        { id: 'deep-4', title: 'Recurrent Neural Networks (RNN, LSTM, GRU)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}qjRad0V0_j4&list=${playlistId}&index=33` }] },
        { id: 'deep-5', title: 'Transformers & Attention Mechanisms', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zduSFxRajkE&list=${playlistId}&index=34` }] },
        { id: 'deep-6', title: 'Advanced Architectures: ResNet, DenseNet', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}v-4q_68S_Go&list=${playlistId}&index=35` }] },
        { id: 'deep-7', title: 'Optimization: Adam, LR Scheduling', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=36` }] },
        { id: 'deep-8', title: 'Regularization: Dropout, BatchNorm', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}I61s2hTAxH0&list=${playlistId}&index=37` }] },
        { id: 'deep-9', title: 'Loss Functions: Cross-Entropy, MSE', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}x_pj2p30yY4&list=${playlistId}&index=38` }] },
    ],
  },
  {
    id: 'sequential',
    title: 'Sequential Learning',
    description: 'Model time and order-dependent data.',
    icon: Workflow,
    subTopics: [
      { id: 'sequential-0', title: 'RNN, LSTM, GRU, Bidirectional RNNs', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}qjRad0V0_j4&list=${playlistId}&index=39` }] },
      { id: 'sequential-1', title: 'Attention & Transformers (BERT, GPT)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zduSFxRajkE&list=${playlistId}&index=40` }] },
      { id: 'sequential-2', title: 'Sequence-to-Sequence Models', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=41` }] },
      { id: 'sequential-3', title: 'Time-series Forecasting: ARIMA, Prophet', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}MIa_dC5-g6g&list=${playlistId}&index=42` }] },
      { id: 'sequential-4', title: 'Evaluation Metrics: Perplexity, BLEU/ROUGE', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=43` }] },
    ],
  },
  {
    id: 'generative',
    title: 'Generative AI & LLMs',
    description: 'Create new data and work with large models.',
    icon: BotMessageSquare,
    subTopics: [
      { id: 'generative-0', title: 'VAEs & GANs', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}5pQZ_4_c-M4&list=${playlistId}&index=44` }] },
      { id: 'generative-1', title: 'Diffusion Models (Stable Diffusion)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}N-K_89k_r-s&list=${playlistId}&index=45` }] },
      { id: 'generative-2', title: 'Transformers (GPT, T5, LLaMA)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zduSFxRajkE&list=${playlistId}&index=46` }] },
      { id: 'generative-3', title: 'Fine-tuning & Prompt Engineering', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=47` }] },
      { id: 'generative-4', title: 'Parameter-efficient Fine-tuning (PEFT)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}Ilg3gGewQ5U&list=${playlistId}&index=48` }] },
      { id: 'generative-5', title: 'RLHF & Instruction Tuning', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zfiSAzpy9x4&list=${playlistId}&index=49` }] },
      { id: 'generative-6', title: 'Text Preprocessing & Embeddings', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}d2--j4a1aI&list=${playlistId}&index=50` }] },
      { id: 'generative-7', 'title': 'Multimodal Models (CLIP, DALL-E)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=51` }] },
      { id: 'generative-8', title: 'Ethics & Bias in Generative Models', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}5pQZ_4_c-M4&list=${playlistId}&index=52` }] },
    ],
  },
  {
    id: 'reinforcement',
    title: 'Reinforcement Learning',
    description: 'Learning through interaction and rewards.',
    icon: Award,
    subTopics: [
      { id: 'reinforcement-0', title: 'Markov Decision Processes (MDP)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}MXE37zs8a_I&list=${playlistId}&index=53` }] },
      { id: 'reinforcement-1', title: 'Exploration vs. Exploitation', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}AFx-fgx4BC4&list=${playlistId}&index=54` }] },
      { id: 'reinforcement-2', title: 'Value-Based Methods: Q-Learning, SARSA', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}B-Qk0L4y_20&list=${playlistId}&index=55` }] },
      { id: 'reinforcement-3', title: 'Deep Q-Networks (DQN)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}5pQZ_4_c-M4&list=${playlistId}&index=56` }] },
      { id: 'reinforcement-4', title: 'Policy Gradient Methods: REINFORCE, PPO', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=57` }] },
      { id: 'reinforcement-5', title: 'Model-Based RL: Dyna-Q', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}Ilg3gGewQ5U&list=${playlistId}&index=58` }] },
      { id: 'reinforcement-6', title: 'Reward Shaping & Curriculum Learning', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zfiSAzpy9x4&list=${playlistId}&index=59` }] },
    ],
  },
  {
    id: 'causal',
    title: 'Causal Inference',
    description: 'Understand cause-effect beyond correlation.',
    icon: Network,
    subTopics: [
      { id: 'causal-0', title: 'Causal Graphs (DAGs) & Confounders', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}d2--j4a1aI&list=${playlistId}&index=60` }] },
      { id: 'causal-1', title: 'Potential Outcomes Framework', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=61` }] },
      { id: 'causal-2', title: 'Instrumental Variables & Do-calculus', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}5pQZ_4_c-M4&list=${playlistId}&index=62` }] },
      { id: 'causal-3', title: 'Causal Discovery Methods (PC, LiNGAM)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}sY2-_Y-a_Ac&list=${playlistId}&index=63` }] },
      { id: 'causal-4', title: 'Propensity Score Matching (PSM)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}Ilg3gGewQ5U&list=${playlistId}&index=64` }] },
      { id: 'causal-5', title: 'Difference-in-Differences (DiD)', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}zfiSAzpy9x4&list=${playlistId}&index=65` }] },
      { id: 'causal-6', title: 'Synthetic Control Methods', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}d2--j4a1aI&list=${playlistId}&index=66` }] },
      { id: 'causal-7', title: 'Applications: A/B testing, policy decisions', resources: [{ title: 'Lecture', url: `${playlistBaseUrl}tqK4Z0k3-Sg&list=${playlistId}&index=67` }] },
    ],
  },
];
