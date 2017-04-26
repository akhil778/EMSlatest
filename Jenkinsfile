pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        parallel(
          "Build": {
            echo 'build message'
            sh 'npm install'
            
          },
          "Build2": {
            echo 'build for master'
            
          }
        )
      }
    }
  }
}