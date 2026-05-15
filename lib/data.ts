import type { ExperienceItem, Project, Skill, Certification, MetricStat } from '@/types'

export const BIO = {
  name: 'Syed Ikramuddin',
  alias: 'Ikram Kirmani',
  title: 'Cloud / DevOps Engineer',
  tagline: "Building infrastructure that scales. Automating everything that doesn't.",
  summary:
    'Cloud / DevOps Engineer with 1+ years of experience designing and implementing scalable cloud infrastructure across AWS, Azure, and GCP. Adept at deploying automation with Terraform and Ansible, streamlining CI/CD pipelines, containerizing applications, and securing cloud environments.',
  location: 'Deggendorf, Germany',
  email: 'iikramkirmani@gmail.com',
  phone: '+49 15511 047741',
  education: {
    degree: 'B.Tech in Information Technology',
    institution: 'MGM University',
    location: 'Deggendorf, Germany',
    period: '2021 – 2025',
    cgpa: '7.69',
  },
}

export const STATS: MetricStat[] = [
  { label: 'Cloud Cost Reduced', value: '25', suffix: '%' },
  { label: 'Deployment Reliability', value: '95', suffix: '%' },
  { label: 'Incident Response Faster', value: '40', suffix: '%' },
  { label: 'Manual Intervention Reduced', value: '60', suffix: '%' },
]

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'Shaats Pvt. Ltd.',
    role: 'Cloud Engineer Intern',
    period: 'Apr 2024 – Apr 2025',
    location: 'Remote',
    projects: [
      {
        title: 'Infrastructure Cost Optimization',
        bullets: [
          'Identified **30%** unused resources across environments, causing **$500–$1,000** in monthly waste.',
          'Used **Cost Explorer** and **CloudWatch** to analyze usage; resized **18 EC2 instances**, implemented **Auto Scaling**, and removed **500+ GB** of unused **EBS** volumes.',
          'Reduced monthly cloud spend by **25%** without affecting availability or performance.',
        ],
      },
      {
        title: 'Blue-Green Deployment Pipeline',
        bullets: [
          'Deployment failures were causing app downtime during business hours, affecting user trust.',
          'Designed a **blue-green deployment** strategy for **zero-downtime** rollouts and easy rollback.',
          'Integrated **release gates**, **health checks**, and **routing logic** into the deployment pipeline.',
          'Improved release reliability by **95%** and eliminated customer-facing disruptions.',
        ],
      },
    ],
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'ai-support-ticketing',
    title: 'AI-Powered Support Ticketing System',
    description:
      'Intelligent support ticket routing and resolution platform with ML-based categorization, automated priority assignment, and cloud-native deployment on EKS with full observability stack.',
    stack: ['Python', 'FastAPI', 'AWS EKS', 'Docker', 'Terraform', 'GitHub Actions', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'Resolution Speed', value: '40% faster' },
      { label: 'Routing Accuracy', value: '92%' },
      { label: 'Uptime SLA', value: '99.9%' },
    ],
    github: 'https://github.com/iikram42',
    category: 'infrastructure',
  },
  {
    id: 'devsecops-pipeline',
    title: 'DevSecOps CI/CD Pipeline',
    description:
      'End-to-end secure CI/CD pipeline integrating SAST, DAST, container scanning, IaC policy enforcement, and automated compliance checks. Zero-trust deployment to multi-cloud environments.',
    stack: ['GitHub Actions', 'Terraform', 'Docker', 'ArgoCD', 'Trivy', 'SonarQube', 'AWS', 'Kubernetes'],
    metrics: [
      { label: 'Avg Deploy Time', value: '8 min' },
      { label: 'Security Coverage', value: '100%' },
      { label: 'Rollback Time', value: '< 2 min' },
    ],
    github: 'https://github.com/iikram42',
    category: 'devsecops',
  },
  {
    id: 'cloud-monitoring-stack',
    title: 'Cloud Monitoring Stack',
    description:
      'Provisioned EC2 instances and IAM roles via Terraform; standardized config using Ansible. Configured CloudWatch dashboards with SNS-based threshold alerting and documented runbooks.',
    stack: ['Terraform', 'Ansible', 'EC2', 'CloudWatch', 'SNS', 'Linux'],
    metrics: [
      { label: 'Incident Response', value: '40% faster' },
      { label: 'Alert Coverage', value: '100%' },
      { label: 'MTTR Reduced', value: '35%' },
    ],
    github: 'https://github.com/iikram42',
    category: 'monitoring',
  },
  {
    id: 'cicd-backup-automation',
    title: 'CI/CD + Backup Automation',
    description:
      'Multi-stage CI/CD pipelines for Dockerized applications with automated EBS snapshot backups using AWS Lambda and Boto3 with custom retention policies. Replicated in Azure DevOps.',
    stack: ['Jenkins', 'GitHub Actions', 'Lambda', 'Python', 'Azure DevOps', 'Docker'],
    metrics: [
      { label: 'Manual Work Reduced', value: '60%' },
      { label: 'Backup Consistency', value: '100%' },
      { label: 'Deploy Frequency', value: '3x increase' },
    ],
    github: 'https://github.com/iikram42',
    category: 'automation',
  },
]

export const SKILLS: Skill[] = [
  { name: 'AWS', category: 'cloud', level: 5 },
  { name: 'Azure', category: 'cloud', level: 4 },
  { name: 'GCP', category: 'cloud', level: 3 },
  { name: 'Terraform', category: 'iac', level: 5 },
  { name: 'Ansible', category: 'iac', level: 4 },
  { name: 'CloudFormation', category: 'iac', level: 3 },
  { name: 'GitHub Actions', category: 'cicd', level: 5 },
  { name: 'Jenkins', category: 'cicd', level: 4 },
  { name: 'ArgoCD', category: 'cicd', level: 4 },
  { name: 'GitLab CI', category: 'cicd', level: 3 },
  { name: 'Docker', category: 'containers', level: 5 },
  { name: 'Kubernetes', category: 'containers', level: 4 },
  { name: 'Prometheus', category: 'monitoring', level: 4 },
  { name: 'Grafana', category: 'monitoring', level: 4 },
  { name: 'CloudWatch', category: 'monitoring', level: 5 },
  { name: 'Python', category: 'scripting', level: 4 },
  { name: 'Bash', category: 'scripting', level: 4 },
  { name: 'Linux', category: 'security', level: 5 },
  { name: 'IAM / VPC', category: 'security', level: 4 },
]

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Architect Associate',
    issuer: 'Oracle',
    date: 'Oct 2025',
    expires: 'Oct 2027',
    status: 'earned',
    credentialUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=3BC8FDE472E2CA4C00E43DC33F590805D5E71DD7482F5D0549F085B9B59A4FD1',
    pdfUrl: '/cert-oci-architect.pdf',
    skills: ['Cloud Infrastructure', 'DevOps Tools'],
  },
  {
    name: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle',
    date: 'Oct 2025',
    status: 'earned',
    credentialUrl:
      'https://catalog-education.oracle.com/ords/certview/sharebadge?id=28371BBC7EC2D2BF262FE65BC52BF06B3DAFFDD7EF1FD1AE19E6BE0280FC6EB4',
    pdfUrl: '/cert-oci-genai.pdf',
    skills: ['Artificial Intelligence (AI)', 'Cloud Infrastructure'],
  },
  {
    name: 'Google Cloud Study Jam 2023',
    issuer: 'Google / GDSC MGM University',
    date: '2023',
    status: 'earned',
    skills: ['Cloud Infrastructure', 'Networking', 'GenAI'],
  },
  {
    name: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
    skills: ['AWS', 'Cloud Architecture'],
  },
  {
    name: 'Certified Kubernetes Administrator (CKA)',
    issuer: 'Cloud Native Computing Foundation',
    status: 'in-progress',
    skills: ['Kubernetes', 'Container Orchestration'],
  },
  {
    name: 'HashiCorp Terraform Associate',
    issuer: 'HashiCorp',
    status: 'in-progress',
    skills: ['Terraform', 'Infrastructure as Code'],
  },
]

export const ACHIEVEMENTS = [
  {
    title: 'Google Cloud Study Jam 2023',
    org: 'GDSC, MGM University',
    description:
      'Completed 9 hands-on labs covering cloud infrastructure, networking, and GenAI using Qwiklabs on GCP.',
  },
  {
    title: 'Swayambhu Technical Event',
    org: 'MGM University, Aurangabad',
    description:
      "Coordinated the Idea Poster Presentation competition at the university's annual tech fest.",
  },
]

export const TERMINAL_LINES: Array<{ type: 'cmd' | 'out' | 'success'; text: string }> = [
  { type: 'cmd', text: '$ kubectl get pods -n production' },
  { type: 'out', text: 'NAME                          READY   STATUS    AGE' },
  { type: 'out', text: 'api-deployment-7f8b9c-xkp2n   1/1     Running   2d' },
  { type: 'out', text: 'api-deployment-7f8b9c-mn4q7   1/1     Running   2d' },
  { type: 'out', text: 'worker-6d9f8b-pqr3t           1/1     Running   1d' },
  { type: 'cmd', text: '$ terraform apply -auto-approve' },
  { type: 'out', text: 'Apply complete! Resources: 12 added, 3 changed, 0 destroyed.' },
  { type: 'cmd', text: '$ argocd app sync production' },
  { type: 'success', text: '✓ Sync OK — revision: a3f8c2e' },
  { type: 'cmd', text: '$ kubectl rollout status deploy/api' },
  { type: 'success', text: '✓ deployment "api" successfully rolled out' },
]
