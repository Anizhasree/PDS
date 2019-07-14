---------------------------------------------------------------------   PUBLIC DISTRIBUTION SYSTEM [PDS]  ---------------------------------------------------------------------------------------------------



**Brief description:**

PDS is an application on private Sawtooth network that creates a distributed ledger with a decentralized platform for Public Distribution System of India . 

PDS app connects different participants in the Public Distribution system starting from Agency(one who collects goods from the farmer),Central Department,State Departments,Zonal Departments and retailers.Its enable us to supervise the timeline based flow of goods,improve transparency and prevents fraud and establish trust.And ensure well it reaches the correct beneficiaries


**Description:**

PDS is an application which brings all departments which participates in the public Distribution system in India.


India  is one  of  the countries  which distributes  food  grain through  public  distribution  system  (PDS)  to  poor households.   In  India, the  system was  invented by British government and it was improved and modified over the time by Indian government  to protect the food security of poor. As India is second most populated country having large  number  of beneficiaries,  the system  was not  able to cover  entire  poor  people  in  the  country.  Hence,  the assessment  of  weakness  in  the  system  would  help  to strengthen  the system  and  make  it perfect.  The PDS  is a joint  program  run  by  central  and  state  government,  the central government plays role in procure food grains, store and allocate to the state government through central  pools, the  state  government  plays  a  role  in  identify  eligible beneficiaries  and  distribute  the  entitlements  through  fair price shop .As the function of system varies from state to state , the issues in the states also varies hence the major  problems faced are corruption,  poor  quality  and  less  quantity  of food  grains, leakage  of  food  grains  into  open  market,  incorrect classification of poverty, bogus cards and non-availability of food  grains  and  irregular  function  .Adulteration,  quality  and  underweight is  a  major problem faced  by the beneficiaries.

So the PDS application suggests an alternative method to over come the problems in our current public distribution system.This application is build on private network using Hyperledger Sawtooth with devmode consensus.Agency,Central Department,State Departments,Zonal Departments and Retailers are the different participants of our application.In each stage each department will verify the unique sackid,product type and product weigth and then they update the state with arrival and dispatch date of each product from their provinces.By this we ensure that the quantity and quality of the product is carried out in each stages are the same .When the product reaches the end Retailer,He can track the timeline based flow of the product using the sackid ,product type and the product weight.If in the case if the retailer sold out the product ,he can even the delete the product from the state.   

Lets take an example : Agency collect 50kg[weight of the product] of Rice[product type] from kerala and packed with a uinique sack id as 1[sack id].He will add all the product details including date of packing and the state of origin of the product  with sack id,product type,net weight.Then the Central Department will verify the sackid,product type and net weigth of the product and add the arrival ,dispatch date from their provicences.Central department also allocate the target state of the product.Let here it is Goa.Then the Goa state department will do the same verification process and also add the arrival and dispatch from there province followed by allocating the target Zone.Let here its the North zone of Goa.then the Northern Zone Department of Goa will also do the same verifications and details adding and allocate the product to a retailer.Let here its Retailer1.Retailer1 can verify the product by using sackid,product,weight and also track the product details.ie he can view the Origin of the state,date of packing,date of arrival at the Central Department,date of dispatch  from the central department,date of arrival at the State Department,date of dispatch  from the State department,date of arrival at the Zonal Department,date of dispatch  from the Zonal department.The Retailer1 can even delete the product from state if he sold out the product .

This application helps to track the product transparently and trace Adulteration,  quality  and  underweight in product.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**System requirements:**

1. Operating system: Ubuntu 16.04
2. System RAM: 4 GB or above (recommended 8 GB)
3. Free System storage: 4 GB on /home


**Installation prerequisites:**

1. Docker must be installed in the system
2. docker compose must be installed


3. Ensure that NodeJS (version 8.15 ideally) is installed in the system. [For more information about NodeJS, go to https://nodejs.org]. 
   To check if installed, open a the terminal window and give the command
   ## node -v

4. If NodeJS is not installed, go to https://nodejs.org and download the compatible version (version 8.15) based on system OS, or go to the terminal window: and give the command
   # sudo apt-get install -y nodejs

5. Ensure that Docker is installed. [Docker is a platform for developers and system administrators to develop, ship, and run applications. For more information, go to https://www.docker.com].
   To check if installed, go to the terminal window: give the command
   # sudo docker --version

6. If Docker is not installed, go to the terminal window:
   SET UP THE REPOSITORY

   1.Update the apt package index:
   # sudo apt-get update
   2.Install packages to allow apt to use a repository over HTTPS:
   # sudo apt-get install \apt-transport-https \ca-certificates \curl \ gnupg-agent \software-properties-common
   3.Add Docker’s official GPG key:
   # curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   4.Use the following command to set up the stable repository.
   # sudo add-apt-repository \"deb [arch=amd64] https://download.docker.com/linux/ubuntu \(lsb_release -cs) \stable"
   
   INSTALL DOCKER CE

   1.Update the apt package index.
   # sudo apt-get update
   2.Install the latest version of Docker CE.
   # sudo apt-get install docker-ce
   3.Verify that Docker CE is installed correctly by running the hello-world image.
   # sudo docker run hello-world
   This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.

7. Ensure that Docker Compose is installed. Compose is a tool for defining and running multi-container Docker applications. To check if installed, go to the terminal window:
   # sudo docker-compose --version

8. If Docker Compose is not installed, go to the terminal window:
   # sudo apt-get update
   # sudo apt-get install docker-compose


**Instructions for Installation of Application:**

1. Download the folder "pds"
2. Open a terminal inside the folder "pds" and give the command :
    # sudo docker-compose up
3. After running all the containers  
4. Open another terminal from the same folder "pds" and give the command :
    #sudo docker exec -it validator bash
    [This will open the validator bash and we have to set the permissions in this validator bash by giving the commands below]

**Permissioning commands**

Key Generation
-------------------------------------------------------
 # sawtooth keygen Agency
 # sawtooth keygen CentralDept
 # sawtooth keygen Kerala
 # sawtooth keygen North
 # sawtooth keygen Retailer1


5. # sawset proposal create --key  ~/.sawtooth/keys/my_key.priv  sawtooth.identity.allowed_keys=$(cat ~/.sawtooth/keys/my_key.pub) --url http://rest-api:8008

6. # sawtooth identity policy create --key /root/.sawtooth/keys/my_key.priv policy_1 "PERMIT_KEY $(cat /root/.sawtooth/keys/my_key.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Agency.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/CentralDept.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Kerala.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/North.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/Retailer1.pub)"--url http://rest-api:800​8 

7. Now set the role as transaction signer for Family name "pds" for the keys under the policy file name policy_1

  # sawtooth identity role create --key ~/.sawtooth/keys/my_key.priv transactor.transaction_signer.pds policy_1 --url http://rest-api:8008 

8. Now give the below commands to view the keys of each department. Using these private keys we can access the UI



Simply copy-paste the entire code below to get keys.
------------------------------------------------------
 # cat ~/.sawtooth/keys/Agency.priv
 # cat ~/.sawtooth/keys/CentralDept.priv
 # cat ~/.sawtooth/keys/Kerala.priv
 # cat ~/.sawtooth/keys/North.priv
 # cat ~/.sawtooth/keys/Retailer1.priv
-----------------------------------------------------

9. Now go to the chrome browser and go to http://localhost:3000
10. Now you can access the application using the corresponding departments private key
11. You can verify the state by ://localhost:8008/state
12. To terminate the app execution, go to the terminal window (where docker-compose is running) and give CTRL+C
13. Wait for docker-compose to gracefully shutdown. Then: give the command
    # sudo docker-compose down

NOTES:
UI user guidence is mentioned in DOCUMENTATION.md






