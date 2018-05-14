# Dockter

Dockter for Docker whill be what GitKraken is for Git. There are some plugins for Docker that add 
Docker functionality to an IDE like Eclipse, and a web-based Docker tool, but I haven't seen any good
Docker tools that make use of the full CLI. 

Dockter is in the early development stages of becoming a full-fletched IDE for Dockter. The project 
aims to simplify using Docker on your development machine and to visualize running containers. Start
a Dockter project and edit your docker-compose.yml and Dockerfiles to build your application. Use
syntax highlighting to get a clear view of the project, or even visualize your running containers.
This will all be possible soon.

## Planned features

- Run any terminal command
- Open a folder containing a docker-compose.yml file as a Dockter project. In this project, 
you will be able to open the docker-compose file or Dockerfiles in a text-editor to make changes.
- Build the Docker project (docker-compose build)
- Run the Docker project (docker-compose up)
- Create a new Dockter project
- Create and edit Dockerfiles
- Run separate Dockerfiles
- Visually see your running containers/services
- Create networks
- Deploy Dockter projects
- Dockerfile and docker-compose syntax coloring
- Create and edit shell files
- Add git repositories to use as build folder in your Dockerfiles

