pipeline {
    agent any


    tools {
        nodejs 'node-v24'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
                echo "✓ Repository checked out successfully"
            }
        }

        stage('Install deps') {
            steps {
                sh '''
                   echo "📦 Installing dependencies with bun..."
                   bun install --frozen-lockfile
                   echo "✓ Dependencies installed"
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                   echo "🔨 Building Astro project..."
                   bun run build
                   echo "✓ Build completed successfully"
                '''
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy') {
            parallel {
                stage('Stop Services') {
                    steps {
                        sh '''
                           echo "🛑 Stopping Docker services..."
                           docker compose -f config/docker-compose.yaml down
                           echo "✓ Services stopped"
                        '''
                    }
                }
                
                stage('Start Services') {
                    steps {
                        sh '''
                           echo "🚀 Starting Docker services..."
                           docker compose -f config/docker-compose.yaml up -d --remove-orphans
                           echo "✓ Services started"
                        '''
                    }
                }
            }
        }

        stage('Validate Deployment') {
            steps {
                sh '''
                   echo "✓ Waiting for services to be ready..."
                   sleep 10
                   
                   echo "📊 Docker services status:"
                   docker ps --filter "name=.*demo.*" --format "table {{.Names}}\t{{.Status}}"
                   
                   echo "🌐 Validating API response..."
                   curl -I https://demo.lortegal.com
                   echo "✓ Deployment validated successfully"
                '''
            }
        }

    }

}