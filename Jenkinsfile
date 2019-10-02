#!groovy

pipeline{
	agent none
	stages{
		stage('Des'){
			when{
				branch 'dev'
			}
			agent {node{label 'DES'}}
			steps{
				checkout scm					
				sh "npm install"
				sh "ng build"
				sh "cp -R /opt/jenkins/workspace/portal.rededecisao.com_dev/* /var/www/des.portal.rededecisao.com"
			}		
		}
		stage('Hom'){
			when{
				branch 'hom'
			}
			agent{node{label 'hom.rededecisao.com'}}
			steps{
				checkout scm
				sh "npm install"
				sh "ng build --configuration=homologacao"
				sh "cp -R /opt/jenkins/workspace/portal.rededecisao.com_hom/dist /var/www/hom.portal.rededecisao.com"	
			}
		}
		stage('Prod'){
			when{
				branch 'master'
			}
			agent{node{label 'portal.rededecisao.com'}}
			steps{
				checkout scm
				sh "npm install"
				sh "ng build --prod"
				sh "cp -R /opt/jenkins/workspace/portal.rededecisao.com_master/dist /var/www/html"		
			}
		}
	}
}