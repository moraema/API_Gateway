pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        EC2_USER = 'ubuntu'
        SSH_KEY = credentials('ssh-key-ec2-gateway')

        // IP de despliegue del API Gateway
        PROD_IP = '3.230.221.103'

        // IPs de servicios LOGIN por rama
        LOGIN_DEV = 'http://52.45.156.125:3000'
        LOGIN_QA = 'http://52.23.140.75:3000'
        LOGIN_PROD = 'http://107.22.122.180:3000' //

        // IPs de servicios TASK por rama
        TASK_DEV = 'http://52.45.156.125:8080'
        TASK_QA = 'http://34.197.126.56:8080'
        TASK_PROD = 'http://23.20.93.87:8080' //

        REMOTE_PATH = '/home/ubuntu/API_Gateway'
    }

    stages {
        stage('Detect Branch') {
            steps {
                script {
                    env.ACTUAL_BRANCH = env.BRANCH_NAME ?: 'main'
                    echo "🔍 Rama activa: ${env.ACTUAL_BRANCH}"
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def ip = env.ACTUAL_BRANCH == 'main' ? PROD_IP : null
                    def pm2_name = "${env.ACTUAL_BRANCH}-health"

                    if (ip == null) {
                        error "Branch ${env.ACTUAL_BRANCH} no está configurada para despliegue."
                    }

                    // Asignar las URLs correspondientes a la rama
                    def login_url = env.ACTUAL_BRANCH == 'develop' ? LOGIN_DEV :
                                    env.ACTUAL_BRANCH == 'QA' ? LOGIN_QA :
                                    env.ACTUAL_BRANCH == 'main' ? LOGIN_PROD : ''

                    def task_url = env.ACTUAL_BRANCH == 'develop' ? TASK_DEV :
                                   env.ACTUAL_BRANCH == 'QA' ? TASK_QA :
                                   env.ACTUAL_BRANCH == 'main' ? TASK_PROD : ''

                    
                    sh """
                    ssh -i $SSH_KEY -o StrictHostKeyChecking=no $EC2_USER@$ip '
                        echo "📦 Actualizando sistema..."
                        sudo apt-get update -y &&
                        sudo apt-get upgrade -y

                        echo "📥 Verificando Node.js..."
                        if ! command -v node > /dev/null; then
                            curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
                            sudo apt-get install -y nodejs
                        fi

                        echo "📥 Verificando PM2..."
                        if ! command -v pm2 > /dev/null; then
                            sudo npm install -g pm2
                        fi

                        echo "📁 Verificando carpeta de app..."
                        if [ ! -d "$REMOTE_PATH/.git" ]; then
                            git clone https://github.com/moraema/API_Gateway.git $REMOTE_PATH
                        fi

                        echo "🔁 Pull y deploy..."
                        cd $REMOTE_PATH &&
                        git pull origin ${env.ACTUAL_BRANCH}

                        echo "📝 Generando archivo .env..."
                        echo "PORT=4000" > .env
                        echo "LOGIN_SERVICE_URL=${login_url}" >> .env
                        echo "TASK_SERVICE_URL=${task_url}" >> .env


                        npm ci &&
                        echo "📦 Instalando CORS..." &&
                        npm install cors &&
                        pm2 restart ${pm2_name} || pm2 start index.js --name ${pm2_name}
                    '
                    """
                }
            }
        }
    }
}
