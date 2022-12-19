
<h1>
   Todo App
  <img src="https://cdn.icon-icons.com/icons2/3078/PNG/512/clipboard_notes_list_tasks_icon_191193.png" width="45"/>
</h1>
<b>Organize your life with todo app</b>
<div id="header" align="center">
  <img src="https://media.giphy.com/media/VdoIFLsMIlwzfKD520/giphy.gif" width="200"/>
</div>

<div id="badges" align="center">
   <b>Contact:</b>
   <br />
  <a href="https://www.linkedin.com/in/peleg-levy">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  <a href="https://github.com/Peleg07">
  <img src="https://img.shields.io/badge/github-gray?style=for-the-badge&logo=github&logoColor=white" alt="Github Badge"/>
</div>
    
<h1 align="center">__________________________________________________________</h1>
   
### Introduction:
   Todo App is built with a microservices architecture based on docker compose.<br />
   The services of the application are backend, frontend and database.
* Backend using python 3.9 & FastAPI 0.88.0
* Frontend using React/Streamlit
* Database using Mongodb
     
     
### App Features:
- [x] Add a new task
- [x] Modify existing task
- [x] Get task by task id
- [x] Delete task
    
    
### Languages and Tools :hammer_and_wrench::
<div>
   <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/docker/docker-original-wordmark.svg" title="Docker" width="40" height="40"/>&nbsp;
   <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/python/python-original-wordmark.svg" title="Python" width="40" height="40"/>&nbsp;
    <img src="https://upload.wikimedia.org/wikiversity/en/8/8c/FastAPI_logo.png" title="FastAPI" width="80" height="40"/>&nbsp;
</div>
 
 ### Installation Instructions:
 1.
         Make sure you have docker installed on your computer & docker service is running.
 2.
         git clone https://github.com/EASS-HIT-PART-A-2022-CLASS-II/Todo-App.git
      ![image](https://user-images.githubusercontent.com/89268094/208521847-d87d04b2-6b33-4057-90d4-617235b6da2a.png)
 3.
         cd Todo-App
      ![image](https://user-images.githubusercontent.com/89268094/208521984-1ba8917d-60b5-404b-bb51-0cd50836f02e.png)
 4.
         docker composer up -d
      ![image](https://user-images.githubusercontent.com/89268094/208521647-27585e00-3dd0-413d-a692-822ff09d4262.png)
      ![image](https://user-images.githubusercontent.com/89268094/208521713-5eaf28d9-daf8-449a-824c-5eeb4dd06f11.png)

 5.
         Check that you have 2 containers running (backend & mongodb):
         docker compose ps
       ![image](https://user-images.githubusercontent.com/89268094/208521250-c6892226-1192-4975-aac7-1b8f0a561eba.png)

 6.
         Open you browser and Enter:
         http://localhost:8080


