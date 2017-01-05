# mesos-zookeeper-cleanup

This is a tool to cleanup framework definitions from zookeeper to allow starting of frameworks that were previously removed from mesos and will not start due to an invalid framework ID.  

## Usage
Edit the environment variable called FRAMEWORK_NAME in the marathon.json file and deploy it as an app in DC/OS or Marathon.  
The framework name will be shown and the script will wait 60 seconds to allow time to abort (by killing the task or scaling it down).
