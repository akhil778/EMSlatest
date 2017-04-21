pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        parallel(
          "Build": {
            echo 'build message'
            
          },
          "Build2": {
            echo 'build for master'
            
          }
        )
      }
    }
  }
}