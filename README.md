# Project Name

Brief description of your project.

## Getting Started

To run your project, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) must be installed
- [Docker](https://www.docker.com/products/docker-desktop) must be installed

### Installation

1. Clone the project repository and navigate to the project folder:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
2. Start Docker and run the project using Docker Compose:

```
  docker-compose up
This command starts all services defined in your Docker Compose file.
```
3. Ensure Redis is installed on Docker with the appropriate port configuration. Check that the Redis service in your Docker Compose file looks like this:
```
  redis:
  image: redis
  ports:
    - "6379:6379"
```
4. Once the PostgreSQL, pgAdmin4, and Redis containers are running, install the project dependencies:
```
  npm start
```
